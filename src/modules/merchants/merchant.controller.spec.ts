import { Test, TestingModule } from '@nestjs/testing';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';

describe('MerchantController', () => {
  let controller: MerchantController;
  let merchantServiceMock: Partial<MerchantService>;

  beforeEach(async () => {
    merchantServiceMock = {
      getAllMerchants: jest.fn().mockResolvedValue([
        { _id: '1', name: 'Merchant 1', email: 'merchant1@example.com' },
        { _id: '2', name: 'Merchant 2', email: 'merchant2@example.com' },
      ]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchantController],
      providers: [{ provide: MerchantService, useValue: merchantServiceMock }],
    }).compile();

    controller = module.get<MerchantController>(MerchantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllMerchants', () => {
    it('should return all merchants', async () => {
      const merchants = await controller.getAllMerchants();
      expect(merchants).toHaveLength(2);
      expect(merchants[0]).toHaveProperty('_id', '1');
      expect(merchants[0]).toHaveProperty('name', 'Merchant 1');
      expect(merchants[0]).toHaveProperty('email', 'merchant1@example.com');
      expect(merchants[1]).toHaveProperty('_id', '2');
      expect(merchants[1]).toHaveProperty('name', 'Merchant 2');
      expect(merchants[1]).toHaveProperty('email', 'merchant2@example.com');
    });
  });
});
