import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsService } from './subscriptions.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('SubscriptionsService', () => {
  const prismaServiceMock = {
    subscription: {
      update: jest.fn(),
    },
  };
  let subscriptionsService: SubscriptionsService;
  let prismaService: typeof prismaServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionsService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    subscriptionsService =
      module.get<SubscriptionsService>(SubscriptionsService);
    prismaService = module.get(PrismaService);
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
});
