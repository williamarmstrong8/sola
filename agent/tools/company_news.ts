import { defineTool } from "eve/tools";
import { z } from "zod";
 
// Recent stories from Hacker News (free, no API key, reliable).
export default defineTool({
  description: "Search Hacker News for recent stories on a topic. Returns titles, points, and links.",
  inputSchema: z.object({
    query: z.string().describe("What to search for, e.g. 'AI agents' or a competitor name."),
  }),
  async execute({ query }) {
    const url =
      `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}` +
      `&tags=story&numericFilters=points>20&hitsPerPage=15`;
    const res = await fetch(url);
    const data = await res.json();
    const articles = (data.hits ?? []).map((h: any) => ({
      title: h.title,
      url: h.url ?? `https://news.ycombinator.com/item?id=${h.objectID}`,
      points: h.points,
    }));
    return { articles };
  },
});
 