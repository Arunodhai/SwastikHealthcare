import { ClinicSettings, ManagedPage } from '../types/clinic';

export const DEFAULT_MANAGED_PAGES: Record<ManagedPage['pageKey'], ManagedPage> = {
  about: {
    pageKey: 'about',
    heroBadge: 'About Swastik Healthcare • Established 2009',
    heroTitle: 'A Modern, Evidence-Based Standard for Physical Rehabilitation.',
    heroDescription: 'Founded in 2009 on the conviction that rehabilitation should guide patients through every milestone of recovery — from initial immobility and assistive support to independent movement and lasting strength.',
    heroImageUrl: '/images/heroes/about-hero.webp',
    heroImageAlt: 'Physiotherapist discussing a personalised recovery plan with a patient',
    sections: [
      { key: 'story', eyebrow: 'Our Story & Clinical Mission (Since 2009)', title: 'Guiding Every Stage of Your Physical Recovery Journey.', body: ['Swastik Healthcare was established in 2009 with a patient-centered mission symbolized in our clinical emblem: guiding individuals from acute immobility, through progressive assisted walking, to standing proud and fully restored in their daily lives.', 'We built our clinic around an uncompromised standard: every patient deserves unhurried, private one-on-one attention, thorough diagnostic biomechanics, and a progressive rehabilitation roadmap tailored to their personal lifestyle and goals.'], imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80', imageAlt: 'Modern Swastik Healthcare clinic consultation suite', items: [
        { key: 'care', value: '100%', title: 'One-on-One Care', description: 'No double booking ever.' },
        { key: 'consults', value: '45m', title: 'Standard Consults', description: 'Time to listen & test.' },
        { key: 'gym', value: 'Full', title: 'Rehabilitation Gym', description: 'Real loading for real life.' },
      ] },
      { key: 'certification', title: 'AHPRA & APA Certified Standards', description: 'All clinicians undergo continuous postgraduate musculoskeletal education.' },
      { key: 'difference', eyebrow: 'The Clinic Difference', title: 'How We Are Different', description: 'We design your care to resolve underlying musculoskeletal deficits, not merely silence immediate symptoms.', items: [
        { key: 'private', title: 'Private Suites', description: 'Comfortable, quiet consultation rooms with acoustic privacy for thorough conversations and dignified care.', icon: 'Building2' },
        { key: 'gym', title: 'Functional Rehab Gym', description: 'Our integrated gym floor bridges the gap between passive therapy and return to high-demand sport or work.', icon: 'Sparkles' },
        { key: 'testing', title: 'Objective Testing', description: 'Dynamometry, force plates, and video gait analysis provide transparent recovery benchmarks at every milestone.', icon: 'ShieldCheck' },
        { key: 'referral', title: 'No Referral Needed', description: 'Private patients can book directly without waiting for a doctor referral. Instant HICAPS rebate processing.', icon: 'Heart' },
      ] },
      { key: 'team', eyebrow: 'Practitioners', title: 'Our Dedicated Clinical Team', description: 'Meet our university-trained physiotherapists and accredited exercise physiologists.' },
      { key: 'facilities', eyebrow: 'Our Facilities', title: 'Designed for Healing & Movement', ctaLabel: 'View Full Photo Gallery' },
      { key: 'cta', title: 'Experience the Swastik Healthcare Difference', description: 'Book an initial assessment with one of our senior physiotherapists. We look forward to welcoming you to our clinic.', ctaLabel: 'Book Your Consultation' },
    ],
  },
  treatments: {
    pageKey: 'treatments', heroBadge: 'Evidence-Based Clinical Services', heroTitle: 'Physiotherapy Treatments & Services', heroDescription: 'Every body is unique. We combine hands-on manual techniques, targeted exercise prescription, and progressive physical loading to deliver measurable recovery.', heroImageUrl: '/images/heroes/treatments-hero.webp', heroImageAlt: 'Physiotherapist guiding a patient through a resistance-band exercise',
    filters: [{ key: 'all', label: 'All Services' }, { key: 'sports', label: 'Sports & Performance' }, { key: 'spine', label: 'Spine & Posture' }, { key: 'rehabilitation', label: 'Rehabilitation' }, { key: 'manual', label: 'Manual Therapy' }, { key: 'specialized', label: 'Specialized' }],
    sections: [{ key: 'empty', description: 'No treatments currently found under this category.' }],
  },
  conditions: {
    pageKey: 'conditions', heroBadge: 'Musculoskeletal Diagnosis & Recovery', heroTitle: 'Conditions We Treat', heroDescription: 'Pain is an alarm signal, not a life sentence. Explore common joint, spinal, and muscular complaints, and learn how targeted physiotherapy restores pain-free movement.', heroImageUrl: '/images/heroes/conditions-hero.webp', heroImageAlt: "Physiotherapist assessing a patient's shoulder mobility",
    filters: [{ key: 'all', label: 'All Conditions' }, { key: 'spine', label: 'Spine & Neck' }, { key: 'upper-limb', label: 'Shoulder & Upper Limb' }, { key: 'lower-limb', label: 'Knee & Lower Limb' }, { key: 'general', label: 'Sports & Overuse' }],
    sections: [{ key: 'empty', description: 'No conditions found under this category filter.' }, { key: 'consultation', title: 'Not sure what is causing your symptoms?', description: 'Pain patterns often refer from other joints or nerve roots. An initial 45-minute clinical examination with our registered physiotherapists isolates the exact primary driver.', ctaLabel: 'Book Comprehensive Assessment' }],
  },
  gallery: {
    pageKey: 'gallery', heroBadge: 'Modern Clinical Environments', heroTitle: 'Clinic & Rehabilitation Gallery', heroDescription: 'Explore our modern treatment rooms, private consultation spaces, and fully equipped functional rehabilitation gym floor.', heroImageUrl: '/images/heroes/gallery-hero.webp', heroImageAlt: 'Bright, modern physiotherapy clinic and rehabilitation gym',
    filters: [{ key: 'all', label: 'All Photos' }, { key: 'clinic', label: 'Treatment Rooms' }, { key: 'rehab', label: 'Rehab Gym' }, { key: 'equipment', label: 'Clinical Equipment' }, { key: 'sessions', label: 'Clinical Care' }],
  },
  contact: {
    pageKey: 'contact', heroBadge: 'Get in Touch', heroTitle: 'Contact & Clinic Locations', heroDescription: 'We are conveniently located in modern medical hubs across Sydney with easy public transit and dedicated parking.', heroImageUrl: '/images/heroes/contact-hero.webp', heroImageAlt: 'Friendly reception team welcoming a patient to a modern physiotherapy clinic',
    sections: [
      { key: 'direct', title: 'Direct Clinic Contact', ctaLabel: 'Book Appointment Online', items: [{ key: 'phone', label: 'Phone Inquiries', description: 'Reception team available 7:00 AM - 7:30 PM' }, { key: 'email', label: 'Email Support', description: 'We respond to email inquiries within 3 business hours' }, { key: 'whatsapp', label: 'WhatsApp Chat', title: 'Chat With Clinic Coordinator →' }] },
      { key: 'form', eyebrow: 'Message Reception', title: 'Send Us a Message', description: 'Have questions regarding injury rehabilitation, health fund cover, or referral details?', ctaLabel: 'Send Message', items: [{ key: 'success', title: 'Message Sent Successfully', description: 'Thank you for contacting Swastik Healthcare. One of our clinical team members will be in touch with you shortly.' }] },
      { key: 'locations', eyebrow: 'Interactive Map & Directions', title: 'Find Your Nearest Clinic', items: [{ key: 'primary', label: 'Primary Facility' }, { key: 'parking', label: 'Parking & Transit Access:' }, { key: 'directions', label: 'Get Directions in Google Maps' }, { key: 'book', label: 'Book Here' }] },
    ],
  },
};

export function getManagedPage(settings: ClinicSettings, pageKey: ManagedPage['pageKey']): ManagedPage {
  const incoming = settings.navbarPages?.find((page) => page.pageKey === pageKey);
  return incoming || { pageKey, filters: [], sections: [] };
}

export const getManagedSection = (page: ManagedPage, key: string) => page.sections?.find((section) => section.key === key);
