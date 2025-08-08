
import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { RedisService } from './redis.service'; // Import the custom Redis service

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService, // Inject the custom Redis service
  ) {}

  // This method listens for messages on the 'my-channel' Redis channel
  @MessagePattern('my-channel')
  async handleMessage(@Payload() message: string) {
    console.log(`Received message from 'my-channel': "${message}"`);

    // Option 1: Just console log the message (already done above)

    // Option 2: Save the message to Redis cache with a retention period (60 seconds)
    const cacheKey = `message:${Date.now()}`; // Unique key for each message
    const retentionPeriodSeconds = 600; // Message will expire after 60 seconds

    await this.redisService.set(cacheKey, message, retentionPeriodSeconds);
    console.log(`Message "${message}" saved to Redis cache with key "${cacheKey}" for ${retentionPeriodSeconds} seconds.`);
  }

  @Get("test")
  getHello(): string {
    return this.appService.getHello();
  }
}
