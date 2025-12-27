import googleSearchScraper from "./googleSearch";
import instagram from "./instagram";

export default {
  instagram: {
    scraper: instagram,
    pattern: /^(https?:\/\/(www\.)?instagram\.[^\/]+\/.+)/,
  },
  google: {
    scraper: googleSearchScraper,
    pattern: /^(https?:\/\/(www\.)?google\.[^\/]+\/search\?.+)/,
  },
};
