import fetch, { Response } from "node-fetch";

const CAREER_GIST_URL: string = process.env.CAREER_GIST_URL ?? "";
const CAREER_GIST_API: string = process.env.CAREER_GIST_API ?? "";

export const generateEnhancedJobData = async (jobData: any) => {
  try {
    const jobs = Array.isArray(jobData)
      ? jobData
      : jobData.jobs || jobData.listings || Object.values(jobData);

    if (!Array.isArray(jobs) || jobs.length === 0) {
      throw new Error("Job data format is incorrect or empty.");
    }

    const MAX_JOBS = 5;
    const limitedJobs = jobs.slice(0, MAX_JOBS);

    const prompt = `You are an API that returns JSON. 
Format your response as a **valid JSON array** of job objects without any markdown formatting, text explanations, or backticks. 
Here is the job data that needs summarization and enhancement:

${JSON.stringify(limitedJobs, null, 2)}

The JSON structure must follow this format and order:
[
  {
    "title": "Job Title",
    "job_publisher": "If available",
    "company": "Company Name",
    "location": "City, State, Country",
    "salary": "If available",
    "employment_type": "If available",
    "job_is_remote": "If available",
    "job_description": "Give a detailed, but concise, job description that is **500 words or less**",
    "responsibilities": "Give a detailed, but concise, job description that is **250 words or less**",
    "qualifications": "List of qualifications",
    "benefits": ["Benefit 1", "Benefit 2", "Benefit 3"],
    "url": "URL to the job posting",
    "job_posted_at": "If available",
  }
]

Ensure there is no additional formatting, explanations, or surrounding text. Return **ONLY** a valid JSON array.`;

    const response: Response = await fetch(CAREER_GIST_URL ?? "", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CAREER_GIST_API}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (!data.choices[0]?.message?.content || !data.choices) {
      return [];
    } try {
      return JSON.parse(data.choices[0].message.content);
    } catch {
      return [];
    }
  } catch {
    return [];
  }
};
