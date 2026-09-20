import { Treatment, Condition, TeamMember, Testimonial, GalleryItem, ClinicSettings } from '../types/clinic';

export const CLINIC_SETTINGS: ClinicSettings = {
  name: "Swastik Healthcare",
  tagline: "Physiotherapy & Rehabilitation Clinic",
  phone: "1300 123 456",
  phoneRaw: "+611300123456",
  email: "info@swastikhealthcare.com",
  foundedYear: "2009",
  heroEyebrow: "Swastik Healthcare • Trusted Care Since 2009",
  heroTitle: "Restore Mobility, Recover Faster & Live Pain Free Again",
  heroSubtitle: "Comprehensive physiotherapy & physical rehabilitation from post-surgery recovery and mobility aids to independent movement and peak functional strength.",
  heroPrimaryCtaLabel: "Book an Appointment",
  heroSecondaryCtaLabel: "View Physio Services",
  heroBadge1Title: "Health Fund",
  heroBadge1Subtitle: "Rebates Available",
  heroBadge2Title: "Proudly Supporting",
  heroBadge2Subtitle: "Local Sports & Community",
  heroBgImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1800&q=80",
  heroImageAlt: "Modern Swastik Healthcare physiotherapy and rehabilitation clinic",
  address: {
    street: "Level 2, 452 Medical Promenade",
    suburb: "Central Health Hub",
    city: "Sydney",
    state: "NSW",
    postcode: "2000",
    full: "Level 2, 452 Medical Promenade, Sydney NSW 2000"
  },
  openingHours: [
    { days: "Monday - Thursday", hours: "7:00 AM - 7:30 PM" },
    { days: "Friday", hours: "7:00 AM - 6:00 PM" },
    { days: "Saturday", hours: "8:00 AM - 2:00 PM" },
    { days: "Sunday & Public Holidays", hours: "Closed" }
  ],
  whatsappNumber: "+61412345678",
  whatsappMessage: "Hi Swastik Healthcare team, I would like to enquire about booking an appointment.",
  healthFunds: [
    { name: "Medibank", badgeText: "Members Choice" },
    { name: "Bupa", badgeText: "First Provider" },
    { name: "HCF", badgeText: "More for Muscles" },
    { name: "nib", badgeText: "Preferred Provider" },
    { name: "AHM", badgeText: "Direct HICAPS" },
    { name: "Defence Health", badgeText: "Approved" }
  ],
  trustHighlights: [
    { id: "1", title: "Qualified Physiotherapists", icon: "GraduationCap" },
    { id: "2", title: "Personalised Treatment Plans", icon: "ClipboardList" },
    { id: "3", title: "Modern Rehab Equipment", icon: "Activity" },
    { id: "4", title: "Evidence-Based Care", icon: "ShieldCheck" },
    { id: "5", title: "Same-Week Appointments", icon: "CalendarCheck" },
    { id: "6", title: "Clear Recovery Guidance", icon: "Compass" },
    { id: "7", title: "Friendly Local Support", icon: "HeartHandshake" }
  ],
  howItWorks: [
    {
      step: 1,
      title: "Book Online",
      description: "Choose a time and practitioner that suits your daily schedule."
    },
    {
      step: 2,
      title: "Initial Assessment",
      description: "We assess your movement, identify root causes, and discuss goals."
    },
    {
      step: 3,
      title: "Personal Treatment Plan",
      description: "Tailored rehabilitation roadmap combining therapy and progressive loading."
    },
    {
      step: 4,
      title: "Guided Recovery",
      description: "Hands-on care, milestone tracking, and dynamic home exercise adjustments."
    },
    {
      step: 5,
      title: "Ongoing Strength Support",
      description: "Functional conditioning to build resilience and prevent future re-injury."
    }
  ]
};

