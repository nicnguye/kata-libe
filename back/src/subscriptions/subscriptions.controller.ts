import {
  Controller,
  Post,
  Body,
  Param,
  ConflictException,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiHeader,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionExistGuard } from './subscription.guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ChangeSubscriptionDto } from './dto/change-subscription.dto';
import { SubscriptionResponseDto } from './dto/subscription-response.dto';
import { SubscriptionStatus } from '../generated/prisma/client';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @ApiCreatedResponse({
    type: SubscriptionResponseDto,
    description: 'Returns the created subscription',
  })
  @ApiConflictResponse({
    description: 'Subscription already exists',
  })
  @HttpCode(HttpStatus.CREATED)
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

  @ApiOkResponse({
    type: SubscriptionResponseDto,
    description: 'Returns the cancelled subscription',
  })
  @ApiHeader({
    name: 'Authorization',
    description: "Bearer token d'authentification",
    required: true,
  })
  @UseGuards(AuthGuard, SubscriptionExistGuard)
  @HttpCode(HttpStatus.OK)
  @Post(':id/cancel')
  async cancel(@Param('id') id: string): Promise<SubscriptionResponseDto> {
    return this.subscriptionsService.cancel(id);
  }

  @ApiOkResponse({
    type: SubscriptionResponseDto,
    description: 'Returns the updated subscription',
  })
  @ApiHeader({
    name: 'Authorization',
    description: "Bearer token d'authentification",
    required: true,
  })
  @UseGuards(AuthGuard, SubscriptionExistGuard)
  @HttpCode(HttpStatus.OK)
  @Post(':id/change')
  async change(
    @Param('id') id: string,
    @Body() changeSubscriptionDto: ChangeSubscriptionDto,
  ): Promise<SubscriptionResponseDto> {
    return this.subscriptionsService.change(id, changeSubscriptionDto);
  }
}
