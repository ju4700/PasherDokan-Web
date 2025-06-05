# PasherDokan Website - Technical Documentation 📚

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Component Documentation](#component-documentation)
- [Utility Functions](#utility-functions)
- [Hooks Reference](#hooks-reference)
- [Context Providers](#context-providers)
- [SEO Implementation](#seo-implementation)
- [Performance Optimization](#performance-optimization)
- [Accessibility Features](#accessibility-features)
- [Development Patterns](#development-patterns)

## Architecture Overview

### Tech Stack Decision Matrix

| Technology | Reason | Alternatives Considered |
|------------|--------|------------------------|
| **React 18** | Mature ecosystem, concurrent features | Vue.js, Angular |
| **TypeScript** | Type safety, better DX | JavaScript |
| **Vite** | Fast HMR, modern build tools | Webpack, Parcel |
| **TailwindCSS** | Utility-first, consistency | Styled Components, CSS Modules |
| **Framer Motion** | Smooth animations, performance | React Spring, GSAP |

### Application Architecture

```
┌─────────────────────┐
│     App.tsx         │  ← Main application entry
├─────────────────────┤
│  Context Providers  │  ← Language, Accessibility
├─────────────────────┤
│    Components       │  ← UI Components
├─────────────────────┤
│     Hooks           │  ← Custom logic
├─────────────────────┤
│    Utilities        │  ← Pure functions
└─────────────────────┘
```

## Component Documentation

### Core Components

#### Header Component
**Location**: `src/components/Header.tsx`

**Purpose**: Main navigation with responsive design and language switching

**Props**:
```typescript
interface HeaderProps {
  // No props - uses context for state
}
```

**Features**:
- Responsive navigation menu
- Language toggle (English/Bengali)
- Smooth scroll to sections
- Active section highlighting
- Mobile hamburger menu

**Usage**:
```tsx
import Header from './components/Header';

function App() {
  return <Header />;
}
```

#### Hero Component
**Location**: `src/components/Hero.tsx`

**Purpose**: Landing section with interactive map and call-to-action

**Props**:
```typescript
interface HeroProps {
  // No props - self-contained
}
```

**Features**:
- Interactive Leaflet map with markers
- APK download functionality
- PWA install prompt
- Animated statistics
- Multi-tab content (Shop Owners/Customers)

**Dependencies**:
- `react-leaflet` for map functionality
- `framer-motion` for animations
- `usePWA` hook for installation

#### Features Component
**Location**: `src/components/Features.tsx`

**Purpose**: Showcase platform capabilities with animated cards

**Props**:
```typescript
interface FeaturesProps {
  // No props - uses translation context
}
```

**Features**:
- Grid layout with hover effects
- Icon mapping system
- Responsive design
- Call-to-action section

#### Team Component
**Location**: `src/components/Team.tsx`

**Purpose**: Display team members with filtering and social links

**Props**:
```typescript
interface TeamMember {
  name: string;
  role: string;
  university: string;
  email: string;
  github?: string;
  linkedin?: string;
  image: string;
  bio: string;
  skills?: string[];
}
```

**Features**:
- Dynamic member filtering
- Social media links
- University information
- Animated cards with hover effects

#### FAQ Component
**Location**: `src/components/FAQ.tsx`

**Purpose**: Searchable and filterable frequently asked questions

**Props**:
```typescript
interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
  helpfulLinks?: Array<{
    text: string;
    url: string;
  }>;
}
```

**Features**:
- Search functionality
- Category filtering
- Expandable accordions
- Helpful links in answers

### Utility Components

#### SEO Component
**Location**: `src/components/SEO.tsx`

**Purpose**: Comprehensive SEO meta tag management

**Props**:
```typescript
interface SEOProps {
  seoData?: Partial<SEOData>;
  structuredData?: object;
  children?: React.ReactNode;
}
```

**Features**:
- Meta tag management
- Open Graph tags
- Twitter Cards
- Structured data injection
- Performance tracking integration

#### PWAInstallPrompt Component
**Location**: `src/components/PWAInstallPrompt.tsx`

**Purpose**: Progressive Web App installation prompts

**Features**:
- Install button for supported browsers
- Offline notification system
- Service worker status monitoring

## Utility Functions

### SEO Utilities
**Location**: `src/utils/seo.ts`

#### `generateLocalBusinessStructuredData()`
Generates Schema.org structured data for local business

```typescript
const structuredData = generateLocalBusinessStructuredData();
// Returns: LocalBusiness schema with contact info, location, services
```

#### `generateFAQStructuredData(faqs: FAQItem[])`
Creates FAQ structured data for rich snippets

```typescript
const faqData = generateFAQStructuredData([
  { question: "What is PasherDokan?", answer: "..." }
]);
```

#### `updatePageSEO(seoData: SEOData)`
Updates page meta tags dynamically

```typescript
updatePageSEO({
  title: "New Page Title",
  description: "Page description",
  keywords: ["keyword1", "keyword2"]
});
```

### Analytics Utilities
**Location**: `src/utils/analytics.ts`

#### `initGA(measurementId: string)`
Initialize Google Analytics 4

```typescript
initGA('G-XXXXXXXXXX');
```

#### `trackPerformance()`
Track Core Web Vitals and performance metrics

```typescript
trackPerformance(); // Automatically tracks LCP, FID, CLS
```

#### `trackBusinessEvents(eventName: string, parameters: object)`
Track custom business events

```typescript
trackBusinessEvents('apk_download', {
  source: 'hero_section',
  device_type: 'mobile'
});
```

### Image Utilities
**Location**: `src/utils/images.ts`

#### `optimizeImages()`
Automatically optimize images for performance

```typescript
optimizeImages(); // Applies lazy loading, compression
```

#### `generateResponsiveImageSet(src: string, sizes: number[])`
Generate responsive image sets

```typescript
const imageSet = generateResponsiveImageSet('/image.jpg', [320, 640, 1280]);
```

### Social Sharing Utilities
**Location**: `src/utils/socialSharing.ts`

#### `shareToSocial(platform: string, data: ShareData)`
Share content to social media platforms

```typescript
shareToSocial('twitter', {
  title: "Check out PasherDokan",
  url: "https://pasherdokan.shop",
  hashtags: ["Bangladesh", "SME"]
});
```

## Hooks Reference

### useSEO Hook
**Location**: `src/hooks/useSEO.ts`

**Purpose**: Manage SEO for specific page sections

```typescript
interface UseSEOProps {
  pageKey?: keyof typeof pageSEO;
  customSEO?: Partial<SEOData>;
  structuredData?: object;
  sectionId?: string;
}

const { updateSEO, seoData } = useSEO({
  pageKey: 'features',
  sectionId: 'features-section'
});
```

### usePWA Hook
**Location**: `src/hooks/usePWA.ts`

**Purpose**: Progressive Web App functionality

```typescript
const { isInstallable, install, isOffline } = usePWA();

// Install PWA
if (isInstallable) {
  await install();
}
```

### useA11y Hook
**Location**: `src/hooks/useA11y.ts`

**Purpose**: Accessibility features and compliance

```typescript
const { 
  announceToScreenReader, 
  focusElement, 
  trapFocus 
} = useA11y();

announceToScreenReader("Page loaded successfully");
```

### usePerformanceMonitoring Hook
**Location**: `src/hooks/usePerformanceMonitoring.ts`

**Purpose**: Monitor and track performance metrics

```typescript
const { metrics, isLoading } = usePerformanceMonitoring();

console.log(metrics.lcp, metrics.fid, metrics.cls);
```

## Context Providers

### LanguageContext
**Location**: `src/contexts/LanguageContext.tsx`

**Purpose**: Multi-language support for English and Bengali

```typescript
const { language, setLanguage, t } = useLanguage();

// Switch language
setLanguage('bn'); // Bengali
setLanguage('en'); // English

// Translate text
const welcomeText = t('hero.welcome');
```

**Translation Files**:
- English: `src/locales/en.ts`
- Bengali: `src/locales/bn.ts`

### AccessibilityContext
**Location**: `src/contexts/AccessibilityContext.tsx`

**Purpose**: Global accessibility settings and features

```typescript
const { 
  highContrast, 
  largeText, 
  reducedMotion,
  toggleHighContrast 
} = useAccessibility();
```

## SEO Implementation

### Meta Tag Strategy

1. **Primary Tags**: Title, description, keywords
2. **Open Graph**: Social media sharing optimization
3. **Twitter Cards**: Twitter-specific metadata
4. **Structured Data**: Schema.org for rich snippets

### Structured Data Types

- **LocalBusiness**: Company information
- **WebSite**: Website metadata
- **FAQPage**: FAQ rich snippets
- **Review**: Customer reviews
- **Service**: Service offerings

### SEO Monitoring

```typescript
// Start SEO monitoring
startSEOMonitoring();

// Custom SEO tests
const seoScore = await runSEOTests();
console.log(`SEO Score: ${seoScore}/100`);
```

## Performance Optimization

### Bundle Splitting Strategy

```typescript
// vite.config.ts
manualChunks: {
  // Core libraries
  'react-vendor': ['react', 'react-dom'],
  'ui-vendor': ['lucide-react', 'framer-motion'],
  'map-vendor': ['leaflet'],
  
  // Feature-based chunks
  'accessibility': ['./src/contexts/AccessibilityContext.tsx'],
  'performance': ['./src/hooks/usePerformanceMonitoring.ts'],
  'pwa': ['./src/hooks/usePWA.ts']
}
```

### Lazy Loading Implementation

```typescript
// LazyComponents.tsx
export const LazyTeam = lazy(() => import('./Team'));
export const LazyVisionStatement = lazy(() => import('./VisionStatement'));
export const LazyFAQ = lazy(() => import('./FAQ'));

// Usage in App.tsx
<Suspense fallback={<SectionLoader />}>
  <LazyTeam />
</Suspense>
```

### Core Web Vitals Optimization

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Accessibility Features

### WCAG 2.1 Compliance

- **Level AA** compliance target
- **Keyboard navigation** for all interactive elements
- **Screen reader** compatibility
- **High contrast** mode support
- **Focus management** with visible indicators

### Accessibility Testing

```typescript
// Automated accessibility testing
const a11yReport = await runAccessibilityTests();
console.log(a11yReport);
```

### ARIA Implementation

```tsx
// Example component with ARIA
<button 
  aria-label="Open navigation menu"
  aria-expanded={isMenuOpen}
  aria-controls="nav-menu"
  role="button"
>
  Menu
</button>
```

## Development Patterns

### Component Structure

```typescript
// Component template
interface ComponentProps {
  title: string;
  optional?: boolean;
}

const Component: React.FC<ComponentProps> = ({ 
  title, 
  optional = false 
}) => {
  const { t } = useLanguage();
  const { announceToScreenReader } = useA11y();
  
  useEffect(() => {
    announceToScreenReader(`${title} section loaded`);
  }, [title]);
  
  return (
    <section 
      className="component-styles"
      role="region"
      aria-labelledby="component-title"
    >
      <h2 id="component-title">{title}</h2>
      {/* Component content */}
    </section>
  );
};

export default Component;
```

### Error Handling Pattern

```typescript
// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Component error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    
    return this.props.children;
  }
}
```

### Testing Patterns

```typescript
// Component test template
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../contexts/LanguageContext';
import Component from './Component';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  );
};

describe('Component', () => {
  it('renders with correct title', () => {
    renderWithProviders(<Component title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

### Performance Monitoring

```typescript
// Performance measurement
const startTime = performance.now();
// ... component operations
const endTime = performance.now();
console.log(`Operation took ${endTime - startTime} milliseconds`);
```

---

## API Reference Quick Links

- [Component Props](#component-documentation)
- [Utility Functions](#utility-functions)
- [Custom Hooks](#hooks-reference)
- [Context API](#context-providers)
- [SEO Functions](#seo-implementation)

## Contributing to Documentation

1. Update this file when adding new components or utilities
2. Include TypeScript interfaces for all props
3. Provide usage examples
4. Document accessibility considerations
5. Add performance implications

---

**Last Updated**: June 6, 2025  
**Version**: 1.0.0  
**Maintainer**: PasherDokan Development Team
