import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Localization strings
const translations = {
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.testimonials': 'Testimonials',
    'nav.team': 'Team',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.getStarted': 'Get Started',
    
    // Hero Section
    'hero.badge.targeting': 'Targeting',
    'hero.badge.localShops': '96,000 Local Shops',
    'hero.heading.transform': 'Transform Your',
    'hero.heading.localBusiness': 'Local Business',
    'hero.description': 'Revolutionizing Bangladesh\'s retail landscape by connecting local shopkeepers with nearby customers through our hyperlocal e-commerce platform. Empowering SMEs with digital tools while preserving cash-on-pickup convenience.',
    'hero.tabs.shopOwners': 'For Shop Owners',
    'hero.tabs.suppliers': 'For Suppliers & Retailers',
    'hero.features.shopOwners.discovery.title': 'Hyperlocal Discovery',
    'hero.features.shopOwners.discovery.description': 'Get discovered by customers within walking distance using OpenStreetMap',
    'hero.features.shopOwners.inventory.title': 'Smart Inventory Management',
    'hero.features.shopOwners.inventory.description': 'Automated stock tracking with real-time profit/loss per transaction',
    'hero.features.shopOwners.cashPickup.title': 'Cash-on-Pickup Orders',
    'hero.features.shopOwners.cashPickup.description': 'Accept preorders with customer-preferred cash payments',
    'hero.features.suppliers.network.title': 'Retailer Network Access',
    'hero.features.suppliers.network.description': 'Connect with 96,000+ local retailers across Bangladesh',
    'hero.features.suppliers.insights.title': 'Data-Driven Insights',
    'hero.features.suppliers.insights.description': 'Customer polls and demand analytics to inform product stocking',
    'hero.features.suppliers.distribution.title': 'Streamlined Distribution',
    'hero.features.suppliers.distribution.description': 'Efficient supply chain management for hyperlocal delivery',
    'hero.stats.targetShops': 'Target Shops',
    'hero.stats.marketSize': 'Market Size',
    'hero.stats.smeCoverage': 'SME Coverage',
    'hero.cta.googlePlay': 'Google Play',
    'hero.cta.downloadApk': 'Download APK',
    
    // Features
    'features.badge': 'Core Features',
    'features.title': 'Empowering Bangladesh\'s SME Ecosystem',
    'features.title.part1': 'Empowering Bangladesh\'s',
    'features.title.part2': 'SME Ecosystem',
    'features.subtitle': 'Revolutionizing hyperlocal commerce for 80% of Bangladesh\'s 1.2 million retail outlets through innovative technology.',
    'features.cta.title': 'Ready to Transform Your Business?',
    'features.cta.description': 'Join thousands of local businesses already growing with PasherDokan\'s innovative platform.',
    'features.cta.point1': 'Hyperlocal customer discovery',
    'features.cta.point2': 'Cash-on-pickup convenience',
    'features.cta.point3': 'Real-time analytics & insights',
    'features.cta.button': 'Get Started Today',
    
    // Milestones
    'milestones.badge': 'Our Roadmap',
    'milestones.title': 'Project Milestones & Future Plans',
    'milestones.subtitle': 'A strategic, phased approach to building Bangladesh\'s leading hyperlocal e-commerce platform',
    'milestones.milestonesTitle': 'Development Milestones',
    'milestones.step1.title': 'Focus on Shopkeepers',
    'milestones.step1.description': 'Test the app with 100 shopkeepers to validate functionality and gather feedback.',
    'milestones.step2.title': 'Shift to Customers',
    'milestones.step2.description': 'Launch social media marketing campaigns to attract 10,000 customers, expanding the user base.',
    'milestones.step3.title': 'Expand to Localities',
    'milestones.step3.description': 'Target 400 localities to establish a strong regional presence.',
    'milestones.step4.title': 'Scale in Chattogram',
    'milestones.step4.description': 'Achieve adoption in 70% of shops in Chattogram, marking a significant milestone in regional dominance.',
    'milestones.cta.title': 'Be Part of the Journey',
    'milestones.cta.description': 'Join us as we build Bangladesh\'s future of hyperlocal commerce. Every milestone brings us closer to empowering millions of SMEs.',
    'milestones.cta.joinWaitlist': 'Join Waitlist',
    'milestones.cta.learnMore': 'Learn More',
    'futurePlans.title': 'Future Plans & Features',
    'futurePlans.subtitle': 'Ambitious plans to enhance and expand the platform beyond our initial milestones',
    'futurePlans.shopkeeperRetailer.title': 'Shopkeeper-Retailer Connections',
    'futurePlans.shopkeeperRetailer.description': 'Facilitate direct links between shopkeepers and retailers to streamline supply chains.',
    'futurePlans.customerPolls.title': 'Customer Polls',
    'futurePlans.customerPolls.description': 'Introduce features allowing shopkeepers to conduct surveys, enabling data-driven product decisions.',
    'futurePlans.inventoryManagement.title': 'Enhanced Inventory Management',
    'futurePlans.inventoryManagement.description': 'Further develop in-app tools to simplify stock tracking and management.',
    'futurePlans.profitLoss.title': 'Live Profit/Loss Tracking',
    'futurePlans.profitLoss.description': 'Provide real-time financial insights per transaction to improve shopkeeper decision-making.',
    'futurePlans.expansion.title': 'Geographic Expansion',
    'futurePlans.expansion.description': 'Scale from Chattogram to all of Bangladesh, with potential expansion to other South Asian countries.',
    
    // Testimonials
    'testimonials.badge': 'Customer Stories',
    'testimonials.title': 'What Shop Owners Are Saying',
    'testimonials.subtitle': 'Real success stories from local businesses thriving with PasherDokan\'s digital tools.',
    'testimonials.featuredStory': 'Featured Story',
    'testimonials.previousTestimonial': 'Previous testimonial',
    'testimonials.nextTestimonial': 'Next testimonial',
    'testimonials.swipeHint': 'Swipe or tap',
    'testimonials.trustedBy': 'Trusted by local businesses across Bangladesh',
    
    // Team
    'team.badge': 'Our Team',
    'team.title': 'Founders Revolutionizing Bangladesh\'s SME Ecosystem',
    'team.subtitle': 'Visionary leaders building PasherDokan to empower 96,000 SMEs and transform Bangladesh\'s $6 billion retail landscape through hyperlocal innovation.',
    'team.viewFull': 'View Full Team',
    'team.coreValues': 'Our Core Mission',
    'team.smeEmpowerment': 'SME Empowerment',
    'team.hyperlocalFocus': 'Hyperlocal Focus',
    'team.marketRevolution': 'Market Revolution',
    'team.hiring': 'We\'re Hiring!',
    'team.joinTeam': 'Want to Join Our Amazing Team?',
    'team.sendResume': 'Send Your Resume',
    'team.learnMore': 'Learn More',
    
    // FAQ
    'faq.badge': 'Frequently Asked Questions',
    'faq.title': 'Everything You Need to Know',
    'faq.subtitle': 'Get instant answers to common questions about PasherDokan\'s hyperlocal platform.',
    'faq.searchPlaceholder': 'Search questions...',
    'faq.viewAll': 'View All Questions',
    'faq.contactSupport': 'Still have questions?',
    'faq.contactDesc': 'Can\'t find what you\'re looking for? Our team is here to help you succeed.',
    'faq.getHelp': 'Get Help',
    
    // Footer
    'footer.tagline': 'The Hyper-Local Marketplace',
    'footer.description': 'Revolutionizing Bangladesh\'s $6 billion retail landscape by empowering 96,000 SMEs through hyperlocal e-commerce solutions.',
    'footer.followUs': 'Follow Us',
    'footer.quickLinks': 'Quick Links',
    'footer.support': 'Support',
    'footer.getInTouch': 'Get In Touch',
    'footer.address': 'Address',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.madeWithLove': 'Made with ❤️ in Bangladesh',
    
    // CTA
    'cta.badge': 'Join the Revolution',
    'cta.title': 'Your SME, Digitally Empowered',
    'cta.subtitle': 'Be part of Bangladesh\'s hyperlocal revolution. Join 96,000 targeted SMEs transforming the $6 billion retail market with cash-on-pickup convenience and OpenStreetMap discovery.',
    'cta.formTitle': 'Start Your Digital Journey',
    'cta.formSubtitle': 'Join thousands of businesses already growing with PasherDokan.',
    'cta.yourName': 'Your Name',
    'cta.namePlaceholder': 'Jasim Uddin',
    'cta.emailAddress': 'Email Address',
    'cta.emailPlaceholder': 'you@example.com',
    'cta.businessType': 'Type of Business',
    'cta.businessPlaceholder': 'Select your business type',
    'cta.retailStore': 'Retail Store',
    'cta.restaurant': 'Restaurant',
    'cta.serviceProvider': 'Service Provider',
    'cta.other': 'Other',
    'cta.featuresInterested': 'What features are you most interested in?',
    'cta.inventoryManagement': 'Inventory Management',
    'cta.onlineOrders': 'Online Orders',
    'cta.customerLoyalty': 'Customer Loyalty',
    'cta.analytics': 'Analytics',
    'cta.continue': 'Continue',
    'cta.back': 'Back',
    'cta.getStarted': 'Get Started',
    'cta.basicInfo': 'Basic Info',
    'cta.businessDetails': 'Business Details',
    'cta.successTitle': 'You\'re all set!',
    'cta.successMessage': 'Thanks for signing up. We\'ll be in touch soon with next steps.',
    'cta.downloadOn': 'Download on',
    'cta.testimonialReviews': '400+ reviews',
    'cta.testimonialQuote': '"Transformed how I run my business. Customer service is excellent!"',
    'cta.forShopOwners': 'For Shop Owners',
    'cta.forSuppliersUpcoming': 'For Suppliers (Upcoming Feature)',
    'cta.attractCustomers': 'Attract more local customers',
    'cta.manageInventory': 'Manage inventory with ease',
    'cta.trackSales': 'Track sales in real-time',
    'cta.acceptPayments': 'Accept digital payments',
    'cta.connectRetailers': 'Connect with local retailers',
    'cta.streamlineDistribution': 'Streamline distribution',
    'cta.reduceInventory': 'Reduce excess inventory',
    'cta.growNetwork': 'Grow your business network',
    'cta.featureDescription': 'Powerful tools that help you streamline operations and grow your business.',
    'cta.downloadMobileApp': 'Download the mobile app',
    'cta.mobileAppDescription': 'Get the full PasherDokan experience on your smartphone. Manage your business anytime, anywhere.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.retry': 'Try Again',
    'common.close': 'Close',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
  },
  bn: {
    // Navigation - Bengali
    'nav.features': 'ফিচারসমূহ',
    'nav.testimonials': 'গ্রাহক মতামত',
    'nav.team': 'আমাদের টিম',
    'nav.faq': 'প্রশ্নোত্তর',
    'nav.contact': 'যোগাযোগ',
    'nav.getStarted': 'শুরু করুন',
    
    // Hero Section - Bengali
    'hero.badge.targeting': 'লক্ষ্য করছি',
    'hero.badge.localShops': '৯৬,০০০ স্থানীয় দোকান',
    'hero.heading.transform': 'আপনার',
    'hero.heading.localBusiness': 'স্থানীয় ব্যবসাকে রূপান্তরিত করুন',
    'hero.description': 'আমাদের হাইপারলোকাল ই-কমার্স প্ল্যাটফর্মের মাধ্যমে স্থানীয় দোকানদার এবং নিকটবর্তী গ্রাহকদের সংযুক্ত করে বাংলাদেশের খুচরা বাজারে বিপ্লব আনছি। ক্যাশ-অন-পিকআপ সুবিধা বজায় রেখে এসএমইদের ডিজিটাল টুলস দিয়ে ক্ষমতায়ন করছি।',
    'hero.tabs.shopOwners': 'দোকানদারদের জন্য',
    'hero.tabs.suppliers': 'সরবরাহকারী ও খুচরা বিক্রেতাদের জন্য',
    'hero.features.shopOwners.discovery.title': 'হাইপারলোকাল আবিষ্কার',
    'hero.features.shopOwners.discovery.description': 'ওপেনস্ট্রিটম্যাপ ব্যবহার করে হাঁটার দূরত্বের মধ্যে গ্রাহকদের কাছে আবিষ্কৃত হন',
    'hero.features.shopOwners.inventory.title': 'স্মার্ট ইনভেন্টরি ব্যবস্থাপনা',
    'hero.features.shopOwners.inventory.description': 'প্রতিটি লেনদেনে রিয়েল-টাইম লাভ/ক্ষতি সহ স্বয়ংক্রিয় স্টক ট্র্যাকিং',
    'hero.features.shopOwners.cashPickup.title': 'ক্যাশ-অন-পিকআপ অর্ডার',
    'hero.features.shopOwners.cashPickup.description': 'গ্রাহকদের পছন্দের নগদ পেমেন্ট সহ প্রি-অর্ডার গ্রহণ করুন',
    'hero.features.suppliers.network.title': 'খুচরা নেটওয়ার্ক অ্যাক্সেস',
    'hero.features.suppliers.network.description': 'বাংলাদেশ জুড়ে ৯৬,০০০+ স্থানীয় খুচরা বিক্রেতার সাথে সংযুক্ত হন',
    'hero.features.suppliers.insights.title': 'ডেটা-চালিত অন্তর্দৃষ্টি',
    'hero.features.suppliers.insights.description': 'পণ্য মজুদের তথ্যের জন্য গ্রাহক জরিপ এবং চাহিদা বিশ্লেষণ',
    'hero.features.suppliers.distribution.title': 'সুশৃঙ্খল বিতরণ',
    'hero.features.suppliers.distribution.description': 'হাইপারলোকাল ডেলিভারির জন্য দক্ষ সাপ্লাই চেইন ব্যবস্থাপনা',
    'hero.stats.targetShops': 'লক্ষ্য দোকান',
    'hero.stats.marketSize': 'বাজারের আকার',
    'hero.stats.smeCoverage': 'এসএমই কভারেজ',
    'hero.cta.googlePlay': 'গুগল প্লে',
    'hero.cta.downloadApk': 'এপিকে ডাউনলোড',
    'hero.forSuppliers': 'সরবরাহকারীদের জন্য',
    'hero.shopOwners.feature1.title': 'হাইপারলোকাল আবিষ্কার',
    'hero.shopOwners.feature1.desc': 'OpenStreetMap ব্যবহার করে হাঁটার দূরত্বের মধ্যে থাকা গ্রাহকদের কাছে পৌঁছান',
    'hero.shopOwners.feature2.title': 'স্মার্ট ইনভেন্টরি ব্যবস্থাপনা',
    'hero.shopOwners.feature2.desc': 'প্রতিটি লেনদেনে রিয়েল-টাইম লাভ/ক্ষতির সাথে স্বয়ংক্রিয় স্টক ট্র্যাকিং',
    'hero.shopOwners.feature3.title': 'ক্যাশ-অন-পিকআপ অর্ডার',
    'hero.shopOwners.feature3.desc': 'গ্রাহকদের পছন্দের ক্যাশ পেমেন্ট সহ প্রি-অর্ডার গ্রহণ করুন',
    'hero.joinPlatform': 'প্ল্যাটফর্মে যোগদান',
    'hero.learnMore': 'আরও জানুন',
    
    // Features - Bengali
    'features.badge': 'মূল ফিচারসমূহ',
    'features.title': 'বাংলাদেশের এসএমই ইকোসিস্টেমের ক্ষমতায়ন',
    'features.title.part1': 'বাংলাদেশের',
    'features.title.part2': 'এসএমই ইকোসিস্টেমের ক্ষমতায়ন',
    'features.subtitle': 'উদ্ভাবনী প্রযুক্তির মাধ্যমে বাংলাদেশের ১.২ মিলিয়ন খুচরা আউটলেটের ৮০% এর জন্য হাইপারলোকাল বাণিজ্যে বিপ্লব।',
    'features.cta.title': 'আপনার ব্যবসা রূপান্তরিত করতে প্রস্তুত?',
    'features.cta.description': 'পাশের দোকানের উদ্ভাবনী প্ল্যাটফর্মের সাথে ইতিমধ্যে বৃদ্ধি পাওয়া হাজারো স্থানীয় ব্যবসার সাথে যোগ দিন।',
    'features.cta.point1': 'হাইপারলোকাল গ্রাহক আবিষ্কার',
    'features.cta.point2': 'ক্যাশ-অন-পিকআপ সুবিধা',
    'features.cta.point3': 'রিয়েল-টাইম বিশ্লেষণ ও অন্তর্দৃষ্টি',
    'features.cta.button': 'আজই শুরু করুন',
    
    // Milestones - Bengali
    'milestones.badge': 'আমাদের রোডম্যাপ',
    'milestones.title': 'প্রকল্পের মাইলফলক ও ভবিষ্যৎ পরিকল্পনা',
    'milestones.subtitle': 'বাংলাদেশের শীর্ষস্থানীয় হাইপারলোকাল ই-কমার্স প্ল্যাটফর্ম তৈরির জন্য একটি কৌশলগত, পর্যায়ক্রমিক পদ্ধতি',
    'milestones.milestonesTitle': 'ডেভেলপমেন্ট মাইলফলক',
    'milestones.step1.title': 'দোকানদারদের উপর ফোকাস',
    'milestones.step1.description': 'কার্যকারিতা যাচাই এবং প্রতিক্রিয়া সংগ্রহের জন্য ১০০ দোকানদারের সাথে অ্যাপ পরীক্ষা করুন।',
    'milestones.step2.title': 'গ্রাহকদের দিকে মনোনিবেশ',
    'milestones.step2.description': '১০,০০০ গ্রাহক আকর্ষণ করতে সোশ্যাল মিডিয়া মার্কেটিং প্রচারাভিযান চালু করুন।',
    'milestones.step3.title': 'অঞ্চলে সম্প্রসারণ',
    'milestones.step3.description': 'শক্তিশালী আঞ্চলিক উপস্থিতি প্রতিষ্ঠার জন্য ৪০০টি এলাকাকে লক্ষ্য করুন।',
    'milestones.step4.title': 'চট্টগ্রামে স্কেল করুন',
    'milestones.step4.description': 'চট্টগ্রামের ৭০% দোকানে গ্রহণযোগ্যতা অর্জন করুন, আঞ্চলিক আধিপত্যে একটি উল্লেখযোগ্য মাইলফলক।',
    'milestones.cta.title': 'যাত্রার অংশীদার হন',
    'milestones.cta.description': 'বাংলাদেশের হাইপারলোকাল বাণিজ্যের ভবিষ্যৎ গড়ায় আমাদের সাথে যোগ দিন। প্রতিটি মাইলফলক আমাদের লাখো এসএমইকে ক্ষমতায়নের কাছাকাছি নিয়ে আসে।',
    'milestones.cta.joinWaitlist': 'ওয়েটলিস্টে যোগ দিন',
    'milestones.cta.learnMore': 'আরও জানুন',
    'futurePlans.title': 'ভবিষ্যৎ পরিকল্পনা ও ফিচার',
    'futurePlans.subtitle': 'আমাদের প্রাথমিক মাইলফলকগুলির বাইরে প্ল্যাটফর্ম উন্নত ও সম্প্রসারণের উচ্চাভিলাষী পরিকল্পনা',
    'futurePlans.shopkeeperRetailer.title': 'দোকানদার-খুচরা বিক্রেতা সংযোগ',
    'futurePlans.shopkeeperRetailer.description': 'সাপ্লাই চেইন সুবিধার জন্য দোকানদার ও খুচরা বিক্রেতাদের মধ্যে সরাসরি সংযোগ স্থাপন।',
    'futurePlans.customerPolls.title': 'গ্রাহক জরিপ',
    'futurePlans.customerPolls.description': 'দোকানদারদের জরিপ পরিচালনার ফিচার চালু করুন, ডেটা-চালিত পণ্য সিদ্ধান্ত সক্ষম করুন।',
    'futurePlans.inventoryManagement.title': 'উন্নত ইনভেন্টরি ব্যবস্থাপনা',
    'futurePlans.inventoryManagement.description': 'স্টক ট্র্যাকিং ও ব্যবস্থাপনা সহজ করতে ইন-অ্যাপ টুলস আরও উন্নত করুন।',
    'futurePlans.profitLoss.title': 'লাইভ লাভ/ক্ষতি ট্র্যাকিং',
    'futurePlans.profitLoss.description': 'দোকানদারের সিদ্ধান্ত গ্রহণ উন্নত করতে প্রতি লেনদেনে রিয়েল-টাইম আর্থিক অন্তর্দৃষ্টি প্রদান।',
    'futurePlans.expansion.title': 'ভৌগোলিক সম্প্রসারণ',
    'futurePlans.expansion.description': 'চট্টগ্রাম থেকে সমগ্র বাংলাদেশে স্কেল করুন, অন্যান্য দক্ষিণ এশিয়ার দেশে সম্প্রসারণের সম্ভাবনা সহ।',
    
    // Testimonials - Bengali
    'testimonials.badge': 'গ্রাহকদের গল্প',
    'testimonials.title': 'দোকান মালিকরা যা বলছেন',
    'testimonials.subtitle': 'পাশের দোকানের ডিজিটাল টুলস দিয়ে উন্নতি করা স্থানীয় ব্যবসার প্রকৃত সফলতার গল্প।',
    'testimonials.featuredStory': 'ফিচার্ড গল্প',
    'testimonials.previousTestimonial': 'পূর্ববর্তী মতামত',
    'testimonials.nextTestimonial': 'পরবর্তী মতামত',
    'testimonials.swipeHint': 'সোয়াইপ বা ট্যাপ করুন',
    'testimonials.trustedBy': 'সারা বাংলাদেশের স্থানীয় ব্যবসায়ীদের বিশ্বস্ত',
    
    // Team - Bengali
    'team.badge': 'আমাদের টিম',
    'team.title': 'বাংলাদেশের এসএমই ইকোসিস্টেমে বিপ্লবী প্রতিষ্ঠাতারা',
    'team.subtitle': 'হাইপারলোকাল উদ্ভাবনের মাধ্যমে ৯৬,০০০ এসএমইকে ক্ষমতায়ন করতে এবং বাংলাদেশের ৬ বিলিয়ন ডলারের খুচরা বাজার রূপান্তরিত করতে পাশের দোকান তৈরি করছেন দূরদর্শী নেতারা।',
    'team.viewFull': 'সম্পূর্ণ টিম দেখুন',
    'team.coreValues': 'আমাদের মূল লক্ষ্য',
    'team.smeEmpowerment': 'এসএমই ক্ষমতায়ন',
    'team.hyperlocalFocus': 'হাইপারলোকাল ফোকাস',
    'team.marketRevolution': 'বাজার বিপ্লব',
    'team.hiring': 'আমরা নিয়োগ দিচ্ছি!',
    'team.joinTeam': 'আমাদের অসাধারণ দলে যোগ দিতে চান?',
    'team.sendResume': 'আপনার জীবনবৃত্তান্ত পাঠান',
    'team.learnMore': 'আরও জানুন',
    
    // FAQ - Bengali
    'faq.badge': 'প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী',
    'faq.title': 'আপনার জানা প্রয়োজনীয় সবকিছু',
    'faq.subtitle': 'পাশের দোকানের হাইপারলোকাল প্ল্যাটফর্ম সম্পর্কে সাধারণ প্রশ্নের তাৎক্ষণিক উত্তর পান।',
    'faq.searchPlaceholder': 'প্রশ্ন খুঁজুন...',
    'faq.viewAll': 'সকল প্রশ্ন দেখুন',
    'faq.contactSupport': 'এখনও প্রশ্ন আছে?',
    'faq.contactDesc': 'আপনি যা খুঁজছেন তা খুঁজে পাচ্ছেন না? আমাদের দল আপনার সফলতার জন্য এখানে আছে।',
    'faq.getHelp': 'সাহায্য নিন',
    
    // Footer - Bengali
    'footer.tagline': 'হাইপার-লোকাল মার্কেটপ্লেস',
    'footer.description': 'হাইপারলোকাল ই-কমার্স সমাধানের মাধ্যমে ৯৬,০০০ এসএমইকে ক্ষমতায়ন করে বাংলাদেশের ৬ বিলিয়ন ডলারের খুচরা বাজারে বিপ্লব আনছি।',
    'footer.followUs': 'আমাদের ফলো করুন',
    'footer.quickLinks': 'দ্রুত লিংক',
    'footer.support': 'সাহায্য',
    'footer.getInTouch': 'যোগাযোগ করুন',
    'footer.address': 'ঠিকানা',
    'footer.phone': 'ফোন',
    'footer.email': 'ইমেইল',
    'footer.madeWithLove': 'বাংলাদেশে ❤️ দিয়ে তৈরি',
    
    // CTA - Bengali
    'cta.badge': 'বিপ্লবে যোগ দিন',
    'cta.title': 'আপনার ব্যবসা রূপান্তরিত করতে প্রস্তুত?',
    'cta.subtitle': 'বাংলাদেশের হাইপারলোকাল বিপ্লবের অংশ হন।',
    'cta.formTitle': 'আপনার ডিজিটাল যাত্রা শুরু করুন',
    'cta.name': 'পূর্ণ নাম',
    'cta.email': 'ইমেইল ঠিকানা',
    'cta.phone': 'ফোন নম্বর',
    'cta.business': 'ব্যবসার নাম',
    'cta.getStarted': 'এখনই শুরু করুন',
    
    // Common - Bengali
    'common.loading': 'লোড হচ্ছে...',
    'common.error': 'কিছু ভুল হয়েছে',
    'common.retry': 'আবার চেষ্টা করুন',
    'common.close': 'বন্ধ করুন',
    'common.submit': 'জমা দিন',
    'common.cancel': 'বাতিল',
  },
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('pasherDokan_language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  useEffect(() => {
    localStorage.setItem('pasherDokan_language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
