// Social sharing utilities for SEO and user engagement
import { trackSocialShare } from './analytics';

export interface ShareData {
  title: string;
  description: string;
  url: string;
  image?: string;
  hashtags?: string[];
}

// Default share data for PasherDokan
export const defaultShareData: ShareData = {
  title: "PasherDokan - Digital Solutions for Local Shops in Bangladesh",
  description: "Transform your local shop with PasherDokan's hyperlocal e-commerce platform. Inventory management, customer discovery, cash-on-pickup for Bangladesh SMEs.",
  url: "https://pasherdokan.shop",
  image: "https://pasherdokan.shop/images/og-image.jpg",
  hashtags: ["PasherDokan", "BangladeshSME", "LocalBusiness", "DigitalCommerce", "Chattogram"]
};

// Section-specific share data
export const sectionShareData: Record<string, ShareData> = {
  features: {
    title: "PasherDokan Features - Complete Digital Commerce Solution",
    description: "Discover how PasherDokan empowers local shops with inventory management, analytics, and hyperlocal e-commerce capabilities.",
    url: "https://pasherdokan.shop#features",
    image: "https://pasherdokan.shop/images/features-og.jpg",
    hashtags: ["Features", "InventoryManagement", "ECommerce", "BusinessTools"]
  },
  team: {
    title: "Meet the PasherDokan Team - Building Bangladesh's Digital Future",
    description: "Meet the passionate team behind PasherDokan who are revolutionizing local commerce in Bangladesh.",
    url: "https://pasherdokan.shop#team",
    image: "https://pasherdokan.shop/images/team-og.jpg",
    hashtags: ["Team", "Founders", "BangladeshStartup", "Leadership"]
  },
  vision: {
    title: "PasherDokan Vision - Empowering Bangladesh's Digital Economy",
    description: "Learn about our vision to digitize Bangladesh's local economy and empower SMEs with cutting-edge technology.",
    url: "https://pasherdokan.shop#vision",
    image: "https://pasherdokan.shop/images/vision-og.jpg",
    hashtags: ["Vision", "DigitalEconomy", "BangladeshSME", "Innovation"]
  },
  contact: {
    title: "Contact PasherDokan - Start Your Digital Transformation",
    description: "Ready to transform your business? Contact PasherDokan for personalized consultation and join our Chattogram pilot program.",
    url: "https://pasherdokan.shop#contact",
    image: "https://pasherdokan.shop/images/contact-og.jpg",
    hashtags: ["Contact", "PilotProgram", "BusinessTransformation", "GetStarted"]
  }
};

// Social media platform configurations
export const socialPlatforms = {
  facebook: {
    name: "Facebook",
    icon: "facebook",
    shareUrl: (data: ShareData) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}&quote=${encodeURIComponent(data.title + ' - ' + data.description)}`,
    color: "#1877F2"
  },
  twitter: {
    name: "Twitter",
    icon: "twitter", 
    shareUrl: (data: ShareData) => {
      const text = `${data.title}\n\n${data.description}`;
      const hashtags = data.hashtags?.join(',') || '';
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(data.url)}&hashtags=${hashtags}`;
    },
    color: "#1DA1F2"
  },
  linkedin: {
    name: "LinkedIn",
    icon: "linkedin",
    shareUrl: (data: ShareData) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}`,
    color: "#0A66C2"
  },
  whatsapp: {
    name: "WhatsApp",
    icon: "message-circle",
    shareUrl: (data: ShareData) =>
      `https://wa.me/?text=${encodeURIComponent(data.title + '\n\n' + data.description + '\n\n' + data.url)}`,
    color: "#25D366"
  },
  telegram: {
    name: "Telegram",
    icon: "send",
    shareUrl: (data: ShareData) =>
      `https://t.me/share/url?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(data.title + '\n\n' + data.description)}`,
    color: "#0088CC"
  },
  email: {
    name: "Email",
    icon: "mail",
    shareUrl: (data: ShareData) =>
      `mailto:?subject=${encodeURIComponent(data.title)}&body=${encodeURIComponent(data.description + '\n\n' + data.url)}`,
    color: "#EA4335"
  }
};

// Share function with analytics tracking
export const shareContent = (platform: keyof typeof socialPlatforms, data: ShareData, section?: string) => {
  const config = socialPlatforms[platform];
  if (!config) {
    console.error('Unsupported social platform:', platform);
    return;
  }

  const shareUrl = config.shareUrl(data);
  
  // Track the share event
  trackSocialShare(platform, data.url, section);
  
  // Open share window
  if (platform === 'email') {
    window.location.href = shareUrl;
  } else {
    const width = 600;
    const height = 400;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(
      shareUrl,
      'share',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );
  }
};

