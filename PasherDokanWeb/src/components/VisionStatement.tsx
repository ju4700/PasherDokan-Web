import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, TrendingUp, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const VisionStatement: React.FC = () => {
  const { t } = useLanguage();

  const visionPoints = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: t('vision.mission.title') || "Our Mission",
      description: t('vision.mission.description') || "Empowering local shops in Bangladesh to thrive in the digital age while preserving their community roots and customer relationships.",
      stat: "96,000 SMEs",
      statLabel: "Target Market"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('vision.hyperlocal.title') || "Hyperlocal Focus",
      description: t('vision.hyperlocal.description') || "Starting with 100 pilot shopkeepers in Chattogram, building the foundation for neighborhood-based commerce across Bangladesh.",
      stat: "Chattogram First",
      statLabel: "Pilot Launch"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t('vision.market.title') || "Market Impact",
      description: t('vision.market.description') || "Targeting a $6 billion addressable market, helping SMEs that comprise 80% of Bangladesh's retail landscape.",
      stat: "$6B Market",
      statLabel: "Opportunity"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('vision.community.title') || "Community First",
      description: t('vision.community.description') || "Preserving cash-on-pickup traditions while adding digital convenience - respecting how local customers prefer to shop.",
      stat: "Cash-Friendly",
      statLabel: "Local Preferences"
    }
  ];

  const marketInsights = [
    {
      percentage: "80%",
      label: t('vision.insights.sme.label') || "of Bangladesh retail are SMEs",
      description: t('vision.insights.sme.description') || "Massive untapped potential"
    },
    {
      percentage: "70%",
      label: t('vision.insights.coverage.label') || "shop coverage goal in Chattogram",
      description: t('vision.insights.coverage.description') || "Before nationwide expansion"
    },
    {
      percentage: "1.2M",
      label: t('vision.insights.outlets.label') || "total retail outlets in Bangladesh",
      description: t('vision.insights.outlets.description') || "Our long-term opportunity"
    }
  ];

  return (
    <section id="vision" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 -z-10"></div>
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary-50/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-secondary-50/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 -z-10"></div>
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-4">
            <span className="inline-block py-2 px-4 rounded-full bg-primary-50 text-primary-700 font-semibold text-sm tracking-wide">
              {t('vision.badge') || 'Our Vision'}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            {t('vision.title') || 'Building Bangladesh\'s'} 
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Hyperlocal Future</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {t('vision.subtitle') || 'We\'re not just another e-commerce platform. We\'re creating a digital ecosystem that empowers local shops while preserving the authentic community connections that make neighborhood commerce special.'}
          </p>
        </motion.div>

        {/* Vision Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {visionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 h-full hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {point.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{point.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{point.description}</p>
                    
                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-3 border border-primary-100">
                      <div className="text-sm font-semibold text-primary-700">{point.stat}</div>
                      <div className="text-xs text-primary-600">{point.statLabel}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Market Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('vision.insights.title') || 'Market Insights'}</h3>
              <p className="text-primary-100 text-lg">{t('vision.insights.subtitle') || 'Why we\'re building PasherDokan for Bangladesh\'s SME ecosystem'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {marketInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-300">
                    {insight.percentage}
                  </div>
                  <div className="text-lg font-semibold text-white mb-2">
                    {insight.label}
                  </div>
                  <div className="text-sm text-primary-100">
                    {insight.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary-100 to-secondary-200 text-secondary-600 flex items-center justify-center">
                <Target className="w-8 h-8" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('vision.cta.title') || 'Be Part of the Revolution'}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('vision.cta.description') || 'We\'re launching our pilot program in Chattogram with 100 selected shop owners. Join our early access list to be among the first to transform your local business.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                {t('vision.cta.joinPilot') || 'Join Pilot Program'}
              </button>
              <button className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300">
                {t('vision.cta.learnMore') || 'Learn More'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionStatement;
