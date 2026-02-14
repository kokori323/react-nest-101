import { Test, TestingModule } from '@nestjs/testing';
import { RegistrantsService } from './registrants.service';

describe('RegistrantsService', () => {
  let service: RegistrantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrantsService],
    }).compile();

    service = module.get<RegistrantsService>(RegistrantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