export const TREATMENTS: Treatment[] = [
  {
    id: "sports-injury-rehab",
    slug: "sports-injury-rehab",
    title: "Sports Injury Rehabilitation",
    category: "sports",
    categoryLabel: "Sports & Performance",
    shortDescription: "Return to sport stronger, faster, and with reduced risk of recurrent injuries.",
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    iconName: "Flame",
    durationMinutes: 45,
    suitableFor: [
      "Athletes suffering acute muscle strains, ligament sprains, or tears",
      "Runners dealing with shin splints, runner's knee, or Achilles issues",
      "Individuals recovering from contact sport trauma",
      "Athletes preparing for return-to-play testing"
    ],
    benefits: [
      "Accurate biomechanical movement assessment",
      "Accelerated tissue healing and swelling management",
      "Targeted sports-specific strength & agility reconditioning",
      "Objective return-to-sport clearance testing"
    ],
    approachSteps: [
      {
        step: 1,
        title: "Comprehensive Biomechanical Diagnostic",
        description: "We evaluate joint integrity, muscle activation patterns, and kinetic chain imbalances."
      },
      {
        step: 2,
        title: "Acute Phase Symptom Reduction",
        description: "Targeted hands-on therapy, joint mobilisation, and active recovery protocols."
      },
      {
        step: 3,
        title: "Progressive Kinetic Loading",
        description: "Structured gym-based resistance training tailored to your sport's demands."
      },
      {
        step: 4,
        title: "Sport-Specific Agility & Re-injury Prevention",
        description: "Plyometrics, high-speed running mechanics, and deceleration drills."
      }
    ],
    relatedConditionSlugs: ["knee-pain", "sports-injuries", "shoulder-pain"],
    faqs: [
      {
        question: "How soon after an injury should I come in?",
        answer: "For most acute soft-tissue injuries, early intervention within 24 to 72 hours helps optimize inflammation management and prevent secondary stiffness."
      },
      {
        question: "Do you provide return-to-play clearance letters for coaches?",
        answer: "Yes, we perform standardized force plate and jump testing to provide objective documentation for your team medical staff or coaches."
      }
    ]
  },
  {
    id: "back-neck-pain",
    slug: "back-neck-pain",
    title: "Back & Neck Pain Treatment",
    category: "spine",
    categoryLabel: "Spine & Posture",
    shortDescription: "Relieve spinal stiffness, alleviate nerve irritation, and rebuild postural endurance.",
    heroImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    iconName: "Activity",
    durationMinutes: 45,
    suitableFor: [
      "Acute lower back spasms and facet joint lock-ups",
      "Chronic disc bulge symptoms and sciatica pain radiating down the leg",
      "Cervical postural neck strain, tension headaches, and desk-bound stiffness",
      "Degenerative disc changes and spinal arthritis"
    ],
    benefits: [
      "Rapid reduction in acute muscle spasm and nerve pinching",
      "Restoration of natural thoracic and lumbar mobility",
      "Strengthening of deep core stabilizing musculature (transversus abdominis, multifidus)",
      "Ergonomic workstation and sleep position counseling"
    ],
    approachSteps: [
      {
        step: 1,
        title: "Neurological & Directional Preference Assessment",
        description: "Testing reflexes, dermatomes, nerve tension tests, and directional movements that relieve symptoms."
      },
      {
        step: 2,
        title: "Hands-on Spinal Decompression & Mobilisation",
        description: "Gentle manual therapy, segmental spinal mobilisations, and myofascial release."
      },
      {
        step: 3,
        title: "Core Stabilization Re-education",
        description: "Pilates-informed motor control training to create a protective muscular brace for the spine."
      },
      {
        step: 4,
        title: "Postural & Lifestyle Integration",
        description: "Long-term habits, workstation ergonomics, and lifting technique refinement."
      }
    ],
    relatedConditionSlugs: ["back-pain", "neck-pain", "sciatica"],
    faqs: [
      {
        question: "Do I need an MRI or X-ray before coming to physiotherapy?",
        answer: "In most cases, an MRI is not immediately required. Our clinical physiotherapists conduct thorough neurological and orthopaedic examinations to determine if imaging is indicated."
      },
      {
        question: "Can physiotherapy help with shooting pain down my leg?",
        answer: "Yes. Sciatica is frequently caused by nerve root irritation in the lower spine. Targeted neurodynamic mobilization and unloading techniques are effective in relieving nerve tension."
      }
    ]
  },
  {
    id: "post-surgery-rehab",
    slug: "post-surgery-rehab",
    title: "Post-Surgery Rehabilitation",
    category: "rehabilitation",
    categoryLabel: "Post-Operative",
    shortDescription: "Regain joint range, rebuild atrophy, and protect your surgical repair with protocol-led care.",
    heroImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    iconName: "ShieldCheck",
    durationMinutes: 45,
    suitableFor: [
      "Total knee replacement (TKR) and total hip replacement (THR)",
      "ACL reconstructions, meniscal repairs, and arthroscopies",
      "Rotator cuff tendon repairs and labral repairs (SLAP/Bankart)",
      "Spinal discectomy, fusion, or laminectomy recovery"
    ],
    benefits: [
      "Strict adherence to your surgeon's specific post-op protocol",
      "Effective lymphatic drainage, scar tissue management, and swelling reduction",
      "Safe early range-of-motion progression without compromising fixation",
      "Full return to unassisted walking, stairs, driving, and recreational passions"
    ],
    approachSteps: [
      {
        step: 1,
        title: "Surgical Protocol Verification & Wound Check",
        description: "We review operative notes, surgeon restrictions, and initial healing status."
      },
      {
        step: 2,
        title: "Early Passive & Active Assisted Range of Motion",
        description: "Restoring physiological joint glide and preventing arthrofibrosis (stiff scar tissue)."
      },
      {
        step: 3,
        title: "Isometric to Dynamic Hypertrophy Loading",
        description: "Re-activating dormant muscles around the operated joint with measured resistance."
      },
      {
        step: 4,
        title: "Functional Independence & Return to Normal Life",
        description: "Transitioning back to stairs, driving, daily activities, and independent gym programs."
      }
    ],
    relatedConditionSlugs: ["knee-pain", "shoulder-pain", "back-pain"],
    faqs: [
      {
        question: "When should I begin physiotherapy after surgery?",
        answer: "This depends on the procedure. Hip and knee replacements often start within the first week post-discharge. Shoulder repairs may begin passive pendulum work within 1-2 weeks as cleared by your surgeon."
      },
      {
        question: "Do you coordinate with my orthopaedic surgeon?",
        answer: "Yes, we send milestone progress updates and consult directly with your surgical team whenever necessary."
      }
    ]
  },
  {
    id: "workplace-injury-treatment",
    slug: "workplace-injury-treatment",
    title: "Workplace Injury Treatment",
    category: "specialized",
    categoryLabel: "Workers Compensation",
    shortDescription: "Structured rehabilitation and graduated return-to-work programs for occupational injuries.",
    heroImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    iconName: "Briefcase",
    durationMinutes: 45,
    suitableFor: [
      "Repetitive strain injuries (RSI), carpal tunnel syndrome, and tendonitis",
      "Lifting and manual handling sprains or acute lumbar strains",
      "Slips, trips, and falls in warehouse, construction, or office environments",
      "Desk workers with chronic neck and shoulder postural tension"
    ],
    benefits: [
      "Direct billing to Workers Compensation / WorkCover with zero out-of-pocket costs on approved claims",
      "Comprehensive workplace capacity assessments",
      "Clear communication with your GP, case manager, and employer",
      "Workstation ergonomic advice and safe lifting retraining"
    ],
    approachSteps: [
      {
        step: 1,
        title: "Work Capacity & Physical Demands Analysis",
        description: "Assessing job requirements (lifting limits, sitting tolerance, reach)."
      },
      {
        step: 2,
        title: "Targeted Symptom Relief & Functional Recovery",
        description: "Manual therapy combined with progressive task-specific physical conditioning."
      },
      {
        step: 3,
        title: "Graduated Return-to-Work (RTW) Planning",
        description: "Collaborating on suitable duties schedules and gradual hour escalation."
      },
      {
        step: 4,
        title: "Long-Term Ergonomic & Hazard Prevention",
        description: "Equipment adjustments and preventative movement strategies for the workplace."
      }
    ],
    relatedConditionSlugs: ["back-pain", "neck-pain", "shoulder-pain"],
    faqs: [
      {
        question: "What do I need to bring for a Workers Compensation appointment?",
        answer: "Bring your claim number, GP referral/Certificate of Capacity, insurer details, and case manager contact info."
      }
    ]
  },
  {
    id: "manual-therapy",
    slug: "manual-therapy",
    title: "Manual Therapy & Dry Needling",
    category: "manual",
    categoryLabel: "Hands-on Care",
    shortDescription: "Joint mobilisations, trigger point release, and dry needling for immediate neuromuscular relief.",
    heroImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
    iconName: "HandMetal",
    durationMinutes: 45,
    suitableFor: [
      "Restricted joint stiffness in ankles, hips, shoulders, and spinal joints",
      "Severe muscular knotting and myofascial trigger point tension",
      "Acute torticollis (wry neck) and locked rib joints",
      "Headaches stemming from suboccipital muscle tightness"
    ],
    benefits: [
      "Immediate reduction in pain intensity through neurophysiological downregulation",
      "Restored joint play and physiological range of motion",
      "Enhanced local blood circulation and cellular nutrient delivery",
      "Creates the ideal painless window to perform corrective exercises"
    ],
    approachSteps: [
      {
        step: 1,
        title: "Joint Play & Palpation Mapping",
        description: "Isolating hypomobile vertebral segments and hypertonic muscular bands."
      },
      {
        step: 2,
        title: "Targeted Passive Mobilisation",
        description: "Maitland and Mulligan mobilization techniques with movement to restore glide."
      },
      {
        step: 3,
        title: "Dry Needling & Myofascial Release",
        description: "De-activating deep neuromuscular trigger points and resetting resting muscle tone."
      },
      {
        step: 4,
        title: "Active Reinforcement Drill",
        description: "Immediate active movement to consolidate the newly gained joint range."
      }
    ],
    relatedConditionSlugs: ["neck-pain", "back-pain", "frozen-shoulder"],
    faqs: [
      {
        question: "Does dry needling hurt?",
        answer: "Most patients feel a minor twitch response or deep ache when a trigger point is released, followed quickly by lasting muscle relaxation."
      }
    ]
  },
  {
    id: "exercise-physiology",
    slug: "exercise-physiology",
    title: "Exercise Physiology & Clinical Pilates",
    category: "rehabilitation",
    categoryLabel: "Active Rehabilitation",
    shortDescription: "Individualised clinical exercise programs to build long-term strength, mobility, and vitality.",
    heroImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    iconName: "Dumbbell",
    durationMinutes: 60,
    suitableFor: [
      "Chronic lifestyle disease management (osteoporosis, osteoarthritis, type 2 diabetes)",
      "Core weakness and recurrent lower back instability",
      "Older adults seeking fall prevention, balance improvement, and bone density preservation",
      "Anyone ready to transition from acute pain relief into sustainable physical fitness"
    ],
    benefits: [
      "One-on-one sessions in our fully equipped rehabilitation studio",
      "Customized resistance, reformer, and functional movement regimens",
      "Careful monitoring of cardiovascular response and joint tolerance",
      "Private health fund rebates (Item 505 / 506 for Exercise Physiology)"
    ],
    approachSteps: [
      {
        step: 1,
        title: "Baseline Strength & Functional Capacity Testing",
        description: "Assessing grip strength, sit-to-stand, balance metrics, and movement quality."
      },
      {
        step: 2,
        title: "Individualized Prescription Design",
        description: "Tailoring rep ranges, load, and equipment (Reformer, cable machines, free weights)."
      },
      {
        step: 3,
        title: "Supervised Technique Coaching",
        description: "Ensuring impeccable form, breathing mechanics, and joint alignment."
      },
      {
        step: 4,
        title: "Long-Term Progression & Independent Programming",
        description: "Empowering you to exercise confidently at home or in your local community gym."
      }
    ],
    relatedConditionSlugs: ["back-pain", "knee-pain", "sciatica"],
    faqs: [
      {
        question: "What is the difference between Physiotherapy and Exercise Physiology?",
        answer: "Physiotherapy focuses heavily on diagnosing acute injury, restoring mobility, and providing hands-on treatment. Exercise Physiology focuses on long-term exercise prescription, chronic illness management, and strength conditioning."
      }
    ]
  }
];

