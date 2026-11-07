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
    "## Osservatorio",
    "",
    `- [Osservatorio AI](${SITE.url}/osservatorio): le tesi sull'AI applicata che seguo nel tempo, con prove a favore, prove contro e limiti.`,
    `- [Conta più l'harness o il modello?](${SITE.url}/osservatorio/harness-vs-modello): tredici misure pubbliche su quando conta l'harness e quando il modello.`,
    "",
  ];
  return new Response(righe.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
