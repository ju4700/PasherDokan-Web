import { TestimonialType, FeatureType, FAQType } from '../types';

export const features: FeatureType[] = [
  {
    id: 1,
    title: "Hyperlocal Discovery",
    description: "Get discovered by customers within walking distance using OpenStreetMap technology for precise location targeting.",
    icon: "MapPin"
  },
  {
    id: 2,
    title: "Cash-on-Pickup",
    description: "Accept customer-preferred cash payments for preorders, eliminating forced online payment barriers.",
    icon: "Wallet"
  },
  {
    id: 3,
    title: "SME Empowerment",
    description: "Transform your traditional shop into a digital-ready business while maintaining your local identity.",
    icon: "Store"
  },
  {
    id: 4,
    title: "Smart Analytics",
    description: "Real-time profit/loss tracking per transaction with automated inventory management and demand insights.",
    icon: "BarChart3"
  },
  {
    id: 5,
    title: "Local Delivery",
    description: "Offer optional delivery services within your neighborhood for customers who prefer convenience.",
    icon: "Truck"
  },
  {
    id: 6,
    title: "Customer Polls",
    description: "Conduct customer surveys to understand demand patterns and make informed stocking decisions.",
    icon: "BarChart3"
  },
  {
    id: 7,
    title: "App-Based Platform",
    description: "Low operational cost platform accessible via mobile app, designed specifically for Bangladesh's SME ecosystem.",
    icon: "Smartphone"
  },
  {
    id: 8,
    title: "Subscription Model",
    description: "Affordable monthly subscription (~500 BDT) with scalable features as your business grows.",
    icon: "Zap"
  }
];

export const testimonials: TestimonialType[] = [
  {
    id: 1,
    name: "Rahman Mia",
    role: "Shop Owner",
    company: "Rahman General Store, Chattogram",
    content: "পাশের দোকান আমার দোকানকে ডিজিটাল করতে এবং আমার আশেপাশের আরও বেশি গ্রাহকের কাছে পৌঁছাতে সাহায্য করেছে। ক্যাশ অন পিক-আপের সিস্টেমটা আমার কাস্টমারদের জন্য একদম পারফেক্ট।",
    avatar: "https://images.pexels.com/photos/32191522/pexels-photo-32191522/free-photo-of-portrait-of-a-senior-man-sitting-outdoors-in-bangladesh.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    name: "Fatima Begum",
    role: "SME Owner",
    company: "Fatima's Fashion Boutique",
    content: "OpenStreetMap দিয়ে আমার দোকানটা লোকাল কাস্টমারদের কাছে সহজেই পৌঁছায়। হাইপারলোকাল প্ল্যাটফর্মটা আমার মতো ছোট ব্যবসার জন্য পারফেক্ট।",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 3,
    name: "Mohammad Karim",
    role: "Electronics Retailer",
    company: "Karim Electronics, Chattogram",
    content: "রিয়েল-টাইম প্রফিট লস ট্র্যাকিং এবং ইনভেনটরি ম্যানেজমেন্ট আমার ব্যবসায় বিপ্লব এনেছে। সাবস্ক্রিপশন মডেলটা খুবই সাশ্রয়ী।",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    role: "Bakery Owner",
    company: "Nusrat's Bakery",
    content: "কাস্টমার পোল ফিচারটা দিয়ে জানতে পারি কোন প্রোডাক্ট কতটা ডিমান্ড আছে। এটা আমার স্টকিং ডিসিশনে অনেক সাহায্য করে।",
    avatar: "https://images.pexels.com/photos/15211652/pexels-photo-15211652/free-photo-of-portrait-of-woman-in-shawl-standing-on-road.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

// ...existing code...

export const faqs: FAQType[] = [
  {
    id: 1,
    question: "What makes PasherDokan different from other e-commerce platforms?",
    answer: "PasherDokan is a hyperlocal platform specifically designed for Bangladesh's SME ecosystem. Unlike platforms like Chaldal or Daraz, we empower local shops rather than replacing them. We use OpenStreetMap for precise location targeting and preserve customer-preferred cash-on-pickup options.",
    category: "general",
    helpfulLinks: [
      { text: "Our Unique Approach", url: "/about/hyperlocal" },
      { text: "SME Success Stories", url: "/case-studies" }
    ]
  },
  {
    id: 2,
    question: "What are the subscription costs?",
    answer: "Our affordable subscription model costs approximately 500 BDT (~$4.50 USD) per month. This scalable pricing structure is designed specifically for Bangladesh's SME market, providing access to all platform features including inventory management, profit tracking, and customer analytics.",
    category: "payments",
    helpfulLinks: [
      { text: "Subscription Plans", url: "/pricing" },
      { text: "ROI Calculator", url: "/tools/roi-calculator" }
    ]
  },
  {
    id: 3,
    question: "How does cash-on-pickup work?",
    answer: "Customers can browse products, place preorders, and pay with cash when collecting items from your shop. This eliminates forced online payment barriers and respects traditional shopping preferences while providing digital convenience.",
    category: "payments"
  },
  {
    id: 4,
    question: "Where is PasherDokan launching first?",
    answer: "We're starting with a pilot program of 100 shopkeepers in Chattogram. Our goal is to achieve 70% shop coverage in the city before expanding to 400 localities nationwide and eventually across South Asia.",
    category: "general",
    helpfulLinks: [
      { text: "Pilot Program Details", url: "/pilot-chattogram" },
      { text: "Expansion Roadmap", url: "/roadmap" }
    ]
  },
  {
    id: 5,
    question: "What is the target market size?",
    answer: "We're targeting 96,000 SMEs (10% of Bangladesh's 1.2 million retail outlets) in a $6 billion addressable market. SMEs comprise over 80% of Bangladesh's retail landscape, making this a massive opportunity for hyperlocal innovation.",
    category: "general"
  },
  {
    id: 6,
    question: "How does the inventory and analytics system work?",
    answer: "Our platform provides automated inventory management with real-time profit/loss tracking per transaction. Shop owners get insights through customer polls to make informed stocking decisions based on local demand patterns.",
    category: "general",
    helpfulLinks: [
      { text: "Analytics Features", url: "/features/analytics" }
    ]
  },
  {
    id: 7,
    question: "Can customers find shops using maps?",
    answer: "Yes! We integrate OpenStreetMap technology to help customers discover local shops within walking distance. This hyperlocal approach ensures customers find exactly what they need from nearby businesses.",
    category: "general"
  },
  {
    id: 8,
    question: "What types of businesses can benefit from PasherDokan?",
    answer: "All types of SMEs can benefit - grocery stores, pharmacies, electronics shops, clothing stores, restaurants, hardware stores, mobile shops, bookstores, tea stalls, bakeries, and more. Any business serving local customers can leverage our hyperlocal platform.",
    category: "general",
    helpfulLinks: [
      { text: "SME Success Stories", url: "/success-stories" },
      { text: "Business Categories", url: "/business-types" }
    ]
  }
];