export const CONDITIONS: Condition[] = [
  {
    id: "back-pain",
    slug: "back-pain",
    title: "Lower Back Pain",
    bodyArea: "spine",
    bodyAreaLabel: "Spine & Pelvis",
    shortDescription: "Aches, sharp spasms, stiffness, and disc-related discomfort affecting daily mobility.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    overview: "Lower back pain is the most prevalent musculoskeletal condition worldwide. While intensely uncomfortable, the majority of episodes respond exceptionally well to early, active, evidence-based physiotherapy care without surgery.",
    commonSymptoms: [
      "Dull ache or sharp shooting pain in the lumbar region",
      "Stiffness when getting out of bed or rising from sitting",
      "Muscle spasms across the lower back and buttock",
      "Pain aggravated by bending forward, lifting, or prolonged standing"
    ],
    possibleCauses: [
      "Lumbar facet joint irritation or sprain",
      "Intervertebral disc bulge or protrusion with chemical inflammation",
      "Muscular strain from sudden heavy lifting or unaccustomed activity",
      "Prolonged static sitting with suboptimal postural support"
    ],
    physioApproach: [
      "Specific spinal joint mobilisations to restore painless spinal flexion and extension",
      "Directional preference exercises (McKenzie approach) to centralize discomfort",
      "Deep core and pelvic floor stabilization re-education",
      "Step-by-step return to walking, lifting, and normal daily tasks"
    ],
    relatedTreatmentSlugs: ["back-neck-pain", "manual-therapy", "exercise-physiology"]
  },
  {
    id: "neck-pain",
    slug: "neck-pain",
    title: "Neck Pain & Headaches",
    bodyArea: "spine",
    bodyAreaLabel: "Cervical Spine",
    shortDescription: "Cervical spine stiffness, posture-related ache, and cervicogenic tension headaches.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    overview: "Modern desk work, screen usage, and acute whiplash strains often cause cervical joint restriction, trigger point tightness, and radiating headaches that start at the base of the skull.",
    commonSymptoms: [
      "Stiff neck when checking blind spots while driving",
      "Tension headaches wrapping from the occiput around to the temples or eyes",
      "Burning or aching sensations across the trapezius and shoulder blades",
      "Clicking or grinding sensations with neck rotation"
    ],
    possibleCauses: [
      "Cervicogenic headaches arising from C1-C3 spinal joint irritation",
      "Sustained forward-head posture overloading cervical extensor muscles",
      "Acute torticollis (wry neck) following awkward sleeping postures",
      "Whiplash trauma from motor vehicle or sports impact"
    ],
    physioApproach: [
      "Upper cervical spinal mobilisations to alleviate referred head pain",
      "Gentle soft-tissue release of the suboccipital and levator scapulae muscles",
      "Deep cervical flexor (neck core) isometric strengthening",
      "Ergonomic computer monitor and seating adjustments"
    ],
    relatedTreatmentSlugs: ["back-neck-pain", "manual-therapy"]
  },
  {
    id: "knee-pain",
    slug: "knee-pain",
    title: "Knee Pain & Ligament Injuries",
    bodyArea: "lower-limb",
    bodyAreaLabel: "Lower Extremity",
    shortDescription: "Patellofemoral tracking issues, meniscus irritations, ligament sprains, and osteoarthritis.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    overview: "The knee operates as a hinge between the hip and ankle, making it sensitive to kinetic chain dysfunctions, running overload, sports twists, or progressive degenerative wear.",
    commonSymptoms: [
      "Pain going up or down stairs, or standing up after sitting",
      "Clicking, catching, or giving-way sensation during pivots",
      "Swelling or joint stiffness after sport or a long walk",
      "Localized tenderness along the joint line or under the kneecap"
    ],
    possibleCauses: [
      "Patellofemoral pain syndrome (runner's knee)",
      "Meniscal cartilage tears or degenerative fraying",
      "Ligament injuries (ACL, MCL, LCL, PCL) from pivoting sports",
      "Knee osteoarthritis and cartilage thinning"
    ],
    physioApproach: [
      "Patellar taping and manual mobilisations for immediate load relief",
      "Quadriceps, gluteus medius, and calf kinetic loading",
      "Footwear and running gait analysis on our treadmill",
      "Post-operative or non-operative rehabilitation pathways"
    ],
    relatedTreatmentSlugs: ["sports-injury-rehab", "post-surgery-rehab", "exercise-physiology"]
  },
  {
    id: "frozen-shoulder",
    slug: "frozen-shoulder",
    title: "Shoulder Pain & Frozen Shoulder",
    bodyArea: "upper-limb",
    bodyAreaLabel: "Upper Extremity",
    shortDescription: "Rotator cuff impingement, tendonitis, bursitis, and adhesive capsulitis restrictions.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    overview: "The shoulder is the most mobile joint in the human body, relying heavily on dynamic muscular coordination from the rotator cuff and scapular stabilizers.",
    commonSymptoms: [
      "Inability to reach behind your back or overhead into high cupboards",
      "Severe nighttime ache when lying on the affected shoulder",
      "Sharp pinch when raising the arm between 60 and 120 degrees (painful arc)",
      "Progressive loss of active and passive rotation (frozen shoulder capsular pattern)"
    ],
    possibleCauses: [
      "Adhesive capsulitis (frozen shoulder) with progressive contracture",
      "Subacromial bursitis and supraspinatus tendon impingement",
      "Rotator cuff partial or full-thickness tears",
      "Scapular dyskinesis (impaired shoulder blade mechanics)"
    ],
    physioApproach: [
      "Hydrodilatation or medical referral liaison for stubborn frozen shoulders",
      "Glenohumeral joint capsule stretches and distraction techniques",
      "Scapulothoracic muscle retraining (serratus anterior, lower trapezius)",
      "Progressive rotator cuff loading with resistance bands and dumbbells"
    ],
    relatedTreatmentSlugs: ["manual-therapy", "post-surgery-rehab", "exercise-physiology"]
  },
  {
    id: "sciatica",
    slug: "sciatica",
    title: "Sciatica & Nerve Irritation",
    bodyArea: "spine",
    bodyAreaLabel: "Nerve & Spine",
    shortDescription: "Radiating leg pain, pins and needles, and numbness originating from the lumbar spine.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    overview: "Sciatica describes symptoms of pain, tingling, numbness, or weakness that travel along the path of the sciatic nerve from the lower back through the buttock and down into the leg and foot.",
    commonSymptoms: [
      "Electric, burning, or throbbing pain running down one buttock and leg",
      "Pins and needles, numbness, or tingling in the calf or toes",
      "Worse when coughing, sneezing, or sitting for prolonged periods",
      "Relieved when gently walking or lying in specific offloading positions"
    ],
    possibleCauses: [
      "Lumbar disc herniation compressing the L4, L5, or S1 nerve roots",
      "Spinal stenosis narrowing the nerve canal in older adults",
      "Piriformis syndrome compressing the sciatic nerve in the gluteal region",
      "Inflammatory cytokines irritating the nerve sheath"
    ],
    physioApproach: [
      "Gentle neurodynamic sliders and tensioners to restore smooth nerve gliding",
      "Pelvic unloading and mechanical traction positioning",
      "Progressive core stability to diminish segmental spinal shearing",
      "Patient education on pacing, comfortable sleep positions, and red flags"
    ],
    relatedTreatmentSlugs: ["back-neck-pain", "manual-therapy"]
  },
  {
    id: "sports-injuries",
    slug: "sports-injuries",
    title: "Sports & Running Injuries",
    bodyArea: "general",
    bodyAreaLabel: "Sports & Lower Limb",
    shortDescription: "Ankle sprains, hamstring strains, shin splints, and plantar fasciitis in active individuals.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    overview: "Whether you are a marathon runner, weekend warrior, or competitive team sports player, sudden spikes in mileage or explosive multidirectional forces can strain tendons, ligaments, and joints.",
    commonSymptoms: [
      "Sharp sudden pull felt in the back of the thigh while sprinting (hamstring)",
      "Swollen, bruised outer ankle following a roll or misstep",
      "Morning heel pain taking your first steps out of bed (plantar fasciitis)",
      "Aching along the inside of the shin bone during or after running"
    ],
    possibleCauses: [
      "Training load errors (too much, too soon, insufficient recovery)",
      "Inadequate eccentric strength in key running muscle groups",
      "Poor ankle dorsiflexion mobility or foot pronation mechanics",
      "Suboptimal running footwear or abrupt surface changes"
    ],
    physioApproach: [
      "Individualised load management and temporary cross-training guidance",
      "Heavy slow resistance (HSR) protocols for chronic tendon complaints",
      "High-speed video running analysis and cadence retraining",
      "Sport-specific agility drills and return-to-play criteria testing"
    ],
    relatedTreatmentSlugs: ["sports-injury-rehab", "manual-therapy"]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "liam-carter",
    name: "Liam Carter",
    role: "Senior Physiotherapist",
    title: "Sports & Musculoskeletal Physiotherapist",
    qualifications: "B.Phty (Hons), M.MuscPhysio (Syd), APAM",
    experienceYears: 12,
    specialization: ["Sports Injuries", "ACL & Knee Rehabilitation", "Dry Needling", "Running Biomechanics"],
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    bio: "Liam has over 15 years of clinical experience across elite sports teams and private practice. He served as lead physiotherapist for regional sports squads before co-founding Swastik Healthcare. Liam combines precision hands-on therapy with progressive gym rehabilitation.",
    ahpraNumber: "PHY0001892831",
    isDirector: true
  },
  {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    role: "Clinical Specialist",
    title: "Women's Health & Spinal Specialist",
    qualifications: "B.App.Sc (Physiotherapy), PostGrad Cert Continence & Pelvic Health",
    experienceYears: 10,
    specialization: ["Chronic Spinal Pain", "Pelvic Health & Postnatal Rehab", "Clinical Pilates", "Ergonomics"],
    photo: "https://images.unsplash.com/photo-1594824813580-0a78619623e1?auto=format&fit=crop&w=600&q=80",
    bio: "Sarah brings a compassionate, whole-person approach to treating complex back and pelvic conditions. She is passionate about empowering patients through reformer Pilates, movement retraining, and demystifying spinal pain with practical, evidence-based care.",
    ahpraNumber: "PHY0002194810",
    isDirector: false
  },
  {
    id: "james-patel",
    name: "James Patel",
    role: "Exercise Physiologist",
    title: "Accredited Exercise Physiologist (AEP)",
    qualifications: "B.Ex.Phys (UNSW), ESSAM",
    experienceYears: 8,
    specialization: ["Post-Surgical Conditioning", "Strength & Conditioning", "Workplace Injury RTW", "Chronic Disease"],
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
    bio: "James bridges the critical transition from the physiotherapy treatment table to high-level athletic performance and pain-free everyday resilience. He designs bespoke strength protocols tailored to each individual's physical milestones.",
    ahpraNumber: "AEP000147289",
    isDirector: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Daniel R.",
    conditionTreated: "Chronic Lower Back Pain",
    rating: 5,
    review: "After months of debilitating back pain, the team at Swastik Healthcare helped me get back to doing the things I love without fear. Professional, friendly, and highly recommended!",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    location: "Verified Patient"
  },
  {
    id: "2",
    name: "Emma Watson-Lee",
    conditionTreated: "ACL Reconstruction Recovery",
    rating: 5,
    review: "Liam guided my entire 9-month post-surgery journey. The gym facility is incredible and every single stage had clear objective benchmarks. I returned to competitive netball with complete confidence.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    location: "Verified Patient"
  },
  {
    id: "3",
    name: "Marcus Thorne",
    conditionTreated: "Desk Posture & Neck Strain",
    rating: 5,
    review: "Sarah is a true expert. In three sessions she isolated where my tension headaches were coming from and gave me simple 5-minute desk exercises that completely eliminated the morning stiffness.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    location: "Verified Patient"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Private Clinical Consultation Room",
    category: "clinic",
    categoryLabel: "Treatment Rooms",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80",
    description: "Quiet, private treatment rooms with electric hi-lo examination beds, clean linens, and natural light."
  },
  {
    id: "2",
    title: "Active Functional Rehabilitation Gym",
    category: "rehab",
    categoryLabel: "Rehab Gym",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80",
    description: "Equipped with Eleiko barbells, dual-cable pulleys, power racks, and shock-absorbent flooring for safe loading."
  },
  {
    id: "3",
    title: "Hands-on Manual Therapy Session",
    category: "sessions",
    categoryLabel: "Clinical Care",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80",
    description: "Precise joint mobilisations and soft tissue techniques delivered by AHPRA-registered physiotherapists."
  },
  {
    id: "4",
    title: "Clinical Reformer Studio",
    category: "equipment",
    categoryLabel: "Clinical Equipment",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80",
    description: "Spring-loaded reformers calibrated for core recruitment, spinal stabilization, and gentle limb loading."
  },
  {
    id: "5",
    title: "Biomechanics & Gait Analysis Bay",
    category: "equipment",
    categoryLabel: "Clinical Equipment",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80",
    description: "High-speed optical camera tracking on our commercial medical treadmill for runners and gait rehab."
  },
  {
    id: "6",
    title: "Welcoming Reception & Patient Lounge",
    category: "clinic",
    categoryLabel: "Treatment Rooms",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
    description: "Comfortable, calm waiting lounge with complimentary herbal teas, cold water, and immediate check-in."
  }
];

export const CLINIC_LOCATIONS = [
  {
    id: "sydney-cbd",
    name: "Sydney CBD Flagship Clinic",
    address: "Level 2, 452 Medical Promenade, Sydney NSW 2000",
    phone: "1300 123 456",
    parking: "Underground patient parking available. 2-minute walk from Town Hall Station.",
    isPrimary: true
  },
  {
    id: "north-shore",
    name: "North Shore Rehabilitation Hub",
    address: "Suite 104, 18 Pacific Highway, St Leonards NSW 2065",
    phone: "1300 123 457",
    parking: "Dedicated visitor bays on level B1. Opposite St Leonards Station.",
    isPrimary: false
  }
];
