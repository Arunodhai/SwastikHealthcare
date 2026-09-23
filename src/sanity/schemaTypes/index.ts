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
    { name: 'heroImageAlt', title: 'Feature Image Alt Text', type: 'string' },
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
    {
      name: 'detailPageCopy',
      title: 'Detail Page Labels & Supporting Copy',
      description: 'Controls the visible headings, buttons, badges, and supporting text on this treatment page.',
      type: 'object',
      initialValue: {
        primaryCtaLabel: 'Book Initial Assessment',
        secondaryCtaLabel: 'View Clinical Approach',
        suitableForHeading: 'Who This Treatment Is Suitable For',
        benefitsHeading: 'Key Benefits & Outcomes',
        approachHeading: 'Our Step-by-Step Clinical Approach',
        approachIntro: 'Transparent, systematic recovery milestones from early acute relief to functional resilience.',
        faqHeading: 'Frequently Asked Questions',
        bookingEyebrow: 'Book Service',
        bookingHeading: 'Plan Your Visit',
        bookingDescription: 'Request an appointment and the clinic team will help arrange the most suitable care option.',
        bookingHighlights: ['Individual clinical assessment', 'Care plan based on your rehabilitation needs', 'Choose from three Kollam branches'],
        bookingReassurance: 'Your request will be reviewed by the clinic team before the appointment is confirmed.',
        sidebarCtaLabel: 'Book This Treatment',
        relatedConditionsHeading: 'Related Conditions',
      },
      fields: [
        { name: 'primaryCtaLabel', title: 'Primary Button Label', type: 'string' },
        { name: 'secondaryCtaLabel', title: 'Secondary Button Label', type: 'string' },
        { name: 'rebateBadge', title: 'Hero Rebate / Funding Badge', description: 'Leave empty to hide this badge.', type: 'string' },
        { name: 'suitableForHeading', title: 'Suitable For Section Heading', type: 'string' },
        { name: 'benefitsHeading', title: 'Benefits Section Heading', type: 'string' },
        { name: 'approachHeading', title: 'Clinical Approach Section Heading', type: 'string' },
        { name: 'approachIntro', title: 'Clinical Approach Introduction', type: 'text', rows: 2 },
        { name: 'faqHeading', title: 'FAQ Section Heading', type: 'string' },
        { name: 'bookingEyebrow', title: 'Booking Card Eyebrow', type: 'string' },
        { name: 'bookingHeading', title: 'Booking Card Heading', type: 'string' },
        { name: 'bookingDescription', title: 'Booking Card Description', type: 'text', rows: 2 },
        { name: 'bookingHighlights', title: 'Booking Card Highlights', type: 'array', of: [{ type: 'string' }] },
        { name: 'bookingReassurance', title: 'Booking Card Reassurance', type: 'text', rows: 2 },
        { name: 'sidebarCtaLabel', title: 'Booking Card Button Label', type: 'string' },
        { name: 'relatedConditionsHeading', title: 'Related Conditions Heading', type: 'string' },
      ],
    },
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
    { name: 'imageAlt', title: 'Condition Image Alt Text', type: 'string' },
    { name: 'overview', title: 'Detailed Clinical Overview', type: 'text', rows: 4 },
    { name: 'commonSymptoms', title: 'Common Symptoms', type: 'array', of: [{ type: 'string' }] },
    { name: 'possibleCauses', title: 'Possible Causes', type: 'array', of: [{ type: 'string' }] },
    { name: 'physioApproach', title: 'Physiotherapy Treatment Approach', type: 'array', of: [{ type: 'string' }] },
    { name: 'actionEyebrow', title: 'Sidebar Card Eyebrow', type: 'string' },
    { name: 'actionHeading', title: 'Sidebar Card Heading', type: 'string' },
    { name: 'actionSubtitle', title: 'Sidebar Card Subtitle', type: 'string' },
    { name: 'rebateNote', title: 'Health Fund Rebate Note', type: 'string' },
    { name: 'relatedTreatmentSlugs', title: 'Related Treatment Slugs', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'detailPageCopy',
      title: 'Detail Page Labels & Supporting Copy',
      description: 'Controls the visible headings, buttons, highlights, notice, and supporting text on this condition page.',
      type: 'object',
      initialValue: {
        heroHighlights: ['Non-Surgical Focus', 'Individualized Recovery Plan'],
        primaryCtaLabel: 'Book Initial Assessment',
        symptomsHeading: 'Common Symptoms & Presentation',
        causesHeading: 'Underlying Drivers & Risk Factors',
        approachHeading: 'How Physiotherapy Supports Recovery',
        approachIntro: 'Evidence-based, active interventions aimed at restoring joint kinematics, reducing tissue overload, and building capacity.',
        medicalNotice: 'Information on this website is for educational purposes and should not replace formal in-person clinical assessment. Recovery rates vary depending on injury severity, tissue healing timelines, and individual adherence.',
        bookingHighlights: ['Individual clinical assessment', 'Care plan based on your rehabilitation needs', 'Choose from three Kollam branches'],
        bookingReassurance: 'Your request will be reviewed by the clinic team before the appointment is confirmed.',
        sidebarCtaLabel: 'Book Initial Assessment',
        relatedTreatmentsHeading: 'Recommended Treatments',
      },
      fields: [
        { name: 'heroHighlights', title: 'Hero Highlight Badges', type: 'array', of: [{ type: 'string' }] },
        { name: 'primaryCtaLabel', title: 'Primary Button Label', type: 'string' },
        { name: 'symptomsHeading', title: 'Symptoms Section Heading', type: 'string' },
        { name: 'causesHeading', title: 'Causes Section Heading', type: 'string' },
        { name: 'approachHeading', title: 'Physiotherapy Approach Heading', type: 'string' },
        { name: 'approachIntro', title: 'Physiotherapy Approach Introduction', type: 'text', rows: 2 },
        { name: 'medicalNotice', title: 'Medical Notice', type: 'text', rows: 3 },
        { name: 'bookingHighlights', title: 'Booking Card Highlights', type: 'array', of: [{ type: 'string' }] },
        { name: 'bookingReassurance', title: 'Booking Card Reassurance', type: 'text', rows: 2 },
        { name: 'sidebarCtaLabel', title: 'Booking Card Button Label', type: 'string' },
        { name: 'relatedTreatmentsHeading', title: 'Related Treatments Heading', type: 'string' },
      ],
    },
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
    { name: 'ahpraNumber', title: 'Professional Registration No. (optional)', type: 'string' },
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
    { name: 'avatar', title: 'Patient Photo / Avatar', type: 'image', options: { hotspot: true } },
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
    { name: 'categoryLabel', title: 'Visible Category Label', type: 'string' },
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
            {
              name: 'richContent',
              title: 'Rich Text Content',
              description: 'Add formatted paragraphs, subheadings, links, bold or italic text, and numbered or bulleted lists.',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'Heading 3', value: 'h3' },
                    { title: 'Heading 4', value: 'h4' },
                    { title: 'Quote', value: 'blockquote' },
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Numbered', value: 'number' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Bold', value: 'strong' },
                      { title: 'Italic', value: 'em' },
                      { title: 'Underline', value: 'underline' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        title: 'Link',
                        type: 'object',
                        fields: [
                          { name: 'href', title: 'URL', type: 'url', validation: (Rule: any) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }) },
                          { name: 'openInNewTab', title: 'Open in a new tab', type: 'boolean', initialValue: false },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
            {
              name: 'content',
              title: 'Legacy Plain Text Content',
              description: 'Existing page text is preserved here. For new content, use Rich Text Content above.',
              type: 'text',
              rows: 6,
            },
            { name: 'image', title: 'Section Image', type: 'image', options: { hotspot: true } },
            { name: 'imageAlt', title: 'Section Image Alt Text', type: 'string' },
            {
              name: 'imagePosition',
              title: 'Image Position',
              type: 'string',
              initialValue: 'right',
              options: {
                layout: 'radio',
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' },
                  { title: 'Full Width', value: 'full' },
                ],
              },
            },
            { name: 'keyPoints', title: 'Bullet Highlights', type: 'array', of: [{ type: 'string' }] },
            { name: 'callToActionText', title: 'CTA Button Text', type: 'string' },
            { name: 'callToActionLink', title: 'CTA Button Link (e.g. /contact or book)', type: 'string' },
          ],
          preview: {
            select: { title: 'heading', media: 'image' },
            prepare: ({ title, media }: any) => ({ title: title || 'Untitled section', media }),
          },
        },
      ],
    },
    {
      name: 'metaTitle',
      title: 'SEO & Social Title',
      description: 'Recommended maximum: 60 characters. The page title is used when this is empty.',
      type: 'string',
      validation: (Rule: any) => Rule.max(60).warning('Search engines may truncate titles longer than 60 characters.'),
    },
    {
      name: 'metaDescription',
      title: 'SEO & Social Description',
      description: 'Recommended maximum: 160 characters. The lead paragraph is used when this is empty.',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(160).warning('Search engines may truncate descriptions longer than 160 characters.'),
    },
    { name: 'seoImage', title: 'Social Sharing Image', description: 'Used by Facebook, LinkedIn and other platforms. The banner image is used when this is empty.', type: 'image', options: { hotspot: true } },
    { name: 'noIndex', title: 'Hide from Search Engines', description: 'Enable only for pages that should not appear in search results.', type: 'boolean', initialValue: false },
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
    { name: 'heroEyebrow', title: 'Hero Eyebrow Text', type: 'string', initialValue: 'Trusted Care Since 2009' },
    { name: 'heroTitle', title: 'Hero Main Headline', type: 'string', initialValue: 'Mission Wellness Through Physiotherapy & Rehabilitation' },
    { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', rows: 3, initialValue: 'Specialized physiotherapy services across Chavara, Nellimukku, and Decent Junction in Kollam.' },
    { name: 'heroBgImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true } },
    { name: 'heroImageAlt', title: 'Hero Background Image Alt Text', type: 'string', initialValue: 'Modern Swastik Healthcare physiotherapy and rehabilitation clinic' },
    { name: 'heroPrimaryCtaLabel', title: 'Hero Primary Button Label', type: 'string', initialValue: 'Book an Appointment' },
    { name: 'heroSecondaryCtaLabel', title: 'Hero Secondary Button Label', type: 'string', initialValue: 'View Physio Services' },
    { name: 'heroBadge1Title', title: 'Hero Trust Badge 1 Title', type: 'string', initialValue: '3 Branches' },
    { name: 'heroBadge1Subtitle', title: 'Hero Trust Badge 1 Subtitle', type: 'string', initialValue: 'Across Kollam' },
    { name: 'heroBadge2Title', title: 'Hero Trust Badge 2 Title', type: 'string', initialValue: 'Founder-Led Care' },
    { name: 'heroBadge2Subtitle', title: 'Hero Trust Badge 2 Subtitle', type: 'string', initialValue: 'MPT Ortho & Sports Medicine' },

    // --- Fixed Navbar Pages ---
    {
      name: 'navbarPages',
      title: 'Navbar Pages',
      description: 'Manage the editorial content for About, Treatments, Conditions, Gallery, and Contact while the application safely owns layout and functionality.',
      type: 'array',
      validation: (Rule: any) => Rule.unique(),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'pageKey',
              title: 'Page',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
              options: { list: [
                { title: 'About Us', value: 'about' },
                { title: 'Treatments', value: 'treatments' },
                { title: 'Conditions We Treat', value: 'conditions' },
                { title: 'Gallery', value: 'gallery' },
                { title: 'Contact', value: 'contact' },
              ] },
            },
            { name: 'heroBadge', title: 'Hero Badge', type: 'string' },
            { name: 'heroTitle', title: 'Hero Title', type: 'string' },
            { name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 3 },
            { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
            { name: 'heroImageAlt', title: 'Hero Image Alt Text', type: 'string' },
            {
              name: 'filters',
              title: 'Filter Labels',
              description: 'Keep the keys unchanged so filtering continues to work.',
              type: 'array',
              of: [{ type: 'object', fields: [
                { name: 'key', title: 'Filter Key', type: 'string', validation: (Rule: any) => Rule.required() },
                { name: 'label', title: 'Visible Label', type: 'string' },
              ], preview: { select: { title: 'label', subtitle: 'key' } } }],
            },
            {
              name: 'sections',
              title: 'Page Sections',
              description: 'Section keys connect content to the existing designed layout. Keep each key unchanged.',
              type: 'array',
              of: [{ type: 'object', fields: [
                { name: 'key', title: 'Section Key', type: 'string', validation: (Rule: any) => Rule.required() },
                { name: 'eyebrow', title: 'Eyebrow / Badge', type: 'string' },
                { name: 'title', title: 'Section Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                { name: 'body', title: 'Paragraphs', type: 'array', of: [{ type: 'text', rows: 3 }] },
                { name: 'image', title: 'Section Image', type: 'image', options: { hotspot: true } },
                { name: 'imageAlt', title: 'Section Image Alt Text', type: 'string' },
                { name: 'ctaLabel', title: 'Button Label', type: 'string' },
                { name: 'items', title: 'Cards / Labels / Statistics', type: 'array', of: [{ type: 'object', fields: [
                  { name: 'key', title: 'Item Key', type: 'string', validation: (Rule: any) => Rule.required() },
                  { name: 'label', title: 'Label', type: 'string' },
                  { name: 'title', title: 'Title', type: 'string' },
                  { name: 'description', title: 'Description', type: 'text', rows: 2 },
                  { name: 'value', title: 'Value / Statistic', type: 'string' },
                  { name: 'icon', title: 'Icon Name', type: 'string' },
                ], preview: { select: { title: 'title', subtitle: 'key' } } }] },
              ], preview: { select: { title: 'title', subtitle: 'key' } } }],
            },
          ],
          preview: { select: { title: 'pageKey', subtitle: 'heroTitle' } },
        },
      ],
    },

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
        'Orthopaedic and neurological rehabilitation',
        'Home visit physiotherapy',
        'Inpatient admission facility',
        'Three clinic locations across Kollam',
      ],
    },
    { name: 'consultationImage', title: 'Consultation Feature Photo', type: 'image', options: { hotspot: true } },
    { name: 'consultationImageAlt', title: 'Consultation Photo Alt Text', type: 'string', initialValue: 'Swastik Healthcare clinic treatment room' },

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
        { name: 'full', title: 'Full Display Address', type: 'string', initialValue: 'Near Govt. Hospital, Titanium Junction, Chavara, Kollam, Kerala, India' },
        { name: 'street', title: 'Street Address', type: 'string', initialValue: 'Near Govt. Hospital, Titanium Junction' },
        { name: 'suburb', title: 'Town / Locality', type: 'string', initialValue: 'Chavara' },
        { name: 'city', title: 'City / District', type: 'string', initialValue: 'Kollam' },
        { name: 'state', title: 'State', type: 'string', initialValue: 'Kerala' },
        { name: 'postcode', title: 'Postcode', type: 'string' },
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

    // --- Homepage service highlights ---
    {
      name: 'healthFunds',
      title: 'Homepage Service Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Service Name', type: 'string' },
            { name: 'badgeText', title: 'Supporting Label', type: 'string' },
          ],
        },
      ],
    },

    // --- Contact & Location Info ---
    { name: 'phone', title: 'Display Phone', type: 'string' },
    { name: 'phoneRaw', title: 'Clickable Phone', type: 'string' },
    { name: 'email', title: 'Email Address', type: 'string' },
    { name: 'whatsappNumber', title: 'WhatsApp Contact Number', type: 'string' },
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
        { name: 'googleReviews', title: 'Google Reviews URL', type: 'url' },
      ],
    },
    {
      name: 'uiCopy',
      title: 'Navigation, Buttons, Footer & WhatsApp Copy',
      description: 'Site-wide labels and supporting copy used outside the page-specific content sections.',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'navHomeLabel', title: 'Navigation: Home', type: 'string', initialValue: 'Home' },
        { name: 'navAboutLabel', title: 'Navigation: About', type: 'string', initialValue: 'About Us' },
        { name: 'navTreatmentsLabel', title: 'Navigation: Treatments', type: 'string', initialValue: 'Treatments' },
        { name: 'navConditionsLabel', title: 'Navigation: Conditions', type: 'string', initialValue: 'Conditions We Treat' },
        { name: 'navGalleryLabel', title: 'Navigation: Gallery', type: 'string', initialValue: 'Gallery' },
        { name: 'navContactLabel', title: 'Navigation: Contact', type: 'string', initialValue: 'Contact' },
        { name: 'headerBookingLabel', title: 'Header Booking Button', type: 'string', initialValue: 'Book an Appointment' },
        { name: 'headerMobileBookingLabel', title: 'Mobile Header Booking Button', type: 'string', initialValue: 'Book' },
        { name: 'mobileRebateNote', title: 'Mobile Menu Supporting Note', type: 'string', initialValue: 'Three branches across Kollam' },
        { name: 'homeServicesCtaLabel', title: 'Homepage Services Button', type: 'string', initialValue: 'View All Services' },
        { name: 'homeTeamCredentialsLabel', title: 'Homepage Team Credentials Link', type: 'string', initialValue: 'View All Credentials' },
        { name: 'homeTeamCtaLabel', title: 'Homepage Team Button', type: 'string', initialValue: 'View Our Team' },
        { name: 'homeConditionsCtaLabel', title: 'Homepage Conditions Link', type: 'string', initialValue: 'Explore All Musculoskeletal Conditions' },
        { name: 'quickFormTitle', title: 'Quick Form Title', type: 'string', initialValue: 'Request an Appointment' },
        { name: 'quickFormSubtitle', title: 'Quick Form Subtitle', type: 'string', initialValue: 'We will contact you promptly to confirm your appointment time.' },
        { name: 'quickFormSubmitLabel', title: 'Quick Form Submit Button', type: 'string', initialValue: 'Book My Appointment' },
        { name: 'footerEyebrow', title: 'Footer CTA Eyebrow', type: 'string', initialValue: 'Begin Your Rehabilitation' },
        { name: 'footerTitle', title: 'Footer CTA Title', type: 'string', initialValue: 'Ready to Regain Full Mobility and Live Pain Free?' },
        { name: 'footerSubtitle', title: 'Footer CTA Subtitle', type: 'string', initialValue: 'Appointments available this week across our modern clinical hubs.' },
        { name: 'footerBookingLabel', title: 'Footer CTA Button', type: 'string', initialValue: 'Book an Appointment' },
        { name: 'footerMission', title: 'Footer Mission Statement', type: 'text', rows: 3 },
        { name: 'footerAccreditationPrimary', title: 'Footer Highlight One', type: 'string', initialValue: 'Since 2009' },
        { name: 'footerAccreditationSecondary', title: 'Footer Highlight Two', type: 'string', initialValue: 'Mission Wellness' },
        { name: 'footerServicesHeading', title: 'Footer Services Heading', type: 'string', initialValue: 'Services' },
        { name: 'footerConditionsHeading', title: 'Footer Conditions Heading', type: 'string', initialValue: 'Conditions' },
        { name: 'footerClinicHeading', title: 'Footer Clinic Heading', type: 'string', initialValue: 'Clinic' },
        { name: 'footerContactHeading', title: 'Footer Contact Heading', type: 'string', initialValue: 'Contact & Hours' },
        { name: 'footerAboutLabel', title: 'Footer About Link', type: 'string', initialValue: 'About Our Clinic' },
        { name: 'footerTeamLabel', title: 'Footer Team Link', type: 'string', initialValue: 'Our Physiotherapists' },
        { name: 'footerGalleryLabel', title: 'Footer Gallery Link', type: 'string', initialValue: 'Facility & Gallery' },
        { name: 'footerLocationsLabel', title: 'Footer Locations Link', type: 'string', initialValue: 'Locations & Directions' },
        { name: 'footerStudioLabel', title: 'Footer Studio Link', type: 'string', initialValue: 'Sanity CMS Studio' },
        { name: 'footerBookingLinkLabel', title: 'Footer Booking Link', type: 'string', initialValue: 'Book Online' },
        { name: 'footerPrivacyLabel', title: 'Footer Privacy Link', type: 'string', initialValue: 'Privacy Policy' },
        { name: 'footerTermsLabel', title: 'Footer Terms Link', type: 'string', initialValue: 'Terms of Care' },
        { name: 'footerNdisLabel', title: 'Footer NDIS Link', type: 'string', initialValue: 'NDIS Provider Info' },
        { name: 'footerPatientRightsLabel', title: 'Footer Patient Rights Link', type: 'string', initialValue: 'Patient Rights' },
        { name: 'whatsappTooltipTitle', title: 'WhatsApp Tooltip Title', type: 'string', initialValue: 'Clinic Reception Online' },
        { name: 'whatsappTooltipText', title: 'WhatsApp Tooltip Text', type: 'text', rows: 2, initialValue: 'Have a question about injuries or fees? Chat with our team on WhatsApp.' },
        { name: 'whatsappCtaLabel', title: 'WhatsApp Tooltip Link', type: 'string', initialValue: 'Start WhatsApp Chat' },
        { name: 'whatsappButtonLabel', title: 'WhatsApp Floating Button', type: 'string', initialValue: 'Chat on WhatsApp' },
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
