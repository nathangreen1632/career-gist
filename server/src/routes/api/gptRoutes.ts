import express, {Router, Request, Response, NextFunction} from 'express';
import { getCache, setCache } from '../../cache/redisCacheService.js';
import OpenAI from "openai";


const router: Router = express.Router();
const CAREER_GIST_API: string = process.env.CAREER_GIST_API ?? '';

// POST /generate - Get a GPT-4o response
router.post('/generate', (req: Request, res: Response, next: NextFunction) => {
  (async function () {
    const { jobTitle, description } = req.body;
    const cacheKey = `gpt:${jobTitle}, ${description}`;

    try {
      const cachedData: string | null = await getCache(cacheKey);
      if (cachedData) {
        console.log(`⚡️ Serving GPT-4o response from cache...`);
        return res.json({ success: true, result: cachedData });
      }
      const openai = new OpenAI({
        apiKey: CAREER_GIST_API
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "developer", content: "You are a person searching for a job." },
          {
            role: "user",
            content: `Summarize the job: ${jobTitle}\nDescription: ${description}`,
          },
        ],
        store: true,
      });

      const generatedText = completion.choices[0].message.content;

      await setCache(cacheKey, generatedText, 900);

      console.log("🌍 GPT response fetched from API");
      return res.json({ success: true, result: generatedText });

    } catch (error) {
      console.error("❌ GPT API Error:", error instanceof Error ? error.message : error);

      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request.",
        errorDetails: error instanceof Error ? error.message : "Unknown error"
      });
    }
  })().catch(next);
});

export default router;