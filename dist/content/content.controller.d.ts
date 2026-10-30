import { ContentService } from './content.service';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    getContenido(): Promise<import("./content.service").ContenidoRespuesta>;
}
