import React, { useState } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
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
import { SwastikEmblem } from '../components/SwastikLogo';

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
    testimonials: clinicTestimonials,
    locations: clinicLocations,
    isLoading,
  } = useClinic();

  const treatments = clinicTreatments;
  const conditions = clinicConditions;
  const teamMembers = clinicTeamMembers;
  const testimonials = clinicTestimonials;
  const settings = clinicSettings;
  const locations = clinicLocations;
  const copy = settings.uiCopy || {};

  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const [quickForm, setQuickForm] = useState({
    fullName: '',
    phone: '',
    injuryConcern: '',
    location: locations[0]?.id || '',
    appointmentType: 'Initial Physiotherapy Consultation (45m)',
    preferredTime: 'Anytime Today / Tomorrow',
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

  const activeTestimonial = testimonials[activeTestimonialIdx] || testimonials[0];

  const heroBgImage = settings.heroBgImage?.trim();
  const heroEyebrow = settings.heroEyebrow?.trim();
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
            
            {heroEyebrow ? (
              <div className="inline-flex items-center gap-2.5 text-[#0b2341] text-xs sm:text-sm font-bold tracking-wide">
                <SwastikEmblem className="w-6 h-6 rounded-full shadow-xs" />
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{heroEyebrow}</span>
                </span>
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

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 text-center">
            {(settings.trustHighlights || []).map((item, idx, arr) => {
              const isLastItemAndOdd = idx === arr.length - 1 && arr.length % 2 !== 0;
              return (
                <div
                  key={item.id || (item as any)._key || `trust-item-${idx}`}
                  className={`flex flex-col items-center group ${isLastItemAndOdd ? 'col-span-2 sm:col-span-2 lg:col-span-1' : ''}`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-emerald-700 mb-3 group-hover:bg-emerald-50 group-hover:border-emerald-300 transition-all">
                    {renderTrustIcon(item.icon)}
                  </div>
                  <span className="text-xs font-bold text-[#0f2330] leading-tight whitespace-pre-line">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
          {(settings.healthFunds || []).length > 0 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
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
                            placeholder="04XX XXX XXX"
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
                            <option>Initial Physiotherapy (45m)</option>
                            <option>Follow-Up Consultation (30m)</option>
                            <option>Sports Rehab &amp; Conditioning</option>
                            <option>Workers Comp / WorkCover</option>
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
                          <option>Anytime Today / Tomorrow</option>
                          <option>Morning (7:30 AM - 11:30 AM)</option>
                          <option>Midday (11:30 AM - 2:30 PM)</option>
                          <option>Afternoon / Evening (2:30 PM - 7:00 PM)</option>
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

      {/* 5. SPLIT TESTIMONIAL & TEAM SECTION */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200/80">
              <div>
                <h3 className="text-2xl font-bold text-[#0f2330] font-heading mb-4">
                  {settings.reviewsTitle}
                </h3>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed italic min-h-[90px]">
                  "{activeTestimonial?.review}"
                </blockquote>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {activeTestimonial?.avatar ? <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    className="w-11 h-11 rounded-full object-cover border border-emerald-400"
                  /> : <div className="w-11 h-11 rounded-full bg-emerald-100 border border-emerald-300" aria-hidden="true" />}
                  <div>
                    <h4 className="text-sm font-bold text-[#0f2330] font-heading leading-tight">
                      {activeTestimonial?.name}
                    </h4>
                    <p className="text-xs text-emerald-700 font-medium">
                      {activeTestimonial?.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTestimonialIdx((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
                    aria-label="Previous testimonial"
                    className="p-1.5 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-1">
                    {testimonials.map((t, i) => (
                      <button
                        key={t.id || (t as any)._id || `testimonial-dot-${i}`}
                        onClick={() => setActiveTestimonialIdx(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          activeTestimonialIdx === i ? 'w-5 bg-emerald-600' : 'bg-slate-300'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTestimonialIdx((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
                    aria-label="Next testimonial"
                    className="p-1.5 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-700"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-[#0f2330] font-heading">
                    {settings.teamTitle}
                  </h3>
                  <button
                    onClick={() => onNavigate('/about')}
                    className="text-xs font-bold text-emerald-700 hover:underline hidden sm:inline-block"
                  >
                    {copy.homeTeamCredentialsLabel} &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {teamMembers.slice(0, 3).map((therapist, idx) => (
                    <div
                      key={therapist.id || (therapist as any)._id || `therapist-${idx}`}
                      className="bg-slate-50/50 rounded-2xl border border-slate-200/80 p-3.5 text-center flex flex-col items-center hover:border-emerald-300 hover:shadow-sm transition-all"
                    >
                      {therapist.photo ? <img
                        src={therapist.photo}
                        alt={therapist.name}
                        className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-sm mb-3"
                      /> : <div className="w-24 h-24 rounded-full bg-slate-200 border-2 border-white shadow-sm mb-3" aria-hidden="true" />}
                      <h4 className="text-sm font-bold text-[#0f2330] font-heading leading-tight">
                        {therapist.name}
                      </h4>
                      <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                        {therapist.role}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                        {therapist.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  id="meet-team-view-btn"
                  onClick={() => onNavigate('/about')}
                  className="px-6 py-2.5 rounded-full text-xs font-bold border border-slate-300 hover:bg-slate-50 text-slate-800 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{copy.homeTeamCtaLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
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

          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 bg-slate-200 -z-0"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10 text-center">
              {(settings.howItWorks || []).map((step, idx) => (
                <div key={(step as any)._key || (step as any)._id || `step-${step.step || idx}`} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#0f766e] text-white font-bold text-sm flex items-center justify-center shadow-md mb-3 ring-4 ring-white">
                    {step.step}
                  </div>
                  <h4 className="text-sm font-bold text-[#0f2330] font-heading">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 max-w-[200px] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
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
