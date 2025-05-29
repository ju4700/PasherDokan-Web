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
  const [isAnimating, setIsAnimating] = useState(false);

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
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStatIndex((prev) => (prev + 1) % liveStats.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [liveStats.length]);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-primary-50/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary-50/30 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block py-2 px-5 rounded-full bg-primary-100 text-primary-800 font-semibold text-sm mb-4"
          >
            {t('socialProof.badge') || 'Trusted by Thousands'}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            {t('socialProof.title') || 'Powering Bangladesh\'s Local Economy'}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            {t('socialProof.subtitle') || 'Join thousands of local businesses already growing with PasherDokan'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Live Statistics - Featured */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
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
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
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
                      className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                        index === currentStatIndex
                          ? 'bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 shadow-lg shadow-primary-500/10'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                        index === currentStatIndex
                          ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                          : 'bg-white text-gray-600 border border-gray-200'
                      }`}>
                        {stat.icon}
                      </div>
                      
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${stat.id}-${isAnimating}`}
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
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <h4 className="text-lg font-bold text-gray-900 mb-4">
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
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600 flex items-center justify-center flex-shrink-0">
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
                      <p className="text-xs text-gray-600">
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
              className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-lg font-bold">4.9/5</div>
                  <div className="text-sm text-primary-100">
                    {t('socialProof.rating') || 'Merchant Rating'}
                  </div>
                </div>
              </div>
              <p className="text-sm text-primary-100 mb-4">
                {t('socialProof.ratingDesc') || 'Based on 2,847+ merchant reviews'}
              </p>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current text-yellow-300" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
      category: 'milestone'
    },
    {
      id: '2',
      title: 'Best Startup Award 2024',
      description: 'Recognized as the most promising e-commerce platform for SMEs',
      icon: <Award className="w-6 h-6" />,
      date: 'March 2024',
      category: 'award'
    },
    {
      id: '3',
      title: 'Partnership with Local Banks',
      description: 'Strategic partnerships with major banks for seamless payment processing',
      icon: <CheckCircle className="w-6 h-6" />,
      date: 'February 2024',
      category: 'partnership'
    }
  ]);

  const [trustIndicators] = useState<TrustIndicator[]>([
    {
      id: '1',
      title: 'SSL Secured',
      description: 'Your data is protected with bank-level encryption',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      verified: true
    },
    {
      id: '2',
      title: 'BTRC Approved',
      description: 'Licensed and regulated by Bangladesh Telecommunication Regulatory Commission',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      verified: true
    },
    {
      id: '3',
      title: '24/7 Support',
      description: 'Round-the-clock customer support in Bengali and English',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      verified: true
    }
  ]);

  // Simulated live statistics
  const [liveStats, setLiveStats] = useState<LiveStat[]>([
    {
      id: '1',
      icon: <Users className="w-5 h-5" />,
      label: 'Active Users',
      value: '12,547',
      trend: 'up',
      trendValue: '+12%'
    },
    {
      id: '2',
      icon: <ShoppingBag className="w-5 h-5" />,
      label: 'Orders Today',
      value: '1,284',
      trend: 'up',
      trendValue: '+8%'
    },
    {
      id: '3',
      icon: <Star className="w-5 h-5" />,
      label: 'Average Rating',
      value: '4.8/5',
      trend: 'stable',
      trendValue: '±0%'
    },
    {
      id: '4',
      icon: <Globe className="w-5 h-5" />,
      label: 'Cities Served',
      value: '64',
      trend: 'up',
      trendValue: '+3'
    }
  ]);

  // Rotate through stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % liveStats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [liveStats.length]);

  // Simulate live updates to stats
  useEffect(() => {
    const updateStats = () => {
      setLiveStats(prev => prev.map(stat => {
        if (stat.id === '1') {
          // Simulate user count increase
          const currentValue = parseInt(stat.value.replace(',', ''));
          const newValue = currentValue + Math.floor(Math.random() * 5);
          return {
            ...stat,
            value: newValue.toLocaleString()
          };
        }
        if (stat.id === '2') {
          // Simulate order count increase
          const currentValue = parseInt(stat.value.replace(',', ''));
          const newValue = currentValue + Math.floor(Math.random() * 3);
          return {
            ...stat,
            value: newValue.toLocaleString()
          };
        }
        return stat;
      }));
    };

    const interval = setInterval(updateStats, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3" />;
      case 'down': return <TrendingUp className="w-3 h-3 rotate-180" />;
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Live Statistics */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
            >
              Live Platform Statistics
            </motion.h2>
            <p className="text-gray-600">Real-time data from our growing community</p>
          </div>

          {/* Desktop Stats Grid */}
          <div className="hidden md:grid grid-cols-4 gap-6 mb-8">
            {liveStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 text-center shadow-md border border-gray-200"
              >
                <div className="flex justify-center mb-3 text-primary-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {stat.label}
                </div>
                {stat.trend && (
                  <div className={`flex items-center justify-center gap-1 text-xs ${getTrendColor(stat.trend)}`}>
                    {getTrendIcon(stat.trend)}
                    <span>{stat.trendValue}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Stats Carousel */}
          <div className="md:hidden">
            <div className="relative bg-white rounded-lg p-6 text-center shadow-md border border-gray-200 h-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStatIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-6 flex flex-col justify-center"
                >
                  <div className="flex justify-center mb-2 text-primary-600">
                    {liveStats[currentStatIndex]?.icon}
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-1">
                    {liveStats[currentStatIndex]?.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {liveStats[currentStatIndex]?.label}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {liveStats.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStatIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStatIndex ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xl font-semibold text-gray-900 mb-2"
            >
              Trusted & Secure Platform
            </motion.h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 flex items-center gap-3 shadow-sm border border-gray-200"
              >
                {indicator.icon}
                <div>
                  <div className="font-medium text-gray-900 text-sm">
                    {indicator.title}
                  </div>
                  <div className="text-xs text-gray-600">
                    {indicator.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div>
          <div className="text-center mb-8">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xl font-semibold text-gray-900 mb-2"
            >
              Recent Achievements
            </motion.h3>
            <p className="text-gray-600">Milestones that showcase our growth and recognition</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">
                      {achievement.title}
                    </div>
                    <div className="text-xs text-primary-600 uppercase tracking-wide font-medium">
                      {achievement.category} • {achievement.date}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-2">
              Join Thousands of Successful Merchants
            </h3>
            <p className="text-primary-100 mb-6">
              Start your digital journey with Bangladesh's most trusted e-commerce platform
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
            >
              Get Started Today
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
