import React, { useState } from 'react';
import { 
  Calendar, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  ArrowRight,
  Sparkles 
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

interface TreatmentDetailViewProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (treatmentSlug?: string) => void;
}

export const TreatmentDetailView: React.FC<TreatmentDetailViewProps> = ({
  slug,
  onNavigate,
  onOpenBooking,
}) => {
  const { treatments, conditions, settings, isLoading } = useClinic();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const treatment = treatments.find((item) => item.slug === slug);

  if (isLoading) {
    return <div className="min-h-[60vh] bg-white" aria-label="Loading treatment" />;
  }

  if (!treatment) {
    return (
      <section className="min-h-[60vh] bg-white flex items-center justify-center px-4 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-[#0f2330] font-heading">Treatment not found</h1>
          <button onClick={() => onNavigate('/treatments')} className="text-sm font-bold text-emerald-700 hover:underline">
            Return to all treatments
          </button>
        </div>
      </section>
    );
  }

  const pageCopy = treatment.detailPageCopy;

  const relatedConditions = conditions.filter((c) =>
    treatment.relatedConditionSlugs?.includes(c.slug)
  );

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/treatments')}
              className="hover:text-slate-900 flex items-center gap-1 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Treatments</span>
            </button>
            <span>/</span>
            <span className="text-slate-400 font-mono text-[11px]">{treatment.categoryLabel}</span>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px]">{treatment.title}</span>
          </div>
          <button
            onClick={() => onOpenBooking(treatment.slug)}
            className="text-emerald-700 font-bold hover:underline hidden sm:inline-block"
          >
            Book This Service &rarr;
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 lg:py-16 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className={`${treatment.heroImage ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-5`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{treatment.categoryLabel}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2330] font-heading tracking-tight leading-tight">
                {treatment.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {treatment.shortDescription}
              </p>

              {(treatment.durationMinutes || pageCopy?.rebateBadge) && (
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  {treatment.durationMinutes && (
                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg font-medium text-slate-800">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span>{treatment.durationMinutes} Minute Consultations</span>
                    </div>
                  )}
                  {pageCopy?.rebateBadge && (
                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg font-medium text-slate-800">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{pageCopy.rebateBadge}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4 flex flex-wrap items-center gap-3">
                {pageCopy?.primaryCtaLabel && <button
                  id="treatment-hero-book-btn"
                  onClick={() => onOpenBooking(treatment.slug)}
                  className="px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{pageCopy?.primaryCtaLabel}</span>
                </button>}
                {pageCopy?.secondaryCtaLabel && <button
                  onClick={() => {
                    const el = document.getElementById('treatment-approach-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-full text-xs uppercase tracking-wider font-semibold border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors"
                >
                  {pageCopy?.secondaryCtaLabel}
                </button>}
              </div>
            </div>

            {treatment.heroImage && <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src={treatment.heroImage}
                  alt={treatment.heroImageAlt || treatment.title}
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
            </div>}
          </div>
        </div>
      </section>

      {/* Main Content: Two Columns */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Who This Treatment is Suitable For */}
              {treatment.suitableFor.length > 0 && <div>
                <h2 className="text-2xl font-bold text-[#0f2330] font-heading mb-4">
                  {pageCopy?.suitableForHeading}
                </h2>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-3">
                  {treatment.suitableFor.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>}

              {/* Key Clinical Benefits */}
              {treatment.benefits.length > 0 && <div>
                <h2 className="text-2xl font-bold text-[#0f2330] font-heading mb-4">
                  {pageCopy?.benefitsHeading}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {treatment.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-xl border border-slate-200/90 bg-white hover:border-emerald-300 hover:shadow-xs transition-all"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mb-2"></div>
                      <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>}

              {/* Treatment Approach / Process */}
              {treatment.approachSteps.length > 0 && <div id="treatment-approach-section">
                <h2 className="text-2xl font-bold text-[#0f2330] font-heading mb-2">
                  {pageCopy?.approachHeading}
                </h2>
                {pageCopy?.approachIntro && <p className="text-xs sm:text-sm text-slate-500 mb-6">{pageCopy.approachIntro}</p>}
                <div className="space-y-4">
                  {treatment.approachSteps.map((step) => (
                    <div
                      key={step.step}
                      className="flex gap-4 p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#0f766e] text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {step.step}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-[#0f2330] font-heading">
                          {step.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>}

              {/* FAQs Accordion */}
              {treatment.faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0f2330] font-heading mb-4">
                    {pageCopy?.faqHeading}
                  </h2>
                  <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden">
                    {treatment.faqs.map((faq, i) => {
                      const isOpen = openFaqIdx === i;
                      return (
                        <div key={i} className="bg-white">
                          <button
                            onClick={() => setOpenFaqIdx(isOpen ? null : i)}
                            className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#0f2330] hover:bg-slate-50 transition-colors"
                          >
                            <span>{faq.question}</span>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Booking Widget & Related Conditions */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Quick Booking Sticky Card */}
              <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-5">
                <div className="space-y-1 pb-4 border-b border-slate-100">
                  {pageCopy?.bookingEyebrow && <span className="text-[11px] font-bold text-emerald-700 uppercase font-mono">{pageCopy.bookingEyebrow}</span>}
                  <h3 className="text-lg font-bold text-[#0f2330] font-heading">
                    {treatment.title}
                  </h3>
                  {treatment.sessionSubtitle && (
                    <p className="text-xs text-slate-500">
                      {treatment.sessionSubtitle}
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  {treatment.durationMinutes && (
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Session Length</span>
                      <span className="font-semibold text-slate-800">{treatment.durationMinutes} Minutes</span>
                    </div>
                  )}
                  {treatment.healthRebates && (
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Health Rebates</span>
                      <span className="font-semibold text-emerald-700">{treatment.healthRebates}</span>
                    </div>
                  )}
                  {treatment.referralRequirement && (
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Referral Needed</span>
                      <span className="font-semibold text-slate-800">{treatment.referralRequirement}</span>
                    </div>
                  )}
                </div>

                <button
                  id="sidebar-book-treatment-btn"
                  onClick={() => onOpenBooking(treatment.slug)}
                  className="w-full py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] shadow transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#0f2330]" />
                  <span>{pageCopy?.sidebarCtaLabel}</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  Questions? Call our reception at {settings.phone}
                </p>
              </div>

              {/* Related Conditions */}
              {relatedConditions.length > 0 && (
                <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 space-y-4">
                  <h4 className="text-sm font-bold text-[#0f2330] font-heading uppercase tracking-wide">
                    {pageCopy?.relatedConditionsHeading}
                  </h4>
                  <div className="space-y-2">
                    {relatedConditions.map((condition) => (
                      <button
                        key={condition.id}
                        onClick={() => onNavigate(`/conditions/${condition.slug}`)}
                        className="w-full text-left p-3 rounded-xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-2xs transition-all flex items-center justify-between text-xs font-semibold text-slate-800 group"
                      >
                        <span>{condition.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
