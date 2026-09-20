import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import {
  Treatment,
  Condition,
  TeamMember,
  Testimonial,
  GalleryItem,
  ClinicSettings,
  ClinicLocationItem,
  CustomPage
} from '../types/clinic';
import {
  CLINIC_SETTINGS as DEFAULT_CLINIC_SETTINGS,
  TREATMENTS as DEFAULT_TREATMENTS,
  CONDITIONS as DEFAULT_CONDITIONS,
  TEAM_MEMBERS as DEFAULT_TEAM_MEMBERS,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  GALLERY_ITEMS as DEFAULT_GALLERY_ITEMS,
  CLINIC_LOCATIONS as DEFAULT_CLINIC_LOCATIONS
} from '../data/clinicData';
import { DEFAULT_MANAGED_PAGES } from '../data/pageContent';

// Sanity Project Configuration
export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || '41uk25bi';
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';
export const SANITY_API_VERSION = import.meta.env.VITE_SANITY_API_VERSION || '2024-03-01';

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false, // Set to false to ensure immediate updates when published
  perspective: 'published',
});

// Configure image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

export interface SanityStatus {
  connected: boolean;
  projectId: string;
  dataset: string;
  isUsingFallback: boolean;
  hasCustomContent: boolean;
  totalSanityDocs: number;
  itemCounts: {
    treatments: number;
    conditions: number;
    team: number;
    testimonials: number;
    gallery: number;
    locations: number;
    customPages: number;
  };
  lastChecked: string | null;
  error?: string | null;
}

