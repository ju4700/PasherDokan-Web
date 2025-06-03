// Social Media Image Optimization Utility
export interface SocialImageConfig {
  title: string;
  description?: string;
  brand?: string;
  logo?: string;
  background?: string;
  textColor?: string;
  brandColor?: string;
}

// Default OG image configurations for different sections
export const socialImages = {
  default: {
    url: '/images/og-default.jpg',
    width: 1200,
    height: 630,
    alt: 'PasherDokan - Digital Commerce Platform for Bangladesh SMEs'
  },
  home: {
    url: '/images/og-home.jpg',
    width: 1200,
    height: 630,
    alt: 'PasherDokan - Transform Your Local Shop into a Digital Powerhouse'
  },
  features: {
    url: '/images/og-features.jpg',
    width: 1200,
    height: 630,
    alt: 'PasherDokan Features - POS, Inventory, E-commerce & Analytics'
  },
  team: {
    url: '/images/og-team.jpg',
    width: 1200,
    height: 630,
    alt: 'Meet the PasherDokan Team - Experts in Digital Commerce Solutions'
  },
  contact: {
    url: '/images/og-contact.jpg',
    width: 1200,
    height: 630,
    alt: 'Contact PasherDokan - Start Your Digital Transformation Today'
  }
};

// Generate social media meta tags with proper image handling
export const generateSocialImageMeta = (
  imageKey: keyof typeof socialImages = 'default',
  customConfig?: Partial<SocialImageConfig>
) => {
  const image = socialImages[imageKey];
  const baseUrl = 'https://pasherdokan.shop';
  
  const metaTags = [
    // Open Graph Image
    { property: 'og:image', content: `${baseUrl}${image.url}` },
    { property: 'og:image:width', content: image.width.toString() },
    { property: 'og:image:height', content: image.height.toString() },
    { property: 'og:image:alt', content: image.alt },
    { property: 'og:image:type', content: 'image/jpeg' },
    
    // Twitter Card Image
    { name: 'twitter:image', content: `${baseUrl}${image.url}` },
    { name: 'twitter:image:alt', content: image.alt },
    
    // Additional social platforms
    { property: 'linkedin:image', content: `${baseUrl}${image.url}` },
    { name: 'pinterest:image', content: `${baseUrl}${image.url}` }
  ];
  
  // Add custom meta tags if customConfig is provided
  if (customConfig) {
    if (customConfig.title) {
      metaTags.push({ property: 'og:title', content: customConfig.title });
      metaTags.push({ name: 'twitter:title', content: customConfig.title });
    }
    if (customConfig.description) {
      metaTags.push({ property: 'og:description', content: customConfig.description });
      metaTags.push({ name: 'twitter:description', content: customConfig.description });
    }
  }
  
  return metaTags;
};

// Image optimization recommendations
export const imageOptimizationTips = {
  ogImage: {
    dimensions: '1200x630px',
    format: 'JPG or PNG',
    fileSize: 'Under 1MB',
    safeArea: 'Keep important content within 1200x600px center area'
  },
  twitterCard: {
    dimensions: '1200x675px (16:9) or 1200x628px (1.91:1)',
    format: 'JPG, PNG, WEBP, or GIF',
    fileSize: 'Under 5MB'
  },
  favicon: {
    sizes: ['16x16', '32x32', '48x48', '64x64', '128x128', '256x256'],
    format: 'ICO, PNG, or SVG',
    recommendation: 'Use SVG for modern browsers with ICO fallback'
  }
};

// Generate favicon links
export const generateFaviconLinks = () => [
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicon-16x16.png' },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon-32x32.png' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' }
];

// Image lazy loading and optimization for SEO
export const optimizeImages = () => {
  // Add loading="lazy" to images below the fold
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach((img, index) => {
    const htmlImg = img as HTMLImageElement;
    
    // First 3 images should load eagerly (above the fold)
    if (index < 3) {
      htmlImg.loading = 'eager';
    } else {
      htmlImg.loading = 'lazy';
    }
    
    // Ensure all images have alt text for SEO
    if (!htmlImg.alt) {
      console.warn('Image missing alt text:', htmlImg.src);
    }
  });
};

// WebP format support detection and optimization
export const webpSupport = {
  // Check if browser supports WebP
  isSupported: (): Promise<boolean> => {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  },
  
  // Generate responsive image sources with WebP fallback
  generateSources: (imagePath: string, sizes: number[]) => {
    return sizes.map(size => ({
      webp: `${imagePath}?format=webp&w=${size}`,
      fallback: `${imagePath}?w=${size}`
    }));
  }
};

export default {
  socialImages,
  generateSocialImageMeta,
  generateFaviconLinks,
  optimizeImages,
  webpSupport,
  imageOptimizationTips
};
