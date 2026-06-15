import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
