import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { pubblicato, ordinaPerData } from "@/lib/posts";
import { SITE } from "@/lib/constants";

export const GET: APIRoute = async () => {
  const posts = ordinaPerData(await getCollection("blog", ({ data }) => pubblicato(data)));
  const righe = [
    `# ${SITE.title}`,
    "",
    `> ${SITE.description}`,
    "",
    "## Idee",
    "",
    ...posts.map((p) => `- [${p.data.title}](${SITE.url}/blog/${p.id}.md): ${p.data.description}`),
    "",
  ];
  return new Response(righe.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
