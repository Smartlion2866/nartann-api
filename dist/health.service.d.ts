import { DatabaseService } from './database/database.service';
export declare class HealthService {
    private readonly database;
    constructor(database: DatabaseService);
    checkDatabase(): Promise<number>;
}
