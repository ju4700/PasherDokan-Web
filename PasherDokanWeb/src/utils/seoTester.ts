// SEO Testing and Validation Utilities

interface SEOTestResult {
  test: string;
  passed: boolean;
  message: string;
  recommendation?: string;
}

export class SEOTester {
  private results: SEOTestResult[] = [];

  // Run comprehensive SEO audit
  async runFullAudit(): Promise<SEOTestResult[]> {
    this.results = [];
    
    // Technical SEO tests
    this.testTitle();
    this.testMetaDescription();
    this.testHeadingStructure();
    this.testCanonicalUrl();
    this.testMetaViewport();
    this.testLanguageDeclaration();
    this.testRobotsMeta();
    
    // Content SEO tests
    this.testImageAltText();
    this.testInternalLinks();
    this.testContentLength();
    this.testKeywordDensity();
    
    // Structured data tests
    this.testStructuredData();
    this.testOpenGraphTags();
    this.testTwitterCards();
    
    // Performance SEO tests
    await this.testPageSpeed();
    this.testMobileOptimization();
    
    // Local SEO tests (for Bangladesh market)
    this.testLocalBusinessInfo();
    this.testGeoTargeting();
    
    return this.results;
  }

  private addResult(test: string, passed: boolean, message: string, recommendation?: string) {
    this.results.push({ test, passed, message, recommendation });
  }

  private testTitle() {
    const title = document.title;
    const titleLength = title.length;
    
    if (!title) {
      this.addResult('Title Tag', false, 'Missing title tag', 'Add a descriptive title tag');
    } else if (titleLength < 30) {
      this.addResult('Title Tag', false, `Title too short (${titleLength} chars)`, 'Expand title to 30-60 characters');
    } else if (titleLength > 60) {
      this.addResult('Title Tag', false, `Title too long (${titleLength} chars)`, 'Shorten title to 30-60 characters');
    } else {
      this.addResult('Title Tag', true, `Title length optimal (${titleLength} chars)`);
    }
  }

  private testMetaDescription() {
    const description = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    
    if (!description) {
      this.addResult('Meta Description', false, 'Missing meta description', 'Add a compelling meta description');
      return;
    }
    
    const content = description.content;
    const length = content.length;
    
    if (length < 120) {
      this.addResult('Meta Description', false, `Description too short (${length} chars)`, 'Expand to 120-160 characters');
    } else if (length > 160) {
      this.addResult('Meta Description', false, `Description too long (${length} chars)`, 'Shorten to 120-160 characters');
    } else {
      this.addResult('Meta Description', true, `Description length optimal (${length} chars)`);
    }
  }

  private testHeadingStructure() {
    const h1s = document.querySelectorAll('h1');
    const h2s = document.querySelectorAll('h2');
    const h3s = document.querySelectorAll('h3');
    
    if (h1s.length === 0) {
      this.addResult('H1 Tag', false, 'Missing H1 tag', 'Add exactly one H1 tag per page');
    } else if (h1s.length > 1) {
      this.addResult('H1 Tag', false, `Multiple H1 tags (${h1s.length})`, 'Use only one H1 tag per page');
    } else {
      this.addResult('H1 Tag', true, 'Single H1 tag found');
    }
    
    this.addResult('Heading Hierarchy', true, `H1: ${h1s.length}, H2: ${h2s.length}, H3: ${h3s.length}`);
  }

