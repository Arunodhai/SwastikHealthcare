import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';
import { CLINIC_SETTINGS, CLINIC_LOCATIONS, CONDITIONS, TEAM_MEMBERS, TREATMENTS } from '../src/data/clinicData';
import { DEFAULT_MANAGED_PAGES } from '../src/data/pageContent';

const configPath = path.join(process.env.HOME || '', '.config', 'sanity', 'config.json');
let token = process.env.SANITY_AUTH_TOKEN || process.env.VITE_SANITY_TOKEN || '';

if (!token && fs.existsSync(configPath)) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  token = config.authToken || '';
}

if (!token) throw new Error('Sanity auth token not found. Run `npx sanity login` or set SANITY_AUTH_TOKEN.');

const client = createClient({ projectId: '41uk25bi', dataset: 'production', apiVersion: '2024-03-01', token, useCdn: false });
const withKeys = (items: any[] | undefined, prefix: string) => (items || []).map((item, index) => ({ ...item, _key: item._key || `${prefix}-${index + 1}` }));

const navbarPages = Object.values(DEFAULT_MANAGED_PAGES).map((page) => ({
  ...page,
  _key: `page-${page.pageKey}`,
  heroImageUrl: undefined,
  sections: page.sections?.map((section) => ({
    ...section,
    _key: `${page.pageKey}-${section.key}`,
    imageUrl: undefined,
    items: withKeys(section.items, `${page.pageKey}-${section.key}-item`),
  })),
  filters: withKeys(page.filters, `${page.pageKey}-filter`),
}));

async function main() {
  const imagePath = path.resolve('public/images/team/dr-ajay-ghosh.png');
  const doctorAsset = await client.assets.upload('image', fs.createReadStream(imagePath), { filename: 'dr-ajay-ghosh.png' });

  const staleIds = await client.fetch<string[]>(`*[_type in ["treatment", "condition", "teamMember", "testimonial", "galleryItem", "clinicLocation"]]._id`);
  let transaction = client.transaction();
  staleIds.forEach((id) => { transaction = transaction.delete(id); });

  TREATMENTS.forEach((treatment, index) => {
    transaction = transaction.createOrReplace({
      ...treatment,
      _id: `treatment-${treatment.slug}`,
      _type: 'treatment',
      id: undefined,
      slug: { _type: 'slug', current: treatment.slug },
      suitableFor: treatment.suitableFor,
      benefits: treatment.benefits,
      approachSteps: withKeys(treatment.approachSteps, `${treatment.slug}-step`),
      faqs: withKeys(treatment.faqs, `${treatment.slug}-faq`),
      relatedConditionSlugs: treatment.relatedConditionSlugs,
      order: index + 1,
    });
  });

  CONDITIONS.forEach((condition, index) => {
    transaction = transaction.createOrReplace({
      ...condition,
      _id: `condition-${condition.slug}`,
      _type: 'condition',
      id: undefined,
      slug: { _type: 'slug', current: condition.slug },
      commonSymptoms: condition.commonSymptoms,
      possibleCauses: condition.possibleCauses,
      physioApproach: condition.physioApproach,
      relatedTreatmentSlugs: condition.relatedTreatmentSlugs,
      order: index + 1,
    });
  });

  const doctor = TEAM_MEMBERS[0];
  transaction = transaction.createOrReplace({
    ...doctor,
    _id: 'team-dr-ajay-ghosh',
    _type: 'teamMember',
    id: undefined,
    photo: { _type: 'image', asset: { _type: 'reference', _ref: doctorAsset._id } },
    specialization: doctor.specialization,
    order: 1,
  });

  CLINIC_LOCATIONS.forEach((location, index) => {
    transaction = transaction.createOrReplace({
      ...location,
      _id: `location-${location.slug}`,
      _type: 'clinicLocation',
      id: undefined,
      slug: { _type: 'slug', current: location.slug },
      order: index + 1,
    });
  });

  transaction = transaction.createOrReplace({
    ...CLINIC_SETTINGS,
    _id: 'clinicSettings-singleton',
    _type: 'clinicSettings',
    heroBgImage: undefined,
    openingHours: withKeys(CLINIC_SETTINGS.openingHours, 'opening-hours'),
    healthFunds: withKeys(CLINIC_SETTINGS.healthFunds, 'service-highlight'),
    trustHighlights: withKeys(CLINIC_SETTINGS.trustHighlights, 'trust-highlight'),
    howItWorks: withKeys(CLINIC_SETTINGS.howItWorks, 'how-it-works'),
    consultationBenefits: CLINIC_SETTINGS.consultationBenefits,
    navbarPages,
  });

  const result = await transaction.commit({ autoGenerateArrayKeys: true });
  console.log(`Sanity sync completed: ${result.transactionId}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
