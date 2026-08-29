import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const newsletter = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/newsletter' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    tags: z.array(z.string()).default([]),
  }),
})

const timeline = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timeline' }),
  schema: z.object({
    title: z.string(),
    dateLabel: z.string(),
    sortDate: z.coerce.date(),
    excerpt: z.string(),
    side: z.enum(['br', 'us']),
    tags: z.array(z.string()).default([]),
  }),
})

export const collections = { newsletter, timeline }
