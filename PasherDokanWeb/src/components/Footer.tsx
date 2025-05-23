import React from 'react';
import { Twitter, Instagram, Linkedin, Facebook, ShoppingBag, ChevronRight, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
      <footer className="relative bg-gradient-to-br from-blue-50/90 via-white to-purple-50/20 pt-16 pb-0 overflow-hidden">
      {/* Background elements for consistency with navbar */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[40%] h-[300px] bg-gradient-to-br from-primary-100/20 to-primary-200/10 rounded-[40%] blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[300px] bg-gradient-to-tr from-secondary-100/20 to-secondary-200/10 rounded-[40%] blur-3xl"></div>
      </div>

      {/* Main footer container that "sticks out" from bottom */}
      <div className="flex justify-center">
        <div className="backdrop-blur-lg bg-white/90 rounded-t-[2.5rem] shadow-xl border-x border-t border-gray-100/50 max-w-7xl w-[88%] px-8 pt-10 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Company section */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6 group">
                {/* Logo with glass effect matching navbar */}
                <div className="relative w-11 h-11 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-md transition-all group-hover:shadow-primary-300/30 group-hover:scale-105">
                  <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
                  <ShoppingBag size={18} className="transition-transform group-hover:scale-90 relative z-10" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent transition-all group-hover:tracking-wide">
                  <span className="opacity-90 hover:opacity-100"></span><span className="font-extrabold">PasherDokan</span>
                </span>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                PasherDokan connects local shops with nearby customers, 
                creating a digital ecosystem that preserves the charm of local 
                shopping while adding the convenience of technology.
              </p>
              
              {/* Social media links with refined styling */}
              <div className="flex space-x-3">
                {[
                  { icon: <Facebook size={16} />, color: "from-blue-500 to-blue-600" },
                  { icon: <Instagram size={16} />, color: "from-pink-500 to-purple-600" },
                  { icon: <Twitter size={16} />, color: "from-blue-400 to-blue-500" },
                  { icon: <Linkedin size={16} />, color: "from-blue-600 to-blue-700" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-gray-100 flex items-center justify-center transition-all hover:-translate-y-1 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" style={{backgroundImage: `linear-gradient(to right, var(--tw-gradient-${social.color.split(' ')[0].split('-')[1]}-stops))`}}></div>
                    <span className="relative z-10 text-gray-600 group-hover:text-white transition-colors">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Links sections with enhanced styling */}
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold mb-5 text-gray-800 relative inline-block">
                Company
                <span className="absolute -bottom-1 left-0 w-1/2 h-[3px] bg-gradient-to-r from-primary-400 to-primary-300 rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {["About", "Careers", "Blog", "Press"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors text-sm group flex items-center">
                      <ChevronRight size={12} className="mr-1.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold mb-5 text-gray-800 relative inline-block">
                Support
                <span className="absolute -bottom-1 left-0 w-1/2 h-[3px] bg-gradient-to-r from-primary-400 to-primary-300 rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {["Help Center", "Contact Us", "Guides", "Community"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors text-sm group flex items-center">
                      <ChevronRight size={12} className="mr-1.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-3">
              <h4 className="text-lg font-semibold mb-5 text-gray-800 relative inline-block">
                Contact Us
                <span className="absolute -bottom-1 left-0 w-1/2 h-[3px] bg-gradient-to-r from-primary-400 to-primary-300 rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 mr-3 mt-0.5 flex-shrink-0">
                    <MapPin size={14} />
                  </div>
                  <span className="text-sm text-gray-600">
                   Oxygen,<br />Chittagong, Bangladesh
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 mr-3 flex-shrink-0">
                    <Mail size={14} />
                  </div>
                  <a href="mailto:hello@pasherdonkan.com" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                    hello@pasherdonkan.com
                  </a>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 mr-3 flex-shrink-0">
                    <Phone size={14} />
                  </div>
                  <a href="tel:+8801234567890" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                    +880 123 456 7890
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Integrated copyright section */}
          <div className="mt-10 pt-6 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
            <p>© {currentYear} PasherDokan. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex items-center gap-6">
              <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
              <select className="bg-white/80 backdrop-blur-sm rounded-full py-1.5 px-3 text-xs border border-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-300 shadow-sm transition-shadow">
                <option value="en">English</option>
                <option value="bn">Bengali</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;