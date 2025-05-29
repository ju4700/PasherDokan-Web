import { useEffect, useRef, useState } from 'react';

interface A11yOptions {
  announcePageChanges?: boolean;
  highContrast?: boolean;
  reducedMotion?: boolean;
  focusManagement?: boolean;
}

interface A11yState {
  isHighContrast: boolean;
  isReducedMotion: boolean;
  screenReaderEnabled: boolean;
  keyboardNavigation: boolean;
}

export const useA11y = (options: A11yOptions = {}) => {
  const [a11yState, setA11yState] = useState<A11yState>({
    isHighContrast: false,
    isReducedMotion: false,
    screenReaderEnabled: false,
    keyboardNavigation: false,
  });

  const announceRef = useRef<HTMLDivElement | null>(null);

  // Check for accessibility preferences
  useEffect(() => {
    const checkAccessibilityPreferences = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
      
      setA11yState(prev => ({
        ...prev,
        isReducedMotion: prefersReducedMotion,
        isHighContrast: prefersHighContrast,
      }));
    };

    checkAccessibilityPreferences();

    // Listen for changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setA11yState(prev => ({ ...prev, isReducedMotion: e.matches }));
    };

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setA11yState(prev => ({ ...prev, isHighContrast: e.matches }));
    };

    motionQuery.addEventListener('change', handleMotionChange);
    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  // Detect screen reader usage
  useEffect(() => {
    const detectScreenReader = () => {
      // Check for common screen reader indicators
      const hasScreenReader = !!(
        window.navigator.userAgent.includes('NVDA') ||
        window.navigator.userAgent.includes('JAWS') ||
        window.speechSynthesis ||
        document.querySelector('[aria-live]')
      );
      
      setA11yState(prev => ({ ...prev, screenReaderEnabled: hasScreenReader }));
    };

    detectScreenReader();
  }, []);

  // Detect keyboard navigation
  useEffect(() => {
    let isUsingKeyboard = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        isUsingKeyboard = true;
        setA11yState(prev => ({ ...prev, keyboardNavigation: true }));
      }
    };

    const handleMouseDown = () => {
      if (isUsingKeyboard) {
        isUsingKeyboard = false;
        setA11yState(prev => ({ ...prev, keyboardNavigation: false }));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Create announcement element for screen readers
  useEffect(() => {
    if (options.announcePageChanges) {
      const announceElement = document.createElement('div');
      announceElement.setAttribute('aria-live', 'polite');
      announceElement.setAttribute('aria-atomic', 'true');
      announceElement.className = 'sr-only';
      announceElement.id = 'a11y-announcer';
      
      document.body.appendChild(announceElement);
      announceRef.current = announceElement;

      return () => {
        if (announceRef.current) {
          document.body.removeChild(announceRef.current);
        }
      };
    }
  }, [options.announcePageChanges]);

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announceRef.current) {
      announceRef.current.setAttribute('aria-live', priority);
      announceRef.current.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = '';
        }
      }, 1000);
    }
  };

  const announcePageChange = (pageName: string) => {
    announce(`Navigated to ${pageName} page`);
  };

  const announceAction = (action: string) => {
    announce(action, 'assertive');
  };

  const getMotionPreference = () => {
    return a11yState.isReducedMotion ? 'reduce' : 'no-preference';
  };

  const getFocusRingStyles = () => {
    return a11yState.keyboardNavigation
      ? 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
      : 'focus:outline-none';
  };

  const getHighContrastStyles = () => {
    return a11yState.isHighContrast
      ? 'high-contrast:border-2 high-contrast:border-black'
      : '';
  };

  return {
    ...a11yState,
    announce,
    announcePageChange,
    announceAction,
    getMotionPreference,
    getFocusRingStyles,
    getHighContrastStyles,
  };
};

export default useA11y;
