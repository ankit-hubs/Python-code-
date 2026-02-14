import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

export const openai = apiKey ? new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: apiKey,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "SiteScope AI",
  }
}) : null;

export async function analyzeWebsite(data: any) {
  if (!openai) {
    console.warn("[OpenAI] API Key missing. Returning mock data.");
    return getMockAnalysis();
  }

  const models = [
    "google/gemini-2.0-flash-lite-preview-02-05",
    "google/gemini-2.0-flash-exp",
    "meta-llama/llama-3.1-8b-instruct",
    "deepseek/deepseek-chat"
  ];

  let lastError = null;

  for (const model of models) {
    try {
      console.log(`[OpenRouter] Attempting analysis with ${model}...`);
        const response = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: "system",
            content: `You are the world's most advanced AI Website Strategist and Technical Auditor. 
            You are analyzing "Big Data" extracted from a website, including full metadata, semantic structure, script behaviors, design patterns, and conversion funnels.
            
            Your goal is to provide a hyper-accurate, high-conviction audit that feels like it was written by a team of elite designers, engineers, and marketers.
            
            Return a comprehensive report in strict JSON format.
            
            The JSON must follow this exact structure:
            {
              "overallRating": number (1-10),
              "scores": {
                "design": number (1-10),
                "performance": number (1-10),
                "seo": number (1-10),
                "accessibility": number (1-10),
                "conversion": number (1-10)
              },
              "pros": string[],
              "cons": string[],
              "mistakes": string[],
              "technicalDeepDive": {
                "architecture": string,
                "potentialBottlenecks": string[],
                "modernityScore": number
              },
              "improvements": [
                { "priority": "High" | "Medium" | "Low", "task": string, "reason": string, "impact": string }
              ],
              "personas": [
                { "name": "Venture Capitalist", "feedback": string, "investmentReady": boolean },
                { "name": "Power User", "feedback": string, "frustrationLevel": number },
                { "name": "First-time Visitor", "feedback": string, "clarityScore": number }
              ],
              "founderSummary": string,
              "startupReadinessScore": number (0-100),
              "quickWins": string[],
              "longTermRoadmap": string[]
            }`
          },
          {
            role: "user",
            content: `Analyze this Big Data dump for the website: ${JSON.stringify(data)}`
          }
        ],
      });

      const content = response.choices[0].message.content || "{}";
      
      // Attempt to extract JSON if the model included conversational text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : content;
      
      try {
        return JSON.parse(jsonString);
      } catch (e) {
        // One last attempt: clean common markdown markers
        const cleaned = jsonString.replace(/```json\n?|\n?```/g, "").trim();
        return JSON.parse(cleaned);
      }
    } catch (error: any) {
      console.error(`[OpenRouter] Error with model ${model}:`, error.message);
      lastError = error;
      continue; // Try next model
    }
  }

  throw lastError || new Error("All models failed");
}

function getMockAnalysis() {
  return {
    overallRating: 8.5,
    scores: {
      design: 8,
      performance: 7,
      seo: 9,
      accessibility: 8,
      conversion: 7
    },
    pros: ["Clean layout", "Fast initial load", "Mobile responsive"],
    cons: ["Low contrast in footer", "Missing alt tags on some images", "Vague CTA"],
    mistakes: ["Multiple H1 tags", "Non-descriptive link text"],
    improvements: [
      { priority: "High", task: "Improve CTA visibility" },
      { priority: "Medium", task: "Add aria-labels to buttons" }
    ],
    founderSummary: "A solid start with clear SEO potential, but needs better conversion optimization and accessibility fixes to truly scale.",
    startupReadinessScore: 78
  };
}
