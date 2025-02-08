import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new Redis({
  host: process.env.REDIS_HOST ?? '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD ?? '',
  tls: process.env.REDIS_TLS ? {} : undefined as any,
});

redisClient.on("connect", () : void => console.log("✅ Connected to Redis"));
redisClient.on("error", (err : Error) : void => console.error("❌ Redis error:", err));
redisClient.on("end", () : void => console.warn("⚠️ Redis connection closed"));
redisClient.on("reconnecting", (): void => console.log("🔄 Reconnecting to Redis..."));


export const setCache : (key : string, value : unknown, ttl?: number) => Promise<void> = async (key: string, value: unknown, ttl: number = 900) : Promise<void> => {
  try {
    const data = {
      timestamp: Date.now(),
      value
    };
    await redisClient.setex(key, ttl, JSON.stringify(data));
    console.log(`✅ Cached: ${key} (TTL: ${ttl}s)`);
  } catch (error) {
    console.error("❌ Error setting cache:", error);
  }
};

export const getCache : (key : string) => Promise<string | null> = async (key: string): Promise<string | null> => {
  try {
    const cachedData : string | null = await redisClient.get(key);
    if (!cachedData) return null;

    const parsedData = JSON.parse(cachedData);
    return parsedData.value;
  } catch (error) {
    console.error("❌ Redis is down! Falling back to PostgreSQL.");
    return null;
  }
};


export const deleteCache : (key : string) => Promise<void> = async (key: string) : Promise<void> => {
  try {
    await redisClient.del(key);
    console.log(`🗑️ Cache deleted: ${key}`);
  } catch (error) {
    console.error("❌ Error deleting cache:", error);
  }
};

export const clearCache : () => Promise<void> = async () : Promise<void> => {
  try {
    await redisClient.flushall();
    console.log("✅ Redis cache cleared!");
  } catch (error) {
    console.error("❌ Error clearing cache:", error);
  }
};
