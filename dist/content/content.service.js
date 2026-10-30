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
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ContentService = class ContentService {
    database;
    constructor(database) {
        this.database = database;
    }
    async getContenido() {
        try {
            const dbCheckResult = await this.database.queryRows(`SELECT DATABASE() as current_db`);
            const currentDb = dbCheckResult[0]?.current_db;
            console.log('>>> [DIAGNÓSTICO] Conectado a la BD:', currentDb);
            let inicio = [];
            let servicios = [];
            let portafolio = [];
            try {
                inicio = await this.database.queryRows(`SELECT * FROM contenido_inicio`);
            }
            catch (e) {
                console.error('>>> Error al leer tabla "contenido_inicio":', e.message);
            }
            try {
                servicios = await this.database.queryRows(`SELECT * FROM servicio`);
            }
            catch (e) {
                console.error('>>> Error al leer tabla "servicio":', e.message);
            }
            try {
                portafolio = await this.database.queryRows(`SELECT * FROM portafolio`);
            }
            catch (e) {
                console.error('>>> Error al leer tabla "portafolio":', e.message);
            }
            console.log(`>>> [RESULTADOS] Encontrados -> Inicio: ${inicio.length}, Servicios: ${servicios.length}, Portafolio: ${portafolio.length}`);
            return { inicio, servicios, portafolio };
        }
        catch (error) {
            console.error('>>> [CRITICAL] Error general en getContenido:', error.message);
            return { inicio: [], servicios: [], portafolio: [] };
        }
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ContentService);
//# sourceMappingURL=content.service.js.map