// Data Fetching Helper with Graceful Fallback
export async function fetchSanityClinicData() {
  const result = {
    settings: DEFAULT_CLINIC_SETTINGS,
    treatments: DEFAULT_TREATMENTS,
    conditions: DEFAULT_CONDITIONS,
    teamMembers: DEFAULT_TEAM_MEMBERS,
    testimonials: DEFAULT_TESTIMONIALS,
    galleryItems: DEFAULT_GALLERY_ITEMS,
    locations: DEFAULT_CLINIC_LOCATIONS as ClinicLocationItem[],
    customPages: [] as CustomPage[],
    status: {
      connected: false,
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      isUsingFallback: true,
      hasCustomContent: false,
      totalSanityDocs: 0,
      itemCounts: {
        treatments: DEFAULT_TREATMENTS.length,
        conditions: DEFAULT_CONDITIONS.length,
        team: DEFAULT_TEAM_MEMBERS.length,
        testimonials: DEFAULT_TESTIMONIALS.length,
        gallery: DEFAULT_GALLERY_ITEMS.length,
        locations: DEFAULT_CLINIC_LOCATIONS.length,
        customPages: 0,
      },
      lastChecked: new Date().toISOString(),
      error: null as string | null,
    } as SanityStatus,
  };

  try {
    // Run GROQ batch query against Sanity CMS
    const data = await sanityClient.fetch(`{
      "settings": *[_id == "clinicSettings-singleton"][0]{
        ...,
        navbarPages[]{
          ...,
          "heroImageUrl": heroImage.asset->url,
          sections[]{
            ...,
            "imageUrl": image.asset->url
          }
        }
      },
      "treatments": *[_type == "treatment"] | order(order asc, title asc),
      "conditions": *[_type == "condition"] | order(order asc, title asc),
      "teamMembers": *[_type == "teamMember"] | order(order asc, experienceYears desc),
      "testimonials": *[_type == "testimonial"] | order(rating desc),
      "galleryItems": *[_type == "galleryItem"] | order(order asc, title asc),
      "clinicLocations": *[_type == "clinicLocation"] | order(order asc, name asc),
      "customPages": *[_type == "customPage"] | order(order asc, title asc)
    }`);

    result.status.connected = true;

    // Sanity is connected! Check if custom documents exist in the dataset
    const sanityTreatments = Array.isArray(data?.treatments) ? data.treatments : [];
    const sanityConditions = Array.isArray(data?.conditions) ? data.conditions : [];
    const sanityTeam = Array.isArray(data?.teamMembers) ? data.teamMembers : [];
    const sanityTestimonials = Array.isArray(data?.testimonials) ? data.testimonials : [];
    const sanityGallery = Array.isArray(data?.galleryItems) ? data.galleryItems : [];
    const sanityLocations = Array.isArray(data?.clinicLocations) ? data.clinicLocations : [];
    const sanityCustomPages = Array.isArray(data?.customPages) ? data.customPages : [];
    const sanitySettings = data?.settings;

    const totalSanityDocs =
      sanityTreatments.length +
      sanityConditions.length +
      sanityTeam.length +
      sanityTestimonials.length +
      sanityGallery.length +
      sanityLocations.length +
      sanityCustomPages.length +
      (sanitySettings ? 1 : 0);

    result.status.totalSanityDocs = totalSanityDocs;

    if (totalSanityDocs > 0) {
      result.status.hasCustomContent = true;
      result.status.isUsingFallback = false;

      if (sanitySettings) {
        result.settings = {
          ...sanitySettings,
          heroBgImage: sanitySettings.heroBgImage?.asset
            ? urlFor(sanitySettings.heroBgImage).auto('format').width(1800).url()
            : undefined,
          consultationImage: sanitySettings.consultationImage?.asset
            ? urlFor(sanitySettings.consultationImage).auto('format').width(1200).url()
            : undefined,
          openingHours: Array.isArray(sanitySettings.openingHours) ? sanitySettings.openingHours : [],
          healthFunds: Array.isArray(sanitySettings.healthFunds) ? sanitySettings.healthFunds : [],
          trustHighlights: Array.isArray(sanitySettings.trustHighlights) ? sanitySettings.trustHighlights : [],
          howItWorks: Array.isArray(sanitySettings.howItWorks) ? sanitySettings.howItWorks : [],
          navbarPages: Array.isArray(sanitySettings.navbarPages) ? sanitySettings.navbarPages : [],
        };
      }

      result.treatments = sanityTreatments.map((t: any, idx: number) => ({
          ...t,
          id: t._id || t.id || t.slug?.current || `treatment-${idx}`,
          slug: t.slug?.current || t.slug || t._id || t.id,
          heroImage: t.heroImage?.asset ? urlFor(t.heroImage).auto('format').width(1200).url() : undefined,
          suitableFor: Array.isArray(t.suitableFor) ? t.suitableFor : [],
          benefits: Array.isArray(t.benefits) ? t.benefits : [],
          approachSteps: Array.isArray(t.approachSteps) ? t.approachSteps : [],
          faqs: Array.isArray(t.faqs) ? t.faqs : [],
          relatedConditionSlugs: Array.isArray(t.relatedConditionSlugs) ? t.relatedConditionSlugs : [],
        }));

      result.conditions = sanityConditions.map((c: any, idx: number) => ({
          ...c,
          id: c._id || c.id || c.slug?.current || `condition-${idx}`,
          slug: c.slug?.current || c.slug || c._id || c.id,
          image: c.image?.asset ? urlFor(c.image).auto('format').width(1000).url() : undefined,
          commonSymptoms: Array.isArray(c.commonSymptoms) ? c.commonSymptoms : [],
          possibleCauses: Array.isArray(c.possibleCauses) ? c.possibleCauses : [],
          physioApproach: Array.isArray(c.physioApproach) ? c.physioApproach : [],
          relatedTreatmentSlugs: Array.isArray(c.relatedTreatmentSlugs) ? c.relatedTreatmentSlugs : [],
        }));

      result.teamMembers = sanityTeam.map((m: any, idx: number) => ({
          ...m,
          id: m._id || m.id || `team-${idx}`,
          photo: m.photo?.asset ? urlFor(m.photo).auto('format').width(600).url() : undefined,
        }));

      result.testimonials = sanityTestimonials.map((t: any, idx: number) => ({
          ...t,
          id: t._id || t.id || `testimonial-${idx}`,
        }));

      result.galleryItems = sanityGallery.map((g: any, idx: number) => ({
          ...g,
          id: g._id || g.id || `gallery-${idx}`,
          image: g.image?.asset ? urlFor(g.image).auto('format').width(1000).url() : undefined,
        }));

      result.locations = sanityLocations.map((l: any, idx: number) => ({
          ...l,
          id: l._id || l.id || `location-${idx}`,
          slug: l.slug?.current || l.slug || l._id || l.id,
        }));

      result.customPages = sanityCustomPages.map((p: any, idx: number) => ({
          ...p,
          id: p._id || p.id || `custom-page-${idx}`,
          slug: p.slug?.current || p.slug || p._id || p.id,
          bannerImage: p.bannerImage?.asset ? urlFor(p.bannerImage).auto('format').width(1600).url() : p.bannerImage,
          seoImage: p.seoImage?.asset ? urlFor(p.seoImage).auto('format').width(1200).height(630).fit('crop').url() : p.seoImage,
          sections: Array.isArray(p.sections)
            ? p.sections.map((section: any) => ({
                ...section,
                image: section.image?.asset
                  ? urlFor(section.image).auto('format').width(1200).url()
                  : section.image,
              }))
            : [],
        }));

      result.status.itemCounts = {
        treatments: sanityTreatments.length,
        conditions: sanityConditions.length,
        team: sanityTeam.length,
        testimonials: sanityTestimonials.length,
        gallery: sanityGallery.length,
        locations: sanityLocations.length,
        customPages: sanityCustomPages.length,
      };
    } else {
      result.status.hasCustomContent = false;
      result.status.isUsingFallback = false;
      result.treatments = [];
      result.conditions = [];
      result.teamMembers = [];
      result.testimonials = [];
      result.galleryItems = [];
      result.locations = [];
      result.customPages = [];
      result.status.itemCounts = {
        treatments: 0,
        conditions: 0,
        team: 0,
        testimonials: 0,
        gallery: 0,
        locations: 0,
        customPages: 0,
      };
    }
  } catch (err: any) {
    result.status.connected = false;
    result.status.error = err?.message || 'Failed to connect to Sanity dataset';
    result.status.isUsingFallback = true;
  }

  return result;
}

