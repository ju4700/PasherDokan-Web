import { useEffect, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Milestones from './components/Milestones';
import { LanguageProvider } from './contexts/LanguageContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import PWAInstallPrompt, { OfflineNotification } from './components/PWAInstallPrompt';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import { 
  LazyTeam, 
  LazyTestimonials, 
  LazyFAQ
} from './components/LazyComponents';
import './styles/accessibility.css';

// Lazy load non-critical components for better performance
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

// Loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="flex items-center justify-center py-24">
    <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
  </div>
);

function App() {
  useEffect(() => {
    // Update page title with consistent branding
    document.title = "PasherDokan - Digital Solutions for Local Shops";
    
    // Smooth scroll for anchor links with offset for floating header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (!href) return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        const headerOffset = 100; // Account for floating header
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <AccessibilityProvider>
      <LanguageProvider>
        <div className="font-sans text-gray-800 bg-white">
          <AccessibilityToolbar />
          <OfflineNotification />
          <Header />
          <main id="main-content">
            <Hero />
            <Features />
            <Milestones />
            <Suspense fallback={<SectionLoader />}>
              <LazyTestimonials />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <LazyFAQ />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <LazyTeam />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <CallToAction />
            </Suspense>
          </main>
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
          <PWAInstallPrompt />
        </div>
      </LanguageProvider>
    </AccessibilityProvider>
  );
}

export default App;