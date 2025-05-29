import React, { createContext, useContext, useEffect, useState } from 'react';
import { useA11y } from '../hooks/useA11y';

interface AccessibilityContextType {
  isHighContrast: boolean;
  isReducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  keyboardNavigation: boolean;
  screenReaderEnabled: boolean;
  skipToMain: () => void;
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highContrastOverride, setHighContrastOverride] = useState(false);
  
  const {
    isHighContrast: systemHighContrast,
    isReducedMotion,
    screenReaderEnabled,
    keyboardNavigation,
    announce,
  } = useA11y({ announcePageChanges: true });

  const isHighContrast = highContrastOverride || systemHighContrast;

  // Load accessibility preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('a11y-preferences');
    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        if (prefs.fontSize) setFontSize(prefs.fontSize);
        if (prefs.highContrast) setHighContrastOverride(prefs.highContrast);
      } catch (error) {
        console.warn('Failed to load accessibility preferences:', error);
      }
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    const preferences = {
      fontSize,
      highContrast: highContrastOverride,
    };
    localStorage.setItem('a11y-preferences', JSON.stringify(preferences));
  }, [fontSize, highContrastOverride]);

  // Apply font size to document
  useEffect(() => {
    const root = document.documentElement;
    switch (fontSize) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
      default:
        root.style.fontSize = '16px';
    }
  }, [fontSize]);

  // Apply high contrast mode
  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  // Skip to main content functionality
  const skipToMain = () => {
    const mainElement = document.getElementById('main-content') || document.querySelector('main');
    if (mainElement) {
      mainElement.focus();
      mainElement.scrollIntoView({ behavior: 'smooth' });
      announce('Skipped to main content');
    }
  };

  const toggleHighContrast = () => {
    setHighContrastOverride(prev => !prev);
    announce(`High contrast mode ${!highContrastOverride ? 'enabled' : 'disabled'}`);
  };

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
    announce(`Font size changed to ${size}`);
  };

  const value: AccessibilityContextType = {
    isHighContrast,
    isReducedMotion,
    fontSize,
    keyboardNavigation,
    screenReaderEnabled,
    skipToMain,
    announce,
    setFontSize: handleFontSizeChange,
    toggleHighContrast,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export default AccessibilityProvider;
