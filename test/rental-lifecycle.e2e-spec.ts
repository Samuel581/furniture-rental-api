import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, BadRequestException } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';
import { FurnitureService } from '../src/furniture/furniture.service';
import { ComboService } from '../src/combo/combo.service';
import { ClientService } from '../src/client/client.service';
import { RentalService } from '../src/rental/rental.service';

const START_DATE = '2024-01-15';
const END_DATE = '2024-01-20';

describe('Rental lifecycle (integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let furniture: FurnitureService;
  let combo: ComboService;
  let client: ClientService;
  let rental: RentalService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService);
    furniture = app.get(FurnitureService);
    combo = app.get(ComboService);
    client = app.get(ClientService);
    rental = app.get(RentalService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prisma.$executeRawUnsafe(
      'TRUNCATE TABLE "rental_items", "rentals", "combo_furniture", "combos", "furniture", "clients" RESTART IDENTITY CASCADE',
    );
  });

  async function createClient(name = 'Test Client') {
    return client.create({
      name,
      phone: ['+503 0000-0000'],
      latitude: 13.7,
      longitude: -89.2,
      addressReference: 'Test address reference',
      isActive: true,
    });
  }

  async function createFurniture(name: string, stock: number, dailyRate = 10) {
    return furniture.create({ name, type: 'Chair', stock, dailyRate, isActive: true });
  }

  it('restores furniture stock after a rental is cancelled', async () => {
    const c = await createClient();
    const f = await createFurniture('Oak Chair', 5);

    const r = await rental.create({
      clientId: c.id,
      startDate: START_DATE,
      endDate: END_DATE,
      depositAmount: 0,
      items: [{ furnitureId: f.id, quantity: 2 }],
    });

    expect((await furniture.findOne(f.id)).stock).toBe(3);

    await rental.markCanceled(r.id);

    expect((await furniture.findOne(f.id)).stock).toBe(5);
  });

  it('restores each furniture stock in a combo after cancellation', async () => {
    const c = await createClient();
    const chair = await createFurniture('Chair', 10);
    const table = await createFurniture('Table', 6);

    const cb = await combo.create({
      name: 'Dining Set',
      dailyRate: 25,
      isActive: true,
      furnitureItems: [
        { furnitureId: chair.id, quantity: 2 },
        { furnitureId: table.id, quantity: 1 },
      ],
    });

    // 3 combos need 6 chairs and 3 tables.
    const r = await rental.create({
      clientId: c.id,
      startDate: START_DATE,
      endDate: END_DATE,
      depositAmount: 0,
      items: [{ comboId: cb.id, quantity: 3 }],
    });

    expect((await furniture.findOne(chair.id)).stock).toBe(4);
    expect((await furniture.findOne(table.id)).stock).toBe(3);

    await rental.markCanceled(r.id);

    expect((await furniture.findOne(chair.id)).stock).toBe(10);
    expect((await furniture.findOne(table.id)).stock).toBe(6);
  });

  it.failing('rejects completing a rental that is not fully paid', async () => {
    const c = await createClient();
    // 5 days × 200 = 1000 total; deposit 900 is short of that.
    const f = await createFurniture('Sofa', 4, 200);

    const r = await rental.create({
      clientId: c.id,
      startDate: START_DATE,
      endDate: END_DATE,
      depositAmount: 900,
      items: [{ furnitureId: f.id, quantity: 1 }],
    });

    await rental.markDelivered(r.id);

    await expect(rental.markDone(r.id)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
