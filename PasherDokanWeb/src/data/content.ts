import { TestimonialType, FeatureType, FAQType } from '../types';

export const features: FeatureType[] = [
  {
    id: 1,
    title: "Local Reach",
    description: "Connect with customers within 2km radius of your shop, building a strong local customer base.",
    icon: "MapPin"
  },
  {
    id: 2,
    title: "Easy Payments",
    description: "Flexible payment options including Cash on Delivery, bKash, and Nagad integration.",
    icon: "Wallet"
  },
  {
    id: 3,
    title: "Digital Storefront",
    description: "Create your shop's digital presence in minutes with our intuitive mobile app.",
    icon: "Store"
  },
  {
    id: 4,
    title: "Inventory Management",
    description: "Track stock levels, receive low inventory alerts, and manage product listings efficiently.",
    icon: "BarChart3"
  },
  {
    id: 5,
    title: "Delivery Tracking",
    description: "Real-time tracking of local deliveries with notifications for you and your customers.",
    icon: "Truck"
  },
  {
    id: 6,
    title: "Customer Analytics",
    description: "Gain insights into buying patterns, popular products, and customer preferences.",
    icon: "BarChart3"
  },
  {
    id: 7,
    title: "Mobile Friendly",
    description: "Manage your entire business on-the-go from our dedicated Android and iOS apps.",
    icon: "Smartphone"
  },
  {
    id: 8,
    title: "Quick Setup",
    description: "Get started in less than 15 minutes with our guided onboarding process.",
    icon: "Zap"
  }
];

export const testimonials: TestimonialType[] = [
  {
    id: 1,
    name: "Rahul Ahmed",
    role: "Owner",
    company: "Dhaka General Store",
    content: "PasherDokan helped me digitize my store and reach more customers in my neighborhood. My sales have increased by 40% since joining, and the platform has made inventory management so much easier.",
    avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 2,
    name: "Fatima Begum",
    role: "Proprietor",
    company: "Fatima's Fashion",
    content: "The app is incredibly intuitive! My customers love being able to browse products online and pay cash on delivery. PasherDokan has helped me expand my customer base beyond walk-ins.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 3,
    name: "Mohammad Karim",
    role: "Managing Director",
    company: "Karim Electronics",
    content: "PasherDokan has transformed how I do business. The local delivery feature is perfect for my customers, and the analytics help me make better inventory decisions. Highly recommended!",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    role: "CEO",
    company: "Dhaka Bakery",
    content: "Since joining PasherDokan, our daily orders have doubled. The platform's focus on local customers aligns perfectly with our business model. The customer service is also top-notch.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
  }
];

// ...existing code...

export const faqs: FAQType[] = [
  {
    id: 1,
    question: "How does PasherDokan work?",
    answer: "PasherDokan connects local shops with customers within a 2km radius. Shop owners can easily create digital storefronts, list products, and accept orders with multiple payment options including cash on delivery. Our platform handles inventory management, order processing, and provides delivery tracking.",
    category: "general",
    helpfulLinks: [
      { text: "Getting Started Guide", url: "/guides/getting-started" },
      { text: "Watch Demo", url: "/resources/demo" }
    ]
  },
  {
    id: 2,
    question: "What are the costs involved?",
    answer: "Joining PasherDokan is completely free. We operate on a simple commission-based model, taking a small percentage (4.5%) only on successful sales. There are no monthly fees, setup costs, or hidden charges.",
    category: "payments",
    helpfulLinks: [
      { text: "Pricing Details", url: "/pricing" },
      { text: "Commission Calculator", url: "/tools/calculator" }
    ]
  },
  {
    id: 3,
    question: "What payment methods do you support?",
    answer: "We support multiple payment methods including Cash on Delivery (CoD), bKash, Nagad, and credit/debit cards through SSL Commerz. Shop owners can choose which payment methods to offer their customers.",
    category: "payments"
  },
  {
    id: 4,
    question: "Can I manage my store from my phone?",
    answer: "Yes! Our mobile-first approach means you can manage your entire store from our Android or iOS app. Add products, process orders, track inventory, and communicate with customers—all from your smartphone.",
    category: "accounts",
    helpfulLinks: [
      { text: "Download App", url: "/download" },
      { text: "Mobile Features", url: "/features/mobile" }
    ]
  },
  {
    id: 5,
    question: "Which areas do you currently service?",
    answer: "We currently operate in major cities across Bangladesh including Dhaka, Chittagong, Sylhet, Rajshahi, and Khulna, with plans to expand to more locations soon. Within these cities, we connect shops with customers in a 2km radius.",
    category: "general"
  },
  {
    id: 6,
    question: "How does the delivery process work?",
    answer: "For orders within 2km of your shop, you can use your own delivery staff or our network of verified delivery partners. Our system optimizes routes and provides real-time tracking for both shop owners and customers.",
    category: "general",
    helpfulLinks: [
      { text: "Delivery Guide", url: "/guides/delivery" }
    ]
  },
  {
    id: 7,
    question: "How long does it take to get set up?",
    answer: "Most shop owners complete the onboarding process in under 15 minutes. Our guided setup helps you create your shop profile, add products, set delivery areas, and configure payment options quickly and easily.",
    category: "accounts"
  },
  {
    id: 8,
    question: "What kind of businesses can use PasherDokan?",
    answer: "PasherDokan is designed for a wide range of local businesses including grocery stores, pharmacies, bakeries, stationery shops, electronics stores, clothing boutiques, and more. If you have physical products to sell locally, our platform can help you reach more customers.",
    category: "general",
    helpfulLinks: [
      { text: "Success Stories", url: "/success-stories" },
      { text: "Business Types", url: "/business-types" }
    ]
  }
];