import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Star, 
  TrendingUp, 
  ShoppingBag, 
  Award,
  CheckCircle,
  MapPin,
  Store,
  Globe,
  Building2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LiveStat {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}

const SocialProof: React.FC = () => {
  const { t } = useLanguage();
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  const liveStats: LiveStat[] = [
    {
      id: '1',
      icon: <Store className="w-5 h-5" />,
      label: t('socialProof.activeShops') || 'Active Local Shops',
      value: '12,847',
      trend: 'up',
      trendValue: '+247 today'
    },
    {
      id: '2',
      icon: <ShoppingBag className="w-5 h-5" />,
      label: t('socialProof.dailyOrders') || 'Daily Orders',
      value: '3,924',
      trend: 'up',
      trendValue: '+12%'
    },
    {
      id: '3',
      icon: <MapPin className="w-5 h-5" />,
      label: t('socialProof.areas') || 'Areas Covered',
      value: '64',
      trend: 'stable',
      trendValue: 'Districts'
    },
    {
      id: '4',
      icon: <Users className="w-5 h-5" />,
      label: t('socialProof.customers') || 'Happy Customers',
      value: '89,234',
      trend: 'up',
      trendValue: '+1.2K today'
    }
  ];

  const achievements = [
    {
      id: '1',
      title: t('socialProof.achievement1') || 'Top SME Platform 2024',
      description: t('socialProof.achievementDesc1') || 'Recognized as leading SME digitization platform',
      icon: <Award className="w-6 h-6" />,
      verified: true
    },
    {
      id: '2',
      title: t('socialProof.achievement2') || 'Bangladesh Digital Awards',
      description: t('socialProof.achievementDesc2') || 'Winner of Best Local Commerce Solution',
      icon: <Star className="w-6 h-6" />,
      verified: true
    },
    {
      id: '3',
      title: t('socialProof.achievement3') || 'Government Partnership',
      description: t('socialProof.achievementDesc3') || 'Official SME digitization partner',
      icon: <Building2 className="w-6 h-6" />,
      verified: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % liveStats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [liveStats.length]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/20 via-transparent to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary-200/30 to-primary-200/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block py-2 px-6 rounded-full bg-gradient-to-r from-primary-100 to-primary-50 border border-primary-200 text-primary-800 font-semibold text-sm mb-6"
          >
            {t('socialProof.badge') || 'Trusted by Thousands'}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight"
          >
            {t('socialProof.title') || 'Powering Bangladesh\'s Local Economy'}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            {t('socialProof.subtitle') || 'Join thousands of local businesses already growing with PasherDokan'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Live Statistics - Featured */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {t('socialProof.liveStats') || 'Live Platform Statistics'}
                    </h3>
                    <p className="text-gray-600">
                      {t('socialProof.liveStatsDesc') || 'Real-time data from our growing ecosystem'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {t('socialProof.live') || 'LIVE'}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {liveStats.map((stat, index) => (
                    <motion.div
                      key={stat.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative p-6 rounded-2xl border transition-all duration-500 hover:scale-105 ${
                        index === currentStatIndex
                          ? 'bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 shadow-lg shadow-primary-500/20'
                          : 'bg-white/50 border-gray-200 hover:border-gray-300 hover:bg-white/70'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 ${
                        index === currentStatIndex
                          ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {stat.icon}
                      </div>
                      
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${stat.id}-${index === currentStatIndex}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {stat.label}
                          </div>
                          {stat.trend && (
                            <div className={`flex items-center gap-1 text-xs font-medium ${
                              stat.trend === 'up' ? 'text-green-600' : 
                              stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                            }`}>
                              {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                              {stat.trend === 'down' && <TrendingUp className="w-3 h-3 rotate-180" />}
                              {stat.trend === 'stable' && <Globe className="w-3 h-3" />}
                              {stat.trendValue}
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Achievements & Trust Indicators */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6"
            >
              <h4 className="text-lg font-bold text-gray-900 mb-6">
                {t('socialProof.achievements') || 'Recent Achievements'}
              </h4>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl hover:bg-white/50 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-gray-900 text-sm">
                          {achievement.title}
                        </h5>
                        {achievement.verified && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-4 translate-x-4"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-4 -translate-x-4"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Star className="w-6 h-6 fill-current text-yellow-300" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4.9/5</div>
                    <div className="text-sm text-primary-100">
                      {t('socialProof.rating') || 'Merchant Rating'}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-primary-100 mb-4 leading-relaxed">
                  {t('socialProof.ratingDesc') || 'Based on 2,847+ merchant reviews'}
                </p>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current text-yellow-300" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
