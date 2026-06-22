import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConflictException } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';

describe('SubscriptionsController', () => {
  const subscriptionsServiceMock = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    cancel: jest.fn(),
    change: jest.fn(),
  };

  let subscriptionsController: SubscriptionsController;
  let subscriptionsService: typeof subscriptionsServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionsController],
      providers: [
        { provide: SubscriptionsService, useValue: subscriptionsServiceMock },
        {
          provide: JwtService,
          useValue: {
            verifySync: jest.fn(),
          },
        },
      ],
    }).compile();

    subscriptionsController = module.get<SubscriptionsController>(
      SubscriptionsController,
    );
    subscriptionsService = module.get(SubscriptionsService);
  });

  describe('create', () => {
    it('should call subscriptionsService.create', async () => {
      const createSubscriptionFixture = {
        offerId: 'uuid1',
        userId: 'uuid2',
      };

      const expectedHydratedData = {
        status: 'ACTIVE',
        user: {
          connect: {
            id: createSubscriptionFixture.userId,
          },
        },
        offer: {
          connect: {
            id: createSubscriptionFixture.offerId,
          },
        },
      };
      subscriptionsService.findOneBy.mockResolvedValue(null);

      await subscriptionsController.create(createSubscriptionFixture);
      expect(subscriptionsService.create).toHaveBeenCalledWith(
        expectedHydratedData,
      );
    });

    it('should throw ConflictException if user already has an active subscription', async () => {
      const createSubscriptionDto = {
        offerId: 'uuid1',
        userId: 'uuid2',
      };

      subscriptionsService.findOneBy.mockResolvedValue({
        status: 'ACTIVE',
      });

      await expect(
        subscriptionsController.create(createSubscriptionDto),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('cancel', () => {
    it('should call subscriptionsService.cancel', async () => {
      const subscriptionId = 'uuid1';
      await subscriptionsController.cancel(subscriptionId);
      expect(subscriptionsService.cancel).toHaveBeenCalledWith(subscriptionId);
    });
  });

  describe('change', () => {
    it('should call subscriptionsService.change with subscriptionId and changeSubscriptionDto', async () => {
      const subscriptionId = 'uuid1';
      const changeSubscriptionDto = {
        offerId: 'uuid2',
      };
      await subscriptionsController.change(
        subscriptionId,
        changeSubscriptionDto,
      );
      expect(subscriptionsService.change).toHaveBeenCalledWith(
        subscriptionId,
        changeSubscriptionDto,
      );
    });
  });
});
