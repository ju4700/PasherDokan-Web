import React from 'react';
import { Share2, Facebook, Twitter, Linkedin, MessageCircle, Send, Mail, Copy, Check } from 'lucide-react';
import { shareContent, nativeShare, copyToClipboard, getShareDataForSection, socialPlatforms } from '../utils/socialSharing';

interface SocialShareProps {
  section?: string;
  title?: string;
  description?: string;
  url?: string;
  className?: string;
  showLabels?: boolean;
  variant?: 'horizontal' | 'vertical' | 'grid';
}

const SocialShare: React.FC<SocialShareProps> = ({
  section = 'home',
  title,
  description,
  url,
  className = '',
  showLabels = true,
  variant = 'horizontal'
}) => {
  const [copiedUrl, setCopiedUrl] = React.useState(false);
  const [isNativeShareSupported, setIsNativeShareSupported] = React.useState(false);

  React.useEffect(() => {
    setIsNativeShareSupported('share' in navigator);
  }, []);

  // Get share data for current section or use custom data
  const shareData = React.useMemo(() => {
    if (title && description && url) {
      return { title, description, url };
    }
    return getShareDataForSection(section);
  }, [section, title, description, url]);

  const iconMap = {
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    whatsapp: MessageCircle,
    telegram: Send,
    email: Mail
  };

  const handleShare = async (platform: keyof typeof socialPlatforms | 'native') => {
    if (platform === 'native' && isNativeShareSupported) {
      const success = await nativeShare(shareData, section);
      if (!success) {
        // Fallback to Facebook if native share fails
        shareContent('facebook', shareData, section);
      }
    } else if (platform !== 'native') {
      shareContent(platform, shareData, section);
    }
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareData.url, section);
    if (success) {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const renderButton = (platform: keyof typeof socialPlatforms, config: typeof socialPlatforms[keyof typeof socialPlatforms]) => {
    const IconComponent = iconMap[platform as keyof typeof iconMap];
    if (!IconComponent) return null;

    return (
      <button
        key={platform}
        onClick={() => handleShare(platform)}
        className={`
          group relative flex items-center justify-center gap-2 px-4 py-2 
          rounded-lg transition-all duration-200 hover:scale-105 
          ${variant === 'grid' ? 'flex-col p-3' : 'flex-row'}
        `}
        style={{ 
          backgroundColor: `${config.color}15`,
          borderColor: config.color,
          border: '1px solid transparent'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = config.color;
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = `${config.color}15`;
          e.currentTarget.style.color = config.color;
        }}
        aria-label={`Share on ${config.name}`}
      >
        <IconComponent 
          size={variant === 'grid' ? 24 : 18} 
          color={config.color}
          className="transition-colors duration-200"
        />
        {showLabels && (
          <span className="text-sm font-medium transition-colors duration-200" style={{ color: config.color }}>
            {config.name}
          </span>
        )}
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
          Share on {config.name}
        </div>
      </button>
    );
  };

  const containerClasses = {
    horizontal: 'flex flex-wrap items-center gap-3',
    vertical: 'flex flex-col gap-3',
    grid: 'grid grid-cols-3 gap-3 sm:grid-cols-6'
  };

  return (
    <div className={`social-share ${containerClasses[variant]} ${className}`}>
      {/* Native Share Button (mobile) */}
      {isNativeShareSupported && (
        <button
          onClick={() => handleShare('native')}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors duration-200"
          aria-label="Share using device share menu"
        >
          <Share2 size={18} />
          {showLabels && <span className="text-sm font-medium">Share</span>}
        </button>
      )}

      {/* Social Platform Buttons */}
      {Object.entries(socialPlatforms).map(([platform, config]) => 
        renderButton(platform as keyof typeof socialPlatforms, config)
      )}

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 relative group"
        aria-label="Copy link to clipboard"
      >
        {copiedUrl ? (
          <>
            <Check size={18} className="text-green-600" />
            {showLabels && <span className="text-sm font-medium text-green-600">Copied!</span>}
          </>
        ) : (
          <>
            <Copy size={18} />
            {showLabels && <span className="text-sm font-medium">Copy Link</span>}
          </>
        )}
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
          {copiedUrl ? 'Copied to clipboard!' : 'Copy link'}
        </div>
      </button>
    </div>
  );
};

// Floating Share Button Component
export const FloatingShareButton: React.FC<{ section?: string }> = ({ section = 'home' }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all duration-200 flex items-center justify-center group hover:scale-110"
        aria-label="Open share menu"
      >
        <Share2 
          size={24} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Share Options */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border p-3 animate-in slide-in-from-bottom-2 duration-200">
          <SocialShare 
            section={section}
            variant="grid"
            showLabels={false}
            className="w-48"
          />
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 -z-10" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

// Inline Share Component for sections
export const InlineShare: React.FC<{ 
  section: string; 
  title?: string;
  className?: string;
}> = ({ section, title, className = '' }) => {
  return (
    <div className={`inline-share border-t border-gray-200 pt-6 mt-8 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {title || 'Share this section'}
          </h3>
          <p className="text-sm text-gray-600">
            Help others discover PasherDokan's solutions
          </p>
        </div>
        
        <SocialShare 
          section={section}
          variant="horizontal"
          showLabels={false}
          className="flex-shrink-0"
        />
      </div>
    </div>
  );
};

export default SocialShare;
