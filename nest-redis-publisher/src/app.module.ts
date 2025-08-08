
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS_PUBLISHER', // Unique name for the Redis client
        transport: Transport.REDIS,
        options: {
          host: 'localhost', // Redis server host
          port: 6379,        // Redis server port
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}