import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      tags: z
        .array(
          z.enum([
            "tech",
            "politics",
            "climbing",
            "javascript",
            "typescript",
            "astro",
            "web",
            "opinion",
            "tutorial",
            "personal",
          ]),
        )
        .default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
