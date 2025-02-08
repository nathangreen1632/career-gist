import express, { Request, Response, Router } from "express";
import { getCache, setCache, deleteCache } from "../cache/redisCacheService.js";

const router: Router = express.Router();

router.post("/add", async (req: Request, res: Response, next: Function): Promise<void> => {
  const { userId, jobId, jobData } = req.body;
  const cacheKey = `favorites:${userId}`;

  try {
    let favorites: { jobId: unknown; [key: string]: unknown }[] = JSON.parse(await getCache(cacheKey) ?? '[]');

    favorites.push({ jobId, ...jobData });

    await setCache(cacheKey, favorites, 900);

    res.json({ message: "✅ JobModel added to favorites", favorites });
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req: Request, res: Response, next: Function): Promise<void> => {
  const { userId } = req.params;
  const cacheKey = `favorites:${userId}`;

  try {
    const favorites: { jobId: unknown; [key: string]: unknown }[] = JSON.parse(await getCache(cacheKey) ?? '[]');
    res.json(favorites);
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId", async (req: Request, res: Response, next: Function): Promise<void> => {
  const { userId } = req.params;
  const cacheKey = `favorites:${userId}`;

  try {
    await deleteCache(cacheKey);
    res.json({ message: "😭 All favorites removed for user", userId });
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId/:jobId", async (req: Request, res: Response, next: Function): Promise<void> => {
  const { userId, jobId } = req.params;
  const cacheKey = `favorites:${userId}`;

  try {
    let favorites: { jobId: unknown; [key: string]: unknown }[] = JSON.parse(await getCache(cacheKey) ?? '[]');
    if (favorites.length === 0) {
      res.json({ message: "🤔 No favorites found" });
      return;
    }

    favorites = favorites.filter((job: { jobId: unknown }) : boolean => job.jobId !== jobId);

    if (favorites.length === 0) {
      await deleteCache(cacheKey);
    } else {
      await setCache(cacheKey, favorites, 900);
    }

    res.json({ message: `👋🏻 Job ${jobId} removed from favorites`, favorites });
  } catch (error) {
    next(error);
  }
});

router.use((err: Error, _req: Request, res: Response, _next: Function) => {
  console.error("❌ Error:", err);
  res.status(500).json({ error: "❌ Internal Server Error", err: err.message });
});

export default router;