# PasherDokan Website 🛍️

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Hyperlocal E-commerce Platform for Bangladesh SMEs**  
> Empowering local shops with digital solutions while preserving community connections

## 🎯 Project Overview

PasherDokan is a comprehensive web platform designed to revolutionize local commerce in Bangladesh. Starting with a pilot program in Chattogram, we're targeting 96,000 SMEs (10% of Bangladesh's 1.2 million retail outlets) in a $6 billion addressable market.

### 🚀 Key Features

- **🗺️ Hyperlocal Discovery**: OpenStreetMap integration for neighborhood-based commerce
- **💰 Cash-on-Pickup**: Preserving traditional payment preferences
- **📊 Smart Analytics**: Real-time inventory and P&L tracking
- **🏪 SME Empowerment**: Tools for 80% of Bangladesh's retail landscape
- **📱 Progressive Web App**: Mobile-first design with offline capabilities
- **🌐 Multi-language**: English and Bengali support

## 🏗️ Architecture & Tech Stack

### Frontend Framework
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Framer Motion** for smooth animations
- **TailwindCSS** for consistent styling

### Performance & SEO
- **Advanced SEO**: Structured data, meta optimization, Core Web Vitals
- **Code Splitting**: Lazy loading with manual chunk optimization
- **PWA Features**: Service worker, offline support
- **Accessibility**: WCAG compliant with dedicated a11y tools

### Development Tools
- **ESLint** with TypeScript rules
- **React Helmet Async** for meta management
- **Leaflet** for interactive maps
- **Lucide React** for consistent iconography

## 📁 Project Structure

```
PasherDokanWeb/
├── 📱 public/                 # Static assets & PWA files
│   ├── 🖼️ images/             # Team photos, icons, branding
│   ├── 📱 apk/                # Android app downloads
│   └── 🤖 robots.txt          # SEO configuration
├── 🔧 scripts/               # Build and deployment scripts
├── 🎨 src/
│   ├── 🧩 components/         # React components
│   ├── ⚙️ config/             # Configuration files
│   ├── 🌐 contexts/           # React context providers
│   ├── 📊 data/               # Static content and translations
│   ├── 🪝 hooks/              # Custom React hooks
│   ├── 🌍 locales/            # i18n translations (en/bn)
│   ├── 🎨 styles/             # CSS and styling
│   ├── 📝 types/              # TypeScript type definitions
│   └── 🛠️ utils/              # Utility functions
└── ⚙️ Configuration files     # Vite, TypeScript, ESLint, etc.
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pasherdokan/pasherdokan-web.git
   cd pasherdokan-web/PasherDokanWeb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

## 🎨 Component Architecture

### Core Components
- **Header**: Navigation with language switching and responsive design
- **Hero**: Interactive landing section with map visualization
- **Features**: Showcase of platform capabilities
- **Team**: Team member profiles with dynamic filtering
- **FAQ**: Searchable frequently asked questions
- **Milestones**: Project roadmap and future plans

### Utility Components
- **SEO**: Comprehensive meta tag and structured data management
- **PWA**: Progressive web app features and offline support
- **Accessibility**: WCAG compliance tools and keyboard navigation

## 🌐 Internationalization (i18n)

The website supports both English and Bengali:

```typescript
// Language switching
const { t, language, setLanguage } = useLanguage();
const greeting = t('hero.welcome'); // "Welcome" or "স্বাগতম"
```

### Adding New Translations
1. Update `src/locales/en.ts` and `src/locales/bn.ts`
2. Use the `t()` function in components
3. Test both language versions

## 🔍 SEO Strategy

### Implemented Features
- **Schema.org structured data** for rich snippets
- **Open Graph tags** for social media sharing
- **Meta tag optimization** for search engines
- **Core Web Vitals monitoring** for performance
- **Multi-language SEO** with hreflang tags

### SEO Utilities
```typescript
// Generate structured data
const structuredData = generateLocalBusinessStructuredData();

// Track page performance
trackPerformance();

// Monitor SEO metrics
startSEOMonitoring();
```

## ♿ Accessibility Features

- **ARIA labels** and semantic HTML
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** mode support
- **Focus management** for interactive elements

## 📱 Progressive Web App (PWA)

- **Service Worker** for offline functionality
- **App manifest** for home screen installation
- **Push notifications** ready
- **Offline fallback** pages

## 🚀 Performance Optimizations

### Bundle Optimization
- **Code splitting** by route and feature
- **Lazy loading** for non-critical components
- **Tree shaking** to eliminate dead code
- **Compression** with gzip/brotli

### Build Configuration
```typescript
// Manual chunk splitting for better caching
manualChunks: {
  'react-vendor': ['react', 'react-dom'],
  'ui-vendor': ['lucide-react', 'framer-motion'],
  'accessibility': ['./src/contexts/AccessibilityContext.tsx'],
  'performance': ['./src/hooks/usePerformanceMonitoring.ts']
}
```

## 🔧 Development Guidelines

### Code Style
- Use **TypeScript** for all new files
- Follow **React functional components** with hooks
- Implement **proper error boundaries**
- Write **accessible** markup with ARIA attributes

### Component Guidelines
```typescript
// Component template
interface ComponentProps {
  title: string;
  isActive?: boolean;
}

const Component: React.FC<ComponentProps> = ({ title, isActive = false }) => {
  const { t } = useLanguage();
  
  return (
    <div className="component-class" role="region" aria-label={title}>
      {/* Component content */}
    </div>
  );
};

export default Component;
```

### Styling Guidelines
- Use **TailwindCSS** utility classes
- Create **responsive designs** with mobile-first approach
- Implement **dark mode** considerations
- Ensure **accessibility** color contrasts

## 🧪 Testing Strategy

### Recommended Testing Setup
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Run tests
npm test

# Test coverage
npm run test:coverage
```

### Testing Guidelines
- **Unit tests** for utility functions
- **Component tests** for UI interactions
- **Integration tests** for user workflows
- **E2E tests** for critical paths

## 🚀 Deployment

### Production Build
```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

### Environment Variables
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_API_BASE_URL=https://api.pasherdokan.shop
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
```

## 📊 Analytics & Monitoring

- **Google Analytics 4** for user behavior tracking
- **Core Web Vitals** monitoring for performance
- **SEO monitoring** with custom utilities
- **Error tracking** ready for Sentry integration

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Review Checklist
- [ ] TypeScript types are properly defined
- [ ] Components are accessible (ARIA attributes)
- [ ] SEO meta tags are updated if needed
- [ ] Mobile responsiveness is tested
- [ ] Performance impact is minimal
- [ ] Documentation is updated

## 📝 Changelog

### Version 1.0.0 (June 2025)
- ✅ Initial website launch
- ✅ Multi-language support (English/Bengali)
- ✅ Advanced SEO implementation
- ✅ PWA capabilities
- ✅ Accessibility compliance
- ✅ Performance optimizations

## 🔗 Related Projects

- **PasherDokan Mobile App**: Android application for shopkeepers
- **PasherDokan Backend**: API and database services
- **PasherDokan Admin**: Management dashboard

## 📞 Support & Contact

- **Website**: [https://pasherdokan.shop](https://pasherdokan.shop)
- **Email**: support@pasherdokan.shop
- **LinkedIn**: [PasherDokan Company](https://linkedin.com/company/pasherdokan)

## 📄 License

© 2025 PasherDokan. All rights reserved.

---

**Built with ❤️ for Bangladesh's local businesses**
