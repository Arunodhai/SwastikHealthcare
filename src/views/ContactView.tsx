import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Navigation, 
  CheckCircle2, 
  Send,
  Building2,
  Calendar
} from 'lucide-react';
import { CLINIC_SETTINGS as FALLBACK_SETTINGS, CLINIC_LOCATIONS as FALLBACK_LOCATIONS } from '../data/clinicData';
import { useClinic } from '../context/ClinicContext';
import { PageHero } from '../components/PageHero';
import { getManagedPage, getManagedSection } from '../data/pageContent';

interface ContactViewProps {
  onOpenBooking: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenBooking }) => {
  const { settings: clinicSettings, locations: clinicLocations } = useClinic();
  const settings = clinicSettings || FALLBACK_SETTINGS;
  const page = getManagedPage(settings, 'contact');
  const directSection = getManagedSection(page, 'direct');
  const formSection = getManagedSection(page, 'form');
  const locationsSection = getManagedSection(page, 'locations');
  const directItems = Object.fromEntries((directSection?.items || []).map((item) => [item.key, item]));
  const formItems = Object.fromEntries((formSection?.items || []).map((item) => [item.key, item]));
  const locationItems = Object.fromEntries((locationsSection?.items || []).map((item) => [item.key, item]));
  const locations = (clinicLocations && clinicLocations.length > 0) ? clinicLocations : FALLBACK_LOCATIONS;
  const [selectedLocation, setSelectedLocation] = useState(locations[0]?.id || FALLBACK_LOCATIONS[0].id);

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry / Appointment Question',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeLoc = locations.find(l => l.id === selectedLocation) || locations[0] || FALLBACK_LOCATIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.email) {
      alert('Please fill in your name, email and phone number.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const cleanPhone = (settings.whatsappNumber || FALLBACK_SETTINGS.whatsappNumber).replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent("Hi Swastik Healthcare, I have an enquiry about your services.");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  return (
    <div className="bg-white">
      <PageHero
        imageSrc={page.heroImageUrl || ''}
        imageAlt={page.heroImageAlt || ''}
        badge={(
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold tracking-wide text-emerald-800">
            <Building2 className="h-3.5 w-3.5" />
            <span>{page.heroBadge}</span>
          </div>
        )}
        title={page.heroTitle}
        description={page.heroDescription}
      />

      {/* Main Grid: Details & Interactive Contact Form */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Direct Contact Details & Operating Hours */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
                <h3 className="text-xl font-bold text-[#0f2330] font-heading">
                  {directSection?.title}
                </h3>

                <div className="space-y-4 text-sm text-slate-700">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-semibold block uppercase">{directItems.phone?.label}</span>
                      <a href={`tel:${settings.phoneRaw}`} className="text-base font-bold text-[#0f2330] hover:text-emerald-700">
                        {settings.phone}
                      </a>
                      <p className="text-xs text-slate-500 mt-0.5">{directItems.phone?.description}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-semibold block uppercase">{directItems.email?.label}</span>
                      <a href={`mailto:${settings.email}`} className="text-sm font-bold text-[#0f2330] hover:text-emerald-700">
                        {settings.email}
                      </a>
                      <p className="text-xs text-slate-500 mt-0.5">{directItems.email?.description}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#25D366] shrink-0">
                      <MessageCircle className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-semibold block uppercase">{directItems.whatsapp?.label}</span>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
                      >
                        <span>{directItems.whatsapp?.title}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Operating Hours Breakdown */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-emerald-700" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                      Operating Hours
                    </h4>
                  </div>
                  <div className="space-y-2 text-xs">
                    {(settings.openingHours || FALLBACK_SETTINGS.openingHours).map((slot, i) => (
                      <div key={i} className="flex justify-between text-slate-600">
                        <span>{slot.days}</span>
                        <span className="font-semibold text-slate-900">{slot.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct CTA */}
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] shadow transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#0f2330]" />
                  <span>{directSection?.ctaLabel}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Contact & Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
                <div className="mb-6">
                  <span className="text-xs font-bold text-emerald-700 uppercase font-mono">{formSection?.eyebrow}</span>
                  <h3 className="text-2xl font-bold text-[#0f2330] font-heading mt-1">
                    {formSection?.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {formSection?.description}
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="text-xl font-bold font-heading">{formItems.success?.title}</h4>
                    <p className="text-sm text-slate-700 max-w-md mx-auto">
                      {formItems.success?.description}
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-bold text-emerald-800 underline pt-2"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. David Miller"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 0412 345 678"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. david@example.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
                          Subject / Inquiry Type
                        </label>
                        <select
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        >
                          <option>General Question</option>
                          <option>Private Health Rebates / HICAPS</option>
                          <option>Workers Compensation / WorkCover</option>
                          <option>NDIS Support Inquiries</option>
                          <option>Post-Surgical Protocols</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
                        Your Message or Question
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Please tell us a little bit about your injury, symptom timeline, or how we can assist..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold bg-[#0f2330] hover:bg-[#193b50] text-white shadow transition-all flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Sending...' : formSection?.ctaLabel}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps & Location Selector Section */}
      <section className="py-16 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase font-mono">{locationsSection?.eyebrow}</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f2330] font-heading mt-1">
                {locationsSection?.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    selectedLocation === loc.id
                      ? 'bg-[#0f2330] text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {loc.name.split(' ')[0]} {loc.name.split(' ')[1] || ''}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="lg:col-span-7 h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
              <iframe
                title="Clinic Location Map"
                className="w-full h-full border-0 filter saturate-90 contrast-105"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13251.393430588665!2d151.205!3d-33.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae4022416f0d%3A0x5017d681632ccc0!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sau!4v1680000000000!5m2!1sen!2sau"
                loading="lazy"
              ></iframe>
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-xl shadow-md border border-slate-200 text-xs text-slate-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">{activeLoc.name}</span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-mono text-[11px] font-bold">
                  <Building2 className="w-3.5 h-3.5" />
                  {locationItems.primary?.label}
                </span>
                <h3 className="text-xl font-bold text-[#0f2330] font-heading">
                  {activeLoc.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeLoc.address}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
                <strong className="text-slate-900 block font-semibold">{locationItems.parking?.label}</strong>
                <p>{activeLoc.parking}</p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(activeLoc.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0f2330] hover:bg-[#193b50] text-white transition-colors inline-flex items-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{locationItems.directions?.label}</span>
                </a>
                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] transition-colors"
                >
                  {locationItems.book?.label}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
