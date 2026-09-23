import React from 'react';
import { 
  Calendar, 
  ArrowLeft, 
  AlertCircle, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle 
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { DetailActionCard } from '../components/DetailActionCard';

interface ConditionDetailViewProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ConditionDetailView: React.FC<ConditionDetailViewProps> = ({
  slug,
  onNavigate,
  onOpenBooking,
}) => {
  const { conditions, treatments, settings, isLoading } = useClinic();
  const condition = conditions.find((item) => item.slug === slug);

  if (isLoading && !condition) {
    return (
      <div className="min-h-[60vh] bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!condition) {
    return (
      <section className="min-h-[60vh] bg-white flex items-center justify-center px-4 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-[#0f2330] font-heading">Condition not found</h1>
          <button onClick={() => onNavigate('/conditions')} className="text-sm font-bold text-emerald-700 hover:underline">
            Return to all conditions
          </button>
        </div>
      </section>
    );
  }

  const pageCopy = condition.detailPageCopy;

  const relatedTreatments = treatments.filter((t) =>
    condition.relatedTreatmentSlugs?.includes(t.slug)
  );

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/conditions')}
              className="hover:text-slate-900 flex items-center gap-1 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Conditions We Treat</span>
            </button>
            <span>/</span>
            <span className="text-slate-400 font-mono text-[11px]">{condition.bodyAreaLabel}</span>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px]">{condition.title}</span>
          </div>
          <button
            onClick={onOpenBooking}
            className="text-emerald-700 font-bold hover:underline hidden sm:inline-block"
          >
            Book Assessment &rarr;
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className={`${condition.image ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span>{condition.bodyAreaLabel} Area</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2330] font-heading tracking-tight leading-tight">
                {condition.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {condition.overview}
              </p>

              {pageCopy?.heroHighlights && pageCopy.heroHighlights.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  {pageCopy.heroHighlights.map((highlight) => (
                    <span key={highlight} className="bg-slate-100 px-3 py-1.5 rounded-lg font-medium text-slate-800">
                      {highlight}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-4 flex flex-wrap items-center gap-3">
                {pageCopy?.primaryCtaLabel && <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{pageCopy?.primaryCtaLabel}</span>
                </button>}
              </div>
            </div>

            {condition.image && <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src={condition.image}
                  alt={condition.imageAlt || condition.title}
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
            </div>}
          </div>
        </div>
      </section>

      {/* Main Clinical Details */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Symptoms, Causes, Physio Approach */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Common Symptoms */}
              {condition.commonSymptoms.length > 0 && <div>
                <h2 className="text-2xl font-bold text-[#0f2330] font-heading mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-emerald-700" />
                  <span>{pageCopy?.symptomsHeading}</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {condition.commonSymptoms.map((symptom, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                      <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {symptom}
                      </span>
                    </div>
                  ))}
                </div>
              </div>}

              {/* Possible Causes & Risk Factors */}
              {condition.possibleCauses.length > 0 && <div>
                <h2 className="text-2xl font-bold text-[#0f2330] font-heading mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-700" />
                  <span>{pageCopy?.causesHeading}</span>
                </h2>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
                  {condition.possibleCauses.map((cause, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-sm text-slate-700 leading-relaxed">{cause}</span>
                    </div>
                  ))}
                </div>
              </div>}

              {/* How Physiotherapy Helps */}
              {condition.physioApproach.length > 0 && <div>
                <h2 className="text-2xl font-bold text-[#0f2330] font-heading mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>{pageCopy?.approachHeading}</span>
                </h2>
                {pageCopy?.approachIntro && <p className="text-xs sm:text-sm text-slate-500 mb-6">{pageCopy.approachIntro}</p>}

                <div className="space-y-4">
                  {condition.physioApproach.map((approach, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl border border-emerald-100 bg-emerald-50/40 flex items-start gap-3.5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-800 leading-relaxed font-medium">
                        {approach}
                      </p>
                    </div>
                  ))}
                </div>
              </div>}

              {/* Medical Note */}
              {pageCopy?.medicalNotice && (
                <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <strong>Medical Notice:</strong> {pageCopy.medicalNotice}
                </div>
              )}
            </div>

            {/* Right Column: Recommended Treatments & Booking */}
            <div className="lg:col-span-4 space-y-8">
              
              <DetailActionCard
                eyebrow={condition.actionEyebrow}
                heading={condition.actionHeading || ''}
                description={condition.actionSubtitle}
                highlights={pageCopy?.bookingHighlights}
                ctaLabel={pageCopy?.sidebarCtaLabel || settings.heroPrimaryCtaLabel || ''}
                reassurance={pageCopy?.bookingReassurance || condition.rebateNote}
                phone={settings.phone || undefined}
                onBook={onOpenBooking}
              />

              {/* Related Services */}
              {relatedTreatments.length > 0 && (
                <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 space-y-4">
                  <h4 className="text-sm font-bold text-[#0f2330] font-heading uppercase tracking-wide">
                    {pageCopy?.relatedTreatmentsHeading}
                  </h4>
                  <div className="space-y-2.5">
                    {relatedTreatments.map((treatment) => (
                      <button
                        key={treatment.id}
                        onClick={() => onNavigate(`/treatments/${treatment.slug}`)}
                        className="w-full text-left p-3.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 transition-all flex items-center justify-between text-xs font-semibold text-slate-800 group"
                      >
                        <div>
                          <p className="font-bold text-[#0f2330] group-hover:text-emerald-800">
                            {treatment.title}
                          </p>
                          <p className="text-[11px] text-slate-500 font-normal">
                            {treatment.categoryLabel}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 transition-transform group-hover:translate-x-0.5" />
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
