import { Treatment, Condition, TeamMember, Testimonial, GalleryItem, ClinicSettings, ClinicLocationItem } from '../types/clinic';

export const CLINIC_SETTINGS: ClinicSettings = {
  name: 'Swastik Healthcare',
  tagline: 'Physiotherapy & Rehabilitation Clinic',
  phone: '',
  phoneRaw: '',
  email: '',
  foundedYear: '2009',
  heroEyebrow: 'Trusted Care Since 2009',
  heroTitle: 'Mission Wellness Through Physiotherapy & Rehabilitation',
  heroSubtitle: 'Specialized physiotherapy services across Chavara, Nellimukku, and Decent Junction in Kollam, led by Founder & Chief Physiotherapist Dr. Ajay Ghosh J. (PT).',
  heroPrimaryCtaLabel: 'Request an Appointment',
  heroSecondaryCtaLabel: 'View Treatments',
  heroBadge1Title: '3 Branches',
  heroBadge1Subtitle: 'Across Kollam',
  heroBadge2Title: 'Founder-Led Care',
  heroBadge2Subtitle: 'MPT Ortho & Sports Medicine',
  heroBgImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1800&q=80',
  heroImageAlt: 'Physiotherapy and rehabilitation care',
  whyChooseUsTitle: 'Physiotherapy Support for Every Stage of Recovery',
  whyChooseUsSubtitle: 'Clinic-based, home-visit, and inpatient rehabilitation services for people of different ages and mobility needs.',
  servicesBadge: 'Treatments & Facilities',
  servicesTitle: 'Specialized Physiotherapy Services',
  servicesSubtitle: 'Eleven treatment and rehabilitation services listed in the official Swastik Healthcare brochure.',
  consultationEyebrow: 'Choose Your Nearest Branch',
  consultationTitle: 'Start Your Rehabilitation Journey',
  consultationSubtitle: 'Request an appointment at Chavara, Nellimukku, or Decent Junction / Ayathil.',
  consultationBenefits: ['Orthopaedic and neurological rehabilitation', 'Sports injury and pain management services', 'Home-visit physiotherapy for bedridden or elderly patients', 'Inpatient physiotherapy admission facility', 'Dedicated programs for diabetic foot care and adults aged 60+'],
  reviewsTitle: '',
  teamTitle: 'Founder & Chief Physiotherapist',
  howItWorksEyebrow: 'Getting Started',
  howItWorksTitle: 'A Clear Path to Care',
  howItWorksSubtitle: 'Select the service and branch that best match your rehabilitation needs.',
  conditionsBadge: 'Areas of Care',
  conditionsTitle: 'Conditions We Support',
  conditionsSubtitle: 'Rehabilitation support for joint, nerve, mobility, sports, age-related, and cardio-pulmonary needs.',
  address: { street: 'Near Govt. Hospital, Titanium Junction', suburb: 'Chavara', city: 'Kollam', state: 'Kerala', postcode: '', full: 'Near Govt. Hospital, Titanium Junction, Chavara, Kollam, Kerala, India' },
  openingHours: [
    { days: 'Chavara & Nellimukku — Monday to Saturday', hours: '9:00 AM – 9:00 PM' },
    { days: 'Chavara & Nellimukku — Sunday', hours: '9:00 AM – 2:00 PM' },
    { days: 'Decent Junction / Ayathil — Monday to Saturday', hours: '9:00 AM – 4:00 PM' },
    { days: 'Decent Junction / Ayathil — Sunday', hours: 'Closed' },
  ],
  whatsappNumber: '',
  whatsappMessage: '',
  healthFunds: [{ name: 'Orthopaedic Rehabilitation' }, { name: 'Neurological Rehabilitation' }, { name: 'Sports Injury Rehabilitation' }, { name: 'Home Visit Physiotherapy' }, { name: 'Inpatient Facility' }, { name: 'Senior Wellness (60+)' }],
  trustHighlights: [
    { id: '1', title: 'Established in 2009', icon: 'CalendarCheck' },
    { id: '2', title: 'Three Branches in Kollam', icon: 'Building2' },
    { id: '3', title: 'MPT in Ortho & Sports Medicine', icon: 'GraduationCap' },
    { id: '4', title: 'Home Visit Physiotherapy', icon: 'HeartHandshake' },
    { id: '5', title: 'Inpatient Admission Facility', icon: 'ShieldCheck' },
    { id: '6', title: 'Senior Citizen Wellness', icon: 'Activity' },
  ],
  howItWorks: [
    { step: 1, title: 'Choose a Service', description: 'Review the available physiotherapy and rehabilitation services.' },
    { step: 2, title: 'Select a Branch', description: 'Choose Chavara, Nellimukku, or Decent Junction / Ayathil.' },
    { step: 3, title: 'Request an Appointment', description: 'Share your concern and preferred visit details.' },
    { step: 4, title: 'Attend an Assessment', description: 'Meet the clinical team for an individual physiotherapy assessment.' },
  ],
  uiCopy: {
    navHomeLabel: 'Home', navAboutLabel: 'About Us', navTreatmentsLabel: 'Treatments', navConditionsLabel: 'Conditions', navGalleryLabel: 'Gallery', navContactLabel: 'Contact',
    headerBookingLabel: 'Request Appointment', headerMobileBookingLabel: 'Request Appointment',
    homeServicesCtaLabel: 'View All Treatments', homeTeamCredentialsLabel: 'About Dr. Ajay', homeTeamCtaLabel: 'Meet Our Founder', homeConditionsCtaLabel: 'View Conditions',
    quickFormTitle: 'Request an Appointment', quickFormSubtitle: 'Choose a branch and tell us how we can help.', quickFormSubmitLabel: 'Send Request',
    footerEyebrow: 'Mission Wellness', footerTitle: 'Ready to Begin?', footerSubtitle: 'Request an appointment at one of our three Kollam branches.', footerBookingLabel: 'Request Appointment',
    footerMission: 'Swastik Healthcare — Physiotherapy & Rehabilitation Clinic, serving Kollam since 2009.', footerAccreditationPrimary: 'Since 2009', footerAccreditationSecondary: 'Mission Wellness',
    footerServicesHeading: 'Treatments', footerConditionsHeading: 'Conditions', footerClinicHeading: 'Clinic', footerContactHeading: 'Locations & Hours', footerAboutLabel: 'About Us', footerTeamLabel: 'Dr. Ajay Ghosh', footerGalleryLabel: 'Gallery', footerLocationsLabel: 'Locations', footerStudioLabel: 'Content Studio', footerBookingLinkLabel: 'Request Appointment', footerPrivacyLabel: 'Privacy', footerTermsLabel: 'Terms',
  },
};

