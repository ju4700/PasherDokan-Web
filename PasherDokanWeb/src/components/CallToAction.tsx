import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Download, Star, CheckCircle, Mail, User, Building, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AppStoreBadge: React.FC<{ platform: 'ios' | 'android', className?: string, t: (key: string) => string }> = ({ platform, className, t }) => {
  const store = platform === 'ios' ? 'App Store' : 'Google Play';
  const icon = platform === 'ios' ? (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91-.83 0-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53c-1.72 3-.45 7.37 1.28 9.79.86 1.22 1.88 2.6 3.24 2.56 1.3-.05 1.77-.82 3.33-.82 1.56 0 2 .82 3.38.79 1.39-.05 2.28-1.24 3.13-2.46a10.07 10.07 0 0 0 1.4-2.87 4.4 4.4 0 0 1-2.69-4.02z"></path>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="m12 15.5-8.2-5.5H12V4.12L3.26 9.8a1 1 0 0 0 0 1.7l8.74 5.88V15.5zm1.06 3.89L21.8 13.8a1 1 0 0 0 0-1.61L13.06 6.5v12.89z"></path>
    </svg>
  );

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all cursor-pointer hover:shadow-lg hover:scale-102 duration-300 ${className}`}>
      <div className="flex-shrink-0 w-10 h-10 rounded-md bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-gray-400">{t('cta.downloadOn')}</span>
        <span className="font-semibold text-white">{store}</span>
      </div>
    </div>
  );
};

const Tab: React.FC<{ id: string, label: string, icon: React.ReactNode, active: boolean, onClick: () => void }> = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-medium transition-all ${
      active
        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
        : 'bg-white text-gray-600 hover:bg-gray-50'
    }`}
  >
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
      active ? 'bg-white/20 text-white' : 'bg-gray-100 text-primary-600'
    }`}>
      {icon}
    </div>
    {label}
  </button>
);

const SignupForm: React.FC<{ t: (key: string) => string }> = ({ t }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    businessType: '',
  });
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess(true);
    setSubmitting(false);
  };
  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Form Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-pattern-dots opacity-10 z-0"></div>
        <div className="relative z-10 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">{t('cta.formTitle')}</h3>
          <p className="text-primary-100">{t('cta.formSubtitle')}</p>
          
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/20 rounded-full mt-4 overflow-hidden">
            <motion.div 
              initial={{ width: `${(step-1) * 50}%` }}
              animate={{ width: `${step * 50}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-white"
            />
          </div>
          
          {/* Step indicator */}
          <div className="flex justify-between mt-2 text-xs text-primary-100">
            <span className={step >= 1 ? 'text-white font-medium' : ''}>{t('cta.basicInfo')}</span>
            <span className={step >= 2 ? 'text-white font-medium' : ''}>{t('cta.businessDetails')}</span>
          </div>
        </div>
      </div>
      
      {/* Form Body */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-8 px-4"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('cta.successTitle')}</h3>
              <p className="text-gray-600 mb-6">
                {t('cta.successMessage')}
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <AppStoreBadge platform="android" t={t} />
                <AppStoreBadge platform="ios" t={t} />
              </div>
            </motion.div>
          ) : (
            <motion.form
              key={`step-${step}`}
              initial={{ opacity: 0, x: step === 1 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: step === 1 ? 20 : -20 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {step === 1 && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('cta.yourName')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <User size={18} />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder={t('cta.namePlaceholder')}
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('cta.emailAddress')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Mail size={18} />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder={t('cta.emailPlaceholder')}
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3.5 px-6 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg shadow-primary-600/20"
                    >
                      {t('cta.continue')}
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </>
              )}
              
              {step === 2 && (
                <>
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('cta.businessType')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Building size={18} />
                      </div>
                      <select
                        id="businessType"
                        name="businessType"
                        required
                        value={formState.businessType}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all appearance-none"
                      >
                        <option value="">{t('cta.businessPlaceholder')}</option>
                        <option value="retail">{t('cta.retailStore')}</option>
                        <option value="restaurant">{t('cta.restaurant')}</option>
                        <option value="service">{t('cta.serviceProvider')}</option>
                        <option value="other">{t('cta.other')}</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Feature selection checkboxes */}
                  <div className="space-y-3 pt-3">
                    <p className="text-sm font-medium text-gray-700">{t('cta.featuresInterested')}</p>
                    {[
                      { key: 'cta.inventoryManagement', value: 'Inventory Management' },
                      { key: 'cta.onlineOrders', value: 'Online Orders' },
                      { key: 'cta.customerLoyalty', value: 'Customer Loyalty' },
                      { key: 'cta.analytics', value: 'Analytics' }
                    ].map(feature => (
                      <label key={feature.value} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary-100 hover:bg-primary-50/20 cursor-pointer transition-all">
                        <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500 h-5 w-5" />
                        <span className="text-gray-700">{t(feature.key)}</span>
                      </label>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3.5 px-6 rounded-xl flex justify-center items-center transition-all"
                    >
                      {t('cta.back')}
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-2/3 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3.5 px-6 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg shadow-primary-600/20"
                    >
                      {submitting ? (
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      ) : (
                        <>
                          {t('cta.getStarted')}
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const CallToAction: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('shopOwners');
  
  const features = {
    shopOwners: [
      { label: t('cta.attractCustomers'), icon: <Star size={18} /> },
      { label: t('cta.manageInventory'), icon: <Star size={18} /> },
      { label: t('cta.trackSales'), icon: <Star size={18} /> },
      { label: t('cta.acceptPayments'), icon: <Star size={18} /> }
    ],
    suppliers: [
      { label: t('cta.connectRetailers'), icon: <Star size={18} /> },
      { label: t('cta.streamlineDistribution'), icon: <Star size={18} /> },
      { label: t('cta.reduceInventory'), icon: <Star size={18} /> },
      { label: t('cta.growNetwork'), icon: <Star size={18} /> }
    ]
  };
  
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary-50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-50 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block py-2 px-5 rounded-full bg-primary-100 text-primary-800 font-semibold text-sm mb-4"
          >
            {t('cta.badge')}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            {t('cta.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t('cta.subtitle')}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column - Form */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <SignupForm t={t} />
              
              {/* Pre-launch indicator */}
              <div className="mt-8 flex items-center p-4 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 shadow-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-white mr-4">
                  <Star size={20} fill="currentColor" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-700 mb-1">
                    {t('cta.preLaunchTitle')}
                  </p>
                  <p className="text-sm text-primary-600">
                    {t('cta.preLaunchMessage')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Features */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
            >
              {/* Tabs */}
              <div className="flex gap-3 p-4 bg-gray-50 border-b border-gray-100">
                <Tab 
                  id="shopOwners"
                  label={t('cta.forShopOwners')} 
                  icon={<Building size={18} />}
                  active={activeTab === 'shopOwners'}
                  onClick={() => setActiveTab('shopOwners')}
                />
                <Tab 
                  id="suppliers"
                  label={t('cta.forSuppliersUpcoming')} 
                  icon={<Download size={18} />}
                  active={activeTab === 'suppliers'}
                  onClick={() => setActiveTab('suppliers')}
                />
              </div>
              
              <div className="p-8">
                {/* Feature showcase */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatePresence mode="wait">
                    {features[activeTab === 'shopOwners' ? 'shopOwners' : 'suppliers'].map((feature, index) => (
                      <motion.div
                        key={`${activeTab}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all">
                            {feature.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-2">{feature.label}</h3>
                            <p className="text-sm text-gray-600">
                              {t('cta.featureDescription')}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                {/* App preview */}
                <div className="mt-10 bg-gradient-to-br from-gray-900 to-primary-900 rounded-xl p-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-grid-pattern-light opacity-[0.03]"></div>
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-white max-w-md">
                      <h3 className="text-xl font-bold mb-3">{t('cta.downloadMobileApp')}</h3>
                      <p className="text-gray-300 mb-6">{t('cta.mobileAppDescription')}</p>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <AppStoreBadge platform="android" t={t} />
                        <AppStoreBadge platform="ios" t={t} />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-600 to-primary-400 rounded-xl blur-2xl opacity-30"></div>
                      <div className="relative bg-gray-800 border-4 border-gray-700 rounded-3xl overflow-hidden w-56 h-96">
                        <div className="h-4 w-20 bg-black absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-lg z-10"></div>
                        <div className="bg-gradient-to-br from-primary-600 to-primary-800 h-full w-full">
                          {/* Mock app interface could be placed here */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;