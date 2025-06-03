// SEO Configuration and Constants
export const SEO_CONFIG = {
  // Site Information
  site: {
    name: 'PasherDokan',
    title: 'Smart E-commerce Platform for Bangladesh SMEs',
    description: 'Join PasherDokan - the leading hyperlocal e-commerce platform designed for small businesses in Bangladesh. Easy setup, powerful features, grow your business digitally.',
    url: 'https://pasherdokan.shop',
    logo: 'https://pasherdokan.shop/images/og/og-home.png',
    author: 'PasherDokan Team',
    language: 'en',
    locale: 'en_US',
    alternateLocale: 'bn_BD',
    themeColor: '#2563eb',
    backgroundColor: '#ffffff'
  },

  // Social Media
  social: {
    twitter: '@PasherDokan',
    facebook: 'https://www.facebook.com/PasherDokan',
    linkedin: 'https://www.linkedin.com/company/pasherdokan',
    instagram: 'https://www.instagram.com/pasherdokan',
    youtube: 'https://www.youtube.com/@pasherdokan'
  },

  // Business Information
  business: {
    type: 'Organization',
    industry: 'E-commerce Platform',
    foundingDate: '2024',
    areaServed: 'Bangladesh',
    address: {
      country: 'BD',
      locality: 'Dhaka',
      region: 'Dhaka Division'
    },
    contact: {
      telephone: '+880-XXX-XXXX',
      email: 'info@pasherdokan.shop',
      contactType: 'Customer Service',
      availableLanguages: ['English', 'Bengali']
    }
  },

  // Default Keywords
  keywords: {
    primary: [
      'PasherDokan',
      'Bangladesh e-commerce',
      'hyperlocal marketplace',
      'small business platform',
      'SME digital solution',
      'online store Bangladesh'
    ],
    secondary: [
      'digital transformation',
      'local business',
      'e-commerce solution',
      'mobile commerce',
      'business automation',
      'inventory management'
    ],
    bengali: [
      'দোকান',
      'ব্যবসা',
      'ই-কমার্স',
      'ডিজিটাল দোকান',
      'অনলাইন ব্যবসা',
      'হাইপারলোকাল'
    ]
  },

  // Section-specific SEO Data
  sections: {
    home: {
      title: 'PasherDokan - Smart E-commerce Platform for Bangladesh SMEs',
      description: 'Join PasherDokan - the leading hyperlocal e-commerce platform designed for small businesses in Bangladesh. Easy setup, powerful features, grow your business digitally.',
      keywords: ['home', 'landing', 'main'],
      ogImage: '/images/og/og-home.png'
    },
    features: {
      title: 'Features - PasherDokan E-commerce Platform',
      description: 'Discover powerful features designed for Bangladesh SMEs: inventory management, order tracking, payment integration, customer management, and more.',
      keywords: ['features', 'capabilities', 'tools', 'inventory', 'payments'],
      ogImage: '/images/og/og-features.png'
    },
    shopkeepers: {
      title: 'For Shopkeepers - Join PasherDokan Platform',
      description: 'Start your digital journey with PasherDokan. Easy onboarding, comprehensive training, and dedicated support for Bangladesh shopkeepers.',
      keywords: ['shopkeepers', 'registration', 'onboarding', 'training'],
      ogImage: '/images/og/og-shopkeepers.png'
    },
    download: {
      title: 'Download PasherDokan App - Start Your Digital Store',
      description: 'Download the PasherDokan mobile app and start managing your store digitally. Available for Android devices across Bangladesh.',
      keywords: ['download', 'mobile app', 'android', 'apk'],
      ogImage: '/images/og/og-download.png'
    },
    contact: {
      title: 'Contact PasherDokan - Get Support & Information',
      description: 'Get in touch with PasherDokan team for support, partnerships, or any questions about our e-commerce platform for Bangladesh businesses.',
      keywords: ['contact', 'support', 'help', 'partnership'],
      ogImage: '/images/og/og-contact.png'
    },
    about: {
      title: 'About PasherDokan - Our Mission & Vision',
      description: 'Learn about PasherDokan\'s mission to empower Bangladesh SMEs through technology and digital transformation.',
      keywords: ['about', 'mission', 'vision', 'team', 'story'],
      ogImage: '/images/og/og-about.png'
    },
    pricing: {
      title: 'Pricing - Affordable Plans for Every Business',
      description: 'Transparent pricing plans designed for Bangladesh SMEs. Start free and scale as your business grows.',
      keywords: ['pricing', 'plans', 'cost', 'subscription', 'free'],
      ogImage: '/images/og/og-pricing.png'
    },
    blog: {
      title: 'Blog - E-commerce Tips & Bangladesh Business Insights',
      description: 'Expert insights, tips, and guides for Bangladesh entrepreneurs and small business owners in the digital age.',
      keywords: ['blog', 'articles', 'tips', 'guides', 'insights'],
      ogImage: '/images/og/og-blog.png'
    }
  },

  // Technical SEO Settings
  technical: {
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    googlebot: 'index, follow',
    bingbot: 'index, follow',
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    charset: 'UTF-8',
    
    // Core Web Vitals targets
    performance: {
      lcp: 2500, // Largest Contentful Paint (ms)
      fid: 100,  // First Input Delay (ms)
      cls: 0.1,  // Cumulative Layout Shift
      fcp: 1800, // First Contentful Paint (ms)
      ttfb: 600  // Time to First Byte (ms)
    },

    // Structured Data Types
    structuredDataTypes: [
      'Organization',
      'WebSite',
      'WebPage',
      'LocalBusiness',
      'Service',
      'Review',
      'FAQ',
      'Article',
      'BreadcrumbList'
    ]
  },

  // Analytics & Tracking
  analytics: {
    googleAnalytics: 'G-3SY622DBPS',
    googleSearchConsole: 'google-site-verification=your-verification-code',
    facebookPixel: 'your-facebook-pixel-id',
    linkedinInsight: 'your-linkedin-partner-id',
    hotjar: 'your-hotjar-id',
    
    // Custom events to track
    events: {
      pageViews: true,
      scrollDepth: true,
      socialShares: true,
      downloadLinks: true,
      externalLinks: true,
      formSubmissions: true,
      errorPages: true,
      searchQueries: true
    }
  },

  // Multilingual Support
  languages: {
    default: 'en',
    supported: ['en', 'bn'],
    hreflang: {
      'en': 'https://pasherdokan.shop/',
      'bn': 'https://pasherdokan.shop/bn/',
      'x-default': 'https://pasherdokan.shop/'
    }
  },

  // Content Guidelines
  content: {
    titleLength: { min: 30, max: 60 },
    descriptionLength: { min: 120, max: 160 },
    h1Count: 1,
    imageAltRequired: true,
    internalLinkCount: { min: 3 },
    externalLinkCount: { max: 5 },
    readabilityScore: 60, // Flesch Reading Ease
    keywordDensity: { min: 0.5, max: 3 } // Percentage
  },

  // Image SEO
  images: {
    formats: ['webp', 'jpg', 'png'],
    maxSize: 500000, // 500KB
    dimensions: {
      og: { width: 1200, height: 630 },
      twitter: { width: 1200, height: 600 },
      favicon: { width: 32, height: 32 },
      logo: { width: 200, height: 60 }
    },
    compressionQuality: 85,
    altTextRequired: true,
    lazyLoadingEnabled: true
  },

  // Local SEO
  localSEO: {
    enabled: true,
    businessType: 'Technology Company',
    serviceArea: 'Bangladesh',
    cities: [
      'Dhaka',
      'Chittagong',
      'Sylhet',
      'Rajshahi',
      'Khulna',
      'Barisal',
      'Rangpur',
      'Mymensingh'
    ],
    categories: [
      'E-commerce Platform',
      'Business Software',
      'Digital Solutions',
      'Small Business Tools'
    ]
  }
};

