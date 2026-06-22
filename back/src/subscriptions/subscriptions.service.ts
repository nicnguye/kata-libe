import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Subscription, Prisma } from 'src/generated/prisma/client';
import { ChangeSubscriptionDto } from './dto/change-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

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
}
