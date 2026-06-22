import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

describe('OffersController', () => {
  const offersServiceMock = {
    findOne: jest.fn(),
  };
  let offersController: OffersController;
  let offersService: typeof offersServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [
        {
          provide: OffersService,
          useValue: offersServiceMock,
        },
      ],
    }).compile();

    offersController = module.get<OffersController>(OffersController);
    offersService = module.get(OffersService);
  });

  describe('findOne', () => {
    it('should call offersService.findOne', async () => {
      const id = '1';
      offersService.findOne.mockResolvedValueOnce({ id: '1' });
      const result = await offersController.findOne(id);

      expect(offersService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual({ id: '1' });
    });

    it('should throw NotFoundException if offer is not found', async () => {
      const id = '1';
      offersService.findOne.mockResolvedValue(null);

      await expect(offersController.findOne(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
