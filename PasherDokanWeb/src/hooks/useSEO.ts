import { useEffect } from 'react';
import { SEOData, pageSEO, updateSEOHead } from '../utils/seo';
import { trackPageView, trackBusinessEvents } from '../utils/analytics';

interface UseSEOProps {
  pageKey?: keyof typeof pageSEO;
  customSEO?: Partial<SEOData>;
  structuredData?: object;
  sectionId?: string; // For single-page app section tracking
}

export const useSEO = ({ pageKey, customSEO, structuredData, sectionId }: UseSEOProps = {}) => {
  useEffect(() => {
    // Get SEO data based on page key or use custom data
    let seoData: SEOData;
    
    if (pageKey && pageSEO[pageKey]) {
      seoData = { ...pageSEO[pageKey], ...customSEO };
    } else if (customSEO) {
      seoData = { ...pageSEO.home, ...customSEO };
    } else {
      seoData = pageSEO.home;
    }

    // Add structured data if provided
    if (structuredData) {
      seoData.structuredData = structuredData;
    }

    // Update the document head
    updateSEOHead(seoData);

    // Track page view - use section ID or current URL
    const currentPath = sectionId ? `#${sectionId}` : window.location.pathname;
    trackPageView(currentPath, seoData.title);

    // Track page-specific events
    switch (pageKey) {
      case 'features':
        trackBusinessEvents.featureView('Features Section Visit');
        break;
      case 'team':
        trackBusinessEvents.featureView('Team Section Visit');
        break;
      case 'contact':
        trackBusinessEvents.featureView('Contact Section Visit');
        break;
      default:
        trackBusinessEvents.featureView('Home Page Visit');
    }

  }, [pageKey, customSEO, structuredData, sectionId]);

  return {
    updateSEO: (newSEOData: Partial<SEOData>) => {
      const updatedData = pageKey && pageSEO[pageKey] 
        ? { ...pageSEO[pageKey], ...customSEO, ...newSEOData }
        : { ...pageSEO.home, ...customSEO, ...newSEOData };
      
      updateSEOHead(updatedData);
    }
  };
};
