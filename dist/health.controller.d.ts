import { HealthService } from './health.service';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    getHealth(): {
        status: string;
        service: string;
    };
    getDatabaseHealth(): Promise<{
        status: string;
        database: string;
        check: number;
    }>;
}
