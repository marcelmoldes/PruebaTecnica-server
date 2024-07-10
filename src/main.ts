import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Permitir cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Permitir cualquier método
    allowedHeaders: '*', // Permitir cualquier cabecera
    credentials: true, // Permitir el uso de cookies y credenciales
  });
  await app.listen(3030);
}
bootstrap();
