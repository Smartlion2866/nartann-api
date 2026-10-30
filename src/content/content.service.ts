// import { Injectable } from '@nestjs/common';
// import { RowDataPacket } from 'mysql2/promise';
// import { DatabaseService } from '../database/database.service';

// interface InicioRow extends RowDataPacket {
//   id: number;
//   titulo: string;
//   subtitulo: string | null;
//   descripcion: string | null;
//   imagen_url: string | null;
//   orden: number;
// }

// interface ServicioRow extends RowDataPacket {
//   id: number;
//   titulo: string;
//   descripcion: string | null;
//   icono: string | null;
//   orden: number;
// }

// interface PortafolioRow extends RowDataPacket {
//   id: number;
//   titulo: string;
//   descripcion: string | null;
//   imagen_url: string | null;
//   url_proyecto: string | null;
//   orden: number;
// }

// export interface InicioContenido {
//   id: number;
//   titulo: string;
//   subtitulo: string | null;
//   descripcion: string | null;
//   imagenUrl: string | null;
//   orden: number;
// }

// export interface ServicioContenido {
//   id: number;
//   titulo: string;
//   descripcion: string | null;
//   icono: string | null;
//   orden: number;
// }

// export interface PortafolioContenido {
//   id: number;
//   titulo: string;
//   descripcion: string | null;
//   imagenUrl: string | null;
//   urlProyecto: string | null;
//   orden: number;
// }

// export interface ContenidoRespuesta {
//   inicio: InicioContenido[];
//   servicios: ServicioContenido[];
//   portafolio: PortafolioContenido[];
// }

// @Injectable()
// export class ContentService {
//   constructor(private readonly database: DatabaseService) {}

//   async getInicio(): Promise<InicioContenido[]> {
//     try {
//       const rows = await this.database.queryRows<InicioRow>(
//         `SELECT id, titulo, subtitulo, descripcion, imagen_url, orden
//          FROM contenido_inicio
//          WHERE activo = 1
//          ORDER BY orden ASC, id ASC`,
//       );

//       return rows.map((row) => ({
//         id: row.id,
//         titulo: row.titulo,
//         subtitulo: row.subtitulo,
//         descripcion: row.descripcion,
//         imagenUrl: row.imagen_url,
//         orden: row.orden,
//       }));
//     } catch (err: unknown) {
//       console.error('[CRITICAL MYSQL ERROR - getInicio]:', JSON.stringify(err, null, 2));
//       console.error(err);
//       return [];
//     }
//   }

//   async getServicios(): Promise<ServicioContenido[]> {
//     try {
//       const rows = await this.database.queryRows<ServicioRow>(
//         `SELECT id, titulo, descripcion, icono, orden
//          FROM servicio
//          WHERE activo = 1
//          ORDER BY orden ASC, id ASC`,
//       );

//       return rows.map((row) => ({
//         id: row.id,
//         titulo: row.titulo,
//         descripcion: row.descripcion,
//         icono: row.icono,
//         orden: row.orden,
//       }));
//     } catch (err: unknown) {
//       console.error('[CRITICAL MYSQL ERROR - getServicios]:', JSON.stringify(err, null, 2));
//       console.error(err);
//       return [];
//     }
//   }

//   async getPortafolio(): Promise<PortafolioContenido[]> {
//     try {
//       const rows = await this.database.queryRows<PortafolioRow>(
//         `SELECT id, titulo, descripcion, imagen_url, url_proyecto, orden
//          FROM portafolio
//          WHERE activo = 1
//          ORDER BY orden ASC, id ASC`,
//       );

//       return rows.map((row) => ({
//         id: row.id,
//         titulo: row.titulo,
//         descripcion: row.descripcion,
//         imagenUrl: row.imagen_url,
//         urlProyecto: row.url_proyecto,
//         orden: row.orden,
//       }));
//     } catch (err: unknown) {
//       console.error('[CRITICAL MYSQL ERROR - getPortafolio]:', JSON.stringify(err, null, 2));
//       console.error(err);
//       return [];
//     }
//   }

//   async getContenido(): Promise<ContenidoRespuesta> {
//     const [inicio, servicios, portafolio] = await Promise.all([
//       this.getInicio(),
//       this.getServicios(),
//       this.getPortafolio(),
//     ]);

//     return { inicio, servicios, portafolio };
//   }
// }

import { Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2/promise';
import { DatabaseService } from '../database/database.service';

export interface ContenidoRespuesta {
  inicio: any[];
  servicios: any[];
  portafolio: any[];
}

@Injectable()
export class ContentService {
  constructor(private readonly database: DatabaseService) {}

  async getContenido(): Promise<ContenidoRespuesta> {
    try {
      // 1. Diagnóstico: Ver a qué base de datos estamos conectados exactamente
      const dbCheckResult = await this.database.queryRows<RowDataPacket>(
        `SELECT DATABASE() as current_db`,
      );
      const currentDb = dbCheckResult[0]?.current_db;
      console.log('>>> [DIAGNÓSTICO] Conectado a la BD:', currentDb);

      // 2. Inicializamos explícitamente con tipado any[] para evitar el error de 'never[]'
      let inicio: any[] = [];
      let servicios: any[] = [];
      let portafolio: any[] = [];

      try {
        inicio = await this.database.queryRows<RowDataPacket>(
          `SELECT * FROM contenido_inicio`,
        );
      } catch (e: any) {
        console.error('>>> Error al leer tabla "contenido_inicio":', e.message);
      }

      try {
        servicios = await this.database.queryRows<RowDataPacket>(
          `SELECT * FROM servicio`,
        );
      } catch (e: any) {
        console.error('>>> Error al leer tabla "servicio":', e.message);
      }

      try {
        portafolio = await this.database.queryRows<RowDataPacket>(
          `SELECT * FROM portafolio`,
        );
      } catch (e: any) {
        console.error('>>> Error al leer tabla "portafolio":', e.message);
      }

      console.log(`>>> [RESULTADOS] Encontrados -> Inicio: ${inicio.length}, Servicios: ${servicios.length}, Portafolio: ${portafolio.length}`);

      return { inicio, servicios, portafolio };
    } catch (error: any) {
      console.error('>>> [CRITICAL] Error general en getContenido:', error.message);
      return { inicio: [], servicios: [], portafolio: [] };
    }
  }
}