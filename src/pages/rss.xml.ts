import { pubblicato, ordinaPerData } from "@/lib/posts";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@/lib/constants";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = ordinaPerData(await getCollection("blog", ({ data }) => pubblicato(data)));

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
  });
}
