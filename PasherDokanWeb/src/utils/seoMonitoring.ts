// Automated SEO monitoring and alerting system
import { SEO_CONFIG } from '../config/seo';
import { trackEvent } from './analytics';

interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  element?: string;
  value?: string | number;
  recommendation?: string;
}

interface SEOReport {
  timestamp: Date;
  url: string;
  issues: SEOIssue[];
  score: number;
  performance: {
    lcp: number;
    fid: number;
    cls: number;
    fcp: number;
    ttfb: number;
  };
  accessibility: {
    score: number;
    issues: string[];
  };
  social: {
    shares: number;
    engagement: number;
  };
}

class SEOMonitor {
  private intervalId: NodeJS.Timeout | null = null;
  private reports: SEOReport[] = [];
  private observers: Map<string, PerformanceObserver> = new Map();

  constructor() {
    this.initializeMonitoring();
  }

  // Initialize continuous SEO monitoring
  initializeMonitoring() {
    // Monitor Core Web Vitals
    this.monitorWebVitals();
    
    // Monitor DOM changes that affect SEO
    this.monitorDOMChanges();
    
    // Run periodic SEO audits
    this.startPeriodicAudits();
    
    // Monitor accessibility
    this.monitorAccessibility();
    
    // Monitor social signals
    this.monitorSocialSignals();
  }

  // Monitor Core Web Vitals in real-time
  private monitorWebVitals() {
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const lcp = entry.startTime;
        if (lcp > SEO_CONFIG.technical.performance.lcp) {
          this.reportIssue({
            type: 'warning',
            category: 'Performance',
            message: `LCP is ${Math.round(lcp)}ms, should be under ${SEO_CONFIG.technical.performance.lcp}ms`,
            value: lcp,
            recommendation: 'Optimize images, reduce server response time, or preload critical resources'
          });
        }
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.set('lcp', lcpObserver);

    // First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fid = (entry as PerformanceEventTiming).processingStart - entry.startTime;
        if (fid > SEO_CONFIG.technical.performance.fid) {
          this.reportIssue({
            type: 'warning',
            category: 'Performance',
            message: `FID is ${Math.round(fid)}ms, should be under ${SEO_CONFIG.technical.performance.fid}ms`,
            value: fid,
            recommendation: 'Reduce JavaScript execution time or break up long tasks'
          });
        }
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
    this.observers.set('fid', fidObserver);

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShiftEntry = entry as PerformanceEntry & { 
          hadRecentInput?: boolean; 
          value?: number; 
        };
        if (!layoutShiftEntry.hadRecentInput && layoutShiftEntry.value) {
          clsValue += layoutShiftEntry.value;
        }
      }
      
      if (clsValue > SEO_CONFIG.technical.performance.cls) {
        this.reportIssue({
          type: 'warning',
          category: 'Performance',
          message: `CLS is ${clsValue.toFixed(3)}, should be under ${SEO_CONFIG.technical.performance.cls}`,
          value: clsValue,
          recommendation: 'Set explicit dimensions for images and videos, avoid inserting content above existing content'
        });
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    this.observers.set('cls', clsObserver);
  }

  // Monitor DOM changes that affect SEO
  private monitorDOMChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check for missing alt attributes on new images
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              const images = element.tagName === 'IMG' ? [element] : element.querySelectorAll('img');
              
