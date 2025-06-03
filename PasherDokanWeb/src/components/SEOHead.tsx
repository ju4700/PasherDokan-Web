import React from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  section?: string;
  keywords?: string[];
  author?: string;
  ogImage?: string;
  canonical?: string;
  alternateLanguages?: Array<{ lang: string; url: string }>;
  structuredData?: object;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'PasherDokan - Smart E-commerce Platform for Bangladesh SMEs',
  description = 'Join PasherDokan - the leading hyperlocal e-commerce platform designed for small businesses in Bangladesh. Easy setup, powerful features, grow your business digitally.',
  section = 'home',
  keywords = [],
  author = 'PasherDokan Team',
  ogImage,
  canonical,
  alternateLanguages = [],
  structuredData
}) => {
  const allKeywords = React.useMemo(() => {
    const defaultKeywords = [
      'PasherDokan',
      'Bangladesh e-commerce',
      'small business',
      'hyperlocal marketplace',
      'digital store',
      'online business',
      'SME platform',
      'দোকান',
      'ব্যবসা',
      'ই-কমার্স'
    ];
    return [...defaultKeywords, ...keywords];
  }, [keywords]);
  
  React.useEffect(() => {
    const currentUrl = `https://pasherdokan.shop${window.location.pathname}`;
    const canonicalUrl = canonical || currentUrl;
    const ogImageUrl = ogImage || `/images/og/og-${section}.png`;
    // Update document title
    document.title = title;

    // Update meta description
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', allKeywords.join(', '));
    updateMetaTag('name', 'author', author);

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', `https://pasherdokan.shop${ogImageUrl}`);
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:site_name', 'PasherDokan');
    updateMetaTag('property', 'og:locale', 'en_US');
    updateMetaTag('property', 'og:locale:alternate', 'bn_BD');

    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', `https://pasherdokan.shop${ogImageUrl}`);
    updateMetaTag('name', 'twitter:site', '@PasherDokan');
    updateMetaTag('name', 'twitter:creator', '@PasherDokan');

    // Update other SEO tags
    updateMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('name', 'googlebot', 'index, follow');
    updateMetaTag('name', 'bingbot', 'index, follow');
    updateMetaTag('name', 'theme-color', '#2563eb');
    updateMetaTag('name', 'msapplication-TileColor', '#2563eb');
    updateMetaTag('name', 'apple-mobile-web-app-capable', 'yes');
    updateMetaTag('name', 'apple-mobile-web-app-status-bar-style', 'default');
    updateMetaTag('name', 'apple-mobile-web-app-title', 'PasherDokan');

    // Update canonical link
    updateLinkTag('canonical', canonicalUrl);

    // Update alternate language links
    alternateLanguages.forEach(({ lang, url }) => {
      updateLinkTag('alternate', url, { hreflang: lang });
    });

    // Update favicon links (ensure they're present)
    updateFaviconLinks();

    // Update structured data
    if (structuredData) {
      updateStructuredData(structuredData);
    }

    // Add default structured data for the organization
    updateStructuredData(getOrganizationStructuredData());
    updateStructuredData(getWebsiteStructuredData());

  }, [title, description, section, allKeywords, author, canonical, ogImage, alternateLanguages, structuredData]);

  return null; // This component only updates the head, doesn't render anything
};

// Helper function to update meta tags
const updateMetaTag = (attribute: string, value: string, content: string) => {
  let tag = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;
  
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  
  tag.content = content;
};

// Helper function to update link tags
const updateLinkTag = (rel: string, href: string, additionalAttrs: Record<string, string> = {}) => {
  const selector = Object.keys(additionalAttrs).length > 0
    ? `link[rel="${rel}"][${Object.keys(additionalAttrs)[0]}="${Object.values(additionalAttrs)[0]}"]`
    : `link[rel="${rel}"]`;
    
  let tag = document.querySelector(selector) as HTMLLinkElement;
  
  if (!tag) {
    tag = document.createElement('link');
    tag.rel = rel;
    Object.entries(additionalAttrs).forEach(([key, value]) => {
      tag.setAttribute(key, value);
    });
    document.head.appendChild(tag);
  }
  
  tag.href = href;
};

// Helper function to ensure favicon links are present
const updateFaviconLinks = () => {
  const faviconLinks = [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' }
  ];

  faviconLinks.forEach(({ rel, type, sizes, href }) => {
    const selector = sizes ? `link[rel="${rel}"][sizes="${sizes}"]` : `link[rel="${rel}"]`;
    let tag = document.querySelector(selector) as HTMLLinkElement;
    
    if (!tag) {
      tag = document.createElement('link');
      tag.rel = rel;
      if (type) tag.type = type;
      if (sizes) tag.setAttribute('sizes', sizes);
      document.head.appendChild(tag);
    }
    
    tag.href = href;
  });
};

// Helper function to update structured data
const updateStructuredData = (data: object) => {
  const scriptId = `structured-data-${Date.now()}`;
  let script = document.querySelector(`script[type="application/ld+json"]`) as HTMLScriptElement;
  
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    document.head.appendChild(script);
  }
  
  script.textContent = JSON.stringify(data, null, 2);
};

// Organization structured data
const getOrganizationStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PasherDokan',
  alternateName: 'PasherDokan Bangladesh',
  url: 'https://pasherdokan.shop',
  logo: 'https://pasherdokan.shop/images/og/og-home.png',
  description: 'Hyperlocal e-commerce platform for small businesses in Bangladesh',
  foundingDate: '2024',
  founder: {
    '@type': 'Person',
    name: 'PasherDokan Team'
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BD',
    addressLocality: 'Dhaka',
    addressRegion: 'Dhaka Division'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+880-XXX-XXXX',
    contactType: 'Customer Service',
    availableLanguage: ['English', 'Bengali']
  },
  sameAs: [
    'https://www.facebook.com/PasherDokan',
    'https://www.linkedin.com/company/pasherdokan',
    'https://twitter.com/PasherDokan'
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Bangladesh'
  },
  serviceType: 'E-commerce Platform',
  keywords: [
    'hyperlocal e-commerce',
    'small business platform',
    'Bangladesh marketplace',
    'digital store solution'
  ]
});

// Website structured data
const getWebsiteStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PasherDokan',
  alternateName: 'PasherDokan - Smart E-commerce Platform',
  url: 'https://pasherdokan.shop',
  description: 'Smart e-commerce platform designed for small businesses in Bangladesh',
  publisher: {
    '@type': 'Organization',
    name: 'PasherDokan'
  },
  inLanguage: ['en', 'bn'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://pasherdokan.shop/?search={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
});

export default SEOHead;
