import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';

describe('Rental stock atomicity (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let clientId: string;
  let furnitureId: string;
  let comboId: string;
  let comboFurnitureId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();

    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Clean slate
    await prisma.rentalItem.deleteMany();
    await prisma.rental.deleteMany();
    await prisma.comboFurniture.deleteMany();
    await prisma.combo.deleteMany();
    await prisma.furniture.deleteMany();
    await prisma.client.deleteMany();

    // Seed
    const client = await prisma.client.create({
      data: {
        name: 'Test Client',
        phone: ['555-0000'],
        latitude: 0,
        longitude: 0,
        addressReference: 'Test address',
      },
    });
    clientId = client.id;

    const furniture = await prisma.furniture.create({
      data: {
        name: 'Chair',
        type: 'seating',
        stock: 5,
        dailyRate: 10,
      },
    });
    furnitureId = furniture.id;

    const comboFurniture = await prisma.furniture.create({
      data: {
        name: 'Table',
        type: 'surface',
        stock: 4,
        dailyRate: 20,
      },
    });
    comboFurnitureId = comboFurniture.id;

    const combo = await prisma.combo.create({
      data: {
        name: 'Office Set',
        dailyRate: 25,
        ComboFurniture: {
          create: [{ furnitureId: comboFurnitureId, quantity: 2 }],
        },
      },
    });
    comboId = combo.id;
  });

  function rentalBody(items: any[]) {
    return {
      clientId,
      startDate: '2025-06-01',
      endDate: '2025-06-05',
      items,
    };
  }

  it('two concurrent furniture rentals exceeding stock: one succeeds, one gets 400', async () => {
    const body = rentalBody([{ furnitureId, quantity: 3 }]);

    const [res1, res2] = await Promise.all([
      request(app.getHttpServer()).post('/rental').send(body),
      request(app.getHttpServer()).post('/rental').send(body),
    ]);

    const statuses = [res1.status, res2.status].sort();
    expect(statuses).toEqual([201, 400]);

    const furniture = await prisma.furniture.findUnique({
      where: { id: furnitureId },
    });
    expect(furniture!.stock).toBe(2);

    const rentals = await prisma.rental.findMany();
    expect(rentals).toHaveLength(1);
  });

  it('two concurrent combo rentals sharing furniture: one succeeds, one gets 400', async () => {
    // Combo needs 2 tables per rental. Stock is 4. Two rentals need 4 total.
    // But if both read stock=4 and both try to decrement 2, only one should win
    // when stock=4 and each needs 2: actually both fit (4 >= 2 twice = 4).
    // Use quantity 2 combos: each needs 2*2=4 tables. Stock=4, so only one fits.
    const body = rentalBody([{ comboId, quantity: 2 }]);

    const [res1, res2] = await Promise.all([
      request(app.getHttpServer()).post('/rental').send(body),
      request(app.getHttpServer()).post('/rental').send(body),
    ]);

    const statuses = [res1.status, res2.status].sort();
    expect(statuses).toEqual([201, 400]);

    const furniture = await prisma.furniture.findUnique({
      where: { id: comboFurnitureId },
    });
    expect(furniture!.stock).toBe(0);

    const rentals = await prisma.rental.findMany();
    expect(rentals).toHaveLength(1);
  });

  it('single rental with sufficient stock succeeds and decrements', async () => {
    const res = await request(app.getHttpServer())
      .post('/rental')
      .send(rentalBody([{ furnitureId, quantity: 2 }]));

    expect(res.status).toBe(201);

    const furniture = await prisma.furniture.findUnique({
      where: { id: furnitureId },
    });
    expect(furniture!.stock).toBe(3);
  });

  it('rental with insufficient stock returns 400 with available detail', async () => {
    const res = await request(app.getHttpServer())
      .post('/rental')
      .send(rentalBody([{ furnitureId, quantity: 10 }]));

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Available: 5/);
  });

  it('combo with inactive furniture returns 400', async () => {
    await prisma.furniture.update({
      where: { id: comboFurnitureId },
      data: { isActive: false },
    });

    const res = await request(app.getHttpServer())
      .post('/rental')
      .send(rentalBody([{ comboId, quantity: 1 }]));

    expect(res.status).toBe(400);
  });
});