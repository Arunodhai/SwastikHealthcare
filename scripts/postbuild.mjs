import fs from 'node:fs';
import path from 'node:path';

const projectId = process.env.VITE_SANITY_PROJECT_ID || '41uk25bi';
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2024-03-01';
const siteUrl = (process.env.SITE_URL || 'https://www.swastikrehab.com').replace(/\/+$/, '');

const distDir = path.resolve('dist');

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/treatments', priority: '0.9', changefreq: 'weekly' },
  { path: '/conditions', priority: '0.9', changefreq: 'weekly' },
  { path: '/gallery', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
];

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function fetchDynamicPaths() {
  const query = `{
    "treatments": *[_type == "treatment" && defined(slug.current)]{"slug": slug.current},
    "conditions": *[_type == "condition" && defined(slug.current)]{"slug": slug.current},
    "pages": *[_type == "customPage" && defined(slug.current)]{"slug": slug.current}
  }`;

  const url =
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}` +
    `?query=${encodeURIComponent(query)}&perspective=published`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Sanity query failed with status ${response.status}`);
  }

  const data = await response.json();
  const result = data.result || {};
  const paths = [];

  for (const item of result.treatments || []) {
    if (item?.slug) paths.push({ path: `/treatments/${item.slug}`, priority: '0.8', changefreq: 'monthly' });
  }
  for (const item of result.conditions || []) {
    if (item?.slug) paths.push({ path: `/conditions/${item.slug}`, priority: '0.7', changefreq: 'monthly' });
  }
  for (const item of result.pages || []) {
    if (item?.slug) paths.push({ path: `/pages/${item.slug}`, priority: '0.5', changefreq: 'monthly' });
  }

  return paths;
}

function renderSitemap(pages) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries = pages
    .map(({ path: pagePath, priority = '0.5', changefreq = 'monthly' }) => {
      const loc = `${siteUrl}${pagePath === '/' ? '/' : pagePath}`;
      return [
        '  <url>',
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</urlset>',
    '',
  ].join('\n');
}

async function main() {
  if (!fs.existsSync(distDir)) {
    throw new Error('dist/ not found. Run `vite build` before this script.');
  }

  let dynamicPages = [];
  try {
    dynamicPages = await fetchDynamicPaths();
  } catch (error) {
    console.warn(`Could not load Sanity slugs for sitemap: ${error.message}`);
  }

  const pages = [...staticPages, ...dynamicPages];
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), renderSitemap(pages), 'utf8');
  console.log(`Wrote dist/sitemap.xml (${pages.length} URLs)`);

  // Vercel serves this file (with a 404 status) for unmatched routes. Give the
  // static shell correct 404 metadata before the SPA replaces it at runtime.
  const shell = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  const notFound = shell
    .replace(/<title>[\s\S]*?<\/title>/, '<title>Page Not Found | Swastik Healthcare</title>')
    .replace(/\s*<link rel="canonical"[^>]*>/, '')
    .replace(/\s*<meta name="robots"[^>]*>/, '')
    .replace(
      /(<meta charset="[^"]*"\s*\/?>)/,
      '$1\n    <meta name="robots" content="noindex, nofollow" />',
    )
    .replace(/(<meta property="og:title" content=")[^"]*(")/, '$1Page Not Found | Swastik Healthcare$2')
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${siteUrl}/404$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, '$1Page Not Found | Swastik Healthcare$2');

  fs.writeFileSync(path.join(distDir, '404.html'), notFound, 'utf8');
  console.log('Wrote dist/404.html');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
