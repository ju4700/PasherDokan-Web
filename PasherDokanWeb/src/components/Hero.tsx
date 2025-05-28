import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Download, ShoppingBag, Star, Users, Clock, CheckCircle, Building } from 'lucide-react';
import Button from './Button';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Setup default icon for all markers
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Set the default icon for all markers
L.Marker.prototype.options.icon = DefaultIcon;

const MotionButton = motion(Button);

const Tab: React.FC<{ id: string, label: string, icon: React.ReactNode, active: boolean, onClick: () => void }> = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
      active
        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
        : 'bg-white/80 text-gray-600 hover:bg-gray-50'
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

const generateRandomMarkers = (centerLat: number, centerLng: number, count: number) => {
  const markers = [];
  
  const storeTypes = [
    { type: "Grocery Store", distance: "0.3" },
    { type: "Pharmacy", distance: "0.5" },
    { type: "Electronics Shop", distance: "0.8" },
    { type: "Clothing Store", distance: "1.2" },
    { type: "Restaurant", distance: "0.4" },
    { type: "Hardware Store", distance: "0.9" },
    { type: "Mobile Shop", distance: "0.6" },
    { type: "Book Store", distance: "1.1" },
    { type: "Tea Stall", distance: "0.2" },
    { type: "Bakery", distance: "0.7" },
    { type: "Furniture Shop", distance: "1.5" },
    { type: "Jewelry Store", distance: "1.0" },
    { type: "Cosmetics Shop", distance: "0.8" }
  ];
  
  markers.push({
    position: [centerLat, centerLng],
    name: "PasherDokan Headquarters",
    info: "Local marketplace hub"
  });
  
  for (let i = 0; i < count; i++) {
    const latOffset = (Math.random() - 0.5) * 0.03;
    const lngOffset = (Math.random() - 0.5) * 0.03;
    
    const storeInfo = storeTypes[Math.floor(Math.random() * storeTypes.length)];
    
    markers.push({
      position: [centerLat + latOffset, centerLng + lngOffset],
      name: `${storeInfo.type}`,
      info: `${storeInfo.distance} km away`
    });
  }
  
  return markers;
};

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState('shopOwners');
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const isPhoneInView = useInView(mockupRef, { once: true });
  
  const mapMarkers = generateRandomMarkers(23.8103, 90.4125, 30);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  
  const float1Y = useMotionValue(0);
  const float2Y = useMotionValue(0);
  const float3Y = useMotionValue(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      float1Y.set(Math.sin(Date.now() * 0.001) * 10);
      float2Y.set(Math.sin(Date.now() * 0.002) * 8);
      float3Y.set(Math.sin(Date.now() * 0.0015) * 12);
    }, 50);
    
    return () => clearInterval(interval);
  }, [float1Y, float2Y, float3Y]);

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  const phoneVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 12,
        duration: 1.2,
      }
    }
  };

  const tabFeatures = {
    shopOwners: [
      { title: "Local Customer Reach", description: "Bring customers directly to your doorstep" },
      { title: "Inventory Management", description: "Track stock and sales in real-time" },
      { title: "Digital Payments", description: "Accept cashless payments securely" }
    ],
    suppliers: [
      { title: "Retail Network", description: "Connect with hundreds of local retailers" },
      { title: "Delivery Logistics", description: "Streamline product distribution" },
      { title: "Real-time Analytics", description: "Get insights on market demand" }
    ]
  };

  const statsData = [
    { icon: <Users size={18} />, value: "10,000+", label: "Shop Owners" },
    { icon: <Star size={18} />, value: "4.8", label: "App Rating" },
    { icon: <Clock size={18} />, value: "20min", label: "Avg. Delivery" }
  ];

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-[100vh] pt-28 pb-20 overflow-hidden"
    >
      {/* Background Elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary-50/50 via-white to-secondary-50/20 -z-10"></div>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-primary-50 rounded-full blur-3xl opacity-70 -z-10"></div>
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-secondary-50 rounded-full blur-3xl opacity-60 -z-10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none -z-10"></div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Centered Header Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          style={{ y: textY }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          {/* Brand Badge */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <div className="flex items-center gap-3 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100/80 hover:shadow-xl transition-all">
              <motion.div 
                className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 flex items-center justify-center relative"
                animate={{ 
                  boxShadow: ['0px 0px 0px 0px rgba(79, 70, 229, 0)', '0px 0px 0px 4px rgba(79, 70, 229, 0.3)', '0px 0px 0px 0px rgba(79, 70, 229, 0)'] 
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                <ShoppingBag size={16} className="text-white" />
              </motion.div>
              <span className="text-sm font-semibold text-gray-800">
                <span className="font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Trusted by</span> 10,000+ Local Shops
              </span>
            </div>
          </motion.div>
          
          {/* Heading with animated highlight */}
          <motion.h1 
            variants={itemVariants} 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-gray-900"
          >
            Transform Your 
            <br className="hidden sm:block" />
            <span className="relative text-primary-600 inline-block">
              Local Business
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
          </motion.h1>
          
          {/* Enhanced subheading */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Join thousands of shop owners across Bangladesh using PasherDokan to connect with nearby customers, streamline operations, and boost revenues by up to 40%.
          </motion.p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Tabbed navigation for different user types */}
          <motion.div 
            initial="hidden"
            animate="visible" 
            variants={contentVariants}
            className="mb-16"
          >
            <motion.div variants={itemVariants} className="flex justify-center gap-3 mb-6 overflow-x-auto pb-1 scrollbar-hide">
              <Tab 
                id="shopOwners"
                label="For Shop Owners" 
                icon={<ShoppingBag size={18} />}
                active={activeTab === 'shopOwners'}
                onClick={() => setActiveTab('shopOwners')}
              />
              <Tab 
                id="suppliers"
                label="For Suppliers (A Future Feature)" 
                icon={<Building size={18} />}
                active={activeTab === 'suppliers'}
                onClick={() => setActiveTab('suppliers')}
              />
            </motion.div>
          </motion.div>
          
          {/* App Showcase with Phone in Center */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Feature Cards */}
            <div className="hidden lg:block relative z-20">
              <motion.div 
                style={{ y: float1Y }}
                className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 w-60 mb-8 ml-auto"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Order Completed</h4>
                    <p className="text-xs text-gray-600">15 minutes delivery time</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                style={{ y: float3Y }}
                className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-100 p-4 w-60 ml-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <div key={statsData[0].label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                    {statsData[0].icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{statsData[0].value}</p>
                    <p className="text-xs text-gray-500">{statsData[0].label}</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Center Phone - Increased height */}
            <motion.div 
              ref={mockupRef}
              variants={phoneVariants}
              initial="hidden"
              animate={isPhoneInView ? "visible" : "hidden"}
              className="relative z-30"
            >
              <div className="relative mx-auto">
                <motion.div
                  className="relative mx-auto w-[280px] sm:w-[320px] md:w-[380px] bg-gradient-to-b from-gray-800 to-black rounded-[3rem] border-[14px] border-gray-900 shadow-2xl overflow-hidden"
                  animate={{
                    rotateY: [0, -1, 0, 1, 0],
                    rotateX: [0, 1, 0, -1, 0]
                  }}
                  transition={{
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                  style={{ height: "800px" }}
                >
                  {/* Status Bar */}
                  <div className="absolute top-0 inset-x-0 h-8 rounded-t-2xl bg-black flex items-center justify-between px-8 z-10">
                    <div className="w-12 h-1.5 bg-transparent"></div>
                    <motion.div 
                      className="w-16 h-1.5 bg-gray-800 rounded-full"
                      animate={{ backgroundColor: ["#374151", "#1F2937", "#374151"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Screen Content with OpenStreetMap - Taller map */}
                  <div className="pt-10 pb-8 overflow-hidden h-full">
                    <div className="h-full w-full">
                      <MapContainer 
                        center={[23.8103, 90.4125]} 
                        zoom={14} 
                        style={{ height: '100%', width: '100%' }}
                        attributionControl={false}
                        zoomControl={false}
                        dragging={true}
                        scrollWheelZoom={false}
                        touchZoom={true}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        {/* Render all markers */}
                        {mapMarkers.map((marker, index) => (
                          <Marker 
                            key={index} 
                            position={marker.position as [number, number]}
                          >
                            <Popup>
                              <strong>{marker.name}</strong> <br /> 
                              {marker.info}
                            </Popup>
                          </Marker>
                        ))}
                      </MapContainer>
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-gray-700 rounded-full"></div>
                </motion.div>
                
                {/* Shadow beneath phone */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-black/20 rounded-full blur-xl z-0"
                  animate={{
                    width: ["55%", "65%", "55%"],
                    opacity: [0.2, 0.25, 0.2]
                  }}
                  transition={{
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />
              </div>
            </motion.div>
            
            {/* Right Feature Cards */}
            <div className="hidden lg:block relative z-20">
              <motion.div 
                style={{ y: float2Y }}
                className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 w-60 mb-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 flex-shrink-0">
                    <Users size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4].map(i => (
                        <Star key={i} size={12} fill="#FBBF24" stroke="none" />
                      ))}
                      <Star key={5} size={12} className="text-gray-300" fill="currentColor" stroke="none" />
                    </div>
                    <p className="text-xs text-gray-600">Great service! Will order again.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tabFeatures[activeTab === 'shopOwners' ? 'shopOwners' : 'suppliers'].map((feature, index) => (
              <motion.div
                key={`${activeTab}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-3 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <Star size={18} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA buttons */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          className="mt-12 max-w-2xl mx-auto text-center flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MotionButton 
            variant="primary" 
            className="rounded-xl shadow-xl flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
            onClick={() => window.open('https://play.google.com/store', '_blank')}
            whileHover={{ scale: 1.03, boxShadow: "0 20px 30px -10px rgba(79, 70, 229, 0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={18} className="mr-2.5" />
            <span className="font-medium">Google Play</span>
          </MotionButton>
          <MotionButton 
            variant="outline"
            className="rounded-xl flex items-center justify-center px-8 py-4 border-2 border-gray-300 hover:border-primary-500 bg-white/80 backdrop-blur-sm hover:bg-primary-50/50"
            onClick={() => window.open('https://drive.google.com/drive/folders/1FnaZ_hFtoB4soxhhjO_jxe8CG9rLwC4H', '_blank')}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={18} className="mr-2.5" />
            <span className="font-medium">Download APK</span>
          </MotionButton>
        </motion.div>
      </div>
      
      {/* Add these styles for the map */}
      <style>{`
        .leaflet-container {
          font-family: inherit;
          border-radius: 0;
          overflow: hidden;
          height: 100%;
          width: 100%;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          font-size: 14px;
        }
        
        .leaflet-popup-content p {
          margin: 4px 0;
        }
        
        .leaflet-popup-content strong {
          color: #4F46E5;
        }
        
        .leaflet-control-attribution {
          display: none;
        }
        
        /* Make popups more mobile-friendly */
        .leaflet-popup {
          margin-bottom: 25px;
        }
      `}</style>
    </section>
  );
};

export default Hero;