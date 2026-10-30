import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ContentModule } from './content/content.module';
import { DatabaseModule } from './database/database.module';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)'], // <--- Esto es obligatorio para que las rutas /api vayan al backend y no busquen una página HTML
    }),
    DatabaseModule,
    ContentModule,
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}