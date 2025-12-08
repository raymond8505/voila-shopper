import { parseStringPromise } from "xml2js";
import { gunzip as zlibGunzip } from "zlib";
import { promisify } from "util";
import * as cheerio from "cheerio";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../extension/client/.env") });

const gunzipPromise = promisify(zlibGunzip);
const rootSitemapURL = "https://www.food.com/sitemap.xml";

async function parseSitemap(url: string): Promise<any> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const decompressedBuffer = await gunzipPromise(buffer);

    const xmlString = decompressedBuffer.toString("utf8");

    const parsedXmlObject = await parseStringPromise(xmlString);

    return parsedXmlObject;
  } catch (error) {
    console.error(`Error fetching or parsing gzipped XML from ${url}:`, error);
    throw error;
  }
}

async function getSitemaps(rootURL: string) {
  const mapResp = await fetch(rootURL);

  const xmlStr = await mapResp.text();

  const result = await parseStringPromise(xmlStr);

  const urls = result.sitemapindex.sitemap.map(
    (sitemap: any) => sitemap.loc[0]
  );

  return urls;
}

async function supabaseRequest({
  table,
  tableParams,
  opts,
}: {
  table: string;
  tableParams?: Record<string, string | number>;
  opts?: RequestInit;
}) {
  const url = new URL(`${process.env.VITE_SUPABASE_URL}${table}`);

  tableParams &&
    Object.entries(tableParams).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

  const requestInit: RequestInit = { ...opts };

  const mergedHeaders = new Headers(requestInit.headers);

  mergedHeaders.set("Content-Type", "application/json");

  const apiKey = process.env.VITE_SUPABASE_API_KEY;
  if (apiKey) {
    mergedHeaders.set("apikey", apiKey);
    mergedHeaders.set("Authorization", `Bearer ${apiKey}`);
  } else {
    console.warn(
      "VITE_SUPABASE_API_KEY is not defined. Supabase requests might fail."
    );
  }

  requestInit.headers = mergedHeaders;

  return fetch(url.toString(), requestInit);
}

const sitemapURLs = await getSitemaps(rootSitemapURL);

let s = 0;
let u = 0;

const lastS = 6;
const lastU = 100664;

for (const sitemapURL of sitemapURLs) {
  console.log("Parsing", sitemapURL);

  const sitemap = await parseSitemap(sitemapURL);

  for (const urlNode of sitemap.urlset.url) {
    if ((s === lastS && u <= lastU) || s < lastS) {
      u++;
      continue;
    }

    const recipeURL = urlNode.loc[0];

    const recipeResp = await fetch(recipeURL);

    const recipeBody = await recipeResp.text();

    const $ = cheerio.load(recipeBody);

    try {
      const schema = JSON.parse($('script[type="application/ld+json"]').text());

      console.log(`Inserting ${s}-${u} | `, schema.name, " | ", recipeURL);

      const insertResp = await supabaseRequest({
        table: "recipes_raw",
        opts: {
          method: "POST",
          body: JSON.stringify({
            schema,
            url: recipeURL,
          }),
        },
      });

      await new Promise((res) => {
        setTimeout(() => {
          res(1);
        }, 1000);
      });

      u++;
    } catch (e) {
      console.error("ERROR |", recipeURL);
    }
  }
  s++;
}

export {};
