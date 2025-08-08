
import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('REDIS_PUBLISHER') private readonly client: ClientProxy, // Inject the Redis client
  ) {}

  @Post('publish')
  async publishMessage(@Body() payload: { message: string }) {
    console.log(`Publishing message: "${payload.message}" to Redis channel 'my-channel'`);
    // Publish the message to the 'my-channel' Redis channel
    this.client.emit('my-channel', payload.message);
    return { status: 'Message published', message: payload.message };
  }

  @Get('test')
  getHello(): string {
    return this.appService.getHello();
  }
}