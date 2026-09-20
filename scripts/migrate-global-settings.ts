import { getCliClient } from 'sanity/cli';
import { CLINIC_SETTINGS } from '../src/data/clinicData';

const client = getCliClient({ apiVersion: '2024-03-01' });

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

const consultationAssetId = await uploadRemoteImage(
  'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=85',
  'clinic-consultation.jpg',
);

const uiCopy = {
  navHomeLabel: 'Home',
  navAboutLabel: 'About Us',
  navTreatmentsLabel: 'Treatments',
  navConditionsLabel: 'Conditions We Treat',
  navGalleryLabel: 'Gallery',
  navContactLabel: 'Contact',
  headerBookingLabel: 'Book an Appointment',
  headerMobileBookingLabel: 'Book',
  mobileRebateNote: 'Health Fund Rebates (HICAPS) on the spot',
  homeServicesCtaLabel: 'View All Services',
  homeTeamCredentialsLabel: 'View All Credentials',
  homeTeamCtaLabel: 'View Our Team',
  homeConditionsCtaLabel: 'Explore All Musculoskeletal Conditions',
  quickFormTitle: 'Request an Appointment',
  quickFormSubtitle: 'We will contact you promptly to confirm your appointment time.',
  quickFormSubmitLabel: 'Book My Appointment',
  footerEyebrow: 'Begin Your Rehabilitation',
  footerTitle: 'Ready to Regain Full Mobility and Live Pain Free?',
  footerSubtitle: 'Appointments available this week across our modern clinical hubs.',
  footerBookingLabel: 'Book an Appointment',
  footerMission: 'Helping patients move from injury to complete mobility, recovering independence and rebuilding physical resilience through evidence-based musculoskeletal care, hands-on therapy, and structured rehabilitation since 2009.',
  footerAccreditationPrimary: 'AHPRA Registered',
  footerAccreditationSecondary: 'APA Member Clinic',
  footerServicesHeading: 'Services',
  footerConditionsHeading: 'Conditions',
  footerClinicHeading: 'Clinic',
  footerContactHeading: 'Contact & Hours',
  footerAboutLabel: 'About Our Clinic',
  footerTeamLabel: 'Our Physiotherapists',
  footerGalleryLabel: 'Facility & Gallery',
  footerLocationsLabel: 'Locations & Directions',
  footerStudioLabel: 'Sanity CMS Studio',
  footerBookingLinkLabel: 'Book Online',
  footerPrivacyLabel: 'Privacy Policy',
  footerTermsLabel: 'Terms of Care',
  footerNdisLabel: 'NDIS Provider Info',
  footerPatientRightsLabel: 'Patient Rights',
  whatsappTooltipTitle: 'Clinic Reception Online',
  whatsappTooltipText: 'Have a question about injuries or fees? Chat with our team on WhatsApp.',
  whatsappCtaLabel: 'Start WhatsApp Chat',
  whatsappButtonLabel: 'Chat on WhatsApp',
};

const values = {
  heroBadge1Title: CLINIC_SETTINGS.heroBadge1Title,
  heroBadge1Subtitle: CLINIC_SETTINGS.heroBadge1Subtitle,
  heroBadge2Title: CLINIC_SETTINGS.heroBadge2Title,
  heroBadge2Subtitle: CLINIC_SETTINGS.heroBadge2Subtitle,
  servicesBadge: 'Clinical Expertise',
  servicesTitle: 'Our Physiotherapy Services',
  servicesSubtitle: 'Targeted treatment plans designed by registered physiotherapists to alleviate pain, rebuild mobility, and return you to full capacity.',
  whyChooseUsTitle: 'Why Patients Choose Us',
  whyChooseUsSubtitle: 'Our clinical standard ensures every patient receives focused, evidence-based attention.',
  consultationEyebrow: 'Fast Consultation Access',
  consultationTitle: 'Need Help With Pain, Injury or Recovery?',
  consultationSubtitle: 'Book an appointment with our experienced clinical team today and start feeling better, sooner.',
  consultationBenefits: [
    'Same-week appointments available',
    'Private health rebates (HICAPS on-the-spot)',
    'Experienced & caring clinical team',
    'Multiple clinic locations across Sydney',
  ],
  consultationImage: { _type: 'image', asset: { _type: 'reference', _ref: consultationAssetId } },
  consultationImageAlt: 'Swastik Healthcare clinic treatment room',
  reviewsTitle: 'What Our Patients Say',
  teamTitle: 'Meet Our Physiotherapists',
  howItWorksEyebrow: 'Clear Recovery Process',
  howItWorksTitle: 'How It Works',
  howItWorksSubtitle: 'From your first diagnostic session to lasting physical resilience.',
  conditionsBadge: 'Targeted Recovery',
  conditionsTitle: 'Conditions We Treat',
  conditionsSubtitle: 'From acute sports injuries to persistent spine complaints, our therapists address root mechanics rather than masking symptoms.',
  trustHighlights: CLINIC_SETTINGS.trustHighlights,
  healthFunds: CLINIC_SETTINGS.healthFunds,
  whatsappMessage: CLINIC_SETTINGS.whatsappMessage,
  uiCopy,
};

const targetIds: string[] = await client.fetch(
  '*[_id in ["clinicSettings-singleton", "drafts.clinicSettings-singleton"]]._id',
);

if (!targetIds.includes('clinicSettings-singleton')) {
  throw new Error('The published Clinic Settings document was not found.');
}

const transaction = client.transaction();
for (const id of targetIds) {
  transaction.patch(id, (patch) => patch.setIfMissing(values));
}

const result = await transaction.commit({ autoGenerateArrayKeys: true });
console.log(JSON.stringify({ updatedDocuments: targetIds, transactionId: result.transactionId }, null, 2));