// Native Web Share API with fallback
export const nativeShare = async (data: ShareData, section?: string): Promise<boolean> => {
  if (!navigator.share) {
    return false; // Not supported
  }

  try {
    await navigator.share({
      title: data.title,
      text: data.description,
      url: data.url
    });
    
    // Track successful native share
    trackSocialShare('native', data.url, section);
    return true;
  } catch (error) {
    if (error instanceof Error && error.name !== 'AbortError') {
      console.error('Error sharing:', error);
    }
    return false;
  }
};

// Copy link to clipboard with tracking
export const copyToClipboard = async (url: string, section?: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(url);
    trackSocialShare('clipboard', url, section);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

// Generate social media image URLs for different sections
export const getSocialImage = (section: string, platform: 'og' | 'twitter' = 'og'): string => {
  const baseUrl = "https://pasherdokan.shop/images";
  const suffix = platform === 'twitter' ? '-twitter' : '-og';
  
  switch (section) {
    case 'features':
      return `${baseUrl}/features${suffix}.jpg`;
    case 'team':
      return `${baseUrl}/team${suffix}.jpg`;
    case 'vision':
      return `${baseUrl}/vision${suffix}.jpg`;
    case 'contact':
      return `${baseUrl}/contact${suffix}.jpg`;
    case 'faq':
      return `${baseUrl}/faq${suffix}.jpg`;
    case 'milestones':
      return `${baseUrl}/milestones${suffix}.jpg`;
    default:
      return `${baseUrl}/og-image.jpg`;
  }
};

// Get appropriate share data for current section
export const getShareDataForSection = (section: string): ShareData => {
  const sectionData = sectionShareData[section];
  if (sectionData) {
    return {
      ...sectionData,
      image: getSocialImage(section)
    };
  }
  
  return {
    ...defaultShareData,
    url: `${defaultShareData.url}#${section}`,
    image: getSocialImage(section)
  };
};

// Add structured data for social media profiles
export const addSocialMediaStructuredData = () => {
  const socialProfiles = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PasherDokan",
    "url": "https://pasherdokan.shop",
    "sameAs": [
      "https://www.facebook.com/pasherdokan",
      "https://twitter.com/pasherdokan", 
      "https://www.linkedin.com/company/pasherdokan",
      "https://www.instagram.com/pasherdokan"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+880-1XXX-XXXXXX",
      "contactType": "Customer Service",
      "areaServed": "BD",
      "availableLanguage": ["English", "Bengali"]
    }
  };

  // Add to document head
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(socialProfiles);
  document.head.appendChild(script);
};

// Initialize social sharing features
export const initSocialSharing = () => {
  // Add social media structured data
  addSocialMediaStructuredData();
  
  // Add Open Graph and Twitter Card meta tags if not present
  const metaTags = [
    { property: "og:site_name", content: "PasherDokan" },
    { property: "og:locale", content: "en_US" },
    { property: "og:locale:alternate", content: "bn_BD" },
    { name: "twitter:site", content: "@pasherdokan" },
    { name: "twitter:creator", content: "@pasherdokan" }
  ];

  metaTags.forEach(tag => {
    const selector = tag.property ? `meta[property="${tag.property}"]` : `meta[name="${tag.name}"]`;
    if (!document.querySelector(selector)) {
      const meta = document.createElement('meta');
      if (tag.property) {
        meta.setAttribute('property', tag.property);
      } else if (tag.name) {
        meta.setAttribute('name', tag.name);
      }
      meta.setAttribute('content', tag.content);
      document.head.appendChild(meta);
    }
  });
};

// Bangladesh-specific social platforms for local engagement
export const bangladeshSocialPlatforms = {
  facebook: socialPlatforms.facebook, // Very popular in Bangladesh
  whatsapp: socialPlatforms.whatsapp, // Widely used for business
  telegram: socialPlatforms.telegram, // Growing user base
  messenger: {
    name: "Messenger",
    icon: "message-square",
    shareUrl: (data: ShareData) =>
      `https://www.facebook.com/dialog/send?link=${encodeURIComponent(data.url)}&app_id=YOUR_APP_ID`,
    color: "#0084FF"
  }
};

export default {
  shareContent,
  nativeShare,
  copyToClipboard,
  getShareDataForSection,
  getSocialImage,
  initSocialSharing,
  socialPlatforms,
  bangladeshSocialPlatforms
};
