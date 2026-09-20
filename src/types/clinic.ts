export interface Treatment {
  id: string;
  slug: string;
  title: string;
  category: 'sports' | 'spine' | 'rehabilitation' | 'manual' | 'specialized';
  categoryLabel: string;
  shortDescription: string;
  heroImage: string;
  iconName: string;
  durationMinutes: number;
  sessionSubtitle?: string;
  healthRebates?: string;
  referralRequirement?: string;
  suitableFor: string[];
  benefits: string[];
  approachSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  relatedConditionSlugs: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface Condition {
  id: string;
  slug: string;
  title: string;
  bodyArea: 'spine' | 'upper-limb' | 'lower-limb' | 'general';
  bodyAreaLabel: string;
  shortDescription: string;
  image: string;
  overview: string;
  commonSymptoms: string[];
  possibleCauses: string[];
  physioApproach: string[];
  actionEyebrow?: string;
  actionHeading?: string;
  actionSubtitle?: string;
  rebateNote?: string;
  relatedTreatmentSlugs: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  qualifications: string;
  experienceYears: number;
  specialization: string[];
  photo: string;
  bio: string;
  ahpraNumber: string;
  isDirector?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  conditionTreated: string;
  rating: number;
  review: string;
  verified: boolean;
  avatar?: string;
  location?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'clinic' | 'rehab' | 'equipment' | 'sessions';
  categoryLabel: string;
  image: string;
  description: string;
}

export interface ClinicLocationItem {
  id: string;
  name: string;
  slug?: string;
  address: string;
  phone?: string;
  parking?: string;
  mapEmbedUrl?: string;
  isPrimary?: boolean;
}

export interface CustomPageSection {
  heading?: string;
  content?: string;
  keyPoints?: string[];
  callToActionText?: string;
  callToActionLink?: string;
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  badge?: string;
  leadText?: string;
  bannerImage?: string;
  sections?: CustomPageSection[];
  metaTitle?: string;
  metaDescription?: string;
  showInNav?: boolean;
  order?: number;
}

export interface ClinicSettings {
  name: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  email: string;
  foundedYear?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroBgImage?: string;
  heroImageAlt?: string;
  heroPrimaryCtaLabel?: string;
  heroSecondaryCtaLabel?: string;
  heroBadge1Title?: string;
  heroBadge1Subtitle?: string;
  heroBadge2Title?: string;
  heroBadge2Subtitle?: string;
  whyChooseUsTitle?: string;
  whyChooseUsSubtitle?: string;
  servicesBadge?: string;
  servicesTitle?: string;
  servicesSubtitle?: string;
  consultationEyebrow?: string;
  consultationTitle?: string;
  consultationSubtitle?: string;
  consultationBenefits?: string[];
  consultationImage?: string;
  reviewsTitle?: string;
  teamTitle?: string;
  howItWorksEyebrow?: string;
  howItWorksTitle?: string;
  howItWorksSubtitle?: string;
  conditionsBadge?: string;
  conditionsTitle?: string;
  conditionsSubtitle?: string;
  address: {
    street: string;
    suburb: string;
    city: string;
    state: string;
    postcode: string;
    full: string;
  };
  openingHours: {
    days: string;
    hours: string;
  }[];
  whatsappNumber: string;
  whatsappMessage: string;
  healthFunds?: {
    name: string;
    badgeText?: string;
  }[];
  trustHighlights?: {
    id: string;
    title: string;
    icon: string;
  }[];
  howItWorks: {
    step: number;
    title: string;
    description: string;
  }[];
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  injuryConcern: string;
  location: string;
  treatmentSlug?: string;
  preferredPractitioner?: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}