              images.forEach((img) => {
                const imageElement = img as HTMLImageElement;
                if (!imageElement.getAttribute('alt')) {
                  this.reportIssue({
                    type: 'error',
                    category: 'Accessibility',
                    message: 'Image missing alt attribute',
                    element: imageElement.src || 'Unknown image',
                    recommendation: 'Add descriptive alt text for all images'
                  });
                }
              });
            }
          });
        }
        
        // Monitor title changes
        if (mutation.type === 'childList' && mutation.target === document.head) {
          const title = document.title;
          if (title.length < SEO_CONFIG.content.titleLength.min || 
              title.length > SEO_CONFIG.content.titleLength.max) {
            this.reportIssue({
              type: 'warning',
              category: 'SEO',
              message: `Title length is ${title.length} characters, should be ${SEO_CONFIG.content.titleLength.min}-${SEO_CONFIG.content.titleLength.max}`,
              value: title.length,
              recommendation: 'Optimize title length for better search engine visibility'
            });
          }
        }
      });
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['alt', 'title', 'href']
    });
  }

  // Run periodic comprehensive SEO audits
  private startPeriodicAudits() {
    this.intervalId = setInterval(() => {
      this.runFullAudit();
    }, 60000); // Run every minute
  }

  // Monitor accessibility issues
  private monitorAccessibility() {
    const checkAccessibility = () => {
      const issues: string[] = [];
      
      // Check for missing main landmark
      if (!document.querySelector('main')) {
        issues.push('Missing main landmark');
      }
      
      // Check for missing skip links
      if (!document.querySelector('a[href="#main-content"]')) {
        issues.push('Missing skip to main content link');
      }
      
      // Check for proper heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let previousLevel = 0;
      let hasH1 = false;
      
      headings.forEach((heading) => {
        const level = parseInt(heading.tagName[1]);
        if (level === 1) hasH1 = true;
        
        if (level > previousLevel + 1) {
          issues.push(`Heading hierarchy skip from h${previousLevel} to h${level}`);
        }
        previousLevel = level;
      });
      
      if (!hasH1) {
        issues.push('Missing H1 heading');
      }
      
      // Check for images without alt text
      const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
      if (imagesWithoutAlt.length > 0) {
        issues.push(`${imagesWithoutAlt.length} images missing alt text`);
      }
      
      if (issues.length > 0) {
        issues.forEach(issue => {
          this.reportIssue({
            type: 'warning',
            category: 'Accessibility',
            message: issue,
            recommendation: 'Fix accessibility issues to improve user experience and SEO'
          });
        });
      }
    };
    
    // Check on page load and periodically
    if (document.readyState === 'complete') {
      checkAccessibility();
    } else {
      window.addEventListener('load', checkAccessibility);
    }
  }

  // Monitor social sharing signals
  private monitorSocialSignals() {
    // Track social share button clicks
    document.addEventListener('click', (event) => {
      const target = event.target as Element;
      if (target.closest('[data-social-share]')) {
        const platform = target.getAttribute('data-platform') || 'unknown';
        trackEvent('social_share_click', {
          platform,
          url: window.location.href,
          timestamp: new Date().toISOString()
        });
      }
    });
    
    // Monitor external social traffic
    const referrer = document.referrer;
    const socialReferrers = ['facebook.com', 'twitter.com', 'linkedin.com', 'instagram.com'];
    
    if (socialReferrers.some(social => referrer.includes(social))) {
      trackEvent('social_referral_visit', {
        source: referrer,
        url: window.location.href
      });
    }
  }

  // Run comprehensive SEO audit
  private runFullAudit(): SEOReport {
    const issues: SEOIssue[] = [];
    const url = window.location.href;
    
    // Check meta tags
    this.auditMetaTags(issues);
    
    // Check structured data
    this.auditStructuredData(issues);
    
    // Check internal linking
    this.auditInternalLinks(issues);
    
    // Check image optimization
    this.auditImages(issues);
    
    // Check content quality
    this.auditContent(issues);
    
    // Generate performance metrics
    const performance = this.getPerformanceMetrics();
    
    // Calculate SEO score
    const score = this.calculateSEOScore(issues);
    
    const report: SEOReport = {
      timestamp: new Date(),
      url,
      issues,
      score,
      performance,
      accessibility: {
        score: 0, // Would be calculated by accessibility audit
        issues: []
      },
      social: {
        shares: 0, // Would be fetched from social APIs
        engagement: 0
      }
    };
    
    this.reports.push(report);
    
    // Send alerts for critical issues
    this.sendAlerts(report);
    
    return report;
  }

  // Audit meta tags
  private auditMetaTags(issues: SEOIssue[]) {
    const title = document.title;
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    
    if (!title) {
      issues.push({
        type: 'error',
        category: 'SEO',
        message: 'Missing page title',
        recommendation: 'Add a descriptive title to improve search rankings'
      });
    } else if (title.length < SEO_CONFIG.content.titleLength.min || 
               title.length > SEO_CONFIG.content.titleLength.max) {
      issues.push({
        type: 'warning',
        category: 'SEO',
        message: `Title length is ${title.length} characters`,
        value: title.length,
        recommendation: `Keep title between ${SEO_CONFIG.content.titleLength.min}-${SEO_CONFIG.content.titleLength.max} characters`
      });
    }
    
    if (!description) {
      issues.push({
        type: 'error',
        category: 'SEO',
        message: 'Missing meta description',
        recommendation: 'Add a compelling meta description to improve click-through rates'
      });
    } else if (description.length < SEO_CONFIG.content.descriptionLength.min || 
               description.length > SEO_CONFIG.content.descriptionLength.max) {
      issues.push({
        type: 'warning',
        category: 'SEO',
        message: `Meta description length is ${description.length} characters`,
        value: description.length,
        recommendation: `Keep description between ${SEO_CONFIG.content.descriptionLength.min}-${SEO_CONFIG.content.descriptionLength.max} characters`
      });
    }
    
    if (!canonical) {
      issues.push({
        type: 'warning',
        category: 'SEO',
        message: 'Missing canonical URL',
        recommendation: 'Add canonical URL to prevent duplicate content issues'
      });
    }
  }

  // Audit structured data
  private auditStructuredData(issues: SEOIssue[]) {
    const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]');
    
    if (structuredDataScripts.length === 0) {
      issues.push({
        type: 'warning',
        category: 'SEO',
        message: 'No structured data found',
        recommendation: 'Add structured data to help search engines understand your content'
      });
      return;
    }
    
    structuredDataScripts.forEach((script, index) => {
      try {
        const data = JSON.parse(script.textContent || '{}');
        if (!data['@context'] || !data['@type']) {
          issues.push({
            type: 'error',
            category: 'SEO',
            message: `Invalid structured data format in script ${index + 1}`,
            recommendation: 'Ensure structured data follows schema.org format'
          });
        }
      } catch {
        issues.push({
          type: 'error',
          category: 'SEO',
          message: `Invalid JSON in structured data script ${index + 1}`,
          recommendation: 'Fix JSON syntax errors in structured data'
        });
      }
    });
  }

  // Audit internal links
  private auditInternalLinks(issues: SEOIssue[]) {
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="#"], a[href*="pasherdokan.shop"]');
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="pasherdokan.shop"])');
    
    if (internalLinks.length < SEO_CONFIG.content.internalLinkCount.min) {
      issues.push({
        type: 'warning',
        category: 'SEO',
        message: `Only ${internalLinks.length} internal links found`,
        value: internalLinks.length,
        recommendation: `Add at least ${SEO_CONFIG.content.internalLinkCount.min} internal links to improve site navigation`
      });
    }
    
    if (externalLinks.length > SEO_CONFIG.content.externalLinkCount.max) {
      issues.push({
        type: 'info',
        category: 'SEO',
        message: `${externalLinks.length} external links found`,
        value: externalLinks.length,
        recommendation: 'Consider if all external links are necessary'
      });
    }
    
    // Check for broken internal links
    internalLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (!target) {
          issues.push({
            type: 'error',
            category: 'SEO',
            message: `Broken internal anchor link: ${href}`,
            element: href,
            recommendation: 'Fix broken internal links to improve user experience'
          });
        }
      }
    });
  }

  // Audit images
  private auditImages(issues: SEOIssue[]) {
    const images = document.querySelectorAll('img');
    let imagesWithoutAlt = 0;
    let oversizedImages = 0;
    
    images.forEach((img) => {
      if (!img.getAttribute('alt')) {
        imagesWithoutAlt++;
      }
      
      // Check image size (if possible)
      if (img.naturalWidth && img.naturalHeight) {
        const imageSize = img.naturalWidth * img.naturalHeight;
        if (imageSize > 1920 * 1080) { // Larger than Full HD
          oversizedImages++;
        }
      }
    });
    
    if (imagesWithoutAlt > 0) {
      issues.push({
        type: 'error',
        category: 'Accessibility',
        message: `${imagesWithoutAlt} images missing alt text`,
        value: imagesWithoutAlt,
        recommendation: 'Add descriptive alt text to all images'
      });
    }
    
    if (oversizedImages > 0) {
      issues.push({
        type: 'warning',
        category: 'Performance',
        message: `${oversizedImages} images may be oversized`,
        value: oversizedImages,
        recommendation: 'Optimize image sizes to improve loading performance'
      });
    }
  }

  // Audit content quality
  private auditContent(issues: SEOIssue[]) {
    const textContent = document.body.textContent || '';
    const wordCount = textContent.split(/\s+/).length;
    
    if (wordCount < 300) {
      issues.push({
        type: 'warning',
        category: 'SEO',
        message: `Page has only ${wordCount} words`,
        value: wordCount,
        recommendation: 'Add more content to improve search rankings'
      });
    }
    
    // Check for duplicate content (simple check)
    const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent);
    const duplicateHeadings = headings.filter((heading, index) => headings.indexOf(heading) !== index);
    
    if (duplicateHeadings.length > 0) {
      issues.push({
        type: 'warning',
        category: 'SEO',
        message: `${duplicateHeadings.length} duplicate headings found`,
        value: duplicateHeadings.length,
        recommendation: 'Use unique headings to improve content structure'
      });
    }
  }

  // Get current performance metrics
  private getPerformanceMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      lcp: this.getLCPValue(),
      fid: this.getFIDValue(),
      cls: this.getCLSValue(),
      fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      ttfb: navigation.responseStart - navigation.requestStart
    };
  }

  // Helper methods for performance metrics
  private getLCPValue(): number {
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    return lcpEntries.length > 0 ? lcpEntries[lcpEntries.length - 1].startTime : 0;
  }

  private getFIDValue(): number {
    const fidEntries = performance.getEntriesByType('first-input');
    if (fidEntries.length > 0) {
      const fidEntry = fidEntries[0] as PerformanceEventTiming;
      return fidEntry.processingStart - fidEntry.startTime;
    }
    return 0;
  }

  private getCLSValue(): number {
    let clsValue = 0;
    const clsEntries = performance.getEntriesByType('layout-shift');
    clsEntries.forEach((entry) => {
      const layoutShiftEntry = entry as PerformanceEntry & { 
        hadRecentInput?: boolean; 
        value?: number; 
      };
      if (!layoutShiftEntry.hadRecentInput && layoutShiftEntry.value) {
        clsValue += layoutShiftEntry.value;
      }
    });
    return clsValue;
  }

  // Calculate overall SEO score
  private calculateSEOScore(issues: SEOIssue[]): number {
    let score = 100;
    
    issues.forEach((issue) => {
      switch (issue.type) {
        case 'error':
          score -= 10;
          break;
        case 'warning':
          score -= 5;
          break;
        case 'info':
          score -= 1;
          break;
      }
    });
    
    return Math.max(0, score);
  }

  // Report individual issue
  private reportIssue(issue: SEOIssue) {
    console.warn(`SEO ${issue.type.toUpperCase()}: ${issue.message}`, issue);
    
    trackEvent('seo_issue_detected', {
      type: issue.type,
      category: issue.category,
      message: issue.message,
      element: issue.element,
      value: issue.value
    });
  }

  // Send alerts for critical issues
  private sendAlerts(report: SEOReport) {
    const criticalIssues = report.issues.filter(issue => issue.type === 'error');
    
    if (criticalIssues.length > 0 || report.score < 70) {
      console.error('SEO ALERT: Critical issues detected', {
        score: report.score,
        criticalIssues: criticalIssues.length,
        url: report.url
      });
      
      trackEvent('seo_alert', {
        score: report.score,
        critical_issues: criticalIssues.length,
        warning_issues: report.issues.filter(i => i.type === 'warning').length,
        url: report.url
      });
    }
  }

  // Get latest report
  getLatestReport(): SEOReport | null {
    return this.reports.length > 0 ? this.reports[this.reports.length - 1] : null;
  }

  // Get all reports
  getAllReports(): SEOReport[] {
    return [...this.reports];
  }

  // Stop monitoring
  stopMonitoring() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
  }
}

// Create singleton instance
const seoMonitor = new SEOMonitor();

// Export functions for external use
export const startSEOMonitoring = () => {
  return seoMonitor;
};

export const getSEOReport = () => {
  return seoMonitor.getLatestReport();
};

export const getAllSEOReports = () => {
  return seoMonitor.getAllReports();
};

export const stopSEOMonitoring = () => {
  seoMonitor.stopMonitoring();
};

export default seoMonitor;
