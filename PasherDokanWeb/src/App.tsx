import { useEffect, Suspense, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Milestones from './components/Milestones';
import SEO from './components/SEO';
import SEOHead from './components/SEOHead';
import { LanguageProvider } from './contexts/LanguageContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import PWAInstallPrompt, { OfflineNotification } from './components/PWAInstallPrompt';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import { 
  LazyTeam, 
  LazyVisionStatement, 
  LazyFAQ
} from './components/LazyComponents';
import { pageSEO, generateLocalBusinessStructuredData, generateFAQStructuredData } from './utils/seo';
import { 
  initGA, 
  trackPerformance, 
  initScrollTracking,
  GA_MEASUREMENT_ID,
  trackBusinessEvents,
  seoTracking
} from './utils/analytics';
import { optimizeImages } from './utils/images';
import { initSocialSharing } from './utils/socialSharing';
import { initCoreWebVitals } from './utils/coreWebVitals';
import SectionSEO from './components/SectionSEO';
import { SEODevTools } from './components/SEODashboard';
import { startSEOMonitoring } from './utils/seoTester';
import { faqs } from './data/content';
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
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Handle browser back/forward buttons
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Initialize analytics
    if (GA_MEASUREMENT_ID) {
      initGA(GA_MEASUREMENT_ID);
    }
    
    // Initialize performance tracking
    trackPerformance();
    
    // Initialize scroll depth tracking
    initScrollTracking();
    
    // Initialize social sharing features
    initSocialSharing();
    
    // Initialize Core Web Vitals monitoring
    initCoreWebVitals();
    
    // Start SEO monitoring and testing
    startSEOMonitoring();
    
    // Optimize images for SEO
    optimizeImages();
    
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
        
        // Track section navigation for SEO
        seoTracking.trackSiteSearch(href.replace('#', ''));
      });
    });

    // Track initial page load
    trackBusinessEvents.featureView('Website Loaded');
  }, []);

  // Navigation function
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Generate structured data for the homepage
  const structuredData = {
    ...generateLocalBusinessStructuredData(),
    "@context": "https://schema.org",
    "@graph": [
      generateLocalBusinessStructuredData(),
      generateFAQStructuredData(faqs.map(faq => ({
        question: faq.question,
        answer: faq.answer
      })))
    ]
  };

  // SEO Dashboard Route
  if (currentPath === '/seodashboard') {
    return (
      <AccessibilityProvider>
        <LanguageProvider>
          <SEOHead 
            title="SEO Dashboard - PasherDokan Analytics"
            description="Advanced SEO monitoring and analytics dashboard for PasherDokan platform"
            section="seo-dashboard"
            keywords={['SEO dashboard', 'analytics', 'PasherDokan']}
          />
          <div className="font-sans text-gray-800 bg-white min-h-screen">
            <AccessibilityToolbar />
            <OfflineNotification />
            
            {/* SEO Dashboard Header */}
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => navigate('/')}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2"
                    >
                      ← Back to Main Site
                    </button>
                    <div className="ml-6">
                      <h1 className="text-2xl font-bold text-gray-900">SEO Dashboard</h1>
                      <p className="text-sm text-gray-600">Advanced SEO monitoring and analytics</p>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <SEODevTools />
            </main>
          </div>
        </LanguageProvider>
      </AccessibilityProvider>
    );
  }

  // Main homepage route
  return (
    <AccessibilityProvider>
      <LanguageProvider>
        <SEOHead 
          title="PasherDokan - Smart E-commerce Platform for Bangladesh SMEs"
          description="Join PasherDokan - the leading hyperlocal e-commerce platform designed for small businesses in Bangladesh. Easy setup, powerful features, grow your business digitally."
          section="home"
          keywords={['Bangladesh marketplace', 'hyperlocal ecommerce', 'small business platform', 'SME digital solution']}
          alternateLanguages={[
            { lang: 'en', url: 'https://pasherdokan.shop/' },
            { lang: 'bn', url: 'https://pasherdokan.shop/bn/' }
          ]}
          structuredData={structuredData}
        />
        <SEO 
          seoData={pageSEO.home}
          structuredData={structuredData}
        />
        <div className="font-sans text-gray-800 bg-white">
          <AccessibilityToolbar />
          <OfflineNotification />
          <Header />
          <main id="main-content">
            <SectionSEO sectionId="hero" seoKey="home" trackingEvent="Hero Section View">
              <Hero />
            </SectionSEO>
            <SectionSEO sectionId="features" seoKey="features" trackingEvent="Features Section View">
              <Features />
            </SectionSEO>
            <SectionSEO sectionId="milestones" trackingEvent="Milestones Section View">
              <Milestones />
            </SectionSEO>
            <Suspense fallback={<SectionLoader />}>
              <SectionSEO sectionId="vision" trackingEvent="Vision Section View">
                <LazyVisionStatement />
              </SectionSEO>
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <SectionSEO sectionId="faq" trackingEvent="FAQ Section View">
                <LazyFAQ />
              </SectionSEO>
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <SectionSEO sectionId="team" seoKey="team" trackingEvent="Team Section View">
                <LazyTeam />
              </SectionSEO>
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <SectionSEO sectionId="contact" seoKey="contact" trackingEvent="Contact Section View">
                <CallToAction />
              </SectionSEO>
            </Suspense>
          </main>
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
          <PWAInstallPrompt />
          {/* FloatingShareButton removed - only accessible via dedicated SEO dashboard route */}
        </div>
      </LanguageProvider>
    </AccessibilityProvider>
  );
}

export default App;