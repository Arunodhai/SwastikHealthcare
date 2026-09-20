import React from 'react';
import { 
  ShieldCheck, 
  Heart, 
  Building2, 
  Sparkles, 
  Calendar,
  ArrowRight
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { SectionHeading } from '../components/SectionHeading';
import { TeamCard } from '../components/TeamCard';
import { SwastikEmblem } from '../components/SwastikLogo';
import { PageHero } from '../components/PageHero';
import { getManagedPage, getManagedSection } from '../data/pageContent';

const aboutIcons = { Building2, Sparkles, ShieldCheck, Heart };

interface AboutViewProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenBooking }) => {
  const { teamMembers: clinicTeamMembers, galleryItems: clinicGallery, settings } = useClinic();
  const teamMembers = clinicTeamMembers;
  const galleryItems = clinicGallery;
  const page = getManagedPage(settings, 'about');
  const story = getManagedSection(page, 'story');
  const certification = getManagedSection(page, 'certification');
  const difference = getManagedSection(page, 'difference');
  const team = getManagedSection(page, 'team');
  const facilities = getManagedSection(page, 'facilities');
  const cta = getManagedSection(page, 'cta');

  return (
    <div className="bg-white">
      <PageHero
        imageSrc={page.heroImageUrl || ''}
        imageAlt={page.heroImageAlt || ''}
        badge={(
          <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold tracking-wide text-blue-900">
            <SwastikEmblem className="h-5 w-5 rounded-full" />
            <span>{page.heroBadge}</span>
          </div>
        )}
        title={page.heroTitle}
        description={page.heroDescription}
      />

      {/* Clinic Story & Treatment Philosophy */}
      <section className="py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-blue-700 tracking-wider uppercase font-mono">
                {story?.eyebrow}
              </span>

              <h2 className="text-3xl font-extrabold text-[#0f2330] font-heading tracking-tight leading-tight">
                {story?.title}
              </h2>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                {story?.body?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {story?.items?.map((item) => (
                  <div key={item.key} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-2xl font-bold text-emerald-700 font-heading">{item.value}</span>
                    <p className="text-xs font-semibold text-slate-800 mt-1">{item.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src={story?.imageUrl}
                  alt={story?.imageAlt || ''}
                  className="w-full h-96 sm:h-110 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{certification?.title}</h4>
                    <p className="text-[11px] text-slate-600">{certification?.description}</p>
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
            badge={difference?.eyebrow || ''}
            title={difference?.title || ''}
            subtitle={difference?.description || ''}
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {difference?.items?.map((item) => {
              const Icon = aboutIcons[item.icon as keyof typeof aboutIcons] || ShieldCheck;
              return (
              <div
                key={item.key}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0f2330] font-heading">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{item.description}</p>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={team?.eyebrow || ''}
            title={team?.title || ''}
            subtitle={team?.description || ''}
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
              <span className="text-xs font-bold text-emerald-700 uppercase font-mono">{facilities?.eyebrow}</span>
              <h2 className="text-3xl font-bold text-[#0f2330] font-heading mt-1">{facilities?.title}</h2>
            </div>
            <button
              onClick={() => onNavigate('/gallery')}
              className="text-xs uppercase tracking-wider font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5"
            >
              <span>{facilities?.ctaLabel}</span>
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
            {cta?.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {cta?.description}
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-bold bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{cta?.ctaLabel}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
