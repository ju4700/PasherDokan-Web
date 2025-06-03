import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOData, defaultSEO } from '../utils/seo';

interface SEOProps {
  seoData?: Partial<SEOData>;
  structuredData?: object;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({ seoData = {}, structuredData, children }) => {
  const finalSEOData: SEOData = { ...defaultSEO, ...seoData };

  useEffect(() => {
    // Track page views for analytics (when implemented)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: finalSEOData.title,
        page_location: finalSEOData.canonicalUrl,
      });
    }
  }, [finalSEOData.title, finalSEOData.canonicalUrl]);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{finalSEOData.title}</title>
        <meta name="title" content={finalSEOData.title} />
        <meta name="description" content={finalSEOData.description} />
        <meta name="keywords" content={finalSEOData.keywords.join(', ')} />
        <link rel="canonical" href={finalSEOData.canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={finalSEOData.ogType || 'website'} />
        <meta property="og:url" content={finalSEOData.canonicalUrl} />
        <meta property="og:title" content={finalSEOData.title} />
        <meta property="og:description" content={finalSEOData.description} />
        <meta property="og:site_name" content="PasherDokan" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="bn_BD" />
        
        {finalSEOData.ogImage && (
          <>
            <meta property="og:image" content={finalSEOData.ogImage} />
            <meta property="og:image:alt" content={finalSEOData.title} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </>
        )}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={finalSEOData.canonicalUrl} />
        <meta name="twitter:title" content={finalSEOData.title} />
        <meta name="twitter:description" content={finalSEOData.description} />
        {finalSEOData.ogImage && (
          <meta name="twitter:image" content={finalSEOData.ogImage} />
        )}

        {/* Additional SEO Tags */}
        <meta name="author" content="PasherDokan Team" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Language and Geo Tags */}
        <meta name="language" content="English" />
        <meta name="geo.region" content="BD-CHT" />
        <meta name="geo.placename" content="Chattogram, Bangladesh" />
        <meta name="geo.position" content="22.3569;91.7832" />
        <meta name="ICBM" content="22.3569, 91.7832" />

        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#14b8a6" />
        <meta name="msapplication-navbutton-color" content="#14b8a6" />
        <meta name="apple-mobile-web-app-title" content="PasherDokan" />

        {/* Performance and Caching */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
        <meta name="revisit-after" content="1 days" />
        
        {/* Structured Data */}
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </Helmet>
      {children}
    </>
  );
};

export default SEO;
