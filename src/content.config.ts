import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const CATEGORIES = ['AI', 'HCI', 'XR', 'Physiological Computing', 'Systems', 'Tools'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    role: z.string(),
    categories: z.array(z.enum(CATEGORIES)).min(1),
    stack: z.array(z.string()),
    featured: z.boolean().default(false),
    spotlight: z.boolean().default(false), // opened up with image + paragraph at the top of the home index
    order: z.number().default(50),
    related: z.array(z.string()).default([]),
    links: z.object({ github: z.string().url().optional(), demo: z.string().url().optional() }).default({}),
    cover: z.string().optional(),
    image: z.string().optional(),
    imageCredit: z.string().optional(), // e.g. /images/projects/<slug>.jpg
    status: z.string().optional(), // kept for notes; not shown
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/courses' }),
  schema: z.object({
    code: z.string(),
    name: z.string(),
    short: z.string(),
    area: z.enum(['Computer Science', 'Software Engineering', 'Computer Systems', 'General Engineering']),
    term: z.string(),
    level: z.string().default('Undergraduate'),
    highlight: z.boolean().default(false),
    desc: z.string(),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/journal' }),
  schema: z.object({
    project: z.string(),          // project slug
    title: z.string(),
    date: z.coerce.date(),        // start of the week/session
    session: z.string(),          // e.g. "Week 3" or "Session 12"
    summary: z.string(),          // one or two sentences
    facets: z.array(z.string()).default([]), // reference section names touched, e.g. "Avatar behaviour"
    draft: z.boolean().default(false),
  }),
});

const reference = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/reference' }),
  schema: z.object({ project: z.string(), title: z.string().default('System reference') }),
});

export const collections = { projects, courses, journal, reference };
