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

const treatmentDetailContent: Record<string, {
  sessionSubtitle: string;
  benefits: string[];
  relatedConditionSlugs: string[];
}> = {
  'orthopaedic-rehabilitation': {
    sessionSubtitle: 'A structured plan for restoring movement and function after orthopaedic conditions or procedures.',
    benefits: ['Support for comfortable movement', 'Progressive strength and mobility work', 'Guidance toward everyday functional recovery'],
    relatedConditionSlugs: ['fracture-joint-replacement-arthritis', 'back-neck-joint-pain'],
  },
  'neurological-rehabilitation': {
    sessionSubtitle: 'Individual rehabilitation support for movement, balance, coordination, and daily function.',
    benefits: ['Movement and balance practice', 'Support for coordination and mobility', 'Functional training for daily activities'],
    relatedConditionSlugs: ['stroke-paralysis-nerve-disorders'],
  },
  'pain-management-clinic': {
    sessionSubtitle: 'Assessment-led physiotherapy support for acute or persistent back, neck, and joint pain.',
    benefits: ['Support for pain relief', 'Improved movement confidence', 'A practical plan for daily activity'],
    relatedConditionSlugs: ['back-neck-joint-pain', 'fracture-joint-replacement-arthritis'],
  },
  'geriatric-physiotherapy': {
    sessionSubtitle: 'Mobility, balance, and fall-prevention support designed around the needs of older adults.',
    benefits: ['Safer everyday movement', 'Balance and mobility practice', 'Support for confidence and independence'],
    relatedConditionSlugs: ['age-related-mobility'],
  },
  'sports-injury-rehabilitation': {
    sessionSubtitle: 'Progressive rehabilitation for strains, ligament injuries, reconditioning, and return to sport.',
    benefits: ['Progressive strength recovery', 'Movement and activity reconditioning', 'Guidance for a safe return to sport'],
    relatedConditionSlugs: ['sports-injuries'],
  },
  'pediatric-physiotherapy': {
    sessionSubtitle: 'Age-appropriate movement and postural support for children and their families.',
    benefits: ['Support for developmental movement', 'Postural and mobility guidance', 'Family-centred functional goals'],
    relatedConditionSlugs: [],
  },
  'cardio-pulmonary-rehabilitation': {
    sessionSubtitle: 'Guided conditioning to support breathing, endurance, and everyday activity.',
    benefits: ['Breathing and endurance support', 'Graded physical conditioning', 'Confidence with everyday activity'],
    relatedConditionSlugs: [],
  },
  'home-visit-physiotherapy': {
    sessionSubtitle: 'Physiotherapy delivered at home for bedridden, elderly, or mobility-limited patients.',
    benefits: ['Care in the patient’s home', 'Support for mobility and daily function', 'A practical option when clinic travel is difficult'],
    relatedConditionSlugs: ['age-related-mobility', 'stroke-paralysis-nerve-disorders'],
  },
  'inpatient-admission-facility': {
    sessionSubtitle: 'Continued rehabilitation support for patients who require hospital admission.',
    benefits: ['Rehabilitation during an inpatient stay', 'Ongoing mobility and functional support', 'Care coordinated around admission needs'],
    relatedConditionSlugs: ['fracture-joint-replacement-arthritis', 'stroke-paralysis-nerve-disorders'],
  },
  'diabetic-neuropathy-foot-rehabilitation': {
    sessionSubtitle: 'Specialized rehabilitation for diabetes-related numbness, tingling, weakness, and foot mobility concerns.',
    benefits: ['Foot and lower-limb strengthening', 'Balance and walking support', 'Guidance for safer daily mobility'],
    relatedConditionSlugs: ['diabetic-foot-symptoms'],
  },
  'senior-citizen-vitality-wellness': {
    sessionSubtitle: 'A 60+ wellness program supporting active mobility, energy, relaxation, and wellbeing.',
    benefits: ['Gentle support for active mobility', 'Physical and mental stress relief', 'Encouragement for energy and wellbeing'],
    relatedConditionSlugs: ['age-related-mobility'],
  },
};

