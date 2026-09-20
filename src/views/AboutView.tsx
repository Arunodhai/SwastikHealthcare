import React from 'react';
import { 
  ShieldCheck, 
  Heart, 
  Building2, 
  Sparkles, 
  Calendar,
  ArrowRight
} from 'lucide-react';
import { 
  TEAM_MEMBERS as FALLBACK_TEAM_MEMBERS, 
  GALLERY_ITEMS as FALLBACK_GALLERY 
} from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import { SectionHeading } from '../components/SectionHeading';
import { TeamCard } from '../components/TeamCard';
import { SwastikEmblem } from '../components/SwastikLogo';

interface AboutViewProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenBooking }) => {
  const { teamMembers: clinicTeamMembers, galleryItems: clinicGallery } = useClinic();
  const teamMembers = clinicTeamMembers || FALLBACK_TEAM_MEMBERS;
  const galleryItems = (clinicGallery && clinicGallery.length > 0) ? clinicGallery : FALLBACK_GALLERY;

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white pt-12 pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold tracking-wide">
              <SwastikEmblem className="w-5 h-5 rounded-full" />
              <span>About Swastik Healthcare • Established 2009</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0f2330] font-heading leading-tight">
              A Modern, Evidence-Based Standard for Physical Rehabilitation.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Founded in 2009 on the conviction that rehabilitation should guide patients through every milestone of recovery — from initial immobility and assistive support to independent movement and lasting strength.
            </p>
          </div>
        </div>
      </section>

      {/* Clinic Story & Treatment Philosophy */}
      <section className="py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-blue-700 tracking-wider uppercase font-mono">
                Our Story &amp; Clinical Mission (Since 2009)
              </span>

              <h2 className="text-3xl font-extrabold text-[#0f2330] font-heading tracking-tight leading-tight">
                Guiding Every Stage of Your Physical Recovery Journey.
              </h2>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>Swastik Healthcare</strong> was established in 2009 with a patient-centered mission symbolized in our clinical emblem: guiding individuals from acute immobility, through progressive assisted walking, to standing proud and fully restored in their daily lives.
                </p>
                <p>
                  We built our clinic around an uncompromised standard: <strong>every patient deserves unhurried, private one-on-one attention</strong>, thorough diagnostic biomechanics, and a progressive rehabilitation roadmap tailored to their personal lifestyle and goals.
                </p>
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-2xl font-bold text-emerald-700 font-heading">100%</span>
                  <p className="text-xs font-semibold text-slate-800 mt-1">One-on-One Care</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">No double booking ever.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-2xl font-bold text-emerald-700 font-heading">45m</span>
                  <p className="text-xs font-semibold text-slate-800 mt-1">Standard Consults</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Time to listen &amp; test.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-2xl font-bold text-emerald-700 font-heading">Full</span>
                  <p className="text-xs font-semibold text-slate-800 mt-1">Rehabilitation Gym</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Real loading for real life.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Swastik Healthcare clinic consultation suite"
                  className="w-full h-96 sm:h-110 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">AHPRA &amp; APA Certified Standards</h4>
                    <p className="text-[11px] text-slate-600">All clinicians undergo continuous postgraduate musculoskeletal education.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Are Different */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Clinic Difference"
            title="How We Are Different"
            subtitle="We design your care to resolve underlying musculoskeletal deficits, not merely silence immediate symptoms."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Private Suites',
                desc: 'Comfortable, quiet consultation rooms with acoustic privacy for thorough conversations and dignified care.',
                icon: Building2,
              },
              {
                title: 'Functional Rehab Gym',
                desc: 'Our integrated gym floor bridges the gap between passive therapy and return to high-demand sport or work.',
                icon: Sparkles,
              },
              {
                title: 'Objective Testing',
                desc: 'Dynamometry, force plates, and video gait analysis provide transparent recovery benchmarks at every milestone.',
                icon: ShieldCheck,
              },
              {
                title: 'No Referral Needed',
                desc: 'Private patients can book directly without waiting for a doctor referral. Instant HICAPS rebate processing.',
                icon: Heart,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0f2330] font-heading">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Practitioners"
            title="Our Dedicated Clinical Team"
            subtitle="Meet our university-trained physiotherapists and accredited exercise physiologists."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <TeamCard
                key={member.id || (member as any)._id || `team-member-${idx}`}
                member={member}
                onBook={onOpenBooking}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Facility Highlights Tour */}
      <section className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase font-mono">Our Facilities</span>
              <h2 className="text-3xl font-bold text-[#0f2330] font-heading mt-1">Designed for Healing &amp; Movement</h2>
            </div>
            <button
              onClick={() => onNavigate('/gallery')}
              className="text-xs uppercase tracking-wider font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5"
            >
              <span>View Full Photo Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {galleryItems.slice(0, 3).map((item) => (
              <div key={item.id} className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-[#0f2330] font-heading">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-[#0f2330] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-white">
            Experience the Swastik Healthcare Difference
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Book an initial assessment with one of our senior physiotherapists. We look forward to welcoming you to our clinic.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-bold bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Consultation</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