const service = (slug: string, title: string, category: Treatment['category'], categoryLabel: string, shortDescription: string, suitableFor: string[], benefits: string[], iconName = 'Activity'): Treatment => ({
  id: slug, slug, title, category, categoryLabel, shortDescription, iconName, suitableFor, benefits,
  approachSteps: [
    { step: 1, title: 'Clinical Assessment', description: 'The physiotherapy team reviews the patient’s symptoms, movement, and rehabilitation needs.' },
    { step: 2, title: 'Individual Care Plan', description: 'A treatment plan is selected according to the person’s condition and functional goals.' },
    { step: 3, title: 'Guided Rehabilitation', description: 'Physiotherapy is progressed with regular review of mobility, comfort, and function.' },
  ],
  relatedConditionSlugs: [], faqs: [],
});

export const TREATMENTS: Treatment[] = [
  service('orthopaedic-rehabilitation', 'Orthopaedic Rehabilitation', 'rehabilitation', 'Orthopaedic Care', 'Rehabilitation for post-fracture recovery, joint replacement, arthritis, and spine-related conditions.', ['People recovering after fractures', 'People recovering after joint replacement', 'People managing arthritis or spine-related mobility problems'], ['Support for movement, strength, and functional recovery'], 'Bone'),
  service('neurological-rehabilitation', 'Neurological Rehabilitation', 'specialized', 'Neuro Rehabilitation', 'Rehabilitation support for stroke recovery, paralysis, Parkinson’s disease, and nerve disorders.', ['People recovering from stroke', 'People living with paralysis, Parkinson’s disease, or nerve disorders'], ['Support for movement, balance, coordination, and daily function'], 'Brain'),
  service('pain-management-clinic', 'Pain Management Clinic', 'manual', 'Pain Management', 'Physiotherapy support for acute and persistent back, neck, and joint pain.', ['People with back, neck, or joint pain', 'People seeking support for acute or persistent pain'], ['A structured approach to pain relief and improved movement'], 'HeartPulse'),
  service('geriatric-physiotherapy', 'Geriatric Physiotherapy', 'rehabilitation', 'Older Adult Care', 'Mobility, balance re-education, and fall-prevention support for older adults.', ['Older adults with reduced mobility or balance', 'People seeking fall-prevention support'], ['Support for safer movement, balance, and independence'], 'Accessibility'),
  service('sports-injury-rehabilitation', 'Sports Injury Rehabilitation', 'sports', 'Sports Rehabilitation', 'Rehabilitation for ligament injuries, strains, athletic reconditioning, and return to sport.', ['People recovering from sports injuries', 'Athletes preparing to return to activity'], ['Support for strength, movement, and return to sport'], 'Flame'),
  service('pediatric-physiotherapy', 'Pediatric Physiotherapy', 'specialized', 'Children’s Physiotherapy', 'Physiotherapy for developmental delays, cerebral palsy, and postural correction in children.', ['Children with developmental movement needs', 'Children who need postural or mobility support'], ['Age-appropriate support for movement and function'], 'Baby'),
  service('cardio-pulmonary-rehabilitation', 'Cardio-Pulmonary Rehabilitation', 'rehabilitation', 'Cardio-Pulmonary Care', 'Rehabilitation to support respiratory endurance and conditioning after cardiac or respiratory illness.', ['People rebuilding endurance after cardiac or respiratory illness', 'People who need guided breathing and conditioning support'], ['Support for breathing efficiency, endurance, and everyday activity'], 'HeartPulse'),
  service('home-visit-physiotherapy', 'Home Visit Physiotherapy', 'specialized', 'Home Care', 'Doorstep physiotherapy for bedridden, elderly, or mobility-limited patients.', ['Bedridden patients', 'Older adults or people who find clinic travel difficult'], ['Physiotherapy support delivered at home'], 'House'),
  service('inpatient-admission-facility', 'Inpatient / Admission Facility', 'specialized', 'Inpatient Care', 'Admission-based physiotherapy support for people who require residential rehabilitation.', ['People who require inpatient rehabilitation support', 'Patients who need continued physiotherapy with hospital admission'], ['Access to physiotherapy as part of an inpatient stay'], 'Hospital'),
  service('diabetic-neuropathy-foot-rehabilitation', 'Diabetic Neuropathy & Foot Rehabilitation', 'specialized', 'Diabetic Foot Care', 'Specialized physiotherapy for numbness, tingling, and weakness in the legs or feet associated with diabetes.', ['People with diabetes-related foot or leg numbness', 'People with tingling or weakness affecting walking'], ['Support for foot function, strength, balance, and mobility'], 'Footprints'),
  service('senior-citizen-vitality-wellness', 'Senior Citizen Vitality & Wellness Program (60+)', 'rehabilitation', 'Senior Wellness', 'A program for adults aged 60 and above focused on easing physical and mental stress while supporting mobility, energy, and wellbeing.', ['Adults aged 60 and above', 'Older adults seeking gentle activity and wellbeing support'], ['Support for active mobility, energy, relaxation, and wellbeing'], 'Sparkles'),
];

