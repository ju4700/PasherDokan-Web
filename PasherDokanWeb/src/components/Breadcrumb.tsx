import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbStructuredData } from '../utils/seo';

interface BreadcrumbItem {
  name: string;
  url: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  // Generate structured data for breadcrumbs
  React.useEffect(() => {
    const structuredData = generateBreadcrumbStructuredData(items);
    
    // Add breadcrumb structured data to the page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'breadcrumb-structured-data';
    
    // Remove existing breadcrumb structured data
    const existing = document.getElementById('breadcrumb-structured-data');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);
    
    return () => {
      const scriptElement = document.getElementById('breadcrumb-structured-data');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className={`${className}`}>
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index === 0 && (
              <Home className="w-4 h-4 mr-1 text-gray-500" aria-hidden="true" />
            )}
            
            {item.current ? (
              <span 
                className="font-medium text-primary-600" 
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <a
                href={item.url}
                className="text-gray-500 hover:text-primary-600 transition-colors duration-200"
                onClick={(e) => {
                  // Handle anchor navigation for single-page app
                  if (item.url.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(item.url);
                    if (target) {
                      const headerOffset = 100;
                      const elementPosition = target.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                      
                      // Update URL hash
                      window.history.replaceState(null, '', item.url);
                    }
                  }
                }}
              >
                {item.name}
              </a>
            )}
            
            {index < items.length - 1 && (
              <ChevronRight 
                className="w-4 h-4 mx-2 text-gray-400" 
                aria-hidden="true" 
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Hook to generate breadcrumbs based on current section
export const useBreadcrumbs = () => {
  const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbItem[]>([
    { name: 'Home', url: 'https://pasherdokan.shop/' }
  ]);

  React.useEffect(() => {
    const updateBreadcrumbs = () => {
      const hash = window.location.hash;
      const baseBreadcrumbs = [
        { name: 'Home', url: 'https://pasherdokan.shop/' }
      ];

      switch (hash) {
        case '#features':
          setBreadcrumbs([
            ...baseBreadcrumbs,
            { name: 'Features', url: 'https://pasherdokan.shop/#features', current: true }
          ]);
          break;
        case '#team':
          setBreadcrumbs([
            ...baseBreadcrumbs,
            { name: 'Our Team', url: 'https://pasherdokan.shop/#team', current: true }
          ]);
          break;
        case '#contact':
          setBreadcrumbs([
            ...baseBreadcrumbs,
            { name: 'Contact Us', url: 'https://pasherdokan.shop/#contact', current: true }
          ]);
          break;
        case '#faq':
          setBreadcrumbs([
            ...baseBreadcrumbs,
            { name: 'FAQ', url: 'https://pasherdokan.shop/#faq', current: true }
          ]);
          break;
        case '#vision':
          setBreadcrumbs([
            ...baseBreadcrumbs,
            { name: 'Our Vision', url: 'https://pasherdokan.shop/#vision', current: true }
          ]);
          break;
        case '#milestones':
          setBreadcrumbs([
            ...baseBreadcrumbs,
            { name: 'Milestones', url: 'https://pasherdokan.shop/#milestones', current: true }
          ]);
          break;
        default:
          setBreadcrumbs(baseBreadcrumbs);
      }
    };

    // Update breadcrumbs on hash change
    updateBreadcrumbs();
    window.addEventListener('hashchange', updateBreadcrumbs);

    return () => {
      window.removeEventListener('hashchange', updateBreadcrumbs);
    };
  }, []);

  return breadcrumbs;
};

export default Breadcrumb;
