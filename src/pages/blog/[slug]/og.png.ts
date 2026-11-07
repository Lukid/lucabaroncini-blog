import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { pubblicato } from "@/lib/posts";
import { copertinaPng } from "@/lib/copertina";

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => pubblicato(data));
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { id, data } = props.post;
  const cifra = data.reel?.find((s) => s.cifra)?.cifra;
  const png = await copertinaPng({ titolo: data.title, cifra, seme: id });
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
