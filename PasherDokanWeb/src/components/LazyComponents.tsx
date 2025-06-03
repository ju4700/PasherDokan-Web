import { lazy } from 'react';

// Lazy load non-critical components for better performance
export const LazyTeam = lazy(() => import('./Team'));
export const LazyVisionStatement = lazy(() => import('./VisionStatement'));
export const LazyFAQ = lazy(() => import('./FAQ'));
export const LazyAccessibilityToolbar = lazy(() => import('./AccessibilityToolbar'));
export const LazyPWAInstallPrompt = lazy(() => import('./PWAInstallPrompt'));