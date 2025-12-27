import { chromium, Browser } from "playwright";
import scrapers from "./scrapers/manifest";
import defaultScraper from "./scrapers/default";
import { RecipeScraperFn } from "./scrapers/instagram";
export type ScrapedRecipe = {
  recipe: string | Record<string, unknown>;
  /**
   * @see
   */
  type: "schema" | "opengraph" | "html";
};
export function getScraper(url: string): RecipeScraperFn {
  // check manifest for matching scraper
  for (const [key, scraper] of Object.entries(scrapers)) {
    if (scraper.pattern.test(url)) {
      return scraper.scraper;
    }
  }

  return defaultScraper;
}
export async function scrapeRecipe(url: string): Promise<ScrapedRecipe | null> {
  let browser: Browser | undefined;

  // Validate the URL format
  try {
    new URL(url);
  } catch (error) {
    console.error(`Invalid URL provided: ${url}`);
    return null;
  }

  console.log("Launching browser...");
  try {
    // Launch a browser instance.
    // You can also use `firefox` or `webkit` from 'playwright'.
    browser = await chromium.launch({
      headless: true, // Set to false to watch the browser in action
    });

    // Create a new page in a new browser context.
    const context = await browser.newContext({
      // Emulate a common user agent to avoid being identified as a bot.
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });
    const page = await context.newPage();

    console.log(`Navigating to ${url}...`);
    // Go to the specified URL and wait for the page to load.
    await page.goto(url, { waitUntil: "load" });

    console.log("Navigation successful!");

    const scrape = getScraper(url);

    return await scrape({ page });
  } catch (error) {
    console.error("An error occurred during the Playwright session:", error);
  } finally {
    if (browser) {
      console.log("Closing browser...");
      await browser.close();
    }
  }
}
