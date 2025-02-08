import rateLimit, {RateLimitRequestHandler} from 'express-rate-limit';
import RedisStore, {RedisReply} from 'rate-limit-redis';
import Redis from 'ioredis';
import { Request, Response, NextFunction } from 'express';

const redisClient = new Redis({
  host: '127.0.0.1',
  port: 6379,
  enableOfflineQueue: true,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

const limiter : RateLimitRequestHandler = rateLimit({
  store: new RedisStore({
    sendCommand: (command: string, ...args: string[])  : Promise<RedisReply> => redisClient.call(command, ...args) as Promise<RedisReply>,
    prefix: 'rate-limit:',
  }),
  windowMs: 60 * 60 * 1000,
  limit: 10,
  message: { error: '❌ Rate limit exceeded. Try again in an hour.' },
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  keyGenerator: (req: Request) => req.ip ?? 'default',
  handler: (_req: Request, res: Response, _next: NextFunction) => {
    res.status(429).json({ error: '❌ Rate limit exceeded. Please try again in an hour.' });
  },
});

export default limiter;