// Utility: Seed baseline clinic content into Sanity dataset via Sanity Write Token
export async function seedSanityDataset(token: string) {
  if (!token || !token.trim()) {
    throw new Error('A valid Sanity write token is required.');
  }

  const writeClient = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: SANITY_API_VERSION,
    token: token.trim(),
    useCdn: false,
  });

  const transaction = writeClient.transaction();

  // Helper to ensure each array item has a unique _key for Sanity
  const withKeys = (arr: any[] | undefined, prefix: string) => {
    if (!Array.isArray(arr)) return arr;
    return arr.map((item, idx) => ({
      ...item,
      _key: item._key || `${prefix}_${idx + 1}_${Math.random().toString(36).substring(2, 7)}`,
    }));
  };

  const navbarPages = Object.values(DEFAULT_MANAGED_PAGES).map((page) => ({
    ...page,
    _key: `page_${page.pageKey}`,
    heroImageUrl: undefined,
    sections: page.sections?.map((section) => ({
      ...section,
      _key: `${page.pageKey}_${section.key}`,
      imageUrl: undefined,
      items: section.items?.map((item) => ({ ...item, _key: `${page.pageKey}_${section.key}_${item.key}` })),
    })),
    filters: page.filters?.map((filter) => ({ ...filter, _key: `${page.pageKey}_filter_${filter.key}` })),
  }));

  // 1. Clinic Settings Document
  transaction.createOrReplace({
    _id: 'clinicSettings-singleton',
    _type: 'clinicSettings',
    name: DEFAULT_CLINIC_SETTINGS.name,
    tagline: DEFAULT_CLINIC_SETTINGS.tagline,
    foundedYear: '2009',
    heroEyebrow: 'Swastik Healthcare • Trusted Care Since 2009',
    heroTitle: 'Restore Mobility, Recover Faster & Live Pain Free Again',
    heroSubtitle: 'Comprehensive physiotherapy & physical rehabilitation from post-surgery recovery and mobility aids to independent movement and peak functional strength.',
    phone: DEFAULT_CLINIC_SETTINGS.phone,
    phoneRaw: DEFAULT_CLINIC_SETTINGS.phoneRaw,
    email: DEFAULT_CLINIC_SETTINGS.email,
    whatsappNumber: DEFAULT_CLINIC_SETTINGS.whatsappNumber,
    address: DEFAULT_CLINIC_SETTINGS.address,
    openingHours: withKeys(DEFAULT_CLINIC_SETTINGS.openingHours, 'hours'),
    howItWorks: withKeys(DEFAULT_CLINIC_SETTINGS.howItWorks, 'work'),
    navbarPages,
  });

  // 2. Treatments
  DEFAULT_TREATMENTS.forEach((t, i) => {
    transaction.createOrReplace({
      _id: `treatment-${t.slug}`,
      _type: 'treatment',
      title: t.title,
      slug: { _type: 'slug', current: t.slug },
      category: t.category,
      categoryLabel: t.categoryLabel,
      shortDescription: t.shortDescription,
      durationMinutes: t.durationMinutes,
      suitableFor: t.suitableFor,
      benefits: t.benefits,
      approachSteps: withKeys(t.approachSteps, `step_${t.slug}`),
      relatedConditionSlugs: t.relatedConditionSlugs,
      faqs: withKeys(t.faqs, `faq_${t.slug}`),
      order: i + 1,
    });
  });

  // 3. Conditions
  DEFAULT_CONDITIONS.forEach((c, i) => {
    transaction.createOrReplace({
      _id: `condition-${c.slug}`,
      _type: 'condition',
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
      bodyArea: c.bodyArea,
      bodyAreaLabel: c.bodyAreaLabel,
      shortDescription: c.shortDescription,
      overview: c.overview,
      commonSymptoms: c.commonSymptoms,
      possibleCauses: c.possibleCauses,
      physioApproach: c.physioApproach,
      relatedTreatmentSlugs: c.relatedTreatmentSlugs,
      order: i + 1,
    });
  });

  // 4. Team Members
  DEFAULT_TEAM_MEMBERS.forEach((m, i) => {
    transaction.createOrReplace({
      _id: `team-${m.id}`,
      _type: 'teamMember',
      name: m.name,
      role: m.role,
      title: m.title,
      qualifications: m.qualifications,
      experienceYears: m.experienceYears,
      specialization: m.specialization,
      bio: m.bio,
      ahpraNumber: m.ahpraNumber,
      isDirector: m.isDirector || false,
      order: i + 1,
    });
  });

  // 5. Testimonials
  DEFAULT_TESTIMONIALS.forEach((t, i) => {
    transaction.createOrReplace({
      _id: `testimonial-${t.id}`,
      _type: 'testimonial',
      name: t.name,
      conditionTreated: t.conditionTreated,
      rating: t.rating,
      review: t.review,
      verified: t.verified,
      location: t.location,
      order: i + 1,
    });
  });

  // 6. Locations
  DEFAULT_CLINIC_LOCATIONS.forEach((loc, i) => {
    transaction.createOrReplace({
      _id: `location-${loc.id}`,
      _type: 'clinicLocation',
      name: loc.name,
      slug: { _type: 'slug', current: loc.id },
      address: loc.address,
      phone: loc.phone,
      parking: loc.parking,
      order: i + 1,
    });
  });

  // 7. Gallery Items
  DEFAULT_GALLERY_ITEMS.forEach((g, i) => {
    transaction.createOrReplace({
      _id: `gallery-${g.id}`,
      _type: 'galleryItem',
      title: g.title,
      category: g.category,
      description: g.description,
      order: i + 1,
    });
  });

  // 8. Sample Custom Page: NDIS Support & Allied Health Services
  transaction.createOrReplace({
    _id: 'customPage-ndis-support',
    _type: 'customPage',
    title: 'NDIS Support & Allied Health Services',
    slug: { _type: 'slug', current: 'ndis-support' },
    badge: 'Approved Allied Health Provider',
    leadText: 'Swastik Healthcare supports self-managed and plan-managed NDIS participants across Sydney to achieve their mobility, independence, and physical therapy goals.',
    sections: [
      {
        _key: 'sec_ndis_1',
        heading: 'Empowering Independence Through Evidence-Based Physiotherapy',
        content: 'Our clinicians collaborate closely with participants, families, support coordinators, and plan managers to deliver goal-directed therapy aligned with NDIS plan budgets.',
        keyPoints: [
          'Direct billing for plan-managed and self-managed participants',
          'Comprehensive initial functional capacity assessments',
          'Assistive technology and mobility aid prescription',
          'Ongoing progress reports and end-of-plan reviews',
        ],
        callToActionText: 'Book an NDIS Consultation',
        callToActionLink: '/contact',
      },
    ],
    showInNav: true,
    order: 1,
  });

  const commitResult = await transaction.commit();
  return commitResult;
}
