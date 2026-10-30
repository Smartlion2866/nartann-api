import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth() {
    return { status: 'ok', service: 'nestjs-api' };
  }

  @Get('db')
  async getDatabaseHealth() {
    try {
      const check = await this.healthService.checkDatabase();
      return { status: 'ok', database: 'mysql', check };
    } catch {
      // Avoid returning connection details or secrets to callers.
      throw new ServiceUnavailableException({
        status: 'error',
        database: 'mysql',
        message: 'Database health check failed',
      });
    }
  }
}
