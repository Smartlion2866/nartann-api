import { OnModuleDestroy } from '@nestjs/common';
import { RowDataPacket } from 'mysql2/promise';
export declare class DatabaseService implements OnModuleDestroy {
    private readonly pool;
    constructor();
    queryRows<T extends RowDataPacket>(sql: string): Promise<T[]>;
    checkConnection(): Promise<number>;
    onModuleDestroy(): Promise<void>;
}
