import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react';
import Button from './Button';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
    
    const sections = ['hero', 'features', 'testimonials', 'team', 'faq'];
    const currentSection = sections.find(section => {
      const element = document.getElementById(section);
      if (!element) return false;
      
      const rect = element.getBoundingClientRect();
      return rect.top <= 150 && rect.bottom >= 150;
    });
    
    if (currentSection) {
      setActiveSection(currentSection);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      {/* Enhanced navbar with glass-morphism effect */}
      <div 
        className={`transition-all duration-500 mt-0 pointer-events-auto
          ${isScrolled 
            ? 'bg-white/95 shadow-lg py-2.5 px-8 border-x border-b border-gray-100/30'
            : 'bg-white/85 py-4 px-10 shadow-xl border-x border-b border-white/20'
          } backdrop-blur-lg max-w-5xl w-[88%] rounded-b-[2.5rem] hover:shadow-xl group`}
      >
        <div className="flex items-center justify-between">
          {/* Mobile menu button with refined styling and animation */}
          <button 
            className="md:hidden rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-b from-white to-gray-50 text-primary-600 mr-3 shadow-sm hover:shadow transition-all active:scale-95 border border-gray-100/80"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? 
              <X size={18} className="animate-[spin_0.3s_ease-in-out]" /> : 
              <Menu size={18} className="transition-transform hover:scale-110" />
            }
          </button>

          {/* Enhanced logo with improved animation */}
          <a href="#" className="flex items-center gap-2 group pt-0.5 transition-all duration-300">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-md transition-all group-hover:shadow-primary-300/30 group-hover:scale-105">
              <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
              <ShoppingBag size={16} className="transition-transform group-hover:scale-90 relative z-10" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent hidden md:block transition-all group-hover:tracking-wide">
              <span className="opacity-90 hover:opacity-100"></span><span className="font-extrabold">PasherDokan</span>
            </span>
          </a>

          {/* Desktop navigation with enhanced styling */}
          <nav className="hidden md:flex items-center gap-3 mx-auto bg-white/60 px-2 py-1.5 rounded-full shadow-inner border border-gray-100/50">
            <NavLink href="#features" isActive={activeSection === 'features'}>Features</NavLink>
            
            <NavLink href="#testimonials" isActive={activeSection === 'testimonials'}>Testimonials</NavLink>
            
            <NavLink href="#faq" isActive={activeSection === 'faq'}>FAQ</NavLink>
            <NavLink href="#team" isActive={activeSection === 'team'}>Team</NavLink>
          </nav>

          {/* Enhanced CTA button */}
          <Button 
            variant="primary" 
            size="sm"
            className="ml-3 rounded-full shadow-md hover:shadow-lg transition-all hover:shadow-primary-400/20 relative overflow-hidden group"
            onClick={() => window.open('https://play.google.com/store', '_blank')}
          >
            <span className="relative z-10">Get App</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Button>
        </div>
      </div>

      {/* Enhanced mobile menu overlay with smoother fade */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden pointer-events-auto animate-[fadeIn_0.3s_ease-in-out]" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Redesigned mobile menu with more polish and visual enhancements */}
      <div 
        className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl rounded-b-3xl transition-all duration-300 ease-in-out transform md:hidden pointer-events-auto ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } z-50`}
      >
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 p-0.5 shadow-lg shadow-primary-300/20">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
                  <ShoppingBag size={20} className="text-primary-600 relative z-10" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Pasher<span className="font-extrabold">Dokan</span>
              </span>
            </div>
            <button 
              className="rounded-full w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-primary-600 transition-colors border border-gray-100"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col space-y-2.5">
            <MobileNavLink href="#features" onClick={() => setIsOpen(false)} isActive={activeSection === 'features'}>
              Features
            </MobileNavLink>
            <MobileNavLink href="#testimonials" onClick={() => setIsOpen(false)} isActive={activeSection === 'testimonials'}>
              Testimonials
            </MobileNavLink>
            <MobileNavLink href="#team" onClick={() => setIsOpen(false)} isActive={activeSection === 'team'}>
              Team
            </MobileNavLink>
            <MobileNavLink href="#faq" onClick={() => setIsOpen(false)} isActive={activeSection === 'faq'}>
              FAQ
            </MobileNavLink>
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <Button 
              variant="primary" 
              className="w-full rounded-xl py-3.5 text-base font-medium shadow-lg relative overflow-hidden group"
              onClick={() => {
                window.open('https://play.google.com/store', '_blank');
                setIsOpen(false);
              }}
            >
              <span className="relative z-10">Download App</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
            
            <p className="mt-4 text-center text-sm text-gray-500">
              Free for local shop owners
            </p>
          </div>
        </div>
        
        <div className="h-1.5 w-16 bg-gray-200 rounded-full mx-auto mb-2 mt-4"></div>
      </div>
    </header>
  );
};

const NavLink: React.FC<{ href: string, children: React.ReactNode, isActive?: boolean }> = ({ 
  href, 
  children, 
  isActive = false 
}) => (
  <a 
    href={href} 
    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive 
        ? 'bg-white text-primary-700 shadow-sm border border-gray-50' 
        : 'text-gray-700 hover:bg-white hover:text-primary-600 hover:shadow-sm'
    } relative overflow-hidden group`}
  >
    <span className="relative z-10">{children}</span>
    {isActive && (
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-1/3 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"></span>
    )}
  </a>
);

const MobileNavLink: React.FC<{ 
  href: string, 
  onClick: () => void, 
  children: React.ReactNode,
  isActive?: boolean
}> = ({ 
  href, 
  onClick,
  children,
  isActive = false
}) => (
  <a 
    href={href} 
    className={`py-4 px-5 rounded-xl flex items-center transition-all ${
      isActive
        ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 shadow-sm border border-primary-100/30'
        : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
    }`}
    onClick={onClick}
  >
    <span className="text-base font-medium">{children}</span>
    <ChevronDown size={16} className={`ml-auto transform -rotate-90 transition-transform ${isActive ? 'text-primary-500' : ''}`} />
  </a>
);

export default Header;