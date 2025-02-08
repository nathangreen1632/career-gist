import { deleteCache } from "./redisCacheService";
import Redis from "ioredis";

const redisClient = new Redis();

const cleanupExpiredJobs : () => Promise<void> = async () : Promise<void> => {
  console.log("🧹 Running Redis cache cleanup...");

  try {
    const keys : string[] = await redisClient.keys("job-search:*");

    for (const key of keys) {
      const jobData : string | null = await redisClient.get(key);
      if (!jobData) continue;

      const parsedData = JSON.parse(jobData);
      const age : number = (Date.now() - parsedData.timestamp) / 1000;

      if (age > 3600) {
        console.log(`🗑️ Removing expired cache: ${key}`);
        await deleteCache(key);
      }
    }

    console.log("✅ Cache cleanup complete.");
  } catch (error) {
    console.error("❌ Error during cache cleanup:", error);
  }
};

setInterval(cleanupExpiredJobs, 30 * 60 * 1000);
