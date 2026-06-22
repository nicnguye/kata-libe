import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './prisma/prisma.module';
import { OffersModule } from './offers/offers.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TerminusModule,
    HttpModule,
    PrismaModule,
    OffersModule,
    UsersModule,
    SubscriptionsModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