// Helper function to get section SEO data
export const getSectionSEO = (section: string) => {
  const sectionData = SEO_CONFIG.sections[section as keyof typeof SEO_CONFIG.sections];
  if (!sectionData) {
    return SEO_CONFIG.sections.home;
  }
  
  return {
    ...sectionData,
    title: `${sectionData.title} | ${SEO_CONFIG.site.name}`,
    url: `${SEO_CONFIG.site.url}${section === 'home' ? '' : `/#${section}`}`,
    keywords: [
      ...SEO_CONFIG.keywords.primary,
      ...sectionData.keywords,
      ...SEO_CONFIG.keywords.bengali
    ]
  };
};

// Helper function to generate complete meta tags
export const generateMetaTags = (section: string = 'home') => {
  const seoData = getSectionSEO(section) as typeof SEO_CONFIG.sections[keyof typeof SEO_CONFIG.sections] & { url: string };
  
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords.join(', '),
    author: SEO_CONFIG.site.author,
    viewport: SEO_CONFIG.technical.viewport,
    charset: SEO_CONFIG.technical.charset,
    robots: SEO_CONFIG.technical.robots,
    
    // Open Graph
    'og:title': seoData.title,
    'og:description': seoData.description,
    'og:image': `${SEO_CONFIG.site.url}${seoData.ogImage}`,
    'og:url': seoData.url,
    'og:type': 'website',
    'og:site_name': SEO_CONFIG.site.name,
    'og:locale': SEO_CONFIG.site.locale,
    'og:locale:alternate': SEO_CONFIG.site.alternateLocale,
    
    // Twitter Card
    'twitter:card': 'summary_large_image',
    'twitter:title': seoData.title,
    'twitter:description': seoData.description,
    'twitter:image': `${SEO_CONFIG.site.url}${seoData.ogImage}`,
    'twitter:site': SEO_CONFIG.social.twitter,
    'twitter:creator': SEO_CONFIG.social.twitter,
    
    // Technical
    'theme-color': SEO_CONFIG.site.themeColor,
    'msapplication-TileColor': SEO_CONFIG.site.themeColor,
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': SEO_CONFIG.site.name,
    
    // Additional
    canonical: seoData.url,
    hreflang: SEO_CONFIG.languages.hreflang
  };
};

export default SEO_CONFIG;
