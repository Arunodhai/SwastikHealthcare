import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';

const configPath = path.join(process.env.HOME || '', '.config', 'sanity', 'config.json');
let token = process.env.SANITY_AUTH_TOKEN || process.env.VITE_SANITY_TOKEN || '';

if (!token && fs.existsSync(configPath)) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  token = config.authToken || '';
}

if (!token) throw new Error('Sanity auth token not found. Run `npx sanity login` or set SANITY_AUTH_TOKEN.');

const client = createClient({ projectId: '41uk25bi', dataset: 'production', apiVersion: '2024-03-01', token, useCdn: false });
const image = (assetId: string) => ({ _type: 'image', asset: { _type: 'reference', _ref: assetId } });

const pageHeroAssets: Record<string, string> = {
  about: 'image-f03d9b904f5f51fe5f3b1d568e8c3b7cfd026d97-1983x793-webp',
  treatments: 'image-9c4ab371ff56718dd738bdffa24a359848aa976f-1983x793-webp',
  conditions: 'image-ba4ad107d900430610e9d64e68b49fbeacc3e43e-1774x887-webp',
  gallery: 'image-31d558bbea36a9fee71e5788b15cba68a058fdb8-1942x809-webp',
  contact: 'image-f1384571876346f8fee2881058830a7be0e90fd4-1942x809-webp',
};

const treatmentAssets: Record<string, string> = {
  'orthopaedic-rehabilitation': 'image-4e137dca1f57fbd50206654a7a47c80978b4ffec-1200x1200-jpg',
  'neurological-rehabilitation': 'image-89b15db3b5bf310f92959e47ebd3731ae1d32376-1200x757-jpg',
  'pain-management-clinic': 'image-02d16523406038dd619c9ab87d4c2333d52a1d7b-1200x960-jpg',
  'geriatric-physiotherapy': 'image-27b470de155e275c5f1c7afb0b5dd37aa943b771-1200x800-jpg',
  'sports-injury-rehabilitation': 'image-7e6fb4e611979bda6582c2bde6df831caacf73f3-1200x800-jpg',
  'pediatric-physiotherapy': 'image-a255c64ece02e18f4a2761c0dd998e75118eba81-1200x960-jpg',
  'cardio-pulmonary-rehabilitation': 'image-5679fbc5f4db11e771e99d8d4c0b5f755f500074-1200x800-jpg',
  'home-visit-physiotherapy': 'image-9e2dcc8d4bd9f559f1bb6058cbeaaa7a0fdf26c2-1000x668-jpg',
  'inpatient-admission-facility': 'image-0d66befa578c22609f2e0169a65e85d7e7f4b3be-1000x681-jpg',
  'diabetic-neuropathy-foot-rehabilitation': 'image-dd9cf54820fec06c3cff23c93cab7d3ce8d4992f-800x533-jpg',
  'senior-citizen-vitality-wellness': 'image-27b470de155e275c5f1c7afb0b5dd37aa943b771-1200x800-jpg',
};

const conditionAssets: Record<string, string> = {
  'back-neck-joint-pain': 'image-1d6ccadf2c94fd45a6636b0fe09f261cd7f664cb-800x640-jpg',
  'fracture-joint-replacement-arthritis': 'image-33370fb9506608abbba4e6a4a6a21488e5e68025-800x533-jpg',
  'stroke-paralysis-nerve-disorders': 'image-dd9cf54820fec06c3cff23c93cab7d3ce8d4992f-800x533-jpg',
  'sports-injuries': 'image-2dffa2e1502f45d17ab1b8e26fbc782abf61d8fc-800x533-jpg',
  'diabetic-foot-symptoms': 'image-fe233bcf023d15e74830e6795366e9e675714ad8-800x504-jpg',
  'age-related-mobility': 'image-b9dbe44ca4094fbb9cafc55ec112ae4d59491c46-800x800-jpg',
};

