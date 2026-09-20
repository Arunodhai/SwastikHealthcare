import fs from 'node:fs';
import path from 'node:path';
import { getCliClient } from 'sanity/cli';
import { DEFAULT_MANAGED_PAGES } from '../src/data/pageContent';

const client = getCliClient({ apiVersion: '2024-03-01' });
const workspaceRoot = process.cwd();

const heroFiles: Record<string, string> = {
  about: 'about-hero.webp',
  treatments: 'treatments-hero.webp',
  conditions: 'conditions-hero.webp',
  gallery: 'gallery-hero.webp',
  contact: 'contact-hero.webp',
};

async function uploadLocalImage(filename: string) {
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}',
    { filename },
  );
  if (existing?._id) return existing._id as string;

  const filePath = path.join(workspaceRoot, 'public', 'images', 'heroes', filename);
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename });
  return asset._id;
}

async function uploadRemoteImage(url: string, filename: string) {
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}',
    { filename },
  );
  if (existing?._id) return existing._id as string;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
  const asset = await client.assets.upload('image', Buffer.from(await response.arrayBuffer()), { filename });
  return asset._id;
}

const pages = [];
for (const page of Object.values(DEFAULT_MANAGED_PAGES)) {
  const heroAssetId = await uploadLocalImage(heroFiles[page.pageKey]);
  const sections = [];

  for (const section of page.sections || []) {
    let sectionImage;
    if (section.imageUrl?.startsWith('http')) {
      const sectionAssetId = await uploadRemoteImage(section.imageUrl, `${page.pageKey}-${section.key}.jpg`);
      sectionImage = { _type: 'image', asset: { _type: 'reference', _ref: sectionAssetId } };
    }

    sections.push({
      ...section,
      _type: 'object',
      _key: `${page.pageKey}_${section.key}`,
      imageUrl: undefined,
      image: sectionImage,
      items: section.items?.map((item) => ({
        ...item,
        _type: 'object',
        _key: `${page.pageKey}_${section.key}_${item.key}`,
      })),
    });
  }

  pages.push({
    ...page,
    _type: 'object',
    _key: `page_${page.pageKey}`,
    heroImageUrl: undefined,
    heroImage: { _type: 'image', asset: { _type: 'reference', _ref: heroAssetId } },
    filters: page.filters?.map((filter) => ({
      ...filter,
      _type: 'object',
      _key: `${page.pageKey}_filter_${filter.key}`,
    })),
    sections,
  });
}

const targetIds = await client.fetch(
  '*[_id in ["clinicSettings-singleton", "drafts.clinicSettings-singleton"]]._id',
);

if (!targetIds.includes('clinicSettings-singleton')) {
  throw new Error('The published Clinic Settings document was not found.');
}

const transaction = client.transaction();
for (const id of targetIds) {
  transaction.patch(id, (patch) => patch.set({ navbarPages: pages }));
}

const result = await transaction.commit({ autoGenerateArrayKeys: true });
console.log(JSON.stringify({ updatedDocuments: targetIds, pageKeys: pages.map((page) => page.pageKey), transactionId: result.transactionId }, null, 2));
