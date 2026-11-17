import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Navigation, 
  CheckCircle2, 
  Send,
  Building2,
  Calendar
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { PageHero } from '../components/PageHero';
import { getManagedPage, getManagedSection } from '../data/pageContent';
import { APPOINTMENT_WHATSAPP_NUMBER, openWhatsApp } from '../lib/whatsapp';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface ContactViewProps {
  onOpenBooking: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenBooking }) => {
  const { settings: clinicSettings, locations: clinicLocations, treatments: clinicTreatments, teamMembers: clinicTeamMembers } = useClinic();
  const settings = clinicSettings;
  const page = getManagedPage(settings, 'contact');
  const directSection = getManagedSection(page, 'direct');
  const formSection = getManagedSection(page, 'form');
  const locationsSection = getManagedSection(page, 'locations');
  const directItems = Object.fromEntries((directSection?.items || []).map((item) => [item.key, item]));
  const formItems = Object.fromEntries((formSection?.items || []).map((item) => [item.key, item]));
  const locationItems = Object.fromEntries((locationsSection?.items || []).map((item) => [item.key, item]));
  const locations = clinicLocations;
  const treatments = clinicTreatments;
  const teamMembers = clinicTeamMembers;
  const [selectedLocation, setSelectedLocation] = useState(locations[0]?.id || '');

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    injuryConcern: '',
    treatmentSlug: '',
    preferredLocation: '',
    preferredDate: '',
    preferredTime: 'morning',
    preferredPractitioner: 'any',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactWhatsappUrl, setContactWhatsappUrl] = useState('');

  const activeLoc = locations.find(l => l.id === selectedLocation) || locations[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.phone.trim() || !contactForm.email.trim() || !contactForm.injuryConcern.trim() || !contactForm.preferredDate) {
      alert('Please complete all required fields.');
      return;
    }
    if (contactForm.phone.replace(/[^0-9]/g, '').length < 8) {
      alert('Please enter a valid phone number.');
      return;
    }
    setIsSubmitting(true);

    const message = [
      'New Appointment Request - Swastik Healthcare',
      '',
      `Name: ${contactForm.name}`,
      `Phone: ${contactForm.phone}`,
      `Email: ${contactForm.email}`,
      `Injury / Concern: ${contactForm.injuryConcern}`,
      `Treatment / Service: ${treatments.find((t) => t.slug === contactForm.treatmentSlug)?.title || 'Not specified'}`,
      `Preferred Clinic: ${locations.find((l) => l.id === contactForm.preferredLocation)?.name || 'No preference'}`,
      `Preferred Date: ${contactForm.preferredDate}`,
      `Preferred Time: ${{ morning: 'Morning', midday: 'Afternoon', evening: 'Evening' }[contactForm.preferredTime] || contactForm.preferredTime}`,
      `Practitioner: ${contactForm.preferredPractitioner === 'any' ? 'First Available Physiotherapist' : contactForm.preferredPractitioner}`,
      ...((contactForm.message || '').trim() ? [`Notes: ${(contactForm.message || '').trim()}`] : []),
    ].join('\n');

    // Open synchronously so the browser treats it as part of the submit action.
    setContactWhatsappUrl(openWhatsApp(message, clinicSettings.whatsappNumber));

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const defaultWhatsAppDisplayNumber = `+${APPOINTMENT_WHATSAPP_NUMBER.slice(0, 2)} ${APPOINTMENT_WHATSAPP_NUMBER.slice(2, 7)} ${APPOINTMENT_WHATSAPP_NUMBER.slice(7)}`;
  const whatsappNumber = settings.whatsappNumber.trim() || defaultWhatsAppDisplayNumber;
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(settings.whatsappMessage || '');
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
                  {settings.phone && <div className="flex items-start gap-3.5">
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
                  </div>}

                  {settings.email && <div className="flex items-start gap-3.5">
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
                  </div>}

                  {cleanPhone && <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#25D366] shrink-0">
                      <WhatsAppIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-semibold block uppercase">{directItems.whatsapp?.label}</span>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
                      >
                        <span>{whatsappNumber}</span>
                      </a>
                    </div>
                  </div>}
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
                    {settings.openingHours.map((slot, i) => (
                      <div key={i} className="flex justify-between text-slate-600">
                        <span>{slot.days}</span>
                        <span className="font-semibold text-slate-900">{slot.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
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
                    <p className="text-xs text-slate-600">
                      Your message is ready in WhatsApp — press <strong>Send</strong> to deliver it to our clinic team.
                    </p>
                    {contactWhatsappUrl && (
                      <a
                        href={contactWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Open WhatsApp</span>
                      </a>
                    )}
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setContactWhatsappUrl('');
                      }}
                      className="text-xs font-bold text-emerald-800 underline pt-2 block mx-auto"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="e.g. David Miller"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          placeholder="e.g. 0412 345 678"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="e.g. david@example.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-injury" className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
                          Injury or Concern <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-injury"
                          type="text"
                          required
                          placeholder="e.g. Lower back pain, knee injury"
                          value={contactForm.injuryConcern}
                          onChange={(e) => setContactForm({ ...contactForm, injuryConcern: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-treatment" className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">Treatment / Service</label>
                        <select
                          id="contact-treatment"
                          value={contactForm.treatmentSlug}
                          onChange={(e) => setContactForm({ ...contactForm, treatmentSlug: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        >
                          <option value="">Not sure yet</option>
                          {treatments.map((treatment) => (
                            <option key={treatment.slug} value={treatment.slug}>{treatment.title}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="contact-location" className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">Preferred Clinic Location</label>
                        <select
                          id="contact-location"
                          value={contactForm.preferredLocation}
                          onChange={(e) => setContactForm({ ...contactForm, preferredLocation: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        >
                          <option value="">No preference</option>
                          {locations.map((location) => (
                            <option key={location.id} value={location.id}>{location.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="contact-date" className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
                          Preferred Date <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-date"
                          type="date"
                          required
                          min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)}
                          value={contactForm.preferredDate}
                          onChange={(e) => setContactForm({ ...contactForm, preferredDate: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-time" className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">Preferred Time Window</label>
                        <select
                          id="contact-time"
                          value={contactForm.preferredTime}
                          onChange={(e) => setContactForm({ ...contactForm, preferredTime: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        >
                          <option value="morning">Morning</option>
                          <option value="midday">Afternoon</option>
                          <option value="evening">Evening</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="contact-practitioner" className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">Practitioner</label>
                        <select
                          id="contact-practitioner"
                          value={contactForm.preferredPractitioner}
                          onChange={(e) => setContactForm({ ...contactForm, preferredPractitioner: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        >
                          <option value="any">First Available Physiotherapist</option>
                          {teamMembers.map((member) => (
                            <option key={member.id} value={member.name}>{member.name} ({member.role})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        id="contact-message"
                        rows={2}
                        placeholder="Any relevant history or questions for your practitioner..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] shadow transition-all flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{isSubmitting ? 'Preparing Request...' : 'Request an Appointment'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps & Location Selector Section */}
      {activeLoc && <section className="py-16 bg-slate-50/70 border-b border-slate-100">
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
                src={`https://www.google.com/maps?q=${encodeURIComponent(activeLoc?.address || 'Kollam, Kerala')}&output=embed`}
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
      </section>}
    </div>
  );
};
