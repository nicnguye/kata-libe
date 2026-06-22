import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

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
          'basic check',
          `http://localhost:${process.env.PORT}`,
        ),
    ]);
  }

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
