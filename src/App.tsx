import { useState, useEffect } from 'react';
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

const DEFAULT_TITLE = 'Swastik Healthcare | Physiotherapy & Rehabilitation Clinic';
const DEFAULT_DESCRIPTION = 'Physiotherapy and rehabilitation care focused on restoring mobility, reducing pain and supporting lasting recovery.';

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

function getInitialPath(): string {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash.startsWith('/studio')) return hash;
    const path = window.location.pathname;
    if (path.startsWith('/studio')) return path;
    if (hash) return hash;
    return path || '/';
  }
  return '/';
}

function AppContent() {
  const { customPages } = useClinic();

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingTreatmentSlug, setSelectedBookingTreatmentSlug] = useState<string | undefined>();

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace(/^#/, '');
      const path = window.location.pathname;
      if (path.startsWith('/studio')) {
        setCurrentPath(path);
      } else if (hash) {
        setCurrentPath(hash);
      } else {
        setCurrentPath(path || '/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

    const canonicalUrl = `${window.location.origin}${currentPath === '' ? '/' : currentPath}`;
    document.title = title;
    setCanonicalUrl(canonicalUrl);
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="robots"]', 'name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', socialImage);
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', socialImage ? 'summary_large_image' : 'summary');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', socialImage);
  }, [currentPath, customPages]);

  const navigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <HomeView
        onNavigate={navigate}
        onOpenBooking={handleOpenBooking}
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
