import { getCollection } from 'astro:content';

const allNews = await getCollection('news');
allNews.forEach(entry => {
  console.log(`Slug: ${entry.slug}, ID: ${entry.id}`);
});
