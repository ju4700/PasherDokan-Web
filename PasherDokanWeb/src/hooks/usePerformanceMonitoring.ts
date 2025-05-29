import { useEffect, useState, useCallback } from 'react';

interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  
  // Custom metrics
  loadTime?: number;
  domContentLoaded?: number;
  networkType?: string;
  connectionSpeed?: string;
  memoryUsage?: number;
}

interface PerformanceState {
  metrics: PerformanceMetrics;
  isLoading: boolean;
  grade: 'excellent' | 'good' | 'needs-improvement' | 'poor';
}

export const usePerformanceMonitoring = () => {
  const [performanceState, setPerformanceState] = useState<PerformanceState>({
    metrics: {},
    isLoading: true,
    grade: 'good',
  });

  // Calculate performance grade based on Core Web Vitals
  const calculateGrade = useCallback((metrics: PerformanceMetrics): PerformanceState['grade'] => {
    const { lcp, fid, cls } = metrics;
    
    let score = 0;
    let totalChecks = 0;

    // LCP scoring (should be <= 2.5s)
    if (lcp !== undefined) {
      totalChecks++;
      if (lcp <= 2500) score++;
      else if (lcp <= 4000) score += 0.5;
    }

    // FID scoring (should be <= 100ms)
    if (fid !== undefined) {
      totalChecks++;
      if (fid <= 100) score++;
      else if (fid <= 300) score += 0.5;
    }

    // CLS scoring (should be <= 0.1)
    if (cls !== undefined) {
      totalChecks++;
      if (cls <= 0.1) score++;
      else if (cls <= 0.25) score += 0.5;
    }

    if (totalChecks === 0) return 'good';

    const percentage = score / totalChecks;
    
    if (percentage >= 0.9) return 'excellent';
    if (percentage >= 0.75) return 'good';
    if (percentage >= 0.5) return 'needs-improvement';
    return 'poor';
  }, []);

  // Measure Core Web Vitals
  useEffect(() => {
    const measureWebVitals = async () => {
      try {
        // Use web-vitals library if available, otherwise manual measurement
        const metrics: PerformanceMetrics = {};

        // Get navigation timing
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          metrics.ttfb = navigation.responseStart - navigation.requestStart;
        }

        // Get connection info
        if ('connection' in navigator) {
          const connection = (navigator as unknown as { connection: { effectiveType: string; downlink?: number } }).connection;
          metrics.networkType = connection.effectiveType;
          metrics.connectionSpeed = connection.downlink ? `${connection.downlink}Mbps` : 'unknown';
        }

        // Get memory usage (Chrome only)
        if ('memory' in performance) {
          const memory = (performance as unknown as { memory: { usedJSHeapSize: number } }).memory;
          metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
        }

        // Measure LCP using PerformanceObserver
        if ('PerformanceObserver' in window) {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            metrics.lcp = lastEntry.startTime;
            
            setPerformanceState(prev => {
              const newMetrics = { ...prev.metrics, ...metrics };
              return {
                metrics: newMetrics,
                isLoading: false,
                grade: calculateGrade(newMetrics),
              };
            });
          });

          try {
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          } catch {
            console.warn('LCP measurement not supported');
          }

          // Measure FID
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              const eventEntry = entry as PerformanceEventTiming;
              metrics.fid = eventEntry.processingStart - entry.startTime;
              
              setPerformanceState(prev => {
                const newMetrics = { ...prev.metrics, ...metrics };
                return {
                  metrics: newMetrics,
                  isLoading: false,
                  grade: calculateGrade(newMetrics),
                };
              });
            });
          });

          try {
            fidObserver.observe({ entryTypes: ['first-input'] });
          } catch {
            console.warn('FID measurement not supported');
          }

          // Measure CLS
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry: PerformanceEntry & { value?: number; hadRecentInput?: boolean }) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value || 0;
                metrics.cls = clsValue;
                
                setPerformanceState(prev => {
                  const newMetrics = { ...prev.metrics, ...metrics };
                  return {
                    metrics: newMetrics,
                    isLoading: false,
                    grade: calculateGrade(newMetrics),
                  };
                });
              }
            });
          });

          try {
            clsObserver.observe({ entryTypes: ['layout-shift'] });
          } catch {
            console.warn('CLS measurement not supported');
          }

          // Measure FCP
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              if (entry.name === 'first-contentful-paint') {
                metrics.fcp = entry.startTime;
                
                setPerformanceState(prev => {
                  const newMetrics = { ...prev.metrics, ...metrics };
                  return {
                    metrics: newMetrics,
                    isLoading: false,
                    grade: calculateGrade(newMetrics),
                  };
                });
              }
            });
          });

          try {
            fcpObserver.observe({ entryTypes: ['paint'] });
          } catch {
            console.warn('FCP measurement not supported');
          }
        }

        // Update state with basic metrics
        setPerformanceState(prev => {
          const newMetrics = { ...prev.metrics, ...metrics };
          return {
            metrics: newMetrics,
            isLoading: false,
            grade: calculateGrade(newMetrics),
          };
        });

      } catch (error) {
        console.error('Performance measurement failed:', error);
        setPerformanceState(prev => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    // Wait for page load to complete
    if (document.readyState === 'complete') {
      measureWebVitals();
    } else {
      window.addEventListener('load', measureWebVitals);
      return () => window.removeEventListener('load', measureWebVitals);
    }
  }, [calculateGrade]);

  // Log performance issues
  useEffect(() => {
    const { metrics, grade } = performanceState;
    
    if (grade === 'poor' || grade === 'needs-improvement') {
      console.warn('Performance issues detected:', {
        grade,
        metrics,
        recommendations: getRecommendations(metrics),
      });
    }
  }, [performanceState]);

  const getRecommendations = (metrics: PerformanceMetrics): string[] => {
    const recommendations: string[] = [];

    if (metrics.lcp && metrics.lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint: Consider image optimization, preloading critical resources, or improving server response times');
    }

    if (metrics.fid && metrics.fid > 100) {
      recommendations.push('Improve First Input Delay: Reduce JavaScript execution time, break up long tasks, or use code splitting');
    }

    if (metrics.cls && metrics.cls > 0.1) {
      recommendations.push('Fix Cumulative Layout Shift: Set explicit dimensions for images and videos, avoid inserting content above existing content');
    }

    if (metrics.ttfb && metrics.ttfb > 800) {
      recommendations.push('Optimize Time to First Byte: Improve server response times, use CDN, or optimize database queries');
    }

    if (metrics.memoryUsage && metrics.memoryUsage > 50) {
      recommendations.push('High memory usage detected: Check for memory leaks, optimize large objects, or implement lazy loading');
    }

    return recommendations;
  };

  const generateReport = useCallback(() => {
    const { metrics, grade } = performanceState;
    
    return {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      grade,
      metrics,
      recommendations: getRecommendations(metrics),
      coreWebVitalsPass: {
        lcp: !metrics.lcp || metrics.lcp <= 2500,
        fid: !metrics.fid || metrics.fid <= 100,
        cls: !metrics.cls || metrics.cls <= 0.1,
      },
    };
  }, [performanceState]);

  return {
    ...performanceState,
    generateReport,
    getRecommendations: () => getRecommendations(performanceState.metrics),
  };
};

export default usePerformanceMonitoring;
