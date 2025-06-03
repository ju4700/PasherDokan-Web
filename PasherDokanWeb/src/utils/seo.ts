// SEO utilities for PasherDokan
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
}

export const defaultSEO: SEOData = {
  title: "PasherDokan - Hyperlocal E-commerce Platform for Bangladesh SMEs | Local Shop Digitization",
  description: "Empower your local shop with PasherDokan's hyperlocal e-commerce platform. Cash-on-pickup, inventory management, customer discovery for Bangladesh SMEs. Starting in Chattogram.",
  keywords: [
    // Primary keywords
    "Bangladesh SME",
    "local shop digitization", 
    "hyperlocal ecommerce",
    "Chattogram business",
    "cash on delivery",
    "inventory management",
    "OpenStreetMap",
    "small business Bangladesh",
    
    // Bengali keywords
    "দোকান ডিজিটাল",
    "স্থানীয় ব্যবসা",
    "চট্টগ্রাম ব্যবসা",
    "খুচরা বিক্রেতা",
    "ইনভেন্টরি ব্যবস্থাপনা",
    
    // Location-based
    "Chittagong business",
    "Bangladesh retail",
    "local shops Bangladesh",
    "neighborhood commerce",
    "community business",
    
    // Feature-based
    "cash on pickup",
    "SME empowerment",
    "retail digitization",
    "mobile app business",
    "subscription model",
    "profit tracking",
    "customer analytics",
    "demand insights",
    
    // Industry terms
    "hyperlocal delivery",
    "B2B platform",
    "retail technology",
    "digital transformation",
    "e-commerce Bangladesh",
    "startup Bangladesh",
    
    // Competitive
    "alternative to Chaldal",
    "local vs global ecommerce",
    "SME focused platform"
  ],
  canonicalUrl: "https://pasherdokan.shop/",
  ogImage: "https://pasherdokan.shop/images/og-image.jpg",
  ogType: "website"
};

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    ...defaultSEO,
    title: "PasherDokan - Digital Solutions for Local Shops in Bangladesh | Hyperlocal E-commerce",
    description: "Transform your local shop with PasherDokan's digital platform. Inventory management, customer discovery, cash-on-pickup. Serving 96,000+ SMEs across Bangladesh starting in Chattogram.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PasherDokan",
      "url": "https://pasherdokan.shop",
      "logo": "https://pasherdokan.shop/images/icon.png",
      "description": "Hyperlocal e-commerce platform empowering Bangladesh SMEs",
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BD",
        "addressRegion": "Chattogram"
      },
      "sameAs": [
        "https://facebook.com/pasherdokan",
        "https://linkedin.com/company/pasherdokan"
      ]
    }
  },
  
  features: {
    title: "Features - PasherDokan | Hyperlocal E-commerce Solutions for Bangladesh SMEs",
    description: "Discover PasherDokan's powerful features: OpenStreetMap integration, cash-on-pickup, inventory management, profit tracking, customer analytics. Built for Bangladesh's 1.2M retail outlets.",
    keywords: [...defaultSEO.keywords, "features", "platform capabilities", "business tools", "retail solutions"],
    canonicalUrl: "https://pasherdokan.shop/features",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PasherDokan Platform",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Android, Web",
      "offers": {
        "@type": "Offer",
        "price": "500",
        "priceCurrency": "BDT"
      },
      "featureList": [
        "Hyperlocal Discovery with OpenStreetMap",
        "Cash-on-Pickup Payment System", 
        "Inventory Management",
        "Real-time Analytics",
        "Customer Poll System",
        "Profit/Loss Tracking"
      ]
    }
  },

  team: {
    title: "Team - PasherDokan | Meet the Founders Building Bangladesh's Hyperlocal Future",
    description: "Meet the PasherDokan team revolutionizing Bangladesh's $6B retail market. Experienced founders building hyperlocal solutions for 96,000+ SMEs starting in Chattogram.",
    keywords: [...defaultSEO.keywords, "team", "founders", "about us", "company"],
    canonicalUrl: "https://pasherdokan.shop/team"
  },

  contact: {
    title: "Contact Us - PasherDokan | Get Started with Hyperlocal E-commerce",
    description: "Contact PasherDokan to join our Chattogram pilot program. Transform your local shop with our hyperlocal e-commerce platform. Early access for 100 selected shopkeepers.",
    keywords: [...defaultSEO.keywords, "contact", "pilot program", "early access", "Chattogram"],
    canonicalUrl: "https://pasherdokan.shop/contact"
  }
};

