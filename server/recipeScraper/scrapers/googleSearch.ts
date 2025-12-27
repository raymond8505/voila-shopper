import { Page } from "playwright";

export default async function googleSearchScraper({ page }: { page: Page }) {
  const links = await page.locator(
    '#res a:not(li > a):not([href*="instagram."])'
  );

  console.log(await page.content());

  return links.evaluateAll((elements) =>
    elements.map((el) => ({
      href: el.getAttribute("href"),
      text: el.textContent,
    }))
  );
}
