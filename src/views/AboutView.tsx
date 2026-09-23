import React from 'react';
import {
  ShieldCheck,
  Heart,
  Building2,
  Sparkles,
  Calendar,
  Award,
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { SectionHeading } from '../components/SectionHeading';
import { PageHero } from '../components/PageHero';
import { getManagedPage, getManagedSection } from '../data/pageContent';

const aboutIcons = { Building2, Sparkles, ShieldCheck, Heart };

interface AboutViewProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenBooking }) => {
  const { teamMembers, settings } = useClinic();
  const page = getManagedPage(settings, 'about');
  const story = getManagedSection(page, 'story');
  const difference = getManagedSection(page, 'difference');
  const team = getManagedSection(page, 'team');
  const founder = teamMembers[0];

  return (
    <div className="bg-white">
      <PageHero
        imageSrc={page.heroImageUrl}
        imageAlt={page.heroImageAlt || ''}
        badge={page.heroBadge ? (
          <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold tracking-wide text-emerald-900">
            {page.heroBadge}
          </div>
        ) : null}
        title={page.heroTitle}
        description={page.heroDescription}
      />

      {/* One concise clinic story: narrative on the left, evidence on the right. */}
      <section className="py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              {story?.eyebrow && (
                <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase font-mono">
                  {story.eyebrow}
                </span>
              )}
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0f2330] font-heading tracking-tight leading-tight">
                {story?.title}
              </h2>
              <div className="mt-6 space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                {story?.body?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {story?.items?.map((item) => (
                <div key={item.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex items-start gap-4">
                  <span className="min-w-16 text-3xl font-extrabold text-emerald-700 font-heading leading-none">
                    {item.value}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#0f2330]">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The founder appears once, as a complete leadership profile. */}
      {founder && (
        <section id="team" className="py-16 sm:py-20 border-b border-slate-100 bg-slate-50/60 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {team?.eyebrow && (
              <div className="mb-5 text-center">
                <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase font-mono">
                  {team.eyebrow}
                </span>
              </div>
            )}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid md:grid-cols-[340px_1fr] lg:grid-cols-[410px_1fr] items-stretch">
                <div className="relative min-h-96 bg-[#0f2330]">
                  {founder.photo ? (
                    <img
                      src={founder.photo}
                      alt={founder.name}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-200" aria-hidden="true" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f2330]/70 to-transparent" />
                </div>

                <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                    {founder.role}
                  </p>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0f2330] font-heading tracking-tight leading-tight">
                    {founder.name}
                  </h2>
                  <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{founder.qualifications || founder.title}</span>
                  </div>
                  {founder.bio && (
                    <p className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">
                      {founder.bio}
                    </p>
                  )}
                  {(founder.specialization || []).length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {founder.specialization.map((item) => (
                        <span key={item} className="rounded-full border border-emerald-200 bg-emerald-50/60 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                  {settings.heroPrimaryCtaLabel && <div className="mt-7">
                    <button
                      onClick={onOpenBooking}
                      className="px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold bg-[#0f2330] hover:bg-[#193b50] text-white inline-flex items-center gap-2 transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-lime-400" />
                      <span>{settings.heroPrimaryCtaLabel}</span>
                    </button>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Care options are retained as the page's single service-model section. */}
      <section className="py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={difference?.eyebrow || ''}
            title={difference?.title || ''}
            subtitle={difference?.description || ''}
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {difference?.items?.map((item) => {
              const Icon = aboutIcons[item.icon as keyof typeof aboutIcons] || ShieldCheck;
              return (
                <div
                  key={item.key}
                  className="min-h-56 rounded-2xl p-6 border border-slate-200 bg-slate-50 flex flex-col items-start transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0f2330] font-heading">{item.title}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
