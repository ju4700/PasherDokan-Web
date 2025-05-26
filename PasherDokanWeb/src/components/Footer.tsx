import React from 'react';
import { Twitter, Instagram, Linkedin, Facebook, ChevronRight, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gradient-to-br from-blue-50/90 via-white to-purple-50/20 pt-20 pb-0 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[40%] h-[400px] bg-gradient-to-br from-primary-100/30 to-primary-200/15 rounded-[40%] blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[400px] bg-gradient-to-tr from-secondary-100/30 to-secondary-200/15 rounded-[40%] blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[200px] bg-gradient-to-r from-primary-50/20 to-secondary-50/20 rounded-[50%] blur-2xl"></div>
      </div>

      {/* Main footer container */}
      <div className="flex justify-center">
        <div className="backdrop-blur-xl bg-white/95 rounded-t-[3rem] shadow-2xl border-x border-t border-gray-100/60 max-w-7xl w-[90%] px-10 pt-12 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Company section - Enhanced */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-4 mb-8 group">
                {/* Custom logo */}
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 backdrop-blur-sm border border-primary-200/30 flex items-center justify-center transition-all group-hover:shadow-lg group-hover:shadow-primary-300/20 group-hover:scale-105">
                  <img 
                    src="/images/icon.png" 
                    alt="PasherDokan Logo" 
                    className="w-8 h-8 object-contain transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent transition-all group-hover:tracking-wide">
                    PasherDokan
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5 tracking-wider uppercase">The Hyper-Local Marketplace</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                Bridging the gap between traditional local commerce and modern digital convenience. 
                We empower local businesses to thrive in the digital age while preserving the 
                personal touch of neighborhood shopping.
              </p>
              
              {/* Enhanced social media links */}
              <div className="space-y-4">
                <h5 className="text-sm font-semibold text-gray-800 mb-3">Follow Us</h5>
                <div className="flex space-x-4">
                  {[
                    { icon: <Facebook size={18} />, label: "Facebook", color: "hover:bg-blue-500" },
                    { icon: <Instagram size={18} />, label: "Instagram", color: "hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600" },
                    { icon: <Twitter size={18} />, label: "Twitter", color: "hover:bg-blue-400" },
                    { icon: <Linkedin size={18} />, label: "LinkedIn", color: "hover:bg-blue-600" }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href="#" 
                      className={`w-12 h-12 rounded-xl bg-white shadow-md hover:shadow-xl border border-gray-100 flex items-center justify-center transition-all hover:-translate-y-1 group ${social.color}`}
                      aria-label={social.label}
                    >
                      <span className="text-gray-600 group-hover:text-white transition-colors">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-bold mb-6 text-gray-800 relative inline-block">
                Company
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                {[
                  { name: "About Us", href: "#" },
                  { name: "Careers", href: "#" },
                  { name: "Press & Media", href: "#" },
                  { name: "Partnerships", href: "#" },
                  { name: "Investor Relations", href: "#" }
                ].map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="text-gray-600 hover:text-primary-600 transition-all text-sm group flex items-center">
                      <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary-500" />
                      <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support Links */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-bold mb-6 text-gray-800 relative inline-block">
                Support
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                {[
                  { name: "Help Center", href: "#" },
                  { name: "Contact Support", href: "#" },
                  { name: "User Guides", href: "#" },
                  { name: "Community Forum", href: "#" },
                  { name: "API Documentation", href: "#" }
                ].map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="text-gray-600 hover:text-primary-600 transition-all text-sm group flex items-center">
                      <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary-500" />
                      <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Information */}
            <div className="lg:col-span-4">
              <h4 className="text-lg font-bold mb-6 text-gray-800 relative inline-block">
                Get In Touch
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"></span>
              </h4>
              
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-start group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100 flex items-center justify-center text-primary-600 mr-4 mt-0.5 flex-shrink-0 group-hover:shadow-md transition-shadow">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Address</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Oxygen, Chittagong, Bangladesh
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100 flex items-center justify-center text-primary-600 mr-4 flex-shrink-0 group-hover:shadow-md transition-shadow">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Email</p>
                      <a href="mailto:pasherdokanofficial@gmail.com" className="text-sm text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1 mt-1">
                        pasherdokanofficial@gmail.com
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100 flex items-center justify-center text-primary-600 mr-4 flex-shrink-0 group-hover:shadow-md transition-shadow">
                      <Phone size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Phone</p>
                      <a href="tel:+8801234567890" className="text-sm text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1 mt-1">
                        +880 123 456 7890
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced footer bottom */}
          <div className="mt-12 pt-8 border-t border-gray-200/60">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <p className="text-gray-600 text-sm">© {currentYear} PasherDokan. All rights reserved.</p>
                <div className="flex items-center gap-6 text-sm">
                  <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Privacy Policy</a>
                  <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Terms of Service</a>
                  <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Cookie Policy</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <select className="bg-white/90 backdrop-blur-sm rounded-xl py-2 px-4 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 shadow-sm transition-all hover:shadow-md">
                  <option value="en">🇺🇸 English</option>
                  <option value="bn">🇧🇩 Bengali</option>
                </select>
                
                <div className="text-xs text-gray-500">
                  Made with ❤️ in Bangladesh
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;