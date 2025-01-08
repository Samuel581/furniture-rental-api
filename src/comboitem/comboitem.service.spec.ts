import { Test, TestingModule } from '@nestjs/testing';
import { ComboitemService } from './comboitem.service';

describe('ComboitemService', () => {
  let service: ComboitemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComboitemService],
    }).compile();

    service = module.get<ComboitemService>(ComboitemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
