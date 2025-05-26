import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, MessageCircleQuestion, HelpCircle, ExternalLink, ArrowRight, Filter, CheckCircle } from 'lucide-react';
import { faqs } from '../data/content';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQCategory {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredFAQs, setFilteredFAQs] = useState(faqs);
  
  const categories: FAQCategory[] = [
    { id: 'all', name: 'All Questions', icon: <Filter size={16} /> },
    { id: 'general', name: 'General', icon: <HelpCircle size={16} /> },
    { id: 'accounts', name: 'Accounts & Setup', icon: <CheckCircle size={16} /> },
    { id: 'payments', name: 'Payments & Billing', icon: <ExternalLink size={16} /> },
  ];
  
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  useEffect(() => {
    let results = faqs;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        faq => 
          faq.question.toLowerCase().includes(query) || 
          faq.answer.toLowerCase().includes(query)
      );
    }
    
    if (activeCategory !== 'all') {
      results = results.filter(faq => faq.category === activeCategory);
    }
    
    setFilteredFAQs(results);
  }, [searchQuery, activeCategory]);
  
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-primary-50/40 rounded-[100%] transform -translate-y-1/2 blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-secondary-50/40 rounded-full transform translate-y-1/3 blur-3xl opacity-60"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-3">
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary-50/80 text-primary-700 font-semibold text-sm tracking-wide">
              Support Center
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-5 text-gray-900 leading-tight">
            Frequently Asked <span className="relative text-primary-600 inline-block">
              Questions
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5C32 1.5 62 1.5 101.5 5.5C141 9.5 171 5.5 199 1.5" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="1" y1="5" x2="199" y2="5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4F46E5" stopOpacity="0.3"/>
                    <stop offset="0.5" stopColor="#4F46E5" stopOpacity="1"/>
                    <stop offset="1" stopColor="#4F46E5" stopOpacity="0.3"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about PasherDokan and how it can help your business grow in the digital marketplace.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {/* Search and filter container with enhanced visual design */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-10 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-50/40 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary-50/40 rounded-full blur-2xl"></div>
            
            <div className="relative flex flex-col md:flex-row gap-5">
              {/* Enhanced search bar */}
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-3.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all duration-200 focus:outline-none"
                  placeholder="Search for questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Clear search</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Category dropdown for mobile */}
              <div className="md:hidden relative">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="block w-full pl-4 pr-10 py-3.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all duration-200 focus:outline-none appearance-none"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Category filter tabs for desktop */}
            <div className="hidden md:block mt-5">
              <div className="inline-flex bg-gray-50 p-1.5 rounded-xl space-x-1.5">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                      activeCategory === category.id
                        ? 'bg-white text-primary-700 shadow-sm border border-gray-100'
                        : 'text-gray-600 hover:bg-white/50 border border-transparent'
                    }`}
                  >
                    <span className={activeCategory === category.id ? 'text-primary-600' : 'text-gray-400'}>
                      {category.icon}
                    </span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        
          {/* FAQ items with enhanced visuals */}
          <div className="space-y-5">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <motion.div 
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div
                    className={`bg-white rounded-xl overflow-hidden transition-all border ${
                      activeIndex === index 
                        ? 'shadow-lg border-primary-200' 
                        : 'shadow-sm border-gray-100 hover:shadow hover:border-gray-200'
                    }`}
                  >
                    <button
                      className="w-full text-left px-6 py-5 focus:outline-none flex justify-between items-center"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={activeIndex === index}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          activeIndex === index 
                            ? 'bg-primary-100 text-primary-700' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          <HelpCircle size={16} />
                        </div>
                        
                        <span className={`font-medium ${activeIndex === index ? 'text-primary-900' : 'text-gray-800'}`}>
                          {faq.question}
                        </span>
                      </div>
                      
                      <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        activeIndex === index 
                          ? 'bg-primary-50 text-primary-600 rotate-180' 
                          : 'bg-gray-50 text-gray-400'
                      }`}>
                        <ChevronDown size={16} />
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pt-0 pb-6">
                            <div className="pl-11 border-l-2 border-primary-100">
                              <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg">
                                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                
                                {/* Optional: Helper links or related questions */}
                                {faq.helpfulLinks && (
                                  <div className="mt-4 pt-4 border-t border-gray-100">
                                    <h4 className="text-sm font-semibold mb-3 text-gray-700">Related Resources</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {faq.helpfulLinks.map((link, i) => (
                                        <a 
                                          key={i} 
                                          href={link.url} 
                                          className="text-sm py-1.5 px-3 bg-white rounded-lg border border-gray-100 text-primary-600 hover:bg-primary-50 hover:border-primary-100 transition-colors flex items-center gap-1.5 shadow-sm"
                                        >
                                          <span>{link.text}</span>
                                          <ExternalLink size={12} />
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 text-gray-400 mb-6">
                  <MessageCircleQuestion size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">No matching questions found</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  Try adjusting your search or browse all categories to find what you're looking for.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-6 py-3 bg-primary-50 text-primary-700 font-medium rounded-lg hover:bg-primary-100 transition-colors inline-flex items-center gap-2"
                >
                  <Filter size={18} />
                  View All Questions
                </button>
              </motion.div>
            )}
          </div>
          
          {/* Enhanced Contact support CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-pattern-dots-light opacity-10"></div>
              
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10">
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Still have questions?</h3>
                  <p className="text-primary-100 max-w-lg">
                    Our dedicated support team is here to help you. Get in touch for personalized assistance with any questions about PasherDokan.
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center px-7 py-4 bg-white hover:bg-gray-50 text-primary-700 font-medium rounded-xl transition-all shadow-lg shadow-primary-700/20 hover:shadow-xl hover:shadow-primary-700/30 group"
                  >
                    Contact Support Team
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary-500 opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-primary-800 opacity-20 blur-3xl"></div>
            </div>
          </motion.div>
          
          {/* Quick stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  icon: <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                    <CheckCircle size={24} />
                  </div>,
                  title: '95% resolution rate',
                  description: 'Most queries resolved within 24 hours'
                },
                { 
                  icon: <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center">
                    <HelpCircle size={24} />
                  </div>,
                  title: '24/7 Support',
                  description: 'Round-the-clock assistance for your business'
                },
                { 
                  icon: <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <MessageCircleQuestion size={24} />
                  </div>,
                  title: '500+ questions',
                  description: 'Comprehensive knowledge base for all users'
                }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center gap-5"
                >
                  {stat.icon}
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">{stat.title}</h4>
                    <p className="text-gray-600 text-sm">{stat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}