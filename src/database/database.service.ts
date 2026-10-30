import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { Pool, RowDataPacket } from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool: Pool;

  constructor() {
    const user = process.env.DB_USER;
    const database = process.env.DB_NAME;

    if (!user || !database) {
      // Fail fast with a clear message that does not include credentials.
      throw new Error(
        'Configuración de base de datos incompleta: define DB_USER y DB_NAME en el archivo .env',
      );
    }

    this.pool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT || 3306),
      user,
      // Nunca se define una contraseña por defecto en el código.
      password: process.env.DB_PASSWORD ?? '',
      database,
      waitForConnections: true,
      connectionLimit: 3,
      queueLimit: 0,
      connectTimeout: 5000,
    });
  }

  async queryRows<T extends RowDataPacket>(sql: string): Promise<T[]> {
    const [rows] = await this.pool.query<RowDataPacket[]>(sql);
    return rows as T[];
  }

  async checkConnection(): Promise<number> {
    const rows = await this.queryRows<RowDataPacket>('SELECT 1 AS `check`');
    return Number(rows[0]?.check);
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
