import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe size={16} className="text-gray-500" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'bn')}
        className="bg-white/90 backdrop-blur-sm rounded-lg py-1.5 px-3 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 shadow-sm transition-all hover:shadow-md cursor-pointer"
        aria-label="Select language"
      >
        <option value="en">🇺🇸 English</option>
        <option value="bn">🇧🇩 বাংলা</option>
      </select>
    </div>
  );
};

export default LanguageToggle;
