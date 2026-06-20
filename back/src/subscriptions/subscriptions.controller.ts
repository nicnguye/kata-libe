import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { Subscription } from 'generated/prisma/client';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionExistGuard } from './subscription.guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const subscription = await this.subscriptionsService.findOneBy({
      userId: createSubscriptionDto.userId,
      status: 'ACTIVE',
    });

    // check if user already has an active subscription
    if (subscription) {
      throw new ConflictException('Subscription already exists');
    }

    const data = {
      status: createSubscriptionDto.status,
      user: {
        connect: {
          id: createSubscriptionDto.userId,
        },
      },
      offer: {
        connect: {
          id: createSubscriptionDto.offerId,
        },
      },
    };
    return this.subscriptionsService.create(data);
  }

  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const subscription = await this.subscriptionsService.findOne(id);
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }
    return subscription;
  }

  @Patch(':id')
  @UseGuards(SubscriptionExistGuard)
  async update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionsService.update(id, updateSubscriptionDto);
  }

  @Delete(':id')
  @UseGuards(SubscriptionExistGuard)
  async remove(@Param('id') id: string) {
    return this.subscriptionsService.remove(id);
  }
}
