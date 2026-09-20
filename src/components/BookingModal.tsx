import React, { useState } from 'react';
import { X, Calendar, CheckCircle, ShieldCheck, User, Phone, Mail } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { AppointmentFormData } from '../types/clinic';
import { SwastikEmblem } from './SwastikLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTreatmentSlug?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultTreatmentSlug,
}) => {
  const { treatments: clinicTreatments, teamMembers: clinicTeamMembers, locations: clinicLocations } = useClinic();
  const treatments = clinicTreatments;
  const teamMembers = clinicTeamMembers;
  const locations = clinicLocations;

  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    injuryConcern: '',
    location: locations[0]?.id || '',
    treatmentSlug: defaultTreatmentSlug || treatments[0]?.slug || '',
    preferredPractitioner: 'any',
    preferredDate: '',
    preferredTime: 'morning',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter a contact phone number.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email format.';
    }
    if (!formData.injuryConcern.trim()) {
      errs.injuryConcern = 'Please briefly note your main injury or concern.';
    }
    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred date.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate immediate confirmation response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setBookingReference(`MB-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      injuryConcern: '',
      location: locations[0]?.id || '',
      treatmentSlug: defaultTreatmentSlug || treatments[0]?.slug || '',
      preferredPractitioner: 'any',
      preferredDate: '',
      preferredTime: 'morning',
      message: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0b1d28] text-white p-6 sm:p-8 relative">
          <button
            id="close-booking-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5 mb-2.5">
            <SwastikEmblem className="w-11 h-11 ring-2 ring-lime-400/40 rounded-full shadow-md" />
            <div>
              <div className="flex items-center gap-2 text-lime-400 text-xs uppercase tracking-widest font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping"></span>
                Swastik Healthcare - Online Booking
              </div>
              <p className="text-slate-300 text-xs mt-0.5">
                Physiotherapy &amp; Rehabilitation Clinic (Since 2009)
              </p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight">
            Schedule Your Rehabilitation Consultation
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-lg">
            Complete the form below to secure your consultation. Our clinical team will confirm your time slot within 2 hours.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-3 border-t border-slate-800">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Private Health Rebates Available (HICAPS)
            </span>
            <span className="text-slate-500">|</span>
            <span>No GP Referral Required for Private Patients</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 font-heading">
                  Appointment Request Received!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. We have registered your booking request under reference:
                </p>
                <div className="inline-block bg-slate-100 text-slate-800 font-mono text-sm px-4 py-1.5 rounded-lg font-bold border border-slate-200">
                  {bookingReference}
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 text-left text-xs text-slate-600 space-y-1.5 max-w-md mx-auto border border-slate-200/80">
                <p><strong>Preferred Date:</strong> {formData.preferredDate} ({formData.preferredTime})</p>
                <p><strong>Location:</strong> {locations.find((l: any) => l.id === formData.location)?.name || 'Central Clinic'}</p>
                <p><strong>Main Concern:</strong> {formData.injuryConcern}</p>
                <p className="text-emerald-700 font-medium pt-1">
                  ✓ An SMS and email confirmation will be sent to {formData.email} shortly.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  id="booking-success-close-btn"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#a3e635] text-[#0f2330] hover:bg-[#8fd622] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-white'
                      }`}
                    />
                    <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                  </div>
                  {errors.fullName && <p className="text-rose-600 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="e.g. 0400 123 456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-white'
                      }`}
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                  </div>
                  {errors.phone && <p className="text-rose-600 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 2: Email & Concern */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="e.g. sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                        errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-white'
                      }`}
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                  </div>
                  {errors.email && <p className="text-rose-600 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-1.5">
                    Injury or Concern <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lower back pain, right knee sprain"
                    value={formData.injuryConcern}
                    onChange={(e) => setFormData({ ...formData, injuryConcern: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                      errors.injuryConcern ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-white'
                    }`}
                  />
                  {errors.injuryConcern && <p className="text-rose-600 text-xs mt-1">{errors.injuryConcern}</p>}
                </div>
              </div>

              {/* Row 3: Service & Clinic Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-1.5">
                    Treatment / Service
                  </label>
                  <select
                    value={formData.treatmentSlug}
                    onChange={(e) => setFormData({ ...formData, treatmentSlug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    {treatments.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-1.5">
                    Preferred Clinic Location
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Date & Time Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-1.5">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white ${
                      errors.preferredDate ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.preferredDate && <p className="text-rose-600 text-xs mt-1">{errors.preferredDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-1.5">
                    Preferred Time Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="morning">Morning (7:30 AM - 11:30 AM)</option>
                    <option value="midday">Midday (11:30 AM - 2:30 PM)</option>
                    <option value="afternoon">Afternoon (2:30 PM - 5:30 PM)</option>
                    <option value="evening">Evening (5:30 PM - 7:30 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-1.5">
                    Practitioner
                  </label>
                  <select
                    value={formData.preferredPractitioner}
                    onChange={(e) => setFormData({ ...formData, preferredPractitioner: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="any">First Available Physiotherapist</option>
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} ({m.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 5: Optional Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-1.5">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any relevant past history, scan results, or questions for your practitioner..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[11px] text-slate-500 text-center sm:text-left">
                  By submitting, you agree to our clinic booking policy. No upfront cancellation charges.
                </p>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-1/2 sm:w-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] shadow transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Request'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
