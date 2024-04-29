import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// docker-compose тоже указывается порт
const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('Service trying start on PORT ' + PORT);
  await app.listen(PORT);
}
bootstrap();
