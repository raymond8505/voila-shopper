import { Page } from "playwright";

export type RecipeScraperFn = (args: { page: Page }) => Promise<void>;

export default async function instagramScraper({ page }: { page: Page }) {
  const content = await page.content();

  console.log(content);
}

const s = " s";
