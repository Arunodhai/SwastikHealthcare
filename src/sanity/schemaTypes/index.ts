// Sanity Studio Schema Definitions for Swastik Healthcare Website (Project ID: 41uk25bi)
// Complete CMS coverage for all pages, treatments, conditions, team, locations, gallery, navigation, and settings.

export const treatmentSchema = {
  name: 'treatment',
  title: 'Treatments & Services',
  type: 'document',
  fields: [
    { name: 'title', title: 'Treatment Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug (URL path)', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Sports & Performance', value: 'sports' },
          { title: 'Spine & Posture', value: 'spine' },
          { title: 'Rehabilitation & Post-Op', value: 'rehabilitation' },
          { title: 'Manual & Soft Tissue Therapy', value: 'manual' },
          { title: 'Specialized Clinical Services', value: 'specialized' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'categoryLabel', title: 'Category Label', type: 'string' },
    { name: 'shortDescription', title: 'Short Summary', type: 'text', rows: 3 },
    { name: 'heroImage', title: 'Feature Image', type: 'image', options: { hotspot: true } },
    { name: 'iconName', title: 'Icon Name (e.g. Flame, Activity, ShieldCheck, HeartPulse)', type: 'string' },
    { name: 'durationMinutes', title: 'Standard Duration (Minutes)', type: 'number' },
    { name: 'sessionSubtitle', title: 'Booking Card Subtitle', type: 'string' },
    { name: 'healthRebates', title: 'Health Rebates Label', type: 'string' },
    { name: 'referralRequirement', title: 'Referral Requirement Label', type: 'string' },
    { name: 'suitableFor', title: 'Who is this suitable for?', type: 'array', of: [{ type: 'string' }] },
    { name: 'benefits', title: 'Core Clinical Benefits', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'approachSteps',
      title: 'Clinical Approach Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', title: 'Step Number', type: 'number' },
            { name: 'title', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Step Description', type: 'text', rows: 2 },
          ],
        },
      ],
    },
    {
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text', rows: 3 },
          ],
        },
      ],
    },
    { name: 'relatedConditionSlugs', title: 'Related Condition Slugs', type: 'array', of: [{ type: 'string' }] },
    { name: 'order', title: 'Display Order', type: 'number', initialValue: 1 },
  ],
};

