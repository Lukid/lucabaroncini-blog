import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { TAGS } from "@/lib/constants";
import { STAZIONI, COLORI } from "./lib/reel";

const schermataSchema = z.object({
  stazione: z.enum(STAZIONI),
  testo: z.string(),
  cifra: z.string().optional(),
  colore: z.enum(Object.keys(COLORI) as [keyof typeof COLORI, ...(keyof typeof COLORI)[]]).optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      tags: z.array(z.enum(TAGS))
        .default([]),
      draft: z.boolean().default(false),
      reel: z.array(schermataSchema).min(3).max(5)
        .refine((r) => r.at(-1)?.stazione === "domanda", "l'ultima schermata deve essere la domanda")
        .optional(),
    }),
});

export const collections = { blog };
