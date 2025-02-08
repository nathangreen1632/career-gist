import { setCache, getCache } from "../cache/redisCacheService.js";
import JobModel from "../models/JobModel.js";

const JSEARCH_API_URL : string = process.env.JSEARCH_API_URL ?? "";
const RAPIDAPI_HOST : string = process.env.RAPIDAPI_HOST ?? "";
const RAPIDAPI_KEY : string = process.env.RAPIDAPI_KEY ?? "";

export const fetchJobs = async (query: string): Promise<any> => {
  const cacheKey = `job-search:${query}`;

  try {
    const cachedJobs: string | null = await getCache(cacheKey);
    if (cachedJobs) {
      console.log("📌 Serving jobs from cache...");
      return JSON.parse(cachedJobs);
    }

    console.log("🔍 Fetching jobs from JSearch API...");
    const response = await fetch(`${JSEARCH_API_URL}?query=${query}&num_pages=2`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": RAPIDAPI_HOST,
        "X-RapidAPI-Key": RAPIDAPI_KEY,
      },
    });

    if (!response.ok) {
      console.warn("⚠️ JSearch API returned an error:", response.status);
      return {
        message: "JSearch API is currently unavailable. Please try again later.",
        fallback: true,
      };
    }

    const data = await response.json();
    console.log("✅ Fetched jobs successfully. Caching results...");
    await setCache(cacheKey, JSON.stringify(data), 900);

    let existingJob = await JobModel.findOne({ where: { query } });

    if (existingJob) {
      await existingJob.update({ results: JSON.stringify(data) });
    } else {
      await JobModel.create({ query, results: JSON.stringify(data) });
    }
    return data;
  } catch (error) {
    console.error("❌ JSearch API failed:", error instanceof Error ? error.message : error);
    return { message: "Error fetching jobs. Please try again later." };
  }
};
