// Google Analytics and SEO tracking utilities
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const GA_MEASUREMENT_ID = 'G-3SY622DBPS'; // Replace with actual GA4 ID

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  if (typeof window === 'undefined') return;

  // Create gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
    custom_map: {
      'custom_parameter_1': 'business_type',
      'custom_parameter_2': 'user_location'
    }
  });

  // Load GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    });
  }
};

// Track custom events for SEO insights
export const trackEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      page_location: window.location.href
    });
  }
};

// Track business-specific events
export const trackBusinessEvents = {
  // When someone shows interest in becoming a shopkeeper
  shopkeeperSignup: (data: { businessType?: string; location?: string }) => {
    trackEvent('shopkeeper_signup_interest', {
      event_category: 'Lead Generation',
      event_label: 'Shopkeeper Signup',
      business_type: data.businessType,
      location: data.location,
      value: 1
    });
  },

  // When someone downloads the APK
  apkDownload: (source: string) => {
    trackEvent('apk_download', {
      event_category: 'App Downloads',
      event_label: 'APK Download',
      download_source: source,
      value: 1
    });
  },

  // When someone views features
  featureView: (featureName: string) => {
    trackEvent('feature_view', {
      event_category: 'Product Interest',
      event_label: featureName,
      value: 1
    });
  },

  // When someone contacts us
  contactForm: (formType: string) => {
    trackEvent('contact_form_submit', {
      event_category: 'Lead Generation',
      event_label: formType,
      value: 1
    });
  },

  // Language switching (important for BD market)
  languageSwitch: (fromLang: string, toLang: string) => {
    trackEvent('language_switch', {
      event_category: 'User Behavior',
      from_language: fromLang,
      to_language: toLang,
      value: 1
    });
  },

  // Scroll depth for engagement tracking
  scrollDepth: (percentage: number) => {
    trackEvent('scroll_depth', {
      event_category: 'User Engagement',
      scroll_percentage: percentage,
      value: percentage
    });
  },

  // Social engagement tracking
  socialEngagement: (action: string, section?: string) => {
    trackEvent('social_engagement', {
      event_category: 'Social',
      event_label: action,
      section: section || 'unknown',
      value: 1
    });
  }
};

// Social sharing tracking for SEO
export const trackSocialShare = (platform: string, url: string, section?: string) => {
  trackEvent('social_share', {
    event_category: 'Social',
    event_label: platform,
    custom_parameters: {
      platform,
      url,
      section: section || 'unknown',
      timestamp: new Date().toISOString()
    }
  });
  
  // Track for local business engagement
  trackBusinessEvents.socialEngagement(`Shared on ${platform}`, section);
};

// Track social media referrals for SEO
export const trackSocialReferral = (source: string) => {
  trackEvent('social_referral', {
    event_category: 'Traffic Source',
    event_label: source,
    custom_parameters: {
      referrer: document.referrer,
      source,
      timestamp: new Date().toISOString()
    }
  });
};

// Performance tracking for SEO
export const trackPerformance = () => {
  if (typeof window === 'undefined') return;

  // Core Web Vitals tracking
  const trackWebVitals = () => {
    // Track First Contentful Paint
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          trackEvent('web_vitals_fcp', {
            event_category: 'Web Vitals',
            value: Math.round(entry.startTime)
          });
        }
      }
    });
    observer.observe({ entryTypes: ['paint'] });

    // Track Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      trackEvent('web_vitals_lcp', {
        event_category: 'Web Vitals',
        value: Math.round(lastEntry.startTime)
      });
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Track Cumulative Layout Shift
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShiftEntry = entry as PerformanceEntry & { 
          hadRecentInput?: boolean; 
          value?: number; 
        };
        if (!layoutShiftEntry.hadRecentInput && layoutShiftEntry.value) {
          clsScore += layoutShiftEntry.value;
        }
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Report CLS on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        trackEvent('web_vitals_cls', {
          event_category: 'Web Vitals',
          value: Math.round(clsScore * 1000)
        });
      }
    });
  };

  // Start tracking after page load
  if (document.readyState === 'complete') {
    trackWebVitals();
  } else {
    window.addEventListener('load', trackWebVitals);
  }
};

// Scroll depth tracking for engagement
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  const milestones = [25, 50, 75, 100];
  const tracked = new Set<number>();

  const checkScrollDepth = () => {
    const scrolled = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );

    milestones.forEach(milestone => {
      if (scrolled >= milestone && !tracked.has(milestone)) {
        tracked.add(milestone);
        trackBusinessEvents.scrollDepth(milestone);
      }
    });
  };

  let ticking = false;
  const scrollHandler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });
};

// Facebook Pixel tracking (for Bangladesh market)
export const initFacebookPixel = (pixelId: string) => {
  if (typeof window === 'undefined') return;

  // Load Facebook Pixel
  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);

  // Add noscript fallback
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />`;
  document.body.appendChild(noscript);
};

// LinkedIn Insight Tag (for B2B tracking)
export const initLinkedInInsight = (partnerId: string) => {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.innerHTML = `
    _linkedin_partner_id = "${partnerId}";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(_linkedin_partner_id);
  `;
  document.head.appendChild(script);

  const trackingScript = document.createElement('script');
  trackingScript.async = true;
  trackingScript.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
  document.head.appendChild(trackingScript);
};

// SEO monitoring utilities
export const seoMonitoring = {
  // Check if page has proper meta tags
  auditMetaTags: () => {
    const issues: string[] = [];
    
    if (!document.title || document.title.length < 30 || document.title.length > 60) {
      issues.push('Title length should be 30-60 characters');
    }
    
    const description = document.querySelector('meta[name="description"]');
    if (!description || !description.getAttribute('content') || 
        description.getAttribute('content')!.length < 120 || 
        description.getAttribute('content')!.length > 160) {
      issues.push('Meta description should be 120-160 characters');
    }
    
    const h1 = document.querySelector('h1');
    if (!h1) {
      issues.push('Page should have an H1 tag');
    }
    
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      issues.push('Page should have a canonical URL');
    }
    
    return issues;
  },

  // Monitor page performance
  getPageMetrics: () => {
    if (typeof window === 'undefined') return null;
    
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
    };
  }
};

// Enhanced SEO-specific tracking
export const seoTracking = {
  // Track search engine referrals
  trackSearchEngineReferral: () => {
    const referrer = document.referrer;
    const searchEngines = {
      'google.com': 'Google',
      'bing.com': 'Bing',
      'yahoo.com': 'Yahoo',
      'duckduckgo.com': 'DuckDuckGo',
      'baidu.com': 'Baidu'
    };
    
    const searchEngine = Object.entries(searchEngines).find(([domain]) => 
      referrer.includes(domain)
    );
    
    if (searchEngine) {
      trackEvent('seo_referral', {
        search_engine: searchEngine[1],
        referrer: referrer
      });
    }
  },
  
  // Track organic vs paid traffic
  trackTrafficSource: () => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const referrer = document.referrer;
    
    let trafficSource = 'direct';
    
    if (utmMedium === 'cpc' || utmSource?.includes('google_ads')) {
      trafficSource = 'paid_search';
    } else if (utmMedium === 'organic' || referrer.includes('google.com')) {
      trafficSource = 'organic_search';
    } else if (referrer.includes('facebook.com') || referrer.includes('linkedin.com')) {
      trafficSource = 'social';
    } else if (referrer) {
      trafficSource = 'referral';
    }
    
    trackEvent('traffic_source', {
      source: trafficSource,
      utm_source: utmSource,
      utm_medium: utmMedium,
      referrer: referrer
    });
  },
  
  // Track keyword ranking simulations (when users search on site)
  trackSiteSearch: (searchTerm: string) => {
    trackEvent('site_search', {
      search_term: searchTerm.toLowerCase(),
      timestamp: new Date().toISOString()
    });
  },
  
  // Track page depth and user engagement for SEO signals
  trackPageDepth: () => {
    const sections = document.querySelectorAll('section[id]');
    let maxDepth = 0;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionIndex = Array.from(sections).indexOf(entry.target as HTMLElement);
          if (sectionIndex > maxDepth) {
            maxDepth = sectionIndex;
            trackEvent('page_depth', {
              event_category: 'User Engagement',
              depth: maxDepth + 1,
              value: maxDepth + 1
            });
          }
        }
      });
    }, {
      threshold: Array.from({ length: 10 }, (_, i) => i / 10) // 0.0, 0.1, ..., 0.9
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }
};