// Generate structured data for local business
export const generateLocalBusinessStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "TechStartup",
  "name": "PasherDokan",
  "description": "Hyperlocal e-commerce platform empowering Bangladesh SMEs with digital tools while preserving community commerce traditions",
  "url": "https://pasherdokan.shop",
  "logo": "https://pasherdokan.shop/images/icon.png",
  "foundingDate": "2024",
  "founder": [
    {
      "@type": "Person",
      "name": "PasherDokan Team"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BD",
    "addressRegion": "Chattogram Division",
    "addressLocality": "Chattogram"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Bangladesh"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "22.3569",
      "longitude": "91.7832"
    },
    "geoRadius": "50000"
  },
  "industry": "E-commerce Technology",
  "numberOfEmployees": "1-10",
  "makesOffer": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": "Hyperlocal E-commerce Platform",
      "description": "Digital platform for local shops with inventory management, customer discovery, and analytics"
    },
    "price": "500",
    "priceCurrency": "BDT",
    "billingIncrement": "Monthly"
  },
  "audience": {
    "@type": "BusinessAudience",
    "audienceType": "Small and Medium Enterprises (SMEs)",
    "geographicArea": {
      "@type": "Country", 
      "name": "Bangladesh"
    }
  }
});

// Generate FAQ structured data
export const generateFAQStructuredData = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Generate article structured data for blog posts
export const generateArticleStructuredData = (article: {
  title: string;
  description: string;
  publishDate: string;
  author: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.image || "https://pasherdokan.shop/images/og-image.jpg",
  "author": {
    "@type": "Organization",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "PasherDokan",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pasherdokan.shop/images/icon.png"
    }
  },
  "datePublished": article.publishDate,
  "dateModified": article.publishDate
});

// Helper function to update document head
export const updateSEOHead = (seoData: SEOData) => {
  // Update title
  document.title = seoData.title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', seoData.description);
  }
  
  // Update keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute('content', seoData.keywords.join(', '));
  }
  
  // Update canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', seoData.canonicalUrl);
  }
  
  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', seoData.title);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', seoData.description);
  }
  
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', seoData.canonicalUrl);
  }
  
  if (seoData.ogImage) {
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', seoData.ogImage);
    }
  }
  
  // Add structured data
  if (seoData.structuredData) {
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(seoData.structuredData);
    document.head.appendChild(script);
  }
};

// Generate sitemap data
export const generateSitemapUrls = () => [
  {
    url: 'https://pasherdokan.shop/',
    changefreq: 'daily',
    priority: '1.0',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: 'https://pasherdokan.shop/features',
    changefreq: 'weekly', 
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: 'https://pasherdokan.shop/team',
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: 'https://pasherdokan.shop/contact',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Breadcrumb structured data generator
export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

// Review/Rating structured data for business
export const generateReviewStructuredData = (reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "PasherDokan",
    "url": "https://pasherdokan.shop"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length,
    "bestRating": 5,
    "worstRating": 1
  },
  "author": reviews.map(review => ({
    "@type": "Person",
    "name": review.author
  }))
});

// Product/Service structured data
export const generateServiceStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "PasherDokan Digital Commerce Platform",
  "description": "Complete digital commerce solution for local shops in Bangladesh with POS, inventory management, and e-commerce capabilities",
  "provider": {
    "@type": "Organization",
    "name": "PasherDokan",
    "url": "https://pasherdokan.shop"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Bangladesh"
  },
  "category": "E-commerce Platform",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BDT",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-01-01"
  }
});

// WebPage structured data for sections
export const generateWebPageStructuredData = (section: {
  name: string;
  description: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": section.name,
  "description": section.description,
  "url": section.url,
  "inLanguage": ["en", "bn"],
  "isPartOf": {
    "@type": "WebSite",
    "name": "PasherDokan",
    "url": "https://pasherdokan.shop"
  },
  "about": {
    "@type": "Thing",
    "name": "Digital Commerce Solutions for Bangladesh SMEs"
  }
});

// Social media profile structured data
export const generateSocialProfileStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PasherDokan",
  "url": "https://pasherdokan.shop",
  "sameAs": [
    "https://www.facebook.com/pasherdokan",
    "https://www.linkedin.com/company/pasherdokan",
    "https://twitter.com/pasherdokan",
    "https://www.youtube.com/c/pasherdokan"
  ]
});

// Person schema for team members
export const generatePersonStructuredData = (person: {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  linkedin?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": person.name,
  "jobTitle": person.jobTitle,
  "description": person.description,
  "worksFor": {
    "@type": "Organization",
    "name": "PasherDokan",
    "url": "https://pasherdokan.shop"
  },
  ...(person.image && { "image": person.image }),
  ...(person.linkedin && { "sameAs": [person.linkedin] })
});

// Organization aggregate rating
export const generateAggregateRatingStructuredData = (ratings: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "ratingValue": ratings.ratingValue,
  "reviewCount": ratings.reviewCount,
  "bestRating": ratings.bestRating || 5,
  "worstRating": ratings.worstRating || 1
});

