import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';

describe('Verifier probes: atomic stock (NOI-8)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let clientId: string, chairId: string, tableId: string, lampId: string, comboId: string;

  beforeAll(async () => {
    const m = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = m.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
    prisma = app.get(PrismaService);
  });
  afterAll(async () => { await app.close(); });

  beforeEach(async () => {
    await prisma.rentalItem.deleteMany(); await prisma.rental.deleteMany();
    await prisma.comboFurniture.deleteMany(); await prisma.combo.deleteMany();
    await prisma.furniture.deleteMany(); await prisma.client.deleteMany();
    const c = await prisma.client.create({ data: { name: 'P', phone: ['1'], latitude: 0, longitude: 0, addressReference: 'a' } });
    clientId = c.id;
    chairId = (await prisma.furniture.create({ data: { name: 'Chair', type: 'seating', stock: 5, dailyRate: 10 } })).id;
    tableId = (await prisma.furniture.create({ data: { name: 'Table', type: 'surface', stock: 4, dailyRate: 20 } })).id;
    lampId = (await prisma.furniture.create({ data: { name: 'Lamp', type: 'light', stock: 9, dailyRate: 5 } })).id;
    comboId = (await prisma.combo.create({ data: { name: 'Office Set', dailyRate: 25, ComboFurniture: { create: [ { furnitureId: lampId, quantity: 1 }, { furnitureId: tableId, quantity: 2 } ] } } })).id;
  });

  const body = (items: any[]) => ({ clientId, startDate: '2025-06-01', endDate: '2025-06-05', items });
  const snapshot = async () => ({
    furniture: await prisma.furniture.findMany({ orderBy: { name: 'asc' } }),
    rentals: await prisma.rental.count(),
    items: await prisma.rentalItem.count(),
  });

  it('P1 rollback: combo fails after earlier furniture decrements -> all stock restored, no rows', async () => {
    const before = await snapshot();
    const res = await request(app.getHttpServer()).post('/rental').send(body([
      { furnitureId: chairId, quantity: 2 },
      { comboId, quantity: 3 },
    ]));
    expect(res.status).toBe(400);
    const after = await snapshot();
    expect(JSON.stringify(after)).toBe(JSON.stringify(before));
  });

  it('P2 exact furniture error text', async () => {
    const res = await request(app.getHttpServer()).post('/rental').send(body([{ furnitureId: chairId, quantity: 10 }]));
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(`There is not enough stock for the item with ID ${chairId}. Required: 10, Available: 5`);
  });

  it('P3 exact combo error text (current stock on failure path)', async () => {
    const res = await request(app.getHttpServer()).post('/rental').send(body([{ comboId, quantity: 3 }]));
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(`Insufficient stock for Table in combo Office Set. Need 6 (2 per combo × 3 combos), but only 4 available`);
  });

  it('P4 boundary: quantity == stock succeeds, stock hits 0, next rental reports Available: 0', async () => {
    const ok = await request(app.getHttpServer()).post('/rental').send(body([{ furnitureId: chairId, quantity: 5 }]));
    expect(ok.status).toBe(201);
    expect((await prisma.furniture.findUnique({ where: { id: chairId } }))!.stock).toBe(0);
    const no = await request(app.getHttpServer()).post('/rental').send(body([{ furnitureId: chairId, quantity: 1 }]));
    expect(no.status).toBe(400);
    expect(no.body.message).toContain('Available: 0');
  });

  it('P5 five concurrent rentals of qty 1 against stock 3: exactly 3 succeed', async () => {
    await prisma.furniture.update({ where: { id: chairId }, data: { stock: 3 } });
    const reqs = Array.from({ length: 5 }, () => request(app.getHttpServer()).post('/rental').send(body([{ furnitureId: chairId, quantity: 1 }])));
    const res = await Promise.all(reqs);
    expect(res.filter(r => r.status === 201).length).toBe(3);
    expect(res.filter(r => r.status === 400).length).toBe(2);
    expect((await prisma.furniture.findUnique({ where: { id: chairId } }))!.stock).toBe(0);
    expect(await prisma.rental.count()).toBe(3);
  });

  it('P6 furniture+combo sharing same furniture in one rental: atomic across items, rollback on failure', async () => {
    const before = await snapshot();
    const res = await request(app.getHttpServer()).post('/rental').send(body([
      { furnitureId: tableId, quantity: 3 },
      { comboId, quantity: 1 },
    ]));
    expect(res.status).toBe(400);
    expect(JSON.stringify(await snapshot())).toBe(JSON.stringify(before));
  });

  it('P7 inactive combo furniture mid-list: rollback of prior decrements', async () => {
    await prisma.furniture.update({ where: { id: tableId }, data: { isActive: false } });
    const before = await snapshot();
    const res = await request(app.getHttpServer()).post('/rental').send(body([
      { furnitureId: chairId, quantity: 1 },
      { comboId, quantity: 1 },
    ]));
    expect(res.status).toBe(400);
    expect(JSON.stringify(await snapshot())).toBe(JSON.stringify(before));
  });
});