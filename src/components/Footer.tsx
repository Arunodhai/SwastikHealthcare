import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { ClinicBrand } from './SwastikLogo';
import { useClinic } from '../context/ClinicContext';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const { settings: clinic, locations } = useClinic();
  const copy = clinic.uiCopy || {};
  const socialLinks = [
    ['Facebook', clinic.socialLinks?.facebook],
    ['Instagram', clinic.socialLinks?.instagram],
    ['LinkedIn', clinic.socialLinks?.linkedin],
    ['Google Reviews', clinic.socialLinks?.googleReviews],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <footer className="bg-[#09151e] text-slate-400 text-sm border-t border-slate-800 selection:bg-emerald-800 selection:text-white">
      <div className="bg-[#0d222e] border-b border-slate-800/80 py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
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
              className="px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold bg-[#a3e635] hover:bg-[#8fd622] text-[#0f2330] shadow transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {copy.footerBookingLabel}
            </button>
            {clinic.phoneRaw && clinic.phone && (
              <a
                href={`tel:${clinic.phoneRaw}`}
                className="px-5 py-3 rounded-full text-xs uppercase tracking-wider font-semibold bg-white/10 hover:bg-white/15 text-white border border-slate-700 transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-lime-400" />
                <span>{clinic.phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4 space-y-4">
            <ClinicBrand
              name={clinic.name}
              tagline={clinic.tagline}
              theme="dark"
              size="md"
              onClick={() => onNavigate('/')}
            />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm pt-1">
              {copy.footerMission}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {copy.footerAccreditationPrimary}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <Heart className="w-3.5 h-3.5 text-lime-400" />
                {copy.footerAccreditationSecondary}
              </span>
            </div>
            {socialLinks.length > 0 && (
              <div className="pt-2 flex items-center gap-2 text-slate-300">
                {socialLinks.map(([network, url]) => (
                  <a
                    key={network}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-white flex items-center justify-center text-xs font-semibold transition-colors border border-slate-700/60"
                    title={network}
                    aria-label={network}
                  >
                    {network[0]}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-heading mb-4">
              {copy.footerClinicHeading}
            </h4>
            <ul className="space-y-3 text-xs">
              <li><button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">{copy.footerAboutLabel}</button></li>
              <li><button onClick={() => onNavigate('/about#team')} className="hover:text-white transition-colors">{copy.footerTeamLabel}</button></li>
              <li><button onClick={() => onNavigate('/gallery')} className="hover:text-white transition-colors">{copy.footerGalleryLabel}</button></li>
              <li><button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors">{copy.footerLocationsLabel}</button></li>
              <li>
                <button onClick={onOpenBooking} className="text-lime-400 font-semibold hover:text-lime-300 transition-colors inline-flex items-center gap-1.5">
                  <span>{copy.footerBookingLinkLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-heading mb-4">
              {copy.footerContactHeading}
            </h4>
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3 text-slate-200">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider">Clinic Locations</span>
                </div>
                <div className="space-y-3">
                  {locations.map((location) => (
                    <div key={location.id} className="border-l border-slate-700 pl-3">
                      <p className="text-xs font-semibold text-white">{location.name}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{location.address}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 text-slate-200">
                  <span className="w-8 h-8 rounded-lg bg-lime-400/10 border border-lime-400/20 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-lime-400" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider">Opening Hours</span>
                </div>
                <div className="space-y-2.5">
                  {clinic.openingHours.map((slot, index) => (
                    <div key={(slot as any)._key || index} className="grid grid-cols-[1fr_auto] gap-3 border-b border-slate-800 pb-2.5 last:border-0">
                      <p className="text-xs leading-relaxed text-slate-400">{slot.days}</p>
                      <p className="text-xs font-semibold text-slate-200 text-right whitespace-nowrap">{slot.hours}</p>
                    </div>
                  ))}
                </div>
                {(clinic.phone || clinic.email) && (
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                    {clinic.phone && (
                      <a href={`tel:${clinic.phoneRaw}`} className="flex items-center gap-2 text-xs text-slate-300 hover:text-white">
                        <Phone className="w-3.5 h-3.5 text-lime-400" />
                        {clinic.phone}
                      </a>
                    )}
                    {clinic.email && (
                      <a href={`mailto:${clinic.email}`} className="flex items-center gap-2 text-xs text-slate-300 hover:text-white">
                        <Mail className="w-3.5 h-3.5 text-emerald-400" />
                        {clinic.email}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-7 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {clinic.name} - {clinic.tagline}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <button onClick={() => onNavigate('/contact')} className="hover:text-slate-400">{copy.footerPrivacyLabel}</button>
            <span>•</span>
            <button onClick={() => onNavigate('/contact')} className="hover:text-slate-400">{copy.footerTermsLabel}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