  private testCanonicalUrl() {
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonical) {
      this.addResult('Canonical URL', false, 'Missing canonical URL', 'Add canonical link tag');
    } else {
      const href = canonical.href;
      if (href === window.location.href.split('#')[0]) {
        this.addResult('Canonical URL', true, 'Canonical URL matches current page');
      } else {
        this.addResult('Canonical URL', false, 'Canonical URL mismatch', 'Ensure canonical matches current page');
      }
    }
  }

  private testMetaViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    
    if (!viewport) {
      this.addResult('Viewport Meta', false, 'Missing viewport meta tag', 'Add viewport meta for mobile optimization');
    } else {
      this.addResult('Viewport Meta', true, 'Viewport meta tag present');
    }
  }

  private testLanguageDeclaration() {
    const htmlLang = document.documentElement.lang;
    
    if (!htmlLang) {
      this.addResult('Language Declaration', false, 'Missing language declaration', 'Add lang attribute to HTML tag');
    } else {
      this.addResult('Language Declaration', true, `Language set to: ${htmlLang}`);
    }
  }

  private testRobotsMeta() {
    const robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    
    if (robots) {
      const content = robots.content.toLowerCase();
      if (content.includes('noindex')) {
        this.addResult('Robots Meta', false, 'Page set to noindex', 'Remove noindex for public pages');
      } else {
        this.addResult('Robots Meta', true, `Robots directive: ${content}`);
      }
    } else {
      this.addResult('Robots Meta', true, 'No robots restrictions (default indexable)');
    }
  }

  private testImageAltText() {
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
    
    if (imagesWithoutAlt.length > 0) {
      this.addResult('Image Alt Text', false, 
        `${imagesWithoutAlt.length} images missing alt text`, 
        'Add descriptive alt text to all images');
    } else {
      this.addResult('Image Alt Text', true, 'All images have alt text');
    }
  }

  private testInternalLinks() {
    const links = document.querySelectorAll('a[href]');
    const internalLinks = Array.from(links).filter(link => {
      const href = (link as HTMLAnchorElement).href;
      return href.includes(window.location.hostname) || href.startsWith('#') || href.startsWith('/');
    });
    
    this.addResult('Internal Links', true, `${internalLinks.length} internal links found`);
  }

  private testContentLength() {
    const content = document.body.textContent || '';
    const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
    
    if (wordCount < 300) {
      this.addResult('Content Length', false, 
        `Content too short (${wordCount} words)`, 
        'Aim for at least 300 words for better SEO');
    } else {
      this.addResult('Content Length', true, `Content length good (${wordCount} words)`);
    }
  }

  private testKeywordDensity() {
    const content = (document.body.textContent || '').toLowerCase();
    const targetKeywords = ['pasherdokan', 'bangladesh', 'sme', 'digital', 'ecommerce', 'local business'];
    
    const keywordCounts = targetKeywords.map(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = content.match(regex);
      return { keyword, count: matches ? matches.length : 0 };
    });
    
    const totalWords = content.split(/\s+/).length;
    const hasGoodKeywordDensity = keywordCounts.some(kw => {
      const density = (kw.count / totalWords) * 100;
      return density >= 0.5 && density <= 3;
    });
    
    this.addResult('Keyword Density', hasGoodKeywordDensity, 
      `Target keywords present: ${keywordCounts.filter(kw => kw.count > 0).length}`);
  }

  private testStructuredData() {
    const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]');
    
    if (structuredDataScripts.length === 0) {
      this.addResult('Structured Data', false, 'No structured data found', 'Add JSON-LD structured data');
    } else {
      this.addResult('Structured Data', true, `${structuredDataScripts.length} structured data blocks found`);
      
      // Validate JSON-LD syntax
      structuredDataScripts.forEach((script, index) => {
        try {
          JSON.parse(script.textContent || '');
          this.addResult(`Structured Data ${index + 1}`, true, 'Valid JSON-LD syntax');
        } catch {
          this.addResult(`Structured Data ${index + 1}`, false, 'Invalid JSON-LD syntax', 'Fix JSON syntax errors');
        }
      });
    }
  }

  private testOpenGraphTags() {
    const ogTags = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'];
    const missingTags = ogTags.filter(tag => !document.querySelector(`meta[property="${tag}"]`));
    
    if (missingTags.length > 0) {
      this.addResult('Open Graph Tags', false, 
        `Missing tags: ${missingTags.join(', ')}`, 
        'Add missing Open Graph meta tags');
    } else {
      this.addResult('Open Graph Tags', true, 'All essential OG tags present');
    }
  }

  private testTwitterCards() {
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    
    if (!twitterCard) {
      this.addResult('Twitter Cards', false, 'Missing Twitter Card tags', 'Add Twitter Card meta tags');
    } else {
      this.addResult('Twitter Cards', true, 'Twitter Card tags present');
      
      // Validate individual Twitter tags
      if (!twitterTitle) {
        this.addResult('Twitter Title', false, 'Missing Twitter title', 'Add twitter:title meta tag');
      }
      if (!twitterDescription) {
        this.addResult('Twitter Description', false, 'Missing Twitter description', 'Add twitter:description meta tag');
      }
    }
  }

  private async testPageSpeed() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      if (loadTime > 3000) {
        this.addResult('Page Speed', false, 
          `Page load time: ${Math.round(loadTime)}ms`, 
          'Optimize images and code for faster loading');
      } else {
        this.addResult('Page Speed', true, `Page load time: ${Math.round(loadTime)}ms`);
      }
    }
  }

  private testMobileOptimization() {
    const viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    const isMobileOptimized = viewport && viewport.content.includes('width=device-width');
    
    this.addResult('Mobile Optimization', isMobileOptimized, 
      isMobileOptimized ? 'Mobile viewport configured' : 'Mobile viewport not optimized',
      isMobileOptimized ? undefined : 'Add responsive viewport meta tag');
  }

  private testLocalBusinessInfo() {
    const content = document.body.textContent?.toLowerCase() || '';
    const hasLocationInfo = content.includes('bangladesh') || content.includes('chattogram') || content.includes('dhaka');
    const hasBusinessInfo = content.includes('phone') || content.includes('address') || content.includes('contact');
    
    this.addResult('Local Business Info', hasLocationInfo && hasBusinessInfo, 
      `Location info: ${hasLocationInfo}, Business info: ${hasBusinessInfo}`,
      'Ensure location and contact information is prominent');
  }

  private testGeoTargeting() {
    const geoTags = [
      'geo.region',
      'geo.placename',
      'geo.position'
    ];
    
    const hasGeoTags = geoTags.some(tag => document.querySelector(`meta[name="${tag}"]`));
    
    this.addResult('Geo-targeting', hasGeoTags, 
      hasGeoTags ? 'Geo-targeting meta tags present' : 'No geo-targeting meta tags',
      hasGeoTags ? undefined : 'Add geo-targeting meta tags for local SEO');
  }

  // Generate SEO report
  generateReport(): string {
    const passedTests = this.results.filter(r => r.passed).length;
    const totalTests = this.results.length;
    const score = Math.round((passedTests / totalTests) * 100);
    
    let report = `\n🔍 SEO AUDIT REPORT\n`;
    report += `📊 Score: ${score}/100 (${passedTests}/${totalTests} tests passed)\n\n`;
    
    // Group results by status
    const failed = this.results.filter(r => !r.passed);
    const passed = this.results.filter(r => r.passed);
    
    if (failed.length > 0) {
      report += `❌ ISSUES TO FIX:\n`;
      failed.forEach(result => {
        report += `   • ${result.test}: ${result.message}\n`;
        if (result.recommendation) {
          report += `     💡 ${result.recommendation}\n`;
        }
      });
      report += `\n`;
    }
    
    report += `✅ PASSING TESTS:\n`;
    passed.forEach(result => {
      report += `   • ${result.test}: ${result.message}\n`;
    });
    
    return report;
  }
}

// Automated SEO monitoring
export const startSEOMonitoring = () => {
  const tester = new SEOTester();
  
  // Run audit on page load
  window.addEventListener('load', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for dynamic content
    const results = await tester.runFullAudit();
    console.log(tester.generateReport());
    
    // Store results for analytics
    const score = Math.round((results.filter(r => r.passed).length / results.length) * 100);
    if (window.gtag) {
      window.gtag('event', 'seo_audit_completed', {
        seo_score: score,
        total_tests: results.length,
        passed_tests: results.filter(r => r.passed).length
      });
    }
  });
};

export default SEOTester;
