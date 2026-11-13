import { getCollection, type CollectionEntry } from 'astro:content';

export async function allProjects() {
  return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
}

export async function journalFor(slug: string) {
  return (await getCollection('journal', (e) => e.data.project === slug && (import.meta.env.DEV || !e.data.draft)))
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
}

export async function referenceFor(slug: string) {
  return (await getCollection('reference')).find((r) => r.data.project === slug);
}

/** URL-safe id for an entry, without the project folder prefix. */
export const entrySlug = (e: CollectionEntry<'journal'>) => e.id.split('/').pop()!;

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
