import { Test, TestingModule } from '@nestjs/testing';
import { RegistrantsController } from './registrants.controller';
import { RegistrantsService } from './registrants.service';

describe('RegistrantsController', () => {
  let controller: RegistrantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrantsController],
      providers: [RegistrantsService],
    }).compile();

    controller = module.get<RegistrantsController>(RegistrantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