// Enhanced section-specific SEO configurations
export const sectionSEO = {
  hero: {
    title: "PasherDokan - Digital Commerce Platform for Bangladesh SMEs",
    description: "Transform your local shop into a digital powerhouse with PasherDokan's comprehensive e-commerce platform. POS, inventory management, and online presence all in one.",
    keywords: [...defaultSEO.keywords, "digital transformation", "local business", "e-commerce bangladesh"],
    canonical: "https://pasherdokan.shop#hero"
  },
  features: {
    title: "Features - PasherDokan Digital Commerce Solutions",
    description: "Discover PasherDokan's powerful features: POS system, inventory management, e-commerce website, analytics, and mobile app for Bangladesh businesses.",
    keywords: [...defaultSEO.keywords, "pos system", "inventory management", "business analytics"],
    canonical: "https://pasherdokan.shop#features"
  },
  milestones: {
    title: "Our Journey - PasherDokan Milestones and Achievements",
    description: "Explore PasherDokan's journey in empowering Bangladesh's local businesses with digital solutions. View our milestones and success stories.",
    keywords: [...defaultSEO.keywords, "company milestones", "business success", "digital transformation"],
    canonical: "https://pasherdokan.shop#milestones"
  },
  vision: {
    title: "Our Vision - Empowering Bangladesh's Digital Economy",
    description: "Learn about PasherDokan's vision to digitize Bangladesh's local economy and empower SMEs with cutting-edge e-commerce technology.",
    keywords: [...defaultSEO.keywords, "company vision", "digital economy", "bangladesh sme"],
    canonical: "https://pasherdokan.shop#vision"
  },
  faq: {
    title: "FAQ - PasherDokan Questions and Answers",
    description: "Find answers to frequently asked questions about PasherDokan's e-commerce platform, pricing, features, and implementation process.",
    keywords: [...defaultSEO.keywords, "faq", "questions", "help", "support"],
    canonical: "https://pasherdokan.shop#faq"
  },
  team: {
    title: "Meet Our Team - PasherDokan Leadership and Experts",
    description: "Meet the passionate team behind PasherDokan who are dedicated to revolutionizing Bangladesh's local commerce through innovative digital solutions.",
    keywords: [...defaultSEO.keywords, "team", "leadership", "experts", "company"],
    canonical: "https://pasherdokan.shop#team"
  },
  contact: {
    title: "Contact Us - Get Started with PasherDokan Today",
    description: "Ready to transform your business? Contact PasherDokan for personalized consultation and start your digital commerce journey in Bangladesh.",
    keywords: [...defaultSEO.keywords, "contact", "consultation", "get started", "support"],
    canonical: "https://pasherdokan.shop#contact"
  }
} as const;

// Enhanced meta tag generator for social sharing
export const generateSocialMetaTags = (data: {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
}) => {
  const metaTags = [
    // Open Graph
    { property: "og:title", content: data.title },
    { property: "og:description", content: data.description },
    { property: "og:image", content: data.image },
    { property: "og:url", content: data.url },
    { property: "og:type", content: data.type || "website" },
    { property: "og:site_name", content: "PasherDokan" },
    { property: "og:locale", content: "en_US" },
    { property: "og:locale:alternate", content: "bn_BD" },
    
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: data.title },
    { name: "twitter:description", content: data.description },
    { name: "twitter:image", content: data.image },
    { name: "twitter:site", content: "@pasherdokan" },
    { name: "twitter:creator", content: "@pasherdokan" },
    
    // LinkedIn
    { property: "linkedin:owner", content: "company/pasherdokan" }
  ];
  
  return metaTags;
};

// SEO performance monitoring
export const seoMonitoring = {
  // Check if critical SEO elements are present
  auditSEOElements: () => {
    const audit = {
      title: !!document.title && document.title.length > 0,
      metaDescription: !!document.querySelector('meta[name="description"]'),
      canonicalUrl: !!document.querySelector('link[rel="canonical"]'),
      ogTags: !!document.querySelector('meta[property^="og:"]'),
      twitterCard: !!document.querySelector('meta[name="twitter:card"]'),
      structuredData: !!document.querySelector('script[type="application/ld+json"]'),
      h1Tag: !!document.querySelector('h1'),
      altTags: Array.from(document.querySelectorAll('img')).every(img => img.hasAttribute('alt'))
    };
    
    console.log('SEO Audit Results:', audit);
    return audit;
  },
  
  // Monitor page performance metrics relevant to SEO
  monitorPerformance: () => {
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            const fidEntry = entry as PerformanceEventTiming;
            if (fidEntry.processingStart) {
              console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
            }
          });
        }).observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift
        new PerformanceObserver((entryList) => {
          let cls = 0;
          entryList.getEntries().forEach((entry) => {
            const clsEntry = entry as PerformanceEntry & { 
              hadRecentInput?: boolean; 
              value?: number; 
            };
            if (!clsEntry.hadRecentInput && clsEntry.value) {
              cls += clsEntry.value;
            }
          });
          console.log('CLS:', cls);
        }).observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('Performance monitoring not fully supported:', error);
      }
    }
  }
};