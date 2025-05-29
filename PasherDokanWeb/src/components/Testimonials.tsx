import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Quote, Star, Bookmark, Building } from 'lucide-react';
import { testimonials } from '../data/content';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface CompanyLogoProps {
  name: string;
  variant?: 'light' | 'dark';
  className?: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ name, variant = 'light', className = '' }) => {
  return (
    <div className={`
      ${variant === 'light' 
        ? 'bg-white/95 backdrop-blur-md text-gray-700 border-gray-100' 
        : 'bg-gray-800 text-white border-gray-700'
      } 
      px-4 py-2 rounded-lg text-sm font-medium shadow-md border ${className}
    `}>
      <div className="flex items-center gap-2">
        <Building size={14} className={variant === 'light' ? 'text-primary-500' : 'text-primary-400'} />
        {name}
      </div>
    </div>
  );
};

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    role: string;
    company: string;
    avatar: string;
    content: string;
    featured?: boolean;
  };
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
  onClick?: () => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial, 
  variant = 'default', 
  className = '',
  onClick
}) => {
  const cardClasses = {
    default: `bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`,
    compact: `bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-primary-100 transition-all duration-300 ${className}`,
    featured: `bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 ${className}`
  }[variant];
  
  return (
    <motion.div
      className={cardClasses}
      whileHover={variant !== 'featured' ? { y: -5 } : {}}
      onClick={onClick}
    >
      {variant === 'featured' && (
        <div className="h-3 bg-gradient-to-r from-primary-500 to-primary-600"></div>
      )}
      
      <div className={`
        ${variant === 'compact' ? 'p-4' : 'p-6'}
        ${variant === 'featured' ? 'p-8' : ''}
      `}>
        {/* Rating stars */}
        <div className="flex mb-3">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <Star 
              key={i} 
              size={variant === 'compact' ? 14 : 16} 
              fill="#FFB400" 
              color="#FFB400" 
              className="mr-1"
            />
          ))}
        </div>
        
        {variant === 'featured' && (
          <div className="absolute top-8 right-8 text-primary-200 opacity-20">
            <Quote size={60} strokeWidth={1} />
          </div>
        )}
        
        {/* Testimonial content */}
        <div className={`
          ${variant === 'compact' ? 'text-sm mb-3' : 'text-base mb-5'}
          ${variant === 'featured' ? 'text-lg mb-6' : ''}
          text-gray-700 relative z-10 font-light leading-relaxed
        `}>
          <span className="text-primary-500 text-xl font-serif">"</span>
          {variant === 'compact' 
            ? testimonial.content.substring(0, 80) + (testimonial.content.length > 80 ? '...' : '')
            : testimonial.content
          }
          <span className="text-primary-500 text-xl font-serif">"</span>
        </div>
        
        {/* Author info */}
        <div className="flex items-center gap-3">
          <div className={`
            ${variant === 'compact' ? 'w-10 h-10' : 'w-12 h-12'}
            ${variant === 'featured' ? 'w-14 h-14' : ''}
            rounded-full overflow-hidden border-2 border-white shadow-sm
          `}>
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name}
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div>
            <h5 className={`
              ${variant === 'compact' ? 'text-sm' : 'text-base'}
              ${variant === 'featured' ? 'text-lg' : ''}
              font-semibold text-gray-900
            `}>{testimonial.name}</h5>
            <p className={`
              ${variant === 'compact' ? 'text-xs' : 'text-sm'}
              text-gray-500
            `}>
              {testimonial.role}, <span className="text-primary-600">{testimonial.company}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const rotateCards = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const scaleCards = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.8]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && !isAnimating) {
      nextTestimonial();
    } else if (isRightSwipe && !isAnimating) {
      prevTestimonial();
    }
  };

  const resetAutoRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 10000); // Longer interval for better UX
  };

  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setFeaturedIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => setIsAnimating(false), 500);
    resetAutoRotation();
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setFeaturedIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => setIsAnimating(false), 500);
    resetAutoRotation();
  };
  
  const selectTestimonial = (index: number) => {
    if (isAnimating || index === featuredIndex) return;
    
    setIsAnimating(true);
    setFeaturedIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
    resetAutoRotation();
  };

  useEffect(() => {
    resetAutoRotation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <section 
      id="testimonials" 
      ref={containerRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white -z-10"></div>
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary-50/50 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-secondary-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 -z-10"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          style={{ opacity: opacityText }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-3"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary-50/80 text-primary-700 font-semibold text-sm tracking-wide">
              {t('testimonials.badge')}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-5 text-gray-900 leading-tight"
          >
            {t('testimonials.title')}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed"
          >
            {t('testimonials.subtitle')}
          </motion.p>
        </motion.div>

        {/* Testimonial Grid + Featured Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left side - Featured Testimonial */}
          <div className="lg:col-span-7 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`featured-${featuredIndex}`}
                  initial={{ opacity: 0, scale: 0.95, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: 10 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Premium badge for featured testimonial */}
                    <div className="absolute top-6 right-6 z-20">
                      <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                        <Bookmark size={12} className="fill-white" />
                        {t('testimonials.featuredStory')}
                      </div>
                    </div>
                    
                    {/* Top gradient bar */}
                    <div className="h-2 bg-gradient-to-r from-primary-500 to-primary-700"></div>
                    
                    <div className="p-8 md:p-10 relative">
                      {/* Large quote mark */}
                      <div className="absolute top-8 right-8 text-primary-200 opacity-20">
                        <Quote size={80} strokeWidth={1} />
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div className="relative">
                          {/* Avatar with decorative elements */}
                          <div className="relative z-10">
                            <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                              <img 
                                src={testimonials[featuredIndex].avatar} 
                                alt={testimonials[featuredIndex].name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* Company badge */}
                            <div className="absolute -bottom-3 -right-3 z-20">
                              <CompanyLogo name={testimonials[featuredIndex].company} />
                            </div>
                          </div>
                          
                          {/* Decorative background */}
                          <div className="absolute top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-200 to-primary-50 rounded-full blur-xl opacity-70 z-0"></div>
                          <div className="absolute -bottom-4 left-0 w-20 h-20 bg-gradient-to-br from-secondary-200 to-secondary-50 rounded-full blur-xl opacity-70 z-0"></div>
                        </div>
                        
                        <div className="flex-grow">
                          {/* Rating stars */}
                          <div className="flex mb-4">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                              <Star 
                                key={i} 
                                size={20} 
                                fill="#FFB400" 
                                color="#FFB400" 
                                className="mr-1"
                              />
                            ))}
                          </div>
                          
                          {/* Quote */}
                          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed font-light">
                            <span className="text-primary-500 text-3xl font-serif">"</span>
                            {testimonials[featuredIndex].content}
                            <span className="text-primary-500 text-3xl font-serif">"</span>
                          </p>
                          
                          {/* Author info */}
                          <div className="mt-8">
                            <h4 className="text-xl font-bold text-gray-900">{testimonials[featuredIndex].name}</h4>
                            <p className="text-primary-600 font-medium">
                              {testimonials[featuredIndex].role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation controls */}
              <div className="flex justify-between mt-6">
                <button 
                  onClick={prevTestimonial}
                  className="group w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-all border border-gray-100 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                  aria-label={t('testimonials.previousTestimonial')}
                  disabled={isAnimating}
                >
                  <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
                </button>
                
                <div className="flex gap-1.5 items-center">
                  {isMobile && (
                    <span className="text-xs text-gray-400 mr-2 font-medium">
                      {t('testimonials.swipeHint')}
                    </span>
                  )}
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => selectTestimonial(index)}
                      className={`transition-all touch-manipulation ${
                        index === featuredIndex 
                          ? 'w-8 h-2.5 bg-primary-600 rounded-full shadow-sm' 
                          : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400 rounded-full'
                      } ${isMobile ? 'min-w-[20px] min-h-[20px]' : ''}`}
                      aria-label={`Go to testimonial ${index + 1}`}
                      disabled={isAnimating}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={nextTestimonial}
                  className="group w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-all border border-gray-100 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                  aria-label={t('testimonials.nextTestimonial')}
                  disabled={isAnimating}
                >
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Right side - Grid of Testimonials */}
          <motion.div
            style={{ rotate: rotateCards, scale: scaleCards }}
            className="lg:col-span-5 relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {testimonials.filter((_, i) => i !== featuredIndex).slice(0, 4).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <TestimonialCard 
                    testimonial={testimonial} 
                    variant="compact"
                    onClick={() => selectTestimonial(testimonials.findIndex(t => t.id === testimonial.id))}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gray-100 rounded-full opacity-60 blur-3xl -z-10"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-50 rounded-full opacity-40 blur-3xl -z-10"></div>
          </motion.div>
        </div>
        
        {/* Client logos section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20"
        >
          <div className="flex flex-col items-center">
            <p className="text-center text-gray-500 text-sm uppercase tracking-wider mb-8 font-medium">
              {t('testimonials.trustedBy')}
            </p>
            
            <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 w-full">
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {testimonials.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-100 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                      <img 
                        src={t.avatar} 
                        alt={t.company}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-gray-700 font-medium whitespace-nowrap">{t.company}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;