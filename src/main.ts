import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// docker-compose тоже указывается порт
const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  console.log('Service trying start on PORT ' + PORT);
  await app.listen(PORT);
}
bootstrap();
