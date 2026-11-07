import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { pubblicato } from "@/lib/posts";
import { formatData } from "@/lib/format";
import { togliImport } from "@/lib/togli-import";

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => pubblicato(data));
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = ({ props }) => {
  const { data, body } = props.post;
  const testo = togliImport(body ?? "").trim();
  const md = `# ${data.title}\n\n${data.description}\n\n${formatData(data.pubDate, true)}\n\n${testo}\n`;
  return new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
};
