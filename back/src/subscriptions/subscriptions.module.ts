import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { OffersService } from 'src/offers/offers.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, OffersService, AuthService],
})
export class SubscriptionsModule {}
