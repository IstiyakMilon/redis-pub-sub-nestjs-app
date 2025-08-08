
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisService } from './redis.service'; // Custom Redis service for direct Redis operations

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RedisService], // Provide the custom Redis service
})
export class AppModule {}
