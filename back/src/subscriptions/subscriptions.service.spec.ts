import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { OffersService } from 'src/offers/offers.service';
import { AuthService } from 'src/auth/auth.service';

describe('SubscriptionsService', () => {
  const prismaServiceMock = {
    subscription: {
      update: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  };
  const offersServiceMock = {
    findOne: jest.fn(),
  };

  const authServiceMock = {
    getProfile: jest.fn(),
  };

  let subscriptionsService: SubscriptionsService;
  let prismaService: typeof prismaServiceMock;
  let offersService: typeof offersServiceMock;
  let authService: typeof authServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionsService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
        {
          provide: OffersService,
          useValue: offersServiceMock,
        },
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    subscriptionsService =
      module.get<SubscriptionsService>(SubscriptionsService);
    prismaService = module.get(PrismaService);
    offersService = module.get(OffersService);
    authService = module.get(AuthService);
  });

  describe('cancel', () => {
    it('should call prismaService.subscription.update with the right args', async () => {
      const id = 'uuid1';
      await subscriptionsService.cancel(id);

      expect(prismaService.subscription.update).toHaveBeenCalledWith({
        where: { id },
        data: { status: 'CANCELLED' },
      });
    });
  });

  describe('validateSubscriptionRules', () => {
    it('should return true', async () => {
      const userId = 'uuid1';
      const offerId = 'uuid2';

      prismaService.subscription.findFirst.mockResolvedValue(null);
      offersService.findOne.mockResolvedValue({
        id: offerId,
        allowFirstSubscription: true,
      });
      authService.getProfile.mockResolvedValue({
        id: userId,
        subscription: [],
      });

      await subscriptionsService.validateSubscriptionRules(userId, offerId);

      expect(offersService.findOne).toHaveBeenCalledWith(offerId);
      expect(authService.getProfile).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException if offer not found', async () => {
      const userId = 'uuid1';
      const offerId = 'uuid2';

      prismaService.subscription.findFirst.mockResolvedValue(null);
      offersService.findOne.mockResolvedValue(null);
      authService.getProfile.mockResolvedValue({
        id: userId,
        subscription: [],
      });

      await expect(
        subscriptionsService.validateSubscriptionRules(userId, offerId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = 'uuid1';
      const offerId = 'uuid2';

      prismaService.subscription.findFirst.mockResolvedValue(null);
      offersService.findOne.mockResolvedValue({
        id: offerId,
        allowFirstSubscription: true,
      });
      authService.getProfile.mockResolvedValue(null);

      await expect(
        subscriptionsService.validateSubscriptionRules(userId, offerId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if user already has an active subscription', async () => {
      const userId = 'uuid1';
      const offerId = 'uuid2';

      prismaService.subscription.findFirst.mockResolvedValue({
        status: 'ACTIVE',
      });
      offersService.findOne.mockResolvedValue({
        id: offerId,
        allowFirstSubscription: true,
      });
      authService.getProfile.mockResolvedValue({
        id: userId,
        subscription: [],
      });

      await expect(
        subscriptionsService.validateSubscriptionRules(userId, offerId),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if offer does not allow first subscription', async () => {
      const userId = 'uuid1';
      const offerId = 'uuid2';

      prismaService.subscription.findFirst.mockResolvedValue(null);
      offersService.findOne.mockResolvedValue({
        id: offerId,
        allowFirstSubscription: false,
      });
      authService.getProfile.mockResolvedValue({
        id: userId,
        subscription: [],
      });

      await expect(
        subscriptionsService.validateSubscriptionRules(userId, offerId),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if offer does not allow resubscription', async () => {
      const userId = 'uuid1';
      const offerId = 'uuid2';

      prismaService.subscription.findFirst.mockResolvedValue(null);
      offersService.findOne.mockResolvedValue({
        allowResubscription: false,
      });
      authService.getProfile.mockResolvedValue({
        id: userId,
        subscription: [{ offerId: 'uuid3' }],
      });

      await expect(
        subscriptionsService.validateSubscriptionRules(userId, offerId),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if user resubscribes to the same offer', async () => {
      const userId = 'uuid1';
      const offerId = 'uuid2';

      prismaService.subscription.findFirst.mockResolvedValue(null);
      offersService.findOne.mockResolvedValue({
        id: offerId,
        allowResubscription: true,
      });
      authService.getProfile.mockResolvedValue({
        id: userId,
        subscription: [
          { offerId, updatedAt: 'July 20, 69 20:17:40 GMT+00:00' },
        ],
      });

      await expect(
        subscriptionsService.validateSubscriptionRules(userId, offerId),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('createSubscription', () => {
    it('should call prismaService.subscription.create with the right args', async () => {
      const createSubscriptionDto = {
        userId: 'uuid1',
        offerId: 'uuid2',
      };

      prismaService.subscription.findFirst.mockResolvedValue(null);
      offersService.findOne.mockResolvedValue({
        id: createSubscriptionDto.offerId,
        allowFirstSubscription: true,
      });
      authService.getProfile.mockResolvedValue({
        id: createSubscriptionDto.userId,
        subscription: [],
      });

      await subscriptionsService.createSubscription(createSubscriptionDto);

      expect(prismaService.subscription.create).toHaveBeenCalledWith({
        data: {
          status: 'ACTIVE',
          user: { connect: { id: createSubscriptionDto.userId } },
          offer: { connect: { id: createSubscriptionDto.offerId } },
        },
      });
    });
  });
});
