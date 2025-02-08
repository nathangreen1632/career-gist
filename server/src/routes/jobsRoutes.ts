import express, { NextFunction, Request, Response, Router } from "express";
import { getCache, setCache, deleteCache, clearCache } from "../cache/redisCacheService.js";

const router: Router = express.Router();
const JSEARCH_API_URL = process.env.JSEARCH_API_URL;

router.get("/search", (req: Request, res: Response, next: NextFunction) => {
  (async function () {
    const query = req.query.q as string;
    const location = req.query.location as string;
    const cacheKey = `jobs:${query}`;

    try {
      const cachedData = await getCache(cacheKey);
      if (cachedData) {
        console.log("⚡ Serving from cache");
        return res.json(cachedData);
      }

      const response = await fetch(`${JSEARCH_API_URL}?description=${query}&location=${location}`);

      if (!response.ok) {
        console.warn("⚠️ GitHub Jobs API returned an error:", response.status);
        return res.status(response.status).json({
          message: "GitHub Jobs API is temporarily unavailable. Please try again later.",
          errorCode: response.status
        });
      }

      const data = await response.json();
      await setCache(cacheKey, data, 900);

      console.log("🌍 Fetched from API");
      return res.json(data);
    } catch (error) {
      console.error("❌ API Error:", error);
      return res.status(500).json({
        message: "An unexpected error occurred while fetching jobs.",
        errorDetails: error instanceof Error ? error.message : "Unknown error"
      });
    }
  })().catch(next);
});

router.delete("/clear-cache", async (req: Request, res: Response, next: NextFunction) => {
  const key = req.query.key as string;

  if (!key) {
    res.status(400).json({ error: "Cache key is required." });
    return;
  }

  try {
    await deleteCache(key);
    console.log(`🗑️ Deleted cache key: ${key}`);
    res.json({ message: `Cache entry '${key}' deleted.` });
  } catch (error) {
    console.error("❌ Error deleting cache:", error);
    next(error);
  }
});

router.delete("/clear-all-cache", async (_req: Request, res: Response) => {
  try {
    await clearCache();
    console.log("🧹 Cleared all Redis cache.");
    res.json({ message: "All cache cleared." });
  } catch (error) {
    console.error("❌ Error clearing cache:", error);
    res.status(500).json({ error: "❌ Failed to clear cache." });
  }
});

export default router;
