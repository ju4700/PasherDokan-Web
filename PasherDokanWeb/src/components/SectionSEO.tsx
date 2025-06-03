import { useEffect, useRef } from 'react';
import { useSEO } from '../hooks/useSEO';
import { SEOData, pageSEO } from '../utils/seo';
import { trackBusinessEvents } from '../utils/analytics';

interface SectionSEOProps {
  sectionId: string;
  seoKey?: keyof typeof pageSEO;
  customSEO?: Partial<SEOData>;
  structuredData?: object;
  trackingEvent?: string;
  children: React.ReactNode;
}

export const SectionSEO = ({ 
  sectionId, 
  seoKey, 
  customSEO, 
  structuredData, 
  trackingEvent,
  children 
}: SectionSEOProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggered = useRef(false);

  const { updateSEO } = useSEO({
    pageKey: seoKey,
    customSEO,
    structuredData,
    sectionId
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Update URL hash without scrolling
            if (window.location.hash !== `#${sectionId}`) {
              window.history.replaceState(null, '', `#${sectionId}`);
            }

            // Update SEO if we have section-specific data
            if (seoKey && !hasTriggered.current) {
              updateSEO(customSEO || {});
              
              // Track section view
              if (trackingEvent) {
                trackBusinessEvents.featureView(trackingEvent);
              }
              
              hasTriggered.current = true;
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [sectionId, seoKey, customSEO, trackingEvent, updateSEO]);

  return (
    <section ref={sectionRef} id={sectionId}>
      {children}
    </section>
  );
};

export default SectionSEO;
