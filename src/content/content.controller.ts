import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('contenido')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  async getContenido() {
    try {
      return await this.contentService.getContenido();
    } catch {
      // No se devuelven detalles internos ni credenciales al cliente.
      throw new ServiceUnavailableException({
        status: 'error',
        message: 'No se pudo leer el contenido de la base de datos',
      });
    }
  }
}