const condition = (slug: string, title: string, bodyArea: Condition['bodyArea'], bodyAreaLabel: string, shortDescription: string, relatedTreatmentSlugs: string[]): Condition => ({
  id: slug, slug, title, bodyArea, bodyAreaLabel, shortDescription, overview: shortDescription, commonSymptoms: [], possibleCauses: [], physioApproach: ['Individual assessment and a rehabilitation plan selected for the person’s needs.'], relatedTreatmentSlugs,
});

export const CONDITIONS: Condition[] = [
  condition('back-neck-joint-pain', 'Back, Neck & Joint Pain', 'spine', 'Pain & Mobility', 'Support for acute or persistent pain affecting the back, neck, or joints.', ['pain-management-clinic', 'orthopaedic-rehabilitation']),
  condition('fracture-joint-replacement-arthritis', 'Fracture, Joint Replacement & Arthritis Recovery', 'lower-limb', 'Orthopaedic Recovery', 'Rehabilitation after fractures or joint replacement and support for arthritis-related mobility needs.', ['orthopaedic-rehabilitation']),
  condition('stroke-paralysis-nerve-disorders', 'Stroke, Paralysis & Nerve Disorders', 'general', 'Neurological Recovery', 'Neurological rehabilitation support for movement, balance, and daily function.', ['neurological-rehabilitation']),
  condition('sports-injuries', 'Sports Injuries', 'general', 'Sports Recovery', 'Rehabilitation for ligament injuries, strains, and return to sport.', ['sports-injury-rehabilitation']),
  condition('diabetic-foot-symptoms', 'Diabetes-Related Foot Symptoms', 'lower-limb', 'Diabetic Foot Care', 'Support for numbness, tingling, or weakness affecting the feet and legs.', ['diabetic-neuropathy-foot-rehabilitation']),
  condition('age-related-mobility', 'Age-Related Mobility & Balance', 'general', 'Older Adult Care', 'Mobility, balance, fall-prevention, and wellbeing support for older adults.', ['geriatric-physiotherapy', 'senior-citizen-vitality-wellness']),
];

