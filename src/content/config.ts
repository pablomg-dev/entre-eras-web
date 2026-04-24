import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string(),
    image: z.string(),
    isFeatured: z.boolean().default(false),
    author: z.string(),
    authorImage: z.string().optional(),
    authorSocial: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const magazines = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    coverImage: z.string(),
    editionDate: z.date(),
    flipbookUrl: z.string(),
    isPremium: z.boolean().default(false),
  }),
});

export const collections = {
  'news': news,
  'magazines': magazines,
};
