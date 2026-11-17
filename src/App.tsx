import { useState, useEffect } from 'react';
import type { CustomPage } from './types/clinic';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BookingModal } from './components/BookingModal';
import { ClinicProvider, useClinic } from './context/ClinicContext';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { TreatmentsView } from './views/TreatmentsView';
import { TreatmentDetailView } from './views/TreatmentDetailView';
import { ConditionsView } from './views/ConditionsView';
import { ConditionDetailView } from './views/ConditionDetailView';
import { GalleryView } from './views/GalleryView';
import { ContactView } from './views/ContactView';
import { CustomPageView } from './views/CustomPageView';
import { StudioView } from './views/StudioView';
import { NotFoundView } from './views/NotFoundView';

const DEFAULT_TITLE = 'Swastik Healthcare | Physiotherapy & Rehabilitation Clinic';
const DEFAULT_DESCRIPTION = 'Physiotherapy and rehabilitation care focused on restoring mobility, reducing pain and supporting lasting recovery.';
const DEFAULT_SOCIAL_IMAGE = 'https://www.swastikrehab.com/images/swastik-share-preview-v2.jpg';

function setMetaTag(selector: string, attribute: 'name' | 'property', key: string, content?: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!content) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonicalUrl(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

function splitLocation(): { path: string; hash: string } {
  if (typeof window === 'undefined') return { path: '/', hash: '' };

  const rawHash = window.location.hash.replace(/^#/, '');

  // Legacy hash routes such as #/studio or #/treatments/sports-injury still
  // resolve as full paths. A regular in-page anchor such as #team is returned
  // separately so it can be used for scrolling, not routing.
  if (rawHash.startsWith('/')) return { path: rawHash, hash: '' };

  return {
    path: window.location.pathname || '/',
    hash: rawHash,
  };
}

function getInitialPath(): string {
  return splitLocation().path;
}

function isKnownPath(path: string, customPages: CustomPage[]): boolean {
  if (path === '' || path === '/') return true;
  if (['/about', '/treatments', '/conditions', '/gallery', '/contact'].includes(path)) return true;
  if (path.startsWith('/treatments/') || path.startsWith('/conditions/')) return true;
  if (path === '/studio' || path.startsWith('/studio/')) return true;
  if (path.startsWith('/pages/')) {
    const slug = path.replace('/pages/', '');
    return customPages.some((page) => page.slug === slug);
  }
  return false;
}

function AppContent() {
  const { customPages, treatments, conditions, isLoading } = useClinic();

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [navigationVersion, setNavigationVersion] = useState(0);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingTreatmentSlug, setSelectedBookingTreatmentSlug] = useState<string | undefined>();

  // A well-formed detail URL can still point at a slug that no longer exists.
  // Check against loaded content so those pages aren't indexed as soft 404s.
  const detailSlug = currentPath.startsWith('/treatments/')
    ? { type: 'treatment' as const, slug: currentPath.replace('/treatments/', '') }
    : currentPath.startsWith('/conditions/')
      ? { type: 'condition' as const, slug: currentPath.replace('/conditions/', '') }
      : null;

  const isMissingDetail =
    !isLoading &&
    detailSlug !== null &&
    !(detailSlug.type === 'treatment' ? treatments : conditions).some(
      (item) => item.slug === detailSlug.slug,
    );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(splitLocation().path);
      setNavigationVersion((version) => version + 1);
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Scroll to in-page anchors (e.g. /about#team) once the target section has
  // rendered. Sanity content can arrive after the first paint, so retry briefly.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const { hash } = splitLocation();
    if (!hash) return;

    let targetId = hash;
    try {
      targetId = decodeURIComponent(hash);
    } catch {
      targetId = hash;
    }

    let attempts = 0;
    let timer: number | undefined;

    const scrollToTarget = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (attempts < 40) {
        attempts += 1;
        timer = window.setTimeout(scrollToTarget, 100);
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    timer = window.setTimeout(scrollToTarget, 0);
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [currentPath, navigationVersion, customPages]);

  useEffect(() => {
    let title = DEFAULT_TITLE;
    let description = DEFAULT_DESCRIPTION;
    let socialImage: string | undefined;
    let noIndex = currentPath.startsWith('/studio');

    if (currentPath === '/about') {
      title = 'About Us | Swastik Healthcare';
    } else if (currentPath === '/treatments') {
      title = 'Treatments & Services | Swastik Healthcare';
    } else if (currentPath.startsWith('/treatments/')) {
      const slug = currentPath.replace('/treatments/', '');
      const formatted = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      title = `${formatted} | Swastik Healthcare`;
    } else if (currentPath === '/conditions') {
      title = 'Conditions We Treat | Swastik Healthcare';
    } else if (currentPath.startsWith('/conditions/')) {
      const slug = currentPath.replace('/conditions/', '');
      const formatted = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      title = `${formatted} | Swastik Healthcare`;
    } else if (currentPath === '/gallery') {
      title = 'Clinic & Rehabilitation Gallery | Swastik Healthcare';
    } else if (currentPath === '/contact') {
      title = 'Contact & Locations | Swastik Healthcare';
    } else if (currentPath.startsWith('/pages/')) {
      const slug = currentPath.replace('/pages/', '');
      const foundPage = customPages.find(p => p.slug === slug);
      title = foundPage?.metaTitle || (foundPage ? `${foundPage.title} | Swastik Healthcare` : 'Clinic Services | Swastik Healthcare');
      description = foundPage?.metaDescription || foundPage?.leadText || DEFAULT_DESCRIPTION;
      socialImage = foundPage?.seoImage || foundPage?.bannerImage;
      noIndex = foundPage?.noIndex ?? false;
    } else if (currentPath.startsWith('/studio')) {
      title = 'Sanity Studio | Swastik Healthcare';
    }

    if (!isKnownPath(currentPath, customPages) || isMissingDetail) {
      title = 'Page Not Found | Swastik Healthcare';
      description = 'The page you are looking for could not be found.';
      socialImage = undefined;
      noIndex = true;
    }

    const canonicalUrl = `${window.location.origin}${currentPath === '' ? '/' : currentPath}`;
    document.title = title;
    setCanonicalUrl(canonicalUrl);
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="robots"]', 'name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', socialImage || DEFAULT_SOCIAL_IMAGE);
    setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', socialImage ? undefined : '1200');
    setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', socialImage ? undefined : '630');
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', socialImage || DEFAULT_SOCIAL_IMAGE);
  }, [currentPath, customPages, isMissingDetail]);

  const navigate = (target: string) => {
    const [pathname, hash = ''] = target.split('#');
    const nextPath = pathname || '/';

    setCurrentPath(nextPath);
    setNavigationVersion((version) => version + 1);

    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', hash ? `${nextPath}#${hash}` : nextPath);
      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleOpenBooking = (treatmentSlug?: string) => {
    setSelectedBookingTreatmentSlug(treatmentSlug);
    setIsBookingOpen(true);
  };

  if (currentPath === '/studio' || currentPath.startsWith('/studio/') || currentPath.startsWith('/studio;')) {
    return <StudioView onNavigate={navigate} />;
  }

  const renderView = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomeView
          onNavigate={navigate}
          onOpenBooking={handleOpenBooking}
        />
      );
    }
    if (currentPath === '/about') {
      return (
        <AboutView
          onNavigate={navigate}
          onOpenBooking={() => handleOpenBooking()}
        />
      );
    }
    if (currentPath === '/treatments') {
      return (
        <TreatmentsView
          onNavigate={navigate}
          onOpenBooking={handleOpenBooking}
        />
      );
    }
    if (currentPath.startsWith('/treatments/')) {
      const slug = currentPath.replace('/treatments/', '');
      return (
        <TreatmentDetailView
          slug={slug}
          onNavigate={navigate}
          onOpenBooking={handleOpenBooking}
        />
      );
    }
    if (currentPath === '/conditions') {
      return (
        <ConditionsView
          onNavigate={navigate}
          onOpenBooking={() => handleOpenBooking()}
        />
      );
    }
    if (currentPath.startsWith('/conditions/')) {
      const slug = currentPath.replace('/conditions/', '');
      return (
        <ConditionDetailView
          slug={slug}
          onNavigate={navigate}
          onOpenBooking={() => handleOpenBooking()}
        />
      );
    }
    if (currentPath === '/gallery') {
      return (
        <GalleryView
          onOpenBooking={() => handleOpenBooking()}
        />
      );
    }
    if (currentPath === '/contact') {
      return (
        <ContactView
          onOpenBooking={() => handleOpenBooking()}
        />
      );
    }
    if (currentPath.startsWith('/pages/')) {
      const slug = currentPath.replace('/pages/', '');
      const page = customPages.find(p => p.slug === slug);
      if (page) {
        return (
          <CustomPageView
            page={page}
            onNavigate={navigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        );
      }
    }

    return (
      <NotFoundView
        onNavigate={navigate}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-950 font-sans antialiased">
      {/* Navigation Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Dark Navy Footer */}
      <Footer
        onNavigate={navigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Universal Appointment Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultTreatmentSlug={selectedBookingTreatmentSlug}
      />
    </div>
  );
}

export default function App() {
  return (
    <ClinicProvider>
      <AppContent />
    </ClinicProvider>
  );
}
