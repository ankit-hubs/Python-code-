import { NextRequest, NextResponse } from "next/server";
import { scrapeWebsite } from "@/lib/scraper";
import { analyzeWebsite } from "@/lib/openai";
import { z } from "zod";

const AnalyzeSchema = z.object({
  url: z.string().url(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = AnalyzeSchema.parse(body);
    console.log(`[SiteScope AI] Starting analysis for: ${url}`);

    // Step 2: Fetch HTML and metadata
    console.log(`[SiteScope AI] Scraping website content...`);
    const siteData = await scrapeWebsite(url);
    console.log(`[SiteScope AI] Scraped successfully. Title: "${siteData.title}"`);

    // Step 3: Send to OpenAI for analysis
    console.log(`[SiteScope AI] Sending data to OpenRouter (Gemini Flash) for audit...`);
    const analysis = await analyzeWebsite(siteData);
    console.log(`[SiteScope AI] Analysis complete for ${url}`);

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to analyze website" },
      { status: 400 }
    );
  }
}
