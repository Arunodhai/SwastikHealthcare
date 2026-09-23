import React, { useState } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  GraduationCap,
  ClipboardList,
  Activity,
  Compass,
  HeartHandshake,
  CalendarCheck,
  Building2,
  Phone,
  Flame,
  Briefcase,
  Dumbbell,
  Clock,
  Sparkles
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { SectionHeading } from '../components/SectionHeading';
import { TreatmentCard } from '../components/TreatmentCard';
import { ConditionCard } from '../components/ConditionCard';

const iconLookup: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  ClipboardList,
  Activity,
  ShieldCheck,
  CalendarCheck,
  Compass,
  HeartHandshake,
  Award,
  Building2,
  Phone,
  Flame,
  Briefcase,
  Dumbbell,
  Clock,
  Sparkles,
};

function renderTrustIcon(iconName?: string) {
  const IconComponent = (iconName && iconLookup[iconName]) || ShieldCheck;
  return <IconComponent className="w-7 h-7" />;
}

interface HomeViewProps {
  onNavigate: (path: string) => void;
  onOpenBooking: (treatmentSlug?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenBooking }) => {
  const {
    settings: clinicSettings,
    treatments: clinicTreatments,
    conditions: clinicConditions,
    teamMembers: clinicTeamMembers,
    locations: clinicLocations,
    isLoading,
  } = useClinic();

  const treatments = clinicTreatments;
  const conditions = clinicConditions;
  const teamMembers = clinicTeamMembers;
  const settings = clinicSettings;
  const locations = clinicLocations;
  const copy = settings.uiCopy || {};

  const [quickForm, setQuickForm] = useState({
    fullName: '',
    phone: '',
    injuryConcern: '',
    location: locations[0]?.id || '',
    appointmentType: 'Orthopaedic Rehabilitation',
    preferredTime: 'Any available time',
  });
  const [quickFormSuccess, setQuickFormSuccess] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.fullName || !quickForm.phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }
    setQuickFormSuccess(true);
  };

  const heroBgImage = settings.heroBgImage?.trim();
  const heroEyebrow = settings.heroEyebrow?.trim();
  const heroEyebrowText = heroEyebrow?.split('•').pop()?.trim() || heroEyebrow;
  const heroTitle = settings.heroTitle?.trim();
  const heroSubtitle = settings.heroSubtitle?.trim();
  const heroImageAlt = settings.heroImageAlt?.trim() || '';
  const heroPrimaryCtaLabel = settings.heroPrimaryCtaLabel?.trim();
  const heroSecondaryCtaLabel = settings.heroSecondaryCtaLabel?.trim();
  const hasHeroBadge1 = Boolean(settings.heroBadge1Title?.trim() || settings.heroBadge1Subtitle?.trim());
  const hasHeroBadge2 = Boolean(settings.heroBadge2Title?.trim() || settings.heroBadge2Subtitle?.trim());

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-4 pb-6 sm:pt-8 sm:pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80 bg-slate-50">
        <div className="absolute inset-0 z-0">
          {heroBgImage && (
            <img
              src={heroBgImage}
              alt={heroImageAlt}
              className="w-full h-full object-cover object-[70%_center] sm:object-center"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/60 sm:from-white sm:via-white/90 sm:to-transparent lg:from-white lg:via-white/85 lg:via-45% lg:to-transparent lg:to-70%" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl space-y-5 py-1 sm:space-y-6 sm:py-8 lg:py-12">
            
            {heroEyebrowText ? (
              <div className="text-[#0b2341] text-xs sm:text-sm font-bold tracking-wide">
                {heroEyebrowText}
              </div>
            ) : null}

            {heroTitle ? (
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0f2330] font-heading leading-[1.08]">
                {heroTitle}
              </h1>
            ) : null}

            {heroSubtitle && (
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {heroSubtitle}
              </p>
            )}

            {(heroPrimaryCtaLabel || heroSecondaryCtaLabel) && <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              {heroPrimaryCtaLabel && (
              <button
                id="hero-book-btn"
                onClick={() => onOpenBooking()}
                className="px-6 py-3.5 rounded-full text-xs uppercase tracking-wider font-bold bg-[#0f2330] hover:bg-[#193b50] text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-4 h-4 text-lime-400" />
                <span>{heroPrimaryCtaLabel}</span>
              </button>
              )}

              {heroSecondaryCtaLabel && (
              <button
                id="hero-view-services-btn"
                onClick={() => onNavigate('/treatments')}
                className="px-6 py-3.5 rounded-full text-xs uppercase tracking-wider font-bold bg-white hover:bg-slate-50 text-[#0f2330] border border-slate-300 shadow-2xs hover:border-slate-400 transition-all flex items-center gap-2 group"
              >
                <span>{heroSecondaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </button>
              )}
            </div>}

            {(hasHeroBadge1 || hasHeroBadge2) && (
            <div className="pt-4 sm:pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600">
              {hasHeroBadge1 && <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100/80 flex items-center justify-center text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
                    {settings.heroBadge1Title}
                  </span>
                  {settings.heroBadge1Subtitle && <span className="text-slate-500 text-[10px]">{settings.heroBadge1Subtitle}</span>}
                </div>
              </div>}

              {hasHeroBadge1 && hasHeroBadge2 && <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>}

              {hasHeroBadge2 && <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-lime-100 flex items-center justify-center text-emerald-800">
                  <Award className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
                    {settings.heroBadge2Title}
                  </span>
                  {settings.heroBadge2Subtitle && <span className="text-slate-500 text-[10px]">{settings.heroBadge2Subtitle}</span>}
                </div>
              </div>}
            </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. OUR PHYSIOTHERAPY SERVICES */}
      <section className="pt-8 pb-12 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={settings.servicesBadge}
            title={settings.servicesTitle || ''}
            subtitle={settings.servicesSubtitle}
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {treatments.map((treatment, idx) => (
              <TreatmentCard
                key={treatment.id || (treatment as any)._id || treatment.slug || `treatment-${idx}`}
                treatment={treatment}
                onSelect={(slug) => onNavigate(`/treatments/${slug}`)}
                onBook={(slug) => onOpenBooking(slug)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              id="view-all-services-btn"
              onClick={() => onNavigate('/treatments')}
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-bold bg-[#0f2330] hover:bg-[#193b50] text-white shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
            >
              <span>{copy.homeServicesCtaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. WHY PATIENTS CHOOSE US */}
      <section className="py-14 sm:py-18 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f2330] font-heading tracking-tight">
              {settings.whyChooseUsTitle}
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
              {settings.whyChooseUsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
            {(settings.trustHighlights || []).map((item, idx) => (
              <div
                key={item.id || (item as any)._key || `trust-item-${idx}`}
                className="group min-h-36 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-2xs flex flex-col items-center justify-center text-center transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mb-4 group-hover:bg-emerald-100 transition-colors">
                  {renderTrustIcon(item.icon)}
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-[#0f2330] leading-snug whitespace-pre-line">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
          {(settings.healthFunds || []).length > 0 && (
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2">
              {(settings.healthFunds || []).map((fund, index) => (
                <span key={(fund as any)._key || index} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs">
                  {fund.name}{fund.badgeText ? ` · ${fund.badgeText}` : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. NEED HELP WITH PAIN / QUICK BOOKING SECTION */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-50 to-emerald-50/40 rounded-3xl border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase font-mono mb-1 block">
                    {settings.consultationEyebrow}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2330] font-heading tracking-tight leading-tight whitespace-pre-line">
                    {settings.consultationTitle}
                  </h2>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {settings.consultationSubtitle}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {(settings.consultationBenefits || []).map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {settings.consultationImage && <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm mt-4">
                  <img
                    src={settings.consultationImage}
                    alt={settings.consultationImageAlt || ''}
                    className="w-full h-44 object-cover"
                  />
                </div>}
              </div>

              <div className="lg:col-span-6">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200/90">
                  <div className="mb-5 pb-3 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-[#0f2330] font-heading">
                      {copy.quickFormTitle}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {copy.quickFormSubtitle}
                    </p>
                  </div>

                  {quickFormSuccess ? (
                    <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                      <h4 className="font-bold font-heading text-lg">Thank You!</h4>
                      <p className="text-xs text-slate-700">
                        We have received your appointment request. One of our clinical coordinators will call you shortly on <strong>{quickForm.phone}</strong> to confirm your slot.
                      </p>
                      <button
                        onClick={() => setQuickFormSuccess(false)}
                        className="text-xs font-bold underline text-emerald-800 pt-2"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleQuickSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold uppercase text-slate-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={quickForm.fullName}
                            onChange={(e) => setQuickForm({ ...quickForm, fullName: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold uppercase text-slate-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="Your contact number"
                            value={quickForm.phone}
                            onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-slate-700 mb-1">
                          Injury or Concern
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Lower Back Pain, Knee Injury"
                          value={quickForm.injuryConcern}
                          onChange={(e) => setQuickForm({ ...quickForm, injuryConcern: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold uppercase text-slate-700 mb-1">
                            Preferred Clinic Location
                          </label>
                          <select
                            value={quickForm.location}
                            onChange={(e) => setQuickForm({ ...quickForm, location: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                          >
                            {locations.map((loc) => (
                              <option key={loc.id} value={loc.id}>
                                {loc.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold uppercase text-slate-700 mb-1">
                            Appointment Type
                          </label>
                          <select
                            value={quickForm.appointmentType}
                            onChange={(e) => setQuickForm({ ...quickForm, appointmentType: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                          >
                            {treatments.map((treatment) => <option key={treatment.slug}>{treatment.title}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-slate-700 mb-1">
                          Preferred Time Window
                        </label>
                        <select
                          value={quickForm.preferredTime}
                          onChange={(e) => setQuickForm({ ...quickForm, preferredTime: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        >
                          <option>Any available time</option>
                          <option>Morning</option>
                          <option>Afternoon</option>
                          <option>Evening</option>
                        </select>
                      </div>

                      <button
                        id="quick-form-submit-btn"
                        type="submit"
                        className="w-full py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] shadow transition-all flex items-center justify-center gap-2 mt-2"
                      >
                        <Calendar className="w-4 h-4 text-[#0f2330]" />
                        <span>{copy.quickFormSubmitLabel}</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLINICAL LEADERSHIP */}
      {teamMembers.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10">
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase font-mono mb-2 block">
                Clinical Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2330] font-heading tracking-tight">
                {settings.teamTitle}
              </h2>
            </div>

            {teamMembers.length === 1 ? (
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-emerald-50/50 shadow-sm">
                <div className="grid md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr] items-stretch">
                  <div className="relative min-h-80 bg-[#0f2330]">
                    {teamMembers[0].photo ? (
                      <img
                        src={teamMembers[0].photo}
                        alt={teamMembers[0].name}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-200" aria-hidden="true" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0f2330]/75 to-transparent" />
                  </div>

                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2">
                      {teamMembers[0].role}
                    </p>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0f2330] font-heading tracking-tight leading-tight">
                      {teamMembers[0].name}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      {teamMembers[0].title}
                    </p>
                    {teamMembers[0].bio && (
                      <p className="mt-5 text-sm leading-relaxed text-slate-600 max-w-2xl">
                        {teamMembers[0].bio}
                      </p>
                    )}
                    {(teamMembers[0].specialization || []).length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {teamMembers[0].specialization.map((item) => (
                          <span key={item} className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-7">
                      <button
                        id="meet-team-view-btn"
                        onClick={() => onNavigate('/about#team')}
                        className="px-6 py-3 rounded-full text-xs font-bold bg-[#0f2330] hover:bg-[#193b50] text-white transition-colors inline-flex items-center gap-2"
                      >
                        <span>{copy.homeTeamCtaLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {teamMembers.map((therapist, idx) => (
                  <div
                    key={therapist.id || (therapist as any)._id || `therapist-${idx}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center flex flex-col items-center"
                  >
                    {therapist.photo ? (
                      <img src={therapist.photo} alt={therapist.name} className="w-28 h-28 rounded-full object-cover object-top border-4 border-white shadow-sm" />
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-slate-200 border-4 border-white shadow-sm" aria-hidden="true" />
                    )}
                    <h3 className="mt-4 text-lg font-bold text-[#0f2330] font-heading">{therapist.name}</h3>
                    <p className="mt-1 text-xs font-semibold text-emerald-700">{therapist.role}</p>
                    <p className="mt-1 text-xs text-slate-500">{therapist.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 6. HOW IT WORKS */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase font-mono mb-1 block">
              {settings.howItWorksEyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2330] font-heading tracking-tight">
              {settings.howItWorksTitle}
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-lg mx-auto">
              {settings.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {(settings.howItWorks || []).map((step, idx) => (
                <div
                  key={(step as any)._key || (step as any)._id || `step-${step.step || idx}`}
                  className="relative min-h-52 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col items-start text-left transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#0f766e] text-white font-bold text-sm flex items-center justify-center shadow-sm mb-7">
                    {step.step}
                  </div>
                  <div className="absolute right-5 top-5 text-4xl font-extrabold text-slate-100 font-heading" aria-hidden="true">
                    {String(step.step).padStart(2, '0')}
                  </div>
                  <h4 className="text-base font-bold text-[#0f2330] font-heading">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 7. CONDITIONS WE TREAT */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={settings.conditionsBadge}
            title={settings.conditionsTitle || ''}
            subtitle={settings.conditionsSubtitle}
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {conditions.map((condition, idx) => (
              <ConditionCard
                key={condition.id || (condition as any)._id || condition.slug || `condition-${idx}`}
                condition={condition}
                onSelect={(slug) => onNavigate(`/conditions/${slug}`)}
                onBook={() => onOpenBooking()}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('/conditions')}
              className="text-xs uppercase tracking-wider font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5 border-b-2 border-emerald-600 pb-0.5"
            >
              <span>{copy.homeConditionsCtaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