const conditionDetailContent: Record<string, {
  commonSymptoms: string[];
  possibleCauses: string[];
  physioApproach: string[];
}> = {
  'back-neck-joint-pain': {
    commonSymptoms: ['Pain or stiffness in the back, neck, or joints', 'Reduced comfort during movement', 'Difficulty with work, travel, or everyday activity'],
    possibleCauses: ['Acute or persistent musculoskeletal pain', 'Joint or spine-related mobility problems', 'Strain linked to activity, posture, or daily load'],
    physioApproach: ['Assessment of pain, movement, and functional limits', 'A care plan focused on comfortable movement and activity', 'Progressive review based on mobility and daily function'],
  },
  'fracture-joint-replacement-arthritis': {
    commonSymptoms: ['Reduced movement during fracture recovery', 'Stiffness or weakness after joint replacement', 'Arthritis-related difficulty with mobility'],
    possibleCauses: ['Recovery following a fracture', 'Rehabilitation needs after joint replacement', 'Joint changes associated with arthritis'],
    physioApproach: ['Assessment of movement, strength, and functional needs', 'Progressive rehabilitation matched to recovery stage', 'Support for returning to safe everyday activity'],
  },
  'stroke-paralysis-nerve-disorders': {
    commonSymptoms: ['Changes in movement or muscle control', 'Difficulty with balance or coordination', 'Reduced independence in daily activities'],
    possibleCauses: ['Recovery needs following stroke', 'Movement limitations associated with paralysis', 'Neurological conditions including Parkinson’s or nerve disorders'],
    physioApproach: ['Individual assessment of movement and function', 'Guided balance, coordination, and mobility practice', 'Functional rehabilitation for everyday activities'],
  },
  'sports-injuries': {
    commonSymptoms: ['Pain or weakness after a sports injury', 'Reduced confidence with training or competition', 'Difficulty returning to normal athletic movement'],
    possibleCauses: ['Ligament injuries or muscle strains', 'Training-related overload', 'Incomplete strength or movement recovery'],
    physioApproach: ['Assessment of the injured area and activity goals', 'Progressive strength and movement reconditioning', 'A staged plan for returning to sport'],
  },
  'diabetic-foot-symptoms': {
    commonSymptoms: ['Numbness or tingling in the feet', 'Foot or lower-limb weakness', 'Reduced balance or confidence while walking'],
    possibleCauses: ['Diabetes-related neuropathy', 'Reduced foot strength or sensation', 'Mobility changes linked to foot symptoms'],
    physioApproach: ['Assessment of foot function, balance, and walking', 'Targeted strengthening and mobility work', 'Support for safer movement and daily activity'],
  },
  'age-related-mobility': {
    commonSymptoms: ['Reduced mobility or balance', 'Concern about falls', 'Lower confidence with everyday movement'],
    possibleCauses: ['Age-related changes in strength and balance', 'Reduced activity or mobility', 'Recovery needs following illness or periods of inactivity'],
    physioApproach: ['Assessment of mobility, balance, and functional goals', 'Balance re-education and fall-prevention support', 'Gentle progression toward safer, more active movement'],
  },
};

const treatmentDetailPageCopy = {
  primaryCtaLabel: 'Request an Appointment',
  secondaryCtaLabel: 'View Our Approach',
  suitableForHeading: 'Who This Service Supports',
  benefitsHeading: 'How This Service Can Help',
  approachHeading: 'Your Rehabilitation Pathway',
  approachIntro: 'Care begins with an individual assessment and progresses according to mobility, comfort, and functional goals.',
  faqHeading: 'Frequently Asked Questions',
  bookingEyebrow: 'Plan Your Visit',
  bookingHeading: 'Start With an Assessment',
  bookingDescription: 'Request an appointment and the clinic team will help arrange the most suitable care option.',
  bookingHighlights: ['Individual clinical assessment', 'Care plan based on rehabilitation needs', 'Choose from three Kollam branches'],
  bookingReassurance: 'Your request will be reviewed by the clinic team before the appointment is confirmed.',
  sidebarCtaLabel: 'Request an Appointment',
  relatedConditionsHeading: 'Related Conditions',
};

const conditionDetailPageCopy = {
  heroHighlights: ['Individual Assessment', 'Rehabilitation Plan'],
  primaryCtaLabel: 'Request an Assessment',
  symptomsHeading: 'Common Signs & Difficulties',
  causesHeading: 'Common Reasons People Seek Care',
  approachHeading: 'How Physiotherapy Can Support Recovery',
  approachIntro: 'The physiotherapy team assesses movement and function before recommending an individual rehabilitation plan.',
  medicalNotice: 'This information is educational and does not replace an individual clinical assessment. Care recommendations depend on each person’s symptoms, health, and rehabilitation needs.',
  bookingHighlights: ['Individual clinical assessment', 'Care plan based on rehabilitation needs', 'Choose from three Kollam branches'],
  bookingReassurance: 'Your request will be reviewed by the clinic team before the appointment is confirmed.',
  sidebarCtaLabel: 'Request an Assessment',
  relatedTreatmentsHeading: 'Recommended Services',
};

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
        : page.pageKey === 'treatments'
          ? 'Rehabilitation Care for Every Stage of Recovery'
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
    const detailContent = treatmentDetailContent[slug];
    transaction = transaction.patch(`treatment-${slug}`, (patch) => patch.set({
      heroImage: image(assetId),
      heroImageAlt: `${slug.replaceAll('-', ' ')} physiotherapy`,
      sessionSubtitle: detailContent.sessionSubtitle,
      benefits: detailContent.benefits,
      relatedConditionSlugs: detailContent.relatedConditionSlugs,
      detailPageCopy: treatmentDetailPageCopy,
    }));
  }

  for (const [slug, assetId] of Object.entries(conditionAssets)) {
    const detailContent = conditionDetailContent[slug];
    transaction = transaction.patch(`condition-${slug}`, (patch) => patch.set({
      image: image(assetId),
      imageAlt: `${slug.replaceAll('-', ' ')} rehabilitation support`,
      commonSymptoms: detailContent.commonSymptoms,
      possibleCauses: detailContent.possibleCauses,
      physioApproach: detailContent.physioApproach,
      actionEyebrow: 'Next Step',
      actionHeading: 'Discuss Your Symptoms',
      actionSubtitle: 'Request an assessment so the clinic can recommend the most suitable rehabilitation plan.',
      rebateNote: 'Care recommendations follow an individual clinical assessment.',
      detailPageCopy: conditionDetailPageCopy,
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
