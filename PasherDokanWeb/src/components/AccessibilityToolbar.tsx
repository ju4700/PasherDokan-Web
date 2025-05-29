import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Accessibility, 
  Eye, 
  Type, 
  Volume2, 
  SkipForward, 
  Settings,
  X,
  Minus,
  Plus
} from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isHighContrast,
    fontSize,
    skipToMain,
    setFontSize,
    toggleHighContrast,
    announce,
  } = useAccessibility();

  const handleSkipToMain = () => {
    skipToMain();
    setIsOpen(false);
  };

  const handleFontSizeChange = (direction: 'increase' | 'decrease') => {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(fontSize);
    
    if (direction === 'increase' && currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1]);
    } else if (direction === 'decrease' && currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1]);
    }
  };

  const handleToggleContrast = () => {
    toggleHighContrast();
  };

  const handleAnnounceHelp = () => {
    announce(
      'Accessibility toolbar is open. Use Tab to navigate through options. Press Escape to close.',
      'assertive'
    );
  };

  return (
    <>
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
        onClick={(e) => {
          e.preventDefault();
          handleSkipToMain();
        }}
      >
        Skip to main content
      </a>

      {/* Accessibility Button */}
      <div className="fixed top-4 right-4 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onFocus={handleAnnounceHelp}
          className={`
            bg-primary-600 hover:bg-primary-700 text-white
            p-3 rounded-full shadow-lg
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            transition-colors duration-200
            ${isHighContrast ? 'ring-2 ring-black' : ''}
          `}
          aria-label="Open accessibility options"
          aria-expanded={isOpen}
          aria-controls="accessibility-panel"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Accessibility size={20} />
        </motion.button>
      </div>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              id="accessibility-panel"
              initial={{ opacity: 0, scale: 0.9, x: 20, y: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20, y: -20 }}
              className={`
                fixed top-16 right-4 z-40 w-80
                bg-white rounded-lg shadow-xl border
                ${isHighContrast ? 'border-black border-2' : 'border-gray-200'}
              `}
              role="dialog"
              aria-labelledby="accessibility-title"
              aria-describedby="accessibility-description"
            >
              {/* Header */}
              <div className={`p-4 border-b ${isHighContrast ? 'border-black' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <h2 
                    id="accessibility-title"
                    className="text-lg font-semibold text-gray-900"
                  >
                    <Settings size={18} className="inline mr-2" />
                    Accessibility Options
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`
                      p-1 rounded-md text-gray-400 hover:text-gray-600
                      focus:outline-none focus:ring-2 focus:ring-primary-500
                      ${isHighContrast ? 'hover:bg-gray-100' : ''}
                    `}
                    aria-label="Close accessibility options"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p 
                  id="accessibility-description"
                  className="text-sm text-gray-600 mt-1"
                >
                  Customize your browsing experience
                </p>
              </div>

              {/* Options */}
              <div className="p-4 space-y-4">
                {/* Skip to Main */}
                <div>
                  <button
                    onClick={handleSkipToMain}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-lg
                      bg-gray-50 hover:bg-gray-100 text-left
                      focus:outline-none focus:ring-2 focus:ring-primary-500
                      ${isHighContrast ? 'border border-black' : ''}
                    `}
                  >
                    <SkipForward size={18} className="text-primary-600" />
                    <div>
                      <div className="font-medium text-gray-900">Skip to Main Content</div>
                      <div className="text-sm text-gray-600">Jump to the main page content</div>
                    </div>
                  </button>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Type size={16} className="inline mr-2" />
                    Font Size
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleFontSizeChange('decrease')}
                      disabled={fontSize === 'small'}
                      className={`
                        p-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed
                        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500
                        ${isHighContrast ? 'border-black' : 'border-gray-300'}
                      `}
                      aria-label="Decrease font size"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="flex-1 text-center text-sm font-medium capitalize">
                      {fontSize}
                    </span>
                    <button
                      onClick={() => handleFontSizeChange('increase')}
                      disabled={fontSize === 'large'}
                      className={`
                        p-2 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed
                        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500
                        ${isHighContrast ? 'border-black' : 'border-gray-300'}
                      `}
                      aria-label="Increase font size"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* High Contrast */}
                <div>
                  <button
                    onClick={handleToggleContrast}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-lg
                      bg-gray-50 hover:bg-gray-100 text-left
                      focus:outline-none focus:ring-2 focus:ring-primary-500
                      ${isHighContrast ? 'border border-black bg-gray-100' : ''}
                    `}
                    aria-pressed={isHighContrast}
                  >
                    <div className="flex items-center gap-3">
                      <Eye size={18} className="text-primary-600" />
                      <div>
                        <div className="font-medium text-gray-900">High Contrast</div>
                        <div className="text-sm text-gray-600">
                          {isHighContrast ? 'Enabled' : 'Disabled'}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`
                        w-10 h-6 rounded-full p-1 transition-colors duration-200
                        ${isHighContrast ? 'bg-primary-600' : 'bg-gray-300'}
                      `}
                    >
                      <div
                        className={`
                          w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200
                          ${isHighContrast ? 'translate-x-4' : 'translate-x-0'}
                        `}
                      />
                    </div>
                  </button>
                </div>

                {/* Voice Announcement Test */}
                <div>
                  <button
                    onClick={() => announce('This is a test announcement', 'assertive')}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-lg
                      bg-gray-50 hover:bg-gray-100 text-left
                      focus:outline-none focus:ring-2 focus:ring-primary-500
                      ${isHighContrast ? 'border border-black' : ''}
                    `}
                  >
                    <Volume2 size={18} className="text-primary-600" />
                    <div>
                      <div className="font-medium text-gray-900">Test Screen Reader</div>
                      <div className="text-sm text-gray-600">Play a test announcement</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className={`p-4 border-t ${isHighContrast ? 'border-black' : 'border-gray-200'}`}>
                <p className="text-xs text-gray-500 text-center">
                  Keyboard shortcut: Press Tab + Shift + A to open this menu
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityToolbar;