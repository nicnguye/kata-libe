import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Subscription,
  Prisma,
  SubscriptionStatus,
} from 'src/generated/prisma/client';
import { ChangeSubscriptionDto } from './dto/change-subscription.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { OffersService } from '../offers/offers.service';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class SubscriptionsService {
  constructor(
    private prisma: PrismaService,
    private offersService: OffersService,
    private authService: AuthService,
  ) {}

  create(
    createSubscriptionDto: Prisma.SubscriptionCreateInput,
  ): Promise<Subscription> {
    return this.prisma.subscription.create({ data: createSubscriptionDto });
  }

  findOne(id: string): Promise<Subscription | null> {
    return this.prisma.subscription.findUnique({ where: { id } });
  }

  findOneBy(where: Prisma.SubscriptionWhereInput) {
    return this.prisma.subscription.findFirst({ where });
  }

  update(id: string, updateSubscriptionDto: Prisma.SubscriptionUpdateInput) {
    return this.prisma.subscription.update({
      where: { id },
      data: updateSubscriptionDto,
    });
  }

  cancel(id: string) {
    return this.prisma.subscription.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }

  change(id: string, changeSubscriptionDto: ChangeSubscriptionDto) {
    return this.prisma.subscription.update({
      where: { id },
      data: changeSubscriptionDto,
    });
  }

  async validateSubscriptionRules(userId: string, offerId: string) {
    const [activeSub, offer, user] = await Promise.all([
      this.findOneBy({ userId, status: 'ACTIVE' }),
      this.offersService.findOne(offerId),
      this.authService.getProfile(userId),
    ]);

    if (!offer) throw new NotFoundException('Offer not found');
    if (!user) throw new NotFoundException('User not found');
    if (activeSub) throw new ConflictException('Subscription already exists');

    // Règle : Première souscription
    const isFirstSubscription = !user.subscription.length;
    if (isFirstSubscription) {
      if (!offer.allowFirstSubscription) {
        throw new ConflictException('Offer does not allow first subscription');
      }
      return true;
    }

    if (!user.subscription.length && offer.allowFirstSubscription) {
      return true;
    }

    // Règle : Résouscription
    if (!offer.allowResubscription) {
      throw new ConflictException('Offer does not allow resubscription');
    }

    // Règle : Même offre
    const lastSub = user.subscription.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )[0];

    if (lastSub && lastSub.offerId === offer.id) {
      throw new ConflictException('User cannot resubscribe to the same offer');
    }

    return true;
  }

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    await this.validateSubscriptionRules(
      createSubscriptionDto.userId,
      createSubscriptionDto.offerId,
    );

    return this.create({
      status: SubscriptionStatus.ACTIVE,
      user: { connect: { id: createSubscriptionDto.userId } },
      offer: { connect: { id: createSubscriptionDto.offerId } },
    });
  }
}
