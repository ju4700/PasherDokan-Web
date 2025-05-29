import React, { useState } from 'react';
import { Download, X, Smartphone, Monitor, Wifi, WifiOff, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePWA } from '../hooks/usePWA';
// import { useLanguage } from '../contexts/LanguageContext'; // Will be used when translations are implemented

const PWAInstallPrompt: React.FC = () => {
  const { isInstallable, isInstalled, install, isOffline } = usePWA();
  // const { t } = useLanguage(); // Removed for now as translations are not yet implemented
  const [isDismissed, setIsDismissed] = useState(false);

  const handleAPKDownload = () => {
    const link = document.createElement('a');
    link.href = '/apk/pasherdokan.apk';
    link.download = 'pasherdokan.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Don't show if already installed, not installable, or dismissed
  if (isInstalled || !isInstallable || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <img 
                    src="/images/icon.png" 
                    alt="PasherDokan" 
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <span className="font-semibold text-sm">Install PasherDokan</span>
              </div>
              <button
                onClick={() => setIsDismissed(true)}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Dismiss install prompt"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center flex-shrink-0">
                <Download size={18} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  Get the app experience
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Install PasherDokan for faster access, offline browsing, and native app features.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Smartphone size={12} className="text-primary-500" />
                <span>Native experience</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                {isOffline ? (
                  <WifiOff size={12} className="text-orange-500" />
                ) : (
                  <Wifi size={12} className="text-green-500" />
                )}
                <span>Offline access</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Monitor size={12} className="text-primary-500" />
                <span>Desktop support</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <FileText size={12} className="text-primary-500" />
                <span>APK available</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              {/* PWA Install Button */}
              <button
                onClick={install}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Download size={14} />
                Install as PWA
              </button>
              
              {/* APK Download Button */}
              <button
                onClick={handleAPKDownload}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <FileText size={14} />
                Download APK
              </button>
              
              {/* Later Button */}
              <button
                onClick={() => setIsDismissed(true)}
                className="w-full px-4 py-2.5 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Offline notification component
export const OfflineNotification: React.FC = () => {
  const { isOffline } = usePWA();

  if (!isOffline) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium">
        <WifiOff size={16} />
        <span>You're offline - some features may be limited</span>
      </div>
    </motion.div>
  );
};

export default PWAInstallPrompt;
