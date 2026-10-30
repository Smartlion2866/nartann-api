import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class HealthService {
  constructor(private readonly database: DatabaseService) {}

  checkDatabase(): Promise<number> {
    return this.database.checkConnection();
  }
}
