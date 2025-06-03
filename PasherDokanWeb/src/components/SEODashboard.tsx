// Real-time SEO monitoring dashboard component
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  Monitor,
  BarChart3
} from 'lucide-react';
import { getCoreWebVitalsMonitor, CoreWebVitals, PerformanceGrade } from '../utils/coreWebVitals';
import SEOTester from '../utils/seoTester';

interface SEOTestResult {
  test: string;
  passed: boolean;
  message: string;
  recommendation?: string;
  name?: string;
  description?: string;
  impact?: 'high' | 'medium' | 'low';
}

interface SEODashboardProps {
  isVisible: boolean;
  onClose: () => void;
}

const SEODashboard: React.FC<SEODashboardProps> = ({ isVisible, onClose }) => {
  const [seoResults, setSeoResults] = useState<SEOTestResult[]>([]);
  const [coreVitals, setCoreVitals] = useState<CoreWebVitals>({});
  const [performanceGrade, setPerformanceGrade] = useState<PerformanceGrade | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Monitor Core Web Vitals
  useEffect(() => {
    if (!isVisible) return;

    const monitor = getCoreWebVitalsMonitor();
    
    monitor.onVitalsUpdate((vitals) => {
      setCoreVitals(vitals);
      setPerformanceGrade(monitor.calculateGrade());
    });

    // Initial values
    setCoreVitals(monitor.getVitals());
    setPerformanceGrade(monitor.calculateGrade());
  }, [isVisible]);

  // Run SEO tests
  const runTests = async () => {
    setIsLoading(true);
    try {
      const tester = new SEOTester();
      const results = await tester.runFullAudit();
      setSeoResults(results);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('SEO tests failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!isVisible) return;

    runTests(); // Initial run
    const interval = setInterval(runTests, 30000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-green-600 bg-green-100';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (passed: boolean) => {
    return passed ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-600" />
    );
  };

  const criticalTests = seoResults.filter(test => test.impact === 'high' && !test.passed);
  const warningTests = seoResults.filter(test => test.impact === 'medium' && !test.passed);
  const passedTests = seoResults.filter(test => test.passed);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                SEO Dashboard
              </h2>
              <p className="text-primary-100 mt-1">
                Real-time SEO monitoring for PasherDokan
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-primary-200 transition-colors"
              aria-label="Close dashboard"
            >
              <XCircle className="w-8 h-8" />
            </button>
          </div>

          {/* Status Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                <span className="font-medium">SEO Score</span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {seoResults.length > 0 ? Math.round((passedTests.length / seoResults.length) * 100) : '--'}%
              </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                <span className="font-medium">Performance</span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {performanceGrade ? Math.round(performanceGrade.score) : '--'}%
              </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Issues</span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {criticalTests.length + warningTests.length}
              </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Last Updated</span>
              </div>
              <div className="text-sm mt-1">
                {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Core Web Vitals */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Core Web Vitals
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Largest Contentful Paint</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {coreVitals.lcp ? `${Math.round(coreVitals.lcp)}ms` : '--'}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(performanceGrade?.lcp || 'poor')}`}>
                      {performanceGrade?.lcp || '--'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">First Input Delay</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {coreVitals.fid ? `${Math.round(coreVitals.fid)}ms` : '--'}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(performanceGrade?.fid || 'poor')}`}>
                      {performanceGrade?.fid || '--'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Cumulative Layout Shift</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {coreVitals.cls ? coreVitals.cls.toFixed(3) : '--'}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(performanceGrade?.cls || 'poor')}`}>
                      {performanceGrade?.cls || '--'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Time to First Byte</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {coreVitals.ttfb ? `${Math.round(coreVitals.ttfb)}ms` : '--'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Tests Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5" />
                SEO Health Check
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Passed Tests</span>
                  <span className="text-green-600 font-bold">{passedTests.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Critical Issues</span>
                  <span className="text-red-600 font-bold">{criticalTests.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Warnings</span>
                  <span className="text-yellow-600 font-bold">{warningTests.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Tests</span>
                  <span className="text-gray-600 font-bold">{seoResults.length}</span>
                </div>
              </div>

              <button
                onClick={runTests}
                disabled={isLoading}
                className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Running Tests...' : 'Refresh Tests'}
              </button>
            </div>
          </div>

          {/* Critical Issues */}
          {criticalTests.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Critical Issues ({criticalTests.length})
              </h3>
              <div className="space-y-3">
                {criticalTests.map((test, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(test.passed)}
                      <div className="flex-1">
                        <h4 className="font-medium text-red-900">{test.name}</h4>
                        <p className="text-sm text-red-700 mt-1">{test.description}</p>
                        {test.recommendation && (
                          <p className="text-sm text-red-600 mt-2 font-medium">
                            Recommendation: {test.recommendation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {warningTests.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-yellow-600 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Warnings ({warningTests.length})
              </h3>
              <div className="space-y-3">
                {warningTests.map((test, index) => (
                  <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(test.passed)}
                      <div className="flex-1">
                        <h4 className="font-medium text-yellow-900">{test.name}</h4>
                        <p className="text-sm text-yellow-700 mt-1">{test.description}</p>
                        {test.recommendation && (
                          <p className="text-sm text-yellow-600 mt-2 font-medium">
                            Recommendation: {test.recommendation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Passed Tests (collapsed by default) */}
          {passedTests.length > 0 && (
            <details className="mt-6">
              <summary className="text-lg font-semibold text-green-600 cursor-pointer flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Passed Tests ({passedTests.length})
              </summary>
              <div className="mt-4 space-y-2">
                {passedTests.map((test, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(test.passed)}
                      <span className="font-medium text-green-900">{test.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};

// Developer tools component for easy access
export const SEODevTools: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show dashboard with keyboard shortcut (Ctrl+Shift+S)
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        setIsVisible(true);
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);

  return (
    <>
      {/* Development mode indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-40">
          <button
            onClick={() => setIsVisible(true)}
            className="bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors group"
            title="Open SEO Dashboard (Ctrl+Shift+S)"
          >
            <BarChart3 className="w-5 h-5" />
            <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              SEO Dashboard
            </span>
          </button>
        </div>
      )}

      <SEODashboard isVisible={isVisible} onClose={() => setIsVisible(false)} />
    </>
  );
};

export default SEODashboard;
