import React, { useState } from 'react';
import { MapPin, Wallet, Store, Smartphone, ShieldCheck, BarChart3, Truck, Zap, ArrowRight } from 'lucide-react';
import { features } from '../data/content';
import { motion } from 'framer-motion';

const FeatureIcon: React.FC<{ icon: string }> = ({ icon }) => {
  const iconMap: Record<string, React.ReactNode> = {
    MapPin: <MapPin size={24} />,
    Wallet: <Wallet size={24} />,
    Store: <Store size={24} />,
    Smartphone: <Smartphone size={24} />,
    ShieldCheck: <ShieldCheck size={24} />,
    BarChart3: <BarChart3 size={24} />,
    Truck: <Truck size={24} />,
    Zap: <Zap size={24} />
  };

  return (
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-primary-600 shadow-md relative group-hover:scale-105 transition-transform duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      <div className="relative z-10">
        {iconMap[icon] || <Store size={24} />}
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  
  return (
    <section id="features" className="py-28 bg-gradient-to-b from-white to-primary-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-primary-100/30 rounded-full opacity-60 blur-3xl -z-10"></div>
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-secondary-100/30 rounded-full opacity-60 blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="py-1.5 px-5 bg-primary-50 text-primary-700 font-semibold text-sm rounded-full shadow-sm border border-primary-100/50 inline-block mb-3">
              Powerful Features
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900"
          >
            Why Shop Owners <span className="text-primary-600 relative">
              Choose PasherDokan
              <span className="absolute bottom-1 left-0 w-full h-2 bg-primary-100/60 -z-10"></span>
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-gray-600"
          >
            Everything you need to take your local shop online and grow your business.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative"
              onMouseEnter={() => setHovered(feature.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`h-full bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] relative z-10 overflow-hidden ${hovered === feature.id ? 'border-primary-200' : ''}`}>
                {/* Subtle highlight effect when hovered */}
                <div className={`absolute inset-0 bg-gradient-to-br from-primary-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Feature number indicator */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                  {feature.id}
                </div>
                
                <FeatureIcon icon={feature.icon} />
                
                <h3 className="text-xl font-semibold mt-6 mb-4 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Enhanced CTA section */}
        <div className="mt-28 relative max-w-5xl mx-auto">
          {/* Decorative elements */}
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary-200/30 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-secondary-200/30 rounded-full blur-xl"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-2 shadow-xl relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-black rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            </div>
            
            {/* Inner content with glass effect */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 md:p-12 relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-white md:max-w-xl">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to grow your local shop business?</h3>
                  <p className="opacity-90 leading-relaxed text-lg">
                    Join thousands of shop owners already using PasherDokan to connect with nearby customers and increase sales.
                  </p>
                  
                  <ul className="mt-6 space-y-2">
                    {['Free for shop owners', 'Setup in minutes', 'No technical skills required'].map((item, index) => (
                      <li key={index} className="flex items-center text-white/90">
                        <div className="w-5 h-5 rounded-full bg-white/20 mr-3 flex items-center justify-center">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={() => window.open('https://play.google.com/store', '_blank')}
                  className="px-8 py-4 bg-white text-primary-600 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl group relative overflow-hidden min-w-[200px]"
                >
                  <div className="relative z-10 flex items-center justify-center">
                    <span>Get Started Free</span>
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;