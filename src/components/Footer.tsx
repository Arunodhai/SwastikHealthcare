import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { ClinicBrand } from './SwastikLogo';
import { useClinic } from '../context/ClinicContext';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const { settings, treatments, conditions } = useClinic();
  const clinic = settings;
  const copy = clinic.uiCopy || {};
  const socialLinks = [
    ['Facebook', clinic.socialLinks?.facebook],
    ['Instagram', clinic.socialLinks?.instagram],
    ['LinkedIn', clinic.socialLinks?.linkedin],
    ['Google Reviews', clinic.socialLinks?.googleReviews],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <footer className="bg-[#09151e] text-slate-400 text-sm border-t border-slate-800 selection:bg-emerald-800 selection:text-white">
      {/* Upper Pre-Footer: Ready to Start Your Recovery banner */}
      <div className="bg-[#0d222e] border-b border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-lime-400 mb-1 block font-mono">
              {copy.footerEyebrow}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight">
              {copy.footerTitle}
            </h3>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              {copy.footerSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              id="footer-cta-book-btn"
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] shadow transition-transform transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {copy.footerBookingLabel}
            </button>
            {clinic.phoneRaw && clinic.phone && <a
              href={`tel:${clinic.phoneRaw}`}
              className="px-5 py-3 rounded-full text-xs uppercase tracking-wider font-semibold bg-white/10 hover:bg-white/15 text-white border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-lime-400" />
              <span>{clinic.phone}</span>
            </a>}
          </div>
        </div>
      </div>

      {/* Main Footer Navigation & Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <ClinicBrand
              name={clinic.name}
              tagline={clinic.tagline}
              theme="dark"
              size="md"
              onClick={() => onNavigate('/')}
            />
            <p className="text-slate-400 text-xs leading-relaxed pr-4 pt-1">
              {copy.footerMission}
            </p>
            {/* Accreditations badge */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {copy.footerAccreditationPrimary}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
                <Heart className="w-3.5 h-3.5 text-lime-400" />
                {copy.footerAccreditationSecondary}
              </span>
            </div>
            {/* Social handles */}
            {socialLinks.length > 0 && <div className="pt-3 flex items-center gap-2 text-slate-300">
              {socialLinks.map(([network, url]) => (
                <a
                  key={network}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-white flex items-center justify-center text-xs font-semibold cursor-pointer transition-colors border border-slate-700/60"
                  title={network}
                  aria-label={network}
                >
                  {network[0]}
                </a>
              ))}
            </div>}
          </div>

          {/* Column 1: Services / Treatments */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-heading">
              {copy.footerServicesHeading}
            </h4>
            <ul className="space-y-2 text-xs">
              {treatments.map((treatment) => (
                <li key={treatment.slug}>
                  <button
                    onClick={() => onNavigate(`/treatments/${treatment.slug}`)}
                    className="hover:text-lime-400 transition-colors text-left flex items-center gap-1"
                  >
                    <span>{treatment.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Conditions We Treat */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-heading">
              {copy.footerConditionsHeading}
            </h4>
            <ul className="space-y-2 text-xs">
              {conditions.map((condition) => (
                <li key={condition.slug}>
                  <button
                    onClick={() => onNavigate(`/conditions/${condition.slug}`)}
                    className="hover:text-lime-400 transition-colors text-left flex items-center gap-1"
                  >
                    <span>{condition.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-heading">
              {copy.footerClinicHeading}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">
                  {copy.footerAboutLabel}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about#team')} className="hover:text-white transition-colors">
                  {copy.footerTeamLabel}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/gallery')} className="hover:text-white transition-colors">
                  {copy.footerGalleryLabel}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors">
                  {copy.footerLocationsLabel}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/studio')} className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>{copy.footerStudioLabel}</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="text-lime-400 font-semibold hover:underline">
                  {copy.footerBookingLinkLabel}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-heading">
              {copy.footerContactHeading}
            </h4>
            <div className="space-y-2 text-xs">
              {clinic.phone && <a
                href={`tel:${clinic.phoneRaw}`}
                className="flex items-center gap-2 hover:text-white transition-colors text-white font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <span>{clinic.phone}</span>
              </a>}
              {clinic.email && <a
                href={`mailto:${clinic.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate">{clinic.email}</span>
              </a>}
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{clinic.address.full}</span>
              </div>
              <div className="flex items-start gap-2 pt-1 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  {clinic.openingHours.map((slot, index) => (
                    <p key={(slot as any)._key || index}>{slot.days}: {slot.hours}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {clinic.name} - {clinic.tagline}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <button onClick={() => onNavigate('/contact')} className="hover:text-slate-400">
              {copy.footerPrivacyLabel}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/contact')} className="hover:text-slate-400">
              {copy.footerTermsLabel}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
