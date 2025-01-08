import { Test, TestingModule } from '@nestjs/testing';
import { ComboitemController } from './comboitem.controller';
import { ComboitemService } from './comboitem.service';

describe('ComboitemController', () => {
  let controller: ComboitemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComboitemController],
      providers: [ComboitemService],
    }).compile();

    controller = module.get<ComboitemController>(ComboitemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
