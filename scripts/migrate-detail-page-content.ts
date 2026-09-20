import { getCliClient } from 'sanity/cli';
import { TREATMENTS, CONDITIONS } from '../src/data/clinicData';

const client = getCliClient({ apiVersion: '2024-03-01' });

const treatmentPageCopy = {
  primaryCtaLabel: 'Book Initial Assessment',
  secondaryCtaLabel: 'View Clinical Approach',
  rebateBadge: 'HICAPS Rebates Claimable',
  suitableForHeading: 'Who This Treatment Is Suitable For',
  benefitsHeading: 'Key Benefits & Outcomes',
  approachHeading: 'Our Step-by-Step Clinical Approach',
  approachIntro: 'Transparent, systematic recovery milestones from early acute relief to functional resilience.',
  faqHeading: 'Frequently Asked Questions',
  bookingEyebrow: 'Book Service',
  sidebarCtaLabel: 'Book This Treatment',
  relatedConditionsHeading: 'Related Conditions',
};

const conditionPageCopy = {
  heroHighlights: ['Non-Surgical Focus', 'Individualized Recovery Plan'],
  primaryCtaLabel: 'Book Initial Assessment',
  symptomsHeading: 'Common Symptoms & Presentation',
  causesHeading: 'Underlying Drivers & Risk Factors',
  approachHeading: 'How Physiotherapy Supports Recovery',
  approachIntro: 'Evidence-based, active interventions aimed at restoring joint kinematics, reducing tissue overload, and building capacity.',
  medicalNotice: 'Information on this website is for educational purposes and should not replace formal in-person clinical assessment. Recovery rates vary depending on injury severity, tissue healing timelines, and individual adherence.',
  sidebarCtaLabel: 'Book Initial Assessment',
  relatedTreatmentsHeading: 'Recommended Treatments',
};

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

const documents = await client.fetch(
  '*[_type in ["treatment", "condition"]]{_id,_type,title,"slug":slug.current,"hasImage":defined(heroImage.asset)||defined(image.asset)}',
);

const transaction = client.transaction();
const migrated: string[] = [];

for (const document of documents) {
  if (document._type === 'treatment') {
    const source = TREATMENTS.find((item) => item.slug === document.slug);
    const values: Record<string, unknown> = {
      detailPageCopy: treatmentPageCopy,
      heroImageAlt: document.title,
    };

    if (!document.hasImage && source?.heroImage) {
      const assetId = await uploadRemoteImage(source.heroImage, `treatment-${document.slug}.jpg`);
      values.heroImage = { _type: 'image', asset: { _type: 'reference', _ref: assetId } };
    }

    transaction.patch(document._id, (patch) => patch.setIfMissing(values));
    migrated.push(document._id);
  }

  if (document._type === 'condition') {
    const source = CONDITIONS.find((item) => item.slug === document.slug);
    const values: Record<string, unknown> = {
      detailPageCopy: conditionPageCopy,
      imageAlt: document.title,
    };

    if (!document.hasImage && source?.image) {
      const assetId = await uploadRemoteImage(source.image, `condition-${document.slug}.jpg`);
      values.image = { _type: 'image', asset: { _type: 'reference', _ref: assetId } };
    }

    transaction.patch(document._id, (patch) => patch.setIfMissing(values));
    migrated.push(document._id);
  }
}

const result = await transaction.commit({ autoGenerateArrayKeys: true });
console.log(JSON.stringify({ migratedDocuments: migrated, transactionId: result.transactionId }, null, 2));
