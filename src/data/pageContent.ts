import { ClinicSettings, ManagedPage } from '../types/clinic';

export const DEFAULT_MANAGED_PAGES: Record<ManagedPage['pageKey'], ManagedPage> = {
  about: {
    pageKey: 'about',
    heroBadge: 'About Swastik Healthcare • Established 2009',
    heroTitle: 'Mission Wellness Since 2009.',
    heroDescription: 'Swastik Healthcare is a Physiotherapy & Rehabilitation Clinic serving Chavara, Nellimukku, and Decent Junction / Ayathil in Kollam.',
    heroImageUrl: '/images/heroes/about-hero.webp',
    heroImageAlt: 'Physiotherapist discussing a personalised recovery plan with a patient',
    sections: [
      { key: 'story', eyebrow: 'Our Clinic', title: 'Physiotherapy & Rehabilitation Across Kollam.', body: ['Established in 2009, Swastik Healthcare provides physiotherapy and rehabilitation services under the motto “Mission Wellness.”', 'The clinic is led by Founder & Chief Physiotherapist Dr. Ajay Ghosh J. (PT), MPT (Ortho & Sports Medicine), and operates from three branches in Kollam.'], imageUrl: '/images/team/dr-ajay-ghosh.png', imageAlt: 'Dr. Ajay Ghosh J., Founder and Chief Physiotherapist', items: [
        { key: 'years', value: '2009', title: 'Established', description: 'Physiotherapy & Rehabilitation Clinic.' },
        { key: 'branches', value: '3', title: 'Kollam Branches', description: 'Chavara, Nellimukku, and Ayathil.' },
        { key: 'services', value: '11', title: 'Listed Services', description: 'Clinic, home-visit, and inpatient care.' },
      ] },
      { key: 'certification', title: 'Founder & Chief Physiotherapist', description: 'Dr. Ajay Ghosh J. (PT), MPT (Ortho & Sports Medicine).' },
      { key: 'difference', eyebrow: 'Care Options', title: 'Rehabilitation Where It Is Needed', description: 'The brochure lists clinic-based treatment, home visits, and inpatient physiotherapy support.', items: [
        { key: 'branches', title: 'Three Kollam Branches', description: 'Choose Chavara, Nellimukku, or Decent Junction / Ayathil.', icon: 'Building2' },
        { key: 'home', title: 'Home Visit Physiotherapy', description: 'Doorstep support for bedridden, elderly, or mobility-limited patients.', icon: 'Heart' },
        { key: 'inpatient', title: 'Inpatient Facility', description: 'Admission-based physiotherapy support is available.', icon: 'ShieldCheck' },
        { key: 'wellness', title: 'Mission Wellness', description: 'Rehabilitation support for children, adults, athletes, and senior citizens.', icon: 'Sparkles' },
      ] },
      { key: 'team', eyebrow: 'Clinical Leadership', title: 'Meet Dr. Ajay Ghosh J. (PT)', description: 'Founder & Chief Physiotherapist, MPT (Ortho & Sports Medicine).' },
      { key: 'facilities', eyebrow: 'Locations', title: 'Three Branches Across Kollam', ctaLabel: 'View Clinic Locations' },
      { key: 'cta', title: 'Begin Your Rehabilitation Journey', description: 'Request an appointment at the branch that is most convenient for you.', ctaLabel: 'Request an Appointment' },
    ],
  },
  treatments: {
    pageKey: 'treatments', heroBadge: '11 Services from the Official Clinic Brochure', heroTitle: 'Physiotherapy Treatments & Services', heroDescription: 'Explore the orthopaedic, neurological, pain, sports, pediatric, cardio-pulmonary, home, inpatient, diabetic foot, and senior wellness services available at Swastik Healthcare.', heroImageUrl: '/images/heroes/treatments-hero.webp', heroImageAlt: 'Physiotherapist guiding a rehabilitation exercise',
    filters: [{ key: 'all', label: 'All Services' }, { key: 'sports', label: 'Sports & Performance' }, { key: 'spine', label: 'Spine & Posture' }, { key: 'rehabilitation', label: 'Rehabilitation' }, { key: 'manual', label: 'Manual Therapy' }, { key: 'specialized', label: 'Specialized' }],
    sections: [{ key: 'empty', description: 'No treatments currently found under this category.' }],
  },
  conditions: {
    pageKey: 'conditions', heroBadge: 'Rehabilitation Support', heroTitle: 'Conditions We Support', heroDescription: 'Learn about the main pain, mobility, neurological, sports, diabetic foot, and age-related needs covered by the clinic’s listed services.', heroImageUrl: '/images/heroes/conditions-hero.webp', heroImageAlt: "Physiotherapist assessing a patient's mobility",
    filters: [{ key: 'all', label: 'All Conditions' }, { key: 'spine', label: 'Spine & Neck' }, { key: 'upper-limb', label: 'Shoulder & Upper Limb' }, { key: 'lower-limb', label: 'Knee & Lower Limb' }, { key: 'general', label: 'Sports & Overuse' }],
    sections: [{ key: 'empty', description: 'No conditions found under this category filter.' }, { key: 'consultation', title: 'Not sure which service is suitable?', description: 'Request an appointment for an individual physiotherapy assessment.', ctaLabel: 'Request an Assessment' }],
  },
  gallery: {
    pageKey: 'gallery', heroBadge: 'Swastik Healthcare', heroTitle: 'Clinic Gallery', heroDescription: 'Verified clinic photographs will be added here as they become available.', heroImageUrl: '/images/heroes/gallery-hero.webp', heroImageAlt: 'Physiotherapy and rehabilitation clinic',
    filters: [{ key: 'all', label: 'All Photos' }, { key: 'clinic', label: 'Treatment Rooms' }, { key: 'rehab', label: 'Rehab Gym' }, { key: 'equipment', label: 'Clinical Equipment' }, { key: 'sessions', label: 'Clinical Care' }],
  },
  contact: {
    pageKey: 'contact', heroBadge: 'Three Branches in Kollam', heroTitle: 'Clinic Locations & Opening Hours', heroDescription: 'Visit Swastik Healthcare in Chavara, Nellimukku, or Decent Junction / Ayathil, Kollam.', heroImageUrl: '/images/heroes/contact-hero.webp', heroImageAlt: 'Physiotherapy clinic reception',
    sections: [
      { key: 'direct', title: 'Clinic Information', ctaLabel: 'Request an Appointment', items: [{ key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' }, { key: 'whatsapp', label: 'WhatsApp' }] },
      { key: 'form', eyebrow: 'Appointment Request', title: 'Send Your Details', description: 'Tell us which service and branch you prefer.', ctaLabel: 'Send Request', items: [{ key: 'success', title: 'Request Received', description: 'Thank you for contacting Swastik Healthcare.' }] },
      { key: 'locations', eyebrow: 'Kollam, Kerala', title: 'Choose Your Nearest Branch', items: [{ key: 'primary', label: 'Primary Branch' }, { key: 'parking', label: 'Location details:' }, { key: 'directions', label: 'Open in Google Maps' }, { key: 'book', label: 'Request Here' }] },
    ],
  },
};

export function getManagedPage(settings: ClinicSettings, pageKey: ManagedPage['pageKey']): ManagedPage {
  const incoming = settings.navbarPages?.find((page) => page.pageKey === pageKey);
  return incoming || DEFAULT_MANAGED_PAGES[pageKey];
}

export const getManagedSection = (page: ManagedPage, key: string) => page.sections?.find((section) => section.key === key);
