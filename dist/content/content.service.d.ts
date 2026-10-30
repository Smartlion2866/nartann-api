import { DatabaseService } from '../database/database.service';
export interface ContenidoRespuesta {
    inicio: any[];
    servicios: any[];
    portafolio: any[];
}
export declare class ContentService {
    private readonly database;
    constructor(database: DatabaseService);
    getContenido(): Promise<ContenidoRespuesta>;
}