const galleryItems = [
  ['general-1', 'Physiotherapy Care', 'sessions', 'Clinical Care', 'A general physiotherapy care image.', 'image-9e2dcc8d4bd9f559f1bb6058cbeaaa7a0fdf26c2-1000x668-jpg'],
  ['general-2', 'Guided Rehabilitation', 'rehab', 'Rehabilitation', 'A general guided rehabilitation image.', 'image-96981350e54f3ef5f1865e6ea9fa2465d365ced8-1000x667-jpg'],
  ['general-3', 'Mobility Support', 'sessions', 'Clinical Care', 'A general mobility support image.', 'image-aef3a63ca3ce3819dab2b751375d1141c63f4e53-1000x667-jpg'],
  ['general-4', 'Exercise Rehabilitation', 'rehab', 'Rehabilitation', 'A general exercise rehabilitation image.', 'image-9126b7df5c1bac20500824a35c944ea9afe21bad-1000x667-jpg'],
  ['general-5', 'Physiotherapy Equipment', 'equipment', 'Clinical Equipment', 'A general physiotherapy equipment image.', 'image-e85f5ca91e09149cba07dd8dfb0e4d9f9f084d4b-1000x800-jpg'],
  ['general-6', 'Rehabilitation Session', 'clinic', 'Clinic & Care', 'A general rehabilitation session image.', 'image-0d66befa578c22609f2e0169a65e85d7e7f4b3be-1000x681-jpg'],
] as const;

async function main() {
  const settingsDocuments = await client.fetch<Array<{ _id: string; navbarPages?: any[] }>>(
    '*[_id in ["clinicSettings-singleton", "drafts.clinicSettings-singleton"]]{_id, navbarPages}',
  );

  if (!settingsDocuments.some((document) => document._id === 'clinicSettings-singleton')) {
    throw new Error('The published Clinic Settings document was not found.');
  }

  let transaction = client.transaction();

  for (const settings of settingsDocuments) {
    const navbarPages = (settings.navbarPages || []).map((page: any) => ({
      ...page,
      heroBadge: page.pageKey === 'about'
        ? 'About Swastik Healthcare'
        : page.heroBadge,
      heroTitle: page.pageKey === 'about'
        ? 'Mission Wellness Across Kollam.'
        : page.heroTitle,
      heroDescription: page.pageKey === 'gallery'
        ? 'General physiotherapy and rehabilitation visuals used across the website. Every image can be replaced in Sanity Studio.'
        : page.heroDescription,
      heroImage: pageHeroAssets[page.pageKey] ? image(pageHeroAssets[page.pageKey]) : page.heroImage,
      sections: (page.sections || []).map((section: any) => ({
        ...section,
        title: page.pageKey === 'about' && section.key === 'story'
          ? 'A Clinic Built Around Recovery.'
          : section.title,
        body: page.pageKey === 'about' && section.key === 'story'
          ? [
              'Established in 2009, Swastik Healthcare provides physiotherapy and rehabilitation services under the motto “Mission Wellness.”',
              'Care is available for children, adults, athletes, and senior citizens through clinic-based treatment, home visits, and inpatient support.',
            ]
          : section.body,
        image: page.pageKey === 'about' && section.key === 'story'
          ? image('image-a3cb0f6a4bb8f1017ffa6c40b9c31e51a25f112c-1150x1368-png')
          : section.image,
      })),
    }));

    transaction = transaction.patch(settings._id, (patch) => patch.set({
      heroBgImage: image('image-dd06d2db968fc7bf33d84d8cf458fdde7b686c71-1672x941-png'),
      consultationImage: image('image-a255c64ece02e18f4a2761c0dd998e75118eba81-1200x960-jpg'),
      navbarPages,
    }));
  }

  for (const [slug, assetId] of Object.entries(treatmentAssets)) {
    transaction = transaction.patch(`treatment-${slug}`, (patch) => patch.set({
      heroImage: image(assetId),
      heroImageAlt: `${slug.replaceAll('-', ' ')} physiotherapy`,
    }));
  }

  for (const [slug, assetId] of Object.entries(conditionAssets)) {
    transaction = transaction.patch(`condition-${slug}`, (patch) => patch.set({
      image: image(assetId),
      imageAlt: `${slug.replaceAll('-', ' ')} rehabilitation support`,
    }));
  }

  galleryItems.forEach(([id, title, category, categoryLabel, description, assetId], index) => {
    transaction = transaction.createOrReplace({
      _id: `gallery-${id}`,
      _type: 'galleryItem',
      title,
      category,
      categoryLabel,
      description,
      image: image(assetId),
      order: index + 1,
    });
  });

  const result = await transaction.commit({ autoGenerateArrayKeys: true });
  console.log(JSON.stringify({
    transactionId: result.transactionId,
    settingsDocuments: settingsDocuments.map((document) => document._id),
    treatmentImages: Object.keys(treatmentAssets).length,
    conditionImages: Object.keys(conditionAssets).length,
    galleryImages: galleryItems.length,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
