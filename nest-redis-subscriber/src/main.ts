
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'localhost', // Redis server host
        port: 6379,        // Redis server port
      },
    },
  );
  await app.listen();
  console.log('Subscriber Microservice is listening for Redis messages...');
}
bootstrap();
