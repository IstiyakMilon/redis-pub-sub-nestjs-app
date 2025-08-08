import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  onModuleInit() {
    // Initialize Redis client when the module starts
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });

    this.redisClient.on('connect', () => {
      console.log('Redis client connected successfully.');
    });

    this.redisClient.on('error', (err) => {
      console.error('Redis client error:', err);
    });
  }

  onModuleDestroy() {
    // Disconnect Redis client when the module is destroyed
    this.redisClient.disconnect();
    console.log('Redis client disconnected.');
  }

  /**
   * Sets a key-value pair in Redis with an optional expiration time.
   * @param key The key to set.
   * @param value The value to set.
   * @param ttlSeconds The time-to-live in seconds. If 0 or undefined, no expiration.
   */
  async set(key: string, value: string, ttlSeconds?: number): Promise<string | null> {
    if (ttlSeconds && ttlSeconds > 0) {
      return this.redisClient.set(key, value, 'EX', ttlSeconds);
    }
    return this.redisClient.set(key, value);
  }

  /**
   * Gets the value associated with a key from Redis.
   * @param key The key to retrieve.
   */
  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  /**
   * Deletes a key from Redis.
   * @param key The key to delete.
   */
  async del(key: string): Promise<number> {
    return this.redisClient.del(key);
  }
}