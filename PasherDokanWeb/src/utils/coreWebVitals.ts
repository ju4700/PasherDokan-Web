// Core Web Vitals monitoring and optimization utilities
import { trackPerformance } from './analytics';

export interface CoreWebVitals {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  inp?: number; // Interaction to Next Paint (new metric)
}

export interface PerformanceGrade {
  overall: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  lcp: 'good' | 'needs-improvement' | 'poor';
  fid: 'good' | 'needs-improvement' | 'poor';
  cls: 'good' | 'needs-improvement' | 'poor';
  score: number; // 0-100
}

// Core Web Vitals thresholds (Google standards)
export const THRESHOLDS = {
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  fcp: { good: 1800, poor: 3000 },
  ttfb: { good: 800, poor: 1800 },
  inp: { good: 200, poor: 500 }
} as const;

class CoreWebVitalsMonitor {
  private vitals: CoreWebVitals = {};
  private observers: PerformanceObserver[] = [];
  private callbacks: ((vitals: CoreWebVitals) => void)[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    // Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry;
        this.vitals.lcp = lastEntry.startTime;
        this.notifyCallbacks();
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (error) {
      console.warn('LCP observer failed:', error);
    }

    // First Input Delay
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming;
          if (fidEntry.processingStart) {
            this.vitals.fid = fidEntry.processingStart - fidEntry.startTime;
            this.notifyCallbacks();
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch (error) {
      console.warn('FID observer failed:', error);
    }

    // Cumulative Layout Shift
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          const clsEntry = entry as PerformanceEntry & { 
            hadRecentInput?: boolean; 
            value?: number; 
          };
          if (!clsEntry.hadRecentInput && clsEntry.value) {
            clsValue += clsEntry.value;
            this.vitals.cls = clsValue;
            this.notifyCallbacks();
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (error) {
      console.warn('CLS observer failed:', error);
    }

    // First Contentful Paint
    try {
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          this.vitals.fcp = fcpEntry.startTime;
          this.notifyCallbacks();
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(fcpObserver);
    } catch (error) {
      console.warn('FCP observer failed:', error);
    }

    // Navigation timing for TTFB
    this.measureTTFB();
  }

  private measureTTFB() {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      this.vitals.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      this.notifyCallbacks();
    }
  }

  private notifyCallbacks() {
    this.callbacks.forEach(callback => callback(this.vitals));
  }

  public onVitalsUpdate(callback: (vitals: CoreWebVitals) => void) {
    this.callbacks.push(callback);
    
    // Immediately call with current values
    if (Object.keys(this.vitals).length > 0) {
      callback(this.vitals);
    }
  }

  public getVitals(): CoreWebVitals {
    return { ...this.vitals };
  }

  public calculateGrade(): PerformanceGrade {
    const grades = {
      lcp: this.gradeMetric(this.vitals.lcp, THRESHOLDS.lcp),
      fid: this.gradeMetric(this.vitals.fid, THRESHOLDS.fid),
      cls: this.gradeMetric(this.vitals.cls, THRESHOLDS.cls)
    };

    // Calculate overall score
    let totalScore = 0;
    let metricCount = 0;

    Object.values(grades).forEach(grade => {
      metricCount++;
      switch (grade) {
        case 'good': totalScore += 100; break;
        case 'needs-improvement': totalScore += 65; break;
        case 'poor': totalScore += 25; break;
      }
    });

    const score = metricCount > 0 ? totalScore / metricCount : 0;
    
    let overall: PerformanceGrade['overall'];
    if (score >= 90) overall = 'excellent';
    else if (score >= 75) overall = 'good';
    else if (score >= 50) overall = 'needs-improvement';
    else overall = 'poor';

    return { ...grades, overall, score };
  }

  private gradeMetric(value: number | undefined, threshold: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' {
    if (value === undefined) return 'poor';
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  public getRecommendations(): string[] {
    const recommendations: string[] = [];
    const vitals = this.vitals;

    if (vitals.lcp && vitals.lcp > THRESHOLDS.lcp.good) {
      recommendations.push(
        'Optimize Largest Contentful Paint: Compress images, use next-gen formats (WebP/AVIF), preload critical resources, or implement lazy loading'
      );
    }

    if (vitals.fid && vitals.fid > THRESHOLDS.fid.good) {
      recommendations.push(
        'Improve First Input Delay: Reduce JavaScript execution time, split large bundles, or use web workers for heavy computations'
      );
    }

    if (vitals.cls && vitals.cls > THRESHOLDS.cls.good) {
      recommendations.push(
        'Fix Cumulative Layout Shift: Set explicit dimensions for images/videos, avoid inserting content above existing content, or reserve space for ads'
      );
    }

    if (vitals.fcp && vitals.fcp > THRESHOLDS.fcp.good) {
      recommendations.push(
        'Optimize First Contentful Paint: Minimize render-blocking resources, optimize critical CSS, or enable text compression'
      );
    }

    if (vitals.ttfb && vitals.ttfb > THRESHOLDS.ttfb.good) {
      recommendations.push(
        'Improve Time to First Byte: Optimize server response times, use a CDN, implement caching, or upgrade hosting'
      );
    }

    return recommendations;
  }

  public generateReport() {
    const grade = this.calculateGrade();
    const recommendations = this.getRecommendations();

    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      vitals: this.vitals,
      grade,
      recommendations,
      performance: {
        navigationTiming: this.getNavigationTiming(),
        resourceTiming: this.getResourceTiming(),
        memoryInfo: this.getMemoryInfo()
      }
    };

    // Track performance data
    trackPerformance();

    return report;
  }

  private getNavigationTiming() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!navigation) return null;

    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      redirectTime: navigation.redirectEnd - navigation.redirectStart,
      dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcpConnect: navigation.connectEnd - navigation.connectStart,
      serverResponse: navigation.responseEnd - navigation.responseStart
    };
  }

  private getResourceTiming() {
    const resources = performance.getEntriesByType('resource');
    return {
      totalResources: resources.length,
      imageCount: resources.filter(r => r.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)).length,
      scriptCount: resources.filter(r => r.name.match(/\.js$/)).length,
      styleCount: resources.filter(r => r.name.match(/\.css$/)).length,
      averageResponseTime: resources.reduce((sum, r) => sum + (r as PerformanceResourceTiming).responseEnd - (r as PerformanceResourceTiming).responseStart, 0) / resources.length
    };
  }

  private getMemoryInfo() {
    if ('memory' in performance) {
      const memory = (performance as Performance & {
        memory?: {
          usedJSMemory: number;
          totalJSMemory: number;
          jsMemoryLimit: number;
        };
      }).memory;
      
      if (memory) {
        return {
          usedJSMemory: memory.usedJSMemory,
          totalJSMemory: memory.totalJSMemory,
          jsMemoryLimit: memory.jsMemoryLimit
        };
      }
    }
    return null;
  }

  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.callbacks = [];
  }
}

// Singleton instance
let monitor: CoreWebVitalsMonitor | null = null;

export const getCoreWebVitalsMonitor = (): CoreWebVitalsMonitor => {
  if (!monitor) {
    monitor = new CoreWebVitalsMonitor();
  }
  return monitor;
};

// Image optimization for better LCP
export const optimizeImages = () => {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add loading="lazy" for non-critical images
    if (!img.hasAttribute('loading') && !img.closest('[data-critical]')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Add decoding="async" for better performance
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
    
    // Set explicit dimensions if missing to prevent CLS
    if (!img.style.width && !img.style.height && !img.hasAttribute('width') && !img.hasAttribute('height')) {
      console.warn('Image missing dimensions, may cause CLS:', img.src);
    }
  });
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/images/hero-bg.jpg',
    '/fonts/primary-font.woff2',
    '/css/critical.css'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    
    if (resource.includes('.jpg') || resource.includes('.png')) {
      link.as = 'image';
    } else if (resource.includes('.woff')) {
      link.as = 'font';
      link.crossOrigin = 'anonymous';
    } else if (resource.includes('.css')) {
      link.as = 'style';
    }
    
    document.head.appendChild(link);
  });
};

// Initialize Core Web Vitals monitoring
export const initCoreWebVitals = () => {
  const monitor = getCoreWebVitalsMonitor();
  
  monitor.onVitalsUpdate((vitals) => {
    console.log('Core Web Vitals updated:', vitals);
    
    // Check for performance issues and log warnings
    const grade = monitor.calculateGrade();
    if (grade.overall === 'poor' || grade.overall === 'needs-improvement') {
      console.warn('Performance issues detected:', {
        grade: grade.overall,
        score: grade.score,
        recommendations: monitor.getRecommendations()
      });
    }
  });

  // Generate performance report after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const report = monitor.generateReport();
      console.log('Core Web Vitals Report:', report);
      
      // Send to analytics if configured
      if (report.grade.overall === 'poor') {
        trackPerformance();
      }
    }, 1000);
  });

  return monitor;
};

// Performance optimization utilities
export const performanceOptimizations = {
  // Defer non-critical JavaScript
  deferNonCriticalJS: () => {
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
      if (!script.hasAttribute('async') && !script.hasAttribute('defer') && !script.hasAttribute('data-critical')) {
        script.setAttribute('defer', '');
      }
    });
  },

  // Minimize main thread blocking
  yieldToMain: async () => {
    return new Promise(resolve => {
      setTimeout(resolve, 0);
    });
  },

  // Optimize font loading
  optimizeFonts: () => {
    const fontLinks = document.querySelectorAll('link[href*="fonts.google"]');
    fontLinks.forEach(link => {
      link.setAttribute('rel', 'preconnect');
    });
  },

  // Reduce layout shifts
  preventLayoutShifts: () => {
    // Reserve space for images without dimensions
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      const imageElement = img as HTMLImageElement;
      imageElement.style.aspectRatio = '16/9'; // Default aspect ratio
    });
  }
};

export default {
  getCoreWebVitalsMonitor,
  initCoreWebVitals,
  optimizeImages,
  preloadCriticalResources,
  performanceOptimizations,
  THRESHOLDS
};
