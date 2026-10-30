"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const mysql = require("mysql2/promise");
let DatabaseService = class DatabaseService {
    pool;
    constructor() {
        const user = process.env.DB_USER;
        const database = process.env.DB_NAME;
        if (!user || !database) {
            throw new Error('Configuración de base de datos incompleta: define DB_USER y DB_NAME en el archivo .env');
        }
        this.pool = mysql.createPool({
            host: process.env.DB_HOST || '127.0.0.1',
            port: Number(process.env.DB_PORT || 3306),
            user,
            password: process.env.DB_PASSWORD ?? '',
            database,
            waitForConnections: true,
            connectionLimit: 3,
            queueLimit: 0,
            connectTimeout: 5000,
        });
    }
    async queryRows(sql) {
        const [rows] = await this.pool.query(sql);
        return rows;
    }
    async checkConnection() {
        const rows = await this.queryRows('SELECT 1 AS `check`');
        return Number(rows[0]?.check);
    }
    async onModuleDestroy() {
        await this.pool.end();
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DatabaseService);
//# sourceMappingURL=database.service.js.map