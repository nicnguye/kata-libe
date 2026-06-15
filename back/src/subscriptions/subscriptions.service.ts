import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Subscription, Prisma } from 'generated/prisma/client';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  create(
    createSubscriptionDto: Prisma.SubscriptionCreateInput,
  ): Promise<Subscription> {
    return this.prisma.subscription.create({ data: createSubscriptionDto });
  }

  findAll() {
    return this.prisma.subscription.findMany();
  }

  findOne(id: string) {
    return this.prisma.subscription.findUnique({ where: { id } });
  }

  update(id: string, updateSubscriptionDto: Prisma.SubscriptionUpdateInput) {
    return this.prisma.subscription.update({
      where: { id },
      data: updateSubscriptionDto,
    });
  }

  remove(id: string) {
    return this.prisma.subscription.delete({ where: { id } });
  }
}
