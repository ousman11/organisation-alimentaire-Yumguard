import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Autorise les requêtes depuis n'importe quelle origine (CORS)
  app.enableCors();

  // Utilise le port fourni par Railway (ou 4000 en local)
  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`🚀 Server is running on http://localhost:${port}`);
}

bootstrap();
