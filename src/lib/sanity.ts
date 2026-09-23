import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
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
const builder = createImageUrlBuilder(sanityClient);

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

const EMPTY_CLINIC_SETTINGS: ClinicSettings = {
  name: '',
  tagline: '',
  phone: '',
  phoneRaw: '',
  email: '',
  address: { street: '', suburb: '', city: '', state: '', postcode: '', full: '' },
  openingHours: [],
  whatsappNumber: '',
  whatsappMessage: '',
  howItWorks: [],
  navbarPages: [],
};

// Sanity is the sole runtime source for clinic content. The empty structure keeps
// rendering safe during loading or an outage without shipping duplicate clinic data.
export async function fetchSanityClinicData() {
  const result = {
    settings: EMPTY_CLINIC_SETTINGS,
    treatments: [] as Treatment[],
    conditions: [] as Condition[],
    teamMembers: [] as TeamMember[],
    testimonials: [] as Testimonial[],
    galleryItems: [] as GalleryItem[],
    locations: [] as ClinicLocationItem[],
    customPages: [] as CustomPage[],
    status: {
      connected: false,
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      isUsingFallback: false,
      hasCustomContent: false,
      totalSanityDocs: 0,
      itemCounts: {
        treatments: 0,
        conditions: 0,
        team: 0,
        testimonials: 0,
        gallery: 0,
        locations: 0,
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
          avatar: t.avatar?.asset ? urlFor(t.avatar).auto('format').width(300).height(300).fit('crop').url() : undefined,
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
    result.status.isUsingFallback = false;
  }

  return result;
}