export const conditionSchema = {
  name: 'condition',
  title: 'Conditions We Treat',
  type: 'document',
  fields: [
    { name: 'title', title: 'Condition Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug (URL path)', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    {
      name: 'bodyArea',
      title: 'Body Region',
      type: 'string',
      options: {
        list: [
          { title: 'Spine & Neck', value: 'spine' },
          { title: 'Upper Limb (Shoulder, Elbow, Wrist)', value: 'upper-limb' },
          { title: 'Lower Limb (Hip, Knee, Ankle)', value: 'lower-limb' },
          { title: 'General & Overuse', value: 'general' },
        ],
      },
    },
    { name: 'bodyAreaLabel', title: 'Body Region Label', type: 'string' },
    { name: 'shortDescription', title: 'Short Summary', type: 'text', rows: 2 },
    { name: 'image', title: 'Condition Photo / Diagram', type: 'image', options: { hotspot: true } },
    { name: 'overview', title: 'Detailed Clinical Overview', type: 'text', rows: 4 },
    { name: 'commonSymptoms', title: 'Common Symptoms', type: 'array', of: [{ type: 'string' }] },
    { name: 'possibleCauses', title: 'Possible Causes', type: 'array', of: [{ type: 'string' }] },
    { name: 'physioApproach', title: 'Physiotherapy Treatment Approach', type: 'array', of: [{ type: 'string' }] },
    { name: 'actionEyebrow', title: 'Sidebar Card Eyebrow', type: 'string' },
    { name: 'actionHeading', title: 'Sidebar Card Heading', type: 'string' },
    { name: 'actionSubtitle', title: 'Sidebar Card Subtitle', type: 'string' },
    { name: 'rebateNote', title: 'Health Fund Rebate Note', type: 'string' },
    { name: 'relatedTreatmentSlugs', title: 'Related Treatment Slugs', type: 'array', of: [{ type: 'string' }] },
    { name: 'order', title: 'Display Order', type: 'number', initialValue: 1 },
  ],
};

export const teamMemberSchema = {
  name: 'teamMember',
  title: 'Practitioners & Team',
  type: 'document',
  fields: [
    { name: 'name', title: 'Full Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'role', title: 'Position / Role', type: 'string' },
    { name: 'title', title: 'Professional Title', type: 'string' },
    { name: 'qualifications', title: 'Degrees & Certifications', type: 'string' },
    { name: 'experienceYears', title: 'Years of Experience', type: 'number' },
    { name: 'specialization', title: 'Clinical Specializations', type: 'array', of: [{ type: 'string' }] },
    { name: 'photo', title: 'Profile Photo', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Biography', type: 'text', rows: 4 },
    { name: 'ahpraNumber', title: 'AHPRA / Medical Registration No.', type: 'string' },
    { name: 'isDirector', title: 'Is Principal / Clinical Director?', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Display Order', type: 'number', initialValue: 1 },
  ],
};

export const testimonialSchema = {
  name: 'testimonial',
  title: 'Patient Testimonials & Reviews',
  type: 'document',
  fields: [
    { name: 'name', title: 'Patient Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'conditionTreated', title: 'Condition / Reason for Visit', type: 'string' },
    { name: 'rating', title: 'Rating (out of 5)', type: 'number', initialValue: 5 },
    { name: 'review', title: 'Testimonial Review', type: 'text', rows: 4, validation: (Rule: any) => Rule.required() },
    { name: 'verified', title: 'Verified Patient / Review', type: 'boolean', initialValue: true },
    { name: 'location', title: 'Location / Suburb', type: 'string' },
    { name: 'order', title: 'Display Order', type: 'number', initialValue: 1 },
  ],
};

export const clinicLocationSchema = {
  name: 'clinicLocation',
  title: 'Clinic Locations',
  type: 'document',
  fields: [
    { name: 'name', title: 'Location Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'address', title: 'Full Address', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'phone', title: 'Phone Number', type: 'string' },
    { name: 'parking', title: 'Parking & Transit Details', type: 'string' },
    { name: 'mapEmbedUrl', title: 'Google Maps Embed URL', type: 'url' },
    { name: 'isPrimary', title: 'Primary Location', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Display Order', type: 'number', initialValue: 1 },
  ],
};

export const galleryItemSchema = {
  name: 'galleryItem',
  title: 'Clinic Gallery & Facilities',
  type: 'document',
  fields: [
    { name: 'title', title: 'Photo Caption / Title', type: 'string', validation: (Rule: any) => Rule.required() },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Clinic Spaces', value: 'clinic' },
          { title: 'Rehabilitation & Gym', value: 'rehab' },
          { title: 'Specialized Equipment', value: 'equipment' },
          { title: 'Hands-on Sessions', value: 'sessions' },
        ],
      },
    },
    { name: 'image', title: 'Photograph', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Description', type: 'text', rows: 2 },
    { name: 'order', title: 'Display Order', type: 'number', initialValue: 1 },
  ],
};

// CUSTOM PAGE BUILDER: Allows creating any new custom page in Sanity CMS!
export const customPageSchema = {
  name: 'customPage',
  title: 'Custom Pages (Page Builder)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Page Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Page Slug (e.g. ndis-support, telehealth, fees)', type: 'slug', options: { source: 'title' }, validation: (Rule: any) => Rule.required() },
    { name: 'badge', title: 'Header Badge / Subtitle', type: 'string', initialValue: 'Swastik Healthcare' },
    { name: 'leadText', title: 'Lead Paragraph / Introduction', type: 'text', rows: 3 },
    { name: 'bannerImage', title: 'Header / Banner Image', type: 'image', options: { hotspot: true } },
    {
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Section Heading', type: 'string' },
            { name: 'content', title: 'Section Content (Markdown/Text)', type: 'text', rows: 6 },
            { name: 'keyPoints', title: 'Bullet Highlights', type: 'array', of: [{ type: 'string' }] },
            { name: 'callToActionText', title: 'CTA Button Text', type: 'string' },
            { name: 'callToActionLink', title: 'CTA Button Link (e.g. /contact or book)', type: 'string' },
          ],
        },
      ],
    },
    { name: 'metaTitle', title: 'SEO Meta Title', type: 'string' },
    { name: 'metaDescription', title: 'SEO Meta Description', type: 'text', rows: 2 },
    { name: 'showInNav', title: 'Show link in Main Navigation Bar?', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Navigation Order', type: 'number', initialValue: 10 },
  ],
};

export const clinicSettingsSchema = {
  name: 'clinicSettings',
  title: 'Clinic Settings, Hero & Branding',
  type: 'document',
  fields: [
    { name: 'name', title: 'Clinic Name', type: 'string', initialValue: 'Swastik Healthcare' },
    { name: 'tagline', title: 'Tagline', type: 'string', initialValue: 'Physiotherapy & Rehabilitation Clinic' },
    { name: 'foundedYear', title: 'Founded Year', type: 'string', initialValue: '2009' },
    
    // --- Hero Section ---
    { name: 'heroEyebrow', title: 'Hero Eyebrow Badge', type: 'string', initialValue: 'Swastik Healthcare • Trusted Care Since 2009' },
    { name: 'heroTitle', title: 'Hero Main Headline', type: 'string', initialValue: 'Restore Mobility, Recover Faster & Live Pain Free Again' },
    { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', rows: 3, initialValue: 'Comprehensive physiotherapy & physical rehabilitation from post-surgery recovery and mobility aids to independent movement and peak functional strength.' },
    { name: 'heroBgImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true } },
    { name: 'heroImageAlt', title: 'Hero Background Image Alt Text', type: 'string', initialValue: 'Modern Swastik Healthcare physiotherapy and rehabilitation clinic' },
    { name: 'heroPrimaryCtaLabel', title: 'Hero Primary Button Label', type: 'string', initialValue: 'Book an Appointment' },
    { name: 'heroSecondaryCtaLabel', title: 'Hero Secondary Button Label', type: 'string', initialValue: 'View Physio Services' },
    { name: 'heroBadge1Title', title: 'Hero Trust Badge 1 Title', type: 'string', initialValue: 'Health Fund' },
    { name: 'heroBadge1Subtitle', title: 'Hero Trust Badge 1 Subtitle', type: 'string', initialValue: 'Rebates Available' },
    { name: 'heroBadge2Title', title: 'Hero Trust Badge 2 Title', type: 'string', initialValue: 'Proudly Supporting' },
    { name: 'heroBadge2Subtitle', title: 'Hero Trust Badge 2 Subtitle', type: 'string', initialValue: 'Local Sports & Community' },

    // --- Our Physiotherapy Services Section ---
    { name: 'servicesBadge', title: 'Services Section - Eyebrow Badge', type: 'string', initialValue: 'Clinical Expertise' },
    { name: 'servicesTitle', title: 'Services Section - Main Title', type: 'string', initialValue: 'Our Physiotherapy Services' },
    { name: 'servicesSubtitle', title: 'Services Section - Subtitle', type: 'text', rows: 2, initialValue: 'Targeted treatment plans designed by registered physiotherapists to alleviate pain, rebuild mobility, and return you to full capacity.' },

    // --- Why Patients Choose Us Section ---
    { name: 'whyChooseUsTitle', title: 'Why Patients Choose Us - Title', type: 'string', initialValue: 'Why Patients Choose Us' },
    { name: 'whyChooseUsSubtitle', title: 'Why Patients Choose Us - Subtitle', type: 'string', initialValue: 'Our clinical standard ensures every patient receives focused, evidence-based attention.' },

    // --- Fast Consultation / Help Section ---
    { name: 'consultationEyebrow', title: 'Consultation Section Eyebrow', type: 'string', initialValue: 'Fast Consultation Access' },
    { name: 'consultationTitle', title: 'Consultation Section Title', type: 'string', initialValue: 'Need Help With Pain, Injury or Recovery?' },
    { name: 'consultationSubtitle', title: 'Consultation Section Subtitle', type: 'text', rows: 2, initialValue: 'Book an appointment with our experienced clinical team today and start feeling better, sooner.' },
    {
      name: 'consultationBenefits',
      title: 'Consultation Checkpoints / Key Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Same-week appointments available',
        'Private health rebates (HICAPS on-the-spot)',
        'Experienced & caring clinical team',
        'Multiple clinic locations across Sydney',
      ],
    },
    { name: 'consultationImage', title: 'Consultation Feature Photo', type: 'image', options: { hotspot: true } },

    // --- Reviews & Team Section Headings ---
    { name: 'reviewsTitle', title: 'Patient Reviews - Section Title', type: 'string', initialValue: 'What Our Patients Say' },
    { name: 'teamTitle', title: 'Physiotherapists Team - Section Title', type: 'string', initialValue: 'Meet Our Physiotherapists' },

    // --- How It Works Section ---
    { name: 'howItWorksEyebrow', title: 'How It Works - Eyebrow', type: 'string', initialValue: 'Clear Recovery Process' },
    { name: 'howItWorksTitle', title: 'How It Works - Title', type: 'string', initialValue: 'How It Works' },
    { name: 'howItWorksSubtitle', title: 'How It Works - Subtitle', type: 'string', initialValue: 'From your first diagnostic session to lasting physical resilience.' },

    // --- Conditions We Treat Section ---
    { name: 'conditionsBadge', title: 'Conditions Section - Eyebrow Badge', type: 'string', initialValue: 'Targeted Recovery' },
    { name: 'conditionsTitle', title: 'Conditions Section - Main Title', type: 'string', initialValue: 'Conditions We Treat' },
    { name: 'conditionsSubtitle', title: 'Conditions Section - Subtitle', type: 'text', rows: 2, initialValue: 'From acute sports injuries to persistent spine complaints, our therapists address root mechanics rather than masking symptoms.' },
    {
      name: 'howItWorks',
      title: 'How It Works (Timeline Steps)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', title: 'Step Number', type: 'number' },
            { name: 'title', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Step Description', type: 'text', rows: 2 },
          ],
        },
      ],
    },

    // --- Address Details ---
    {
      name: 'address',
      title: 'Clinic Address',
      type: 'object',
      fields: [
        { name: 'full', title: 'Full Display Address', type: 'string', initialValue: 'Level 2, 452 Medical Promenade, Sydney NSW 2000' },
        { name: 'street', title: 'Street Address', type: 'string', initialValue: 'Level 2, 452 Medical Promenade' },
        { name: 'suburb', title: 'Suburb / Hub', type: 'string', initialValue: 'Central Health Hub' },
        { name: 'city', title: 'City', type: 'string', initialValue: 'Sydney' },
        { name: 'state', title: 'State (e.g. NSW)', type: 'string', initialValue: 'NSW' },
        { name: 'postcode', title: 'Postcode', type: 'string', initialValue: '2000' },
      ],
    },

    // --- Why Choose Us Badges / Trust Highlights ---
    {
      name: 'trustHighlights',
      title: 'Why Patients Choose Us - Feature Badges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Badge Title', type: 'string' },
            { name: 'icon', title: 'Icon Name (e.g. GraduationCap, ClipboardList, Activity, ShieldCheck, CalendarCheck, Compass, HeartHandshake)', type: 'string' },
          ],
        },
      ],
    },

    // --- Health Funds & Direct Rebates ---
    {
      name: 'healthFunds',
      title: 'Accepted Health Funds & Rebates',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Health Fund Name (e.g. Medibank, Bupa)', type: 'string' },
            { name: 'badgeText', title: 'Badge Text (e.g. Members Choice, First Provider)', type: 'string' },
          ],
        },
      ],
    },

    // --- Contact & Location Info ---
    { name: 'phone', title: 'Display Phone', type: 'string', initialValue: '1300 123 456' },
    { name: 'phoneRaw', title: 'Clickable Phone', type: 'string', initialValue: '+611300123456' },
    { name: 'email', title: 'Email Address', type: 'string', initialValue: 'info@swastikhealthcare.com' },
    { name: 'whatsappNumber', title: 'WhatsApp Contact Number', type: 'string', initialValue: '+61412345678' },
    { name: 'whatsappMessage', title: 'WhatsApp Pre-filled Message', type: 'string', initialValue: 'Hi Swastik Healthcare team, I would like to enquire about booking an appointment.' },
    {
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'days', title: 'Days', type: 'string' },
            { name: 'hours', title: 'Hours', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
      ],
    },
  ],
};

export const schemaTypes = [
  clinicSettingsSchema,
  treatmentSchema,
  conditionSchema,
  teamMemberSchema,
  testimonialSchema,
  clinicLocationSchema,
  galleryItemSchema,
  customPageSchema,
];
