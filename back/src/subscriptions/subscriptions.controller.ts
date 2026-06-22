import {
  Controller,
  Post,
  Body,
  Param,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionExistGuard } from './subscription.guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ChangeSubscriptionDto } from './dto/change-subscription.dto';
import { SubscriptionResponseDto } from './dto/subscription-response.dto';
import { SubscriptionStatus } from 'src/generated/prisma/client';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @ApiOkResponse({ type: SubscriptionResponseDto })
  @Post()
  async create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<SubscriptionResponseDto> {
    const subscription = await this.subscriptionsService.findOneBy({
      userId: createSubscriptionDto.userId,
      status: 'ACTIVE',
    });

    // check if user already has an active subscription
    if (subscription) {
      throw new ConflictException('Subscription already exists');
    }

    const data = {
      status: SubscriptionStatus.ACTIVE,
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

  @ApiOkResponse({ type: SubscriptionResponseDto })
  @UseGuards(AuthGuard)
  @Post(':id/cancel')
  @UseGuards(SubscriptionExistGuard)
  async cancel(@Param('id') id: string): Promise<SubscriptionResponseDto> {
    return this.subscriptionsService.cancel(id);
  }

  @ApiOkResponse({ type: SubscriptionResponseDto })
  @UseGuards(AuthGuard)
  @Post(':id/change')
  @UseGuards(SubscriptionExistGuard)
  async change(
    @Param('id') id: string,
    @Body() changeSubscriptionDto: ChangeSubscriptionDto,
  ): Promise<SubscriptionResponseDto> {
    return this.subscriptionsService.change(id, changeSubscriptionDto);
  }
}
