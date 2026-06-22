import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { AppResponseDto } from './app-response.dto';

@Controller()
export class AppController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
  ) {}

  @Get('health')
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'kata libe',
          `http://localhost:${process.env.PORT}`,
        ),
    ]);
  }

  @ApiOkResponse({ type: AppResponseDto, description: 'Returns app info' })
  @Get()
  getInfo() {
    return {
      name: 'API',
      version: '1.0',
      docs: '/api',
      health: '/health',
    };
  }
}
