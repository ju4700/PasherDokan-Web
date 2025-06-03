import React from 'react';
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
  Building2
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
      startDate: 'June 2025',
      completionDate: 'July 2025'
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
    <section id="milestones" className="py-28 bg-gradient-to-b from-white to-primary-50/30 relative overflow-hidden">
      {/* Background decorative elements - matching Features component */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-primary-100/30 rounded-full opacity-60 blur-3xl -z-10"></div>
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-secondary-100/30 rounded-full opacity-60 blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header - matching Features component style */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="py-1.5 px-5 bg-primary-50 text-primary-700 font-semibold text-sm rounded-full shadow-sm border border-primary-100/50 inline-block mb-3">
              {t('milestones.badge') || 'Our Roadmap'}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900"
          >
            {t('milestones.title') || 'Project Milestones'} <span className="text-primary-600 relative">
              {t('milestones.titleSecond') || '& Future Plans'}
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            {t('milestones.subtitle') || 'A strategic, phased approach to building Bangladesh\'s leading hyperlocal e-commerce platform'}
          </motion.p>
        </div>

        {/* Milestones Grid - using Features component layout pattern */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon matching Features component style */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-primary-600 shadow-md relative group-hover:scale-105 transition-transform duration-300 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  <div className="relative z-10">
                    {milestone.icon}
                  </div>
                </div>

                {/* Status and Step */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-gray-500">Step {milestone.step}</span>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                    {getStatusIcon(milestone.status)}
                    <span className="capitalize">{milestone.status.replace('-', ' ')}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary-600 transition-colors">
                  {milestone.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {milestone.description}
                </p>
                
                {/* Timeline */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Timeline</span>
                  </div>
                  <p className="text-sm text-gray-900 font-semibold">{milestone.timeline}</p>
                </div>

                {/* Progress bar for in-progress items */}
                {milestone.status === 'in-progress' && milestone.progress && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-500">{milestone.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-1000"
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary-600" />
                    <span className="text-primary-600 font-semibold">{milestone.target}</span>
                  </div>
                  
                  {/* Subtle highlight effect when hovered - from Features */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-primary-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>
                  
                  {/* Feature number indicator - from Features */}
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                    {milestone.step}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Plans - using similar grid layout */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="py-1.5 px-5 bg-secondary-50 text-secondary-700 font-semibold text-sm rounded-full shadow-sm border border-secondary-100/50 inline-block mb-3">
              {t('futurePlans.badge') || 'Future Vision'}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('futurePlans.title') || 'Future Plans'} <span className="text-secondary-600">& Features</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('futurePlans.subtitle') || 'Ambitious plans to enhance and expand the platform beyond our initial milestones'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {futurePlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
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
                    <span className="text-xs text-gray-500">Learn More</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                {/* Highlight effect - from Features */}
                <div className={`absolute inset-0 bg-gradient-to-br from-secondary-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Milestones;
