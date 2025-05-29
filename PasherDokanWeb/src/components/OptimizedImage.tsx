import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder = 'blur',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Lazy loading with Intersection Observer
  useEffect(() => {
    if (!priority && imgRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        },
        { rootMargin: '50px' }
      );

      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  // Generate WebP and fallback sources
  const getOptimizedSrc = (originalSrc: string, format: 'webp' | 'original' = 'original') => {
    if (format === 'webp') {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Don't render until in view (unless priority)
  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={`${className} bg-gray-100 animate-pulse`}
        style={{ width, height }}
        aria-label={`Loading ${alt}`}
      />
    );
  }

  if (hasError) {
    return (
      <div
        className={`${className} bg-gray-100 flex items-center justify-center text-gray-400 text-sm`}
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-2 opacity-30">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
          <span>Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 animate-pulse rounded-inherit"
          aria-hidden="true"
        />
      )}

      {/* Progressive image loading with WebP support */}
      <picture>
        <source
          srcSet={getOptimizedSrc(src, 'webp')}
          type="image/webp"
        />
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </picture>

      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
