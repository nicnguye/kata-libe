import {
  Controller,
  Post,
  Body,
  Param,
  ConflictException,
  NotFoundException,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiHeader,
  ApiConflictResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionExistGuard } from './subscription.guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ChangeSubscriptionDto } from './dto/change-subscription.dto';
import { SubscriptionResponseDto } from './dto/subscription-response.dto';
import { OffersService } from '../offers/offers.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly offersService: OffersService,
  ) {}

  @ApiCreatedResponse({
    type: SubscriptionResponseDto,
    description: 'Returns the created subscription',
  })
  @ApiConflictResponse({
    description: 'Offer does not allow first subscription or resubscription',
  })
  @ApiNotFoundResponse({
    description: 'Offer or user not found',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<SubscriptionResponseDto> {
    return this.subscriptionsService.createSubscription(createSubscriptionDto);
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
  @ApiConflictResponse({
    description: 'Offer does not allow upgrade',
  })
  @ApiNotFoundResponse({
    description: 'Offer not found',
  })
  @UseGuards(AuthGuard, SubscriptionExistGuard)
  @HttpCode(HttpStatus.OK)
  @Post(':id/change')
  async change(
    @Param('id') id: string,
    @Body() changeSubscriptionDto: ChangeSubscriptionDto,
  ): Promise<SubscriptionResponseDto> {
    const offer = await this.offersService.findOne(
      changeSubscriptionDto.offerId,
    );
    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    if (!offer.allowUpgrade) {
      throw new ConflictException('Offer does not allow upgrade');
    }
    return this.subscriptionsService.change(id, changeSubscriptionDto);
  }
}
