import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.coerce.string(),
    creationDate: z.coerce.date(),
    description: z.coerce.string(),
    tags: z.enum(["software engineering", "best practices", "philosophy"])
      .array(),
    slug: z.coerce.string(),
    live: z.coerce.boolean().default(false),
  }),
});

export const collections = { blog };
