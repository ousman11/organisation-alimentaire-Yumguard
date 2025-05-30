import { Test, TestingModule } from '@nestjs/testing';
import { InventaireController } from './inventaire.controller';

describe('InventaireController', () => {
  let controller: InventaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventaireController],
    }).compile();

    controller = module.get<InventaireController>(InventaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
