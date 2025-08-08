import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
  // await app.listen(process.env.PORT ?? 3001);
  console.log('Publisher Application is running on: http://localhost:3001');
}
bootstrap();