export const TEAM_MEMBERS: TeamMember[] = [{
  id: 'dr-ajay-ghosh', name: 'Dr. Ajay Ghosh J. (PT)', role: 'Founder & Chief Physiotherapist', title: 'MPT (Ortho & Sports Medicine)', qualifications: 'MPT (Ortho & Sports Medicine)', specialization: ['Orthopaedic Rehabilitation', 'Sports Injury Rehabilitation', 'Physiotherapy & Rehabilitation'], photo: '/images/team/dr-ajay-ghosh.png', bio: 'Founder and Chief Physiotherapist of Swastik Healthcare, a Physiotherapy & Rehabilitation Clinic established in 2009 with the motto “Mission Wellness.”', isDirector: true,
}];

export const TESTIMONIALS: Testimonial[] = [];
export const GALLERY_ITEMS: GalleryItem[] = [];

export const CLINIC_LOCATIONS: ClinicLocationItem[] = [
  { id: 'chavara', slug: 'chavara', name: 'Chavara Branch', address: 'Near Govt. Hospital, Titanium Junction, Chavara, Kollam, Kerala', isPrimary: true },
  { id: 'nellimukku', slug: 'nellimukku', name: 'Nellimukku Branch', address: 'Ground Floor, Bone and Joint Care, Nellimukku, Kollam, Kerala', isPrimary: false },
  { id: 'decent-junction-ayathil', slug: 'decent-junction-ayathil', name: 'Decent Junction / Ayathil Branch', address: 'Ground Floor, C. Achuthamenon Cooperative Hospital, Decent Junction, Ayathil, Kollam, Kerala', isPrimary: false },
];
