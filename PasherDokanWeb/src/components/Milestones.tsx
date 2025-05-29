import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  MapPin, 
  TrendingUp,
  CheckCircle,
  Clock,
  ArrowRight,
  Store,
  UserPlus,
  BarChart3,
  Calendar,
  Award,
  Building2,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Milestone {
  id: string;
  step: number;
  title: string;
  description: string;
  target: string;
  timeline: string;
  keyMetrics: string[];
  risks: string[];
  icon: React.ReactNode;
  status: 'completed' | 'in-progress' | 'upcoming';
  progress?: number;
  completionDate?: string;
  startDate?: string;
}

interface FuturePlan {
  id: string;
  title: string;
  description: string;
  timeline: string;
  icon: React.ReactNode;
  category: 'core' | 'analytics' | 'expansion';
  priority: 'high' | 'medium' | 'low';
}

const Milestones: React.FC = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(1);

  const milestones: Milestone[] = [
    {
      id: '1',
      step: 1,
      title: t('milestones.step1.title') || 'Beta Testing Phase',
      description: t('milestones.step1.description') || 'Conduct comprehensive testing with 100 carefully selected shopkeepers in Chattogram to validate core functionality and gather user feedback.',
      target: '100 Beta Shopkeepers',
      timeline: 'Q2 2025 (3 months)',
      keyMetrics: ['App performance metrics', 'User engagement rates', 'Feature adoption', 'Critical bug reports'],
      risks: ['Low adoption rate', 'Technical issues', 'Market readiness'],
      icon: <Store className="w-6 h-6" />,
      status: 'in-progress',
      progress: 35,
      startDate: 'April 2025',
      completionDate: 'June 2025'
    },
    {
      id: '2',
      step: 2,
      title: t('milestones.step2.title') || 'Customer Acquisition',
      description: t('milestones.step2.description') || 'Launch targeted digital marketing campaigns and referral programs to onboard 10,000 verified customers across Chattogram metropolitan area.',
      target: '10,000 Active Customers',
      timeline: 'Q3-Q4 2025 (6 months)',
      keyMetrics: ['Customer acquisition cost', 'Monthly active users', 'Order frequency', 'Customer retention rate'],
      risks: ['High acquisition costs', 'Competition response', 'Seasonal variations'],
      icon: <UserPlus className="w-6 h-6" />,
      status: 'upcoming',
      progress: 0,
      startDate: 'July 2025',
      completionDate: 'December 2025'
    },
    {
      id: '3',
      step: 3,
      title: t('milestones.step3.title') || 'Geographic Expansion',
      description: t('milestones.step3.description') || 'Systematically expand to 400 localities within Chattogram division, establishing hyperlocal presence and supply chain networks.',
      target: '400 Service Areas',
      timeline: 'Q1-Q2 2026 (6 months)',
      keyMetrics: ['Geographic coverage', 'Delivery success rate', 'Local partnerships', 'Revenue per area'],
      risks: ['Logistics challenges', 'Local competition', 'Regulatory compliance'],
      icon: <MapPin className="w-6 h-6" />,
      status: 'upcoming',
      progress: 0,
      startDate: 'January 2026',
      completionDate: 'June 2026'
    },
    {
      id: '4',
      step: 4,
      title: t('milestones.step4.title') || 'Market Leadership',
      description: t('milestones.step4.description') || 'Achieve 30% market penetration in Chattogram\'s hyperlocal commerce sector through strategic partnerships and superior service delivery.',
      target: '30% Market Share',
      timeline: 'Q3-Q4 2026 (6 months)',
      keyMetrics: ['Market share percentage', 'Revenue growth', 'Partner satisfaction', 'Brand recognition'],
      risks: ['Market saturation', 'Economic downturn', 'Technology disruption'],
      icon: <TrendingUp className="w-6 h-6" />,
      status: 'upcoming',
      progress: 0,
      startDate: 'July 2026',
      completionDate: 'December 2026'
    }
  ];

  const futurePlans: FuturePlan[] = [
    {
      id: '1',
      title: t('futurePlans.shopkeeperRetailer.title') || 'Shopkeeper-Retailer Connections',
      description: t('futurePlans.shopkeeperRetailer.description') || 'Facilitate direct links between shopkeepers and retailers to streamline supply chains and reduce procurement costs by 15-20%.',
      timeline: 'Q2 2027 (4 months)',
      icon: <Building2 className="w-5 h-5" />,
      category: 'core',
      priority: 'high'
    },
    {
      id: '2',
      title: t('futurePlans.customerPolls.title') || 'Advanced Analytics Suite',
      description: t('futurePlans.customerPolls.description') || 'Comprehensive data analytics including customer polls, demand forecasting, and market trend analysis for informed decision-making.',
      timeline: 'Q1 2027 (3 months)',
      icon: <BarChart3 className="w-5 h-5" />,
      category: 'analytics',
      priority: 'high'
    },
    {
      id: '3',
      title: t('futurePlans.inventoryManagement.title') || 'AI-Powered Inventory Management',
      description: t('futurePlans.inventoryManagement.description') || 'Machine learning-driven inventory optimization with automated reordering and demand prediction capabilities.',
      timeline: 'Q3 2027 (5 months)',
      icon: <Award className="w-5 h-5" />,
      category: 'core',
      priority: 'medium'
    },
    {
      id: '4',
      title: t('futurePlans.profitLoss.title') || 'Financial Intelligence Platform',
      description: t('futurePlans.profitLoss.description') || 'Real-time P&L tracking, cash flow management, and financial health scoring with integrated accounting features.',
      timeline: 'Q4 2027 (4 months)',
      icon: <TrendingUp className="w-5 h-5" />,
      category: 'analytics',
      priority: 'high'
    },
    {
      id: '5',
      title: t('futurePlans.expansion.title') || 'Multi-Country Expansion',
      description: t('futurePlans.expansion.description') || 'Strategic expansion to Nepal, Bhutan, and Sri Lanka with localized features and partnerships, targeting 500,000+ SMEs.',
      timeline: 'Q1-Q4 2028 (12 months)',
      icon: <MapPin className="w-5 h-5" />,
      category: 'expansion',
      priority: 'medium'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'from-blue-500 to-blue-600';
      case 'analytics': return 'from-purple-500 to-purple-600';
      case 'expansion': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary-100/20 via-transparent to-transparent"></div>
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
            {t('milestones.badge') || 'Our Roadmap'}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight"
          >
            {t('milestones.title') || 'Project Milestones & Future Plans'}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            {t('milestones.subtitle') || 'A strategic, phased approach to building Bangladesh\'s leading hyperlocal e-commerce platform'}
          </motion.p>
        </div>

        {/* Milestones Timeline */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            {t('milestones.milestonesTitle') || 'Development Milestones'}
          </motion.h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-200 via-primary-300 to-gray-200 rounded-full hidden lg:block"></div>
            
            <div className="space-y-8 lg:space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  onMouseEnter={() => setActiveStep(milestone.step)}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 ${
                      activeStep === milestone.step ? 'scale-105 shadow-primary-500/20' : ''
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(milestone.status)}`}>
                          {milestone.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-500">Step {milestone.step}</span>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                              {getStatusIcon(milestone.status)}
                              <span className="capitalize">{milestone.status.replace('-', ' ')}</span>
                            </div>
                          </div>
                          <h4 className="text-xl font-bold text-gray-900">{milestone.title}</h4>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6">{milestone.description}</p>
                      
                      {/* Professional Details */}
                      <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">Timeline</span>
                        </div>
                        <p className="text-sm text-gray-900 font-semibold">{milestone.timeline}</p>
                        {milestone.startDate && (
                          <p className="text-xs text-gray-600 mt-1">Start: {milestone.startDate}</p>
                        )}
                      </div>

                      {/* Key Metrics */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <BarChart3 className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">Key Performance Indicators</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {milestone.keyMetrics.map((metric, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                              <span className="text-gray-600">{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Risk Assessment */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-gray-700">Risk Factors</span>
                        </div>
                        <div className="space-y-1">
                          {milestone.risks.map((risk, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                              <span className="text-gray-600">{risk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary-600" />
                          <span className="text-primary-600 font-semibold">{milestone.target}</span>
                        </div>
                        {milestone.status === 'in-progress' && milestone.progress && (
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-1000"
                                style={{ width: `${milestone.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500">{milestone.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10 hidden lg:block">
                    <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                      milestone.status === 'completed' ? 'bg-green-500 border-green-200' :
                      milestone.status === 'in-progress' ? 'bg-blue-500 border-blue-200' :
                      'bg-gray-300 border-gray-200'
                    } ${activeStep === milestone.step ? 'scale-110 shadow-lg' : ''}`}>
                      <span className="text-white font-bold text-lg">{milestone.step}</span>
                    </div>
                  </div>

                  {/* Spacer for alternate layout */}
                  <div className="flex-1 hidden lg:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Future Plans */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('futurePlans.title') || 'Future Plans & Features'}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('futurePlans.subtitle') || 'Ambitious plans to enhance and expand the platform beyond our initial milestones'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futurePlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(plan.category)} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {plan.icon}
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {plan.title}
                </h4>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {plan.description}
                </p>
                
                {/* Timeline Details */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-xs font-medium text-gray-700">Timeline</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      plan.priority === 'high' ? 'bg-red-100 text-red-700' :
                      plan.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {plan.priority} priority
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{plan.timeline}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    plan.category === 'core' ? 'bg-blue-100 text-blue-700' :
                    plan.category === 'analytics' ? 'bg-purple-100 text-purple-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {plan.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">View Details</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
            
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {t('milestones.cta.title') || 'Be Part of the Journey'}
              </h3>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                {t('milestones.cta.description') || 'Join us as we build Bangladesh\'s future of hyperlocal commerce. Every milestone brings us closer to empowering millions of SMEs.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg">
                  {t('milestones.cta.joinWaitlist') || 'Join Waitlist'}
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                  {t('milestones.cta.learnMore') || 'Learn More'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Milestones;
