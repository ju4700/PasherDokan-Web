import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Loader2, ArrowRight, User, Mail } from 'lucide-react';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';

interface EmailSignupFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
}

const InputField: React.FC<{
  id: string;
  type: string;
  label: string;
  value: string;
  placeholder: string;
  icon: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
  disabled?: boolean;
}> = ({ 
  id, 
  type, 
  label, 
  value, 
  placeholder, 
  icon, 
  onChange, 
  onBlur, 
  error, 
  disabled 
}) => (
  <div className="relative">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-3.5 rounded-lg border ${
          error
            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-200 focus:border-primary-500 focus:ring-primary-100'
        } focus:ring focus:ring-opacity-50 outline-none transition-all duration-200 shadow-sm hover:border-gray-300`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-3 inset-y-0 flex items-center"
        >
          <AlertCircle size={18} className="text-red-500" />
        </motion.div>
      )}
    </div>
    <AnimatePresence>
      {error && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-red-600 text-sm mt-1.5"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const EmailSignupForm: React.FC<EmailSignupFormProps> = ({ 
  title = "Join our waitlist",
  description = "Be the first to know when we launch in your area.",
  buttonText = "Join Waitlist",
  className = ""
}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState({
    email: false,
    firstName: false
  });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const errors = {
    firstName: touched.firstName && !firstName.trim() ? "First name is required" : "",
    email: touched.email && !email ? "Email is required" : 
           touched.email && !validateEmail(email) ? "Please enter a valid email" : ""
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, firstName: true });
    
    if (!email || !validateEmail(email) || !firstName.trim()) {
      setErrorMessage('Please fill in all required fields correctly');
      setStatus('error');
      return;
    }
    
    setStatus('submitting');
    setErrorMessage('');
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setStatus('success');
      setEmail('');
      setFirstName('');
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={`p-8 relative overflow-hidden ${className}`}>
      {/* Decorative background elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-100/20 rounded-full blur-2xl -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary-100/20 rounded-full blur-2xl -z-10"></div>
      
      <motion.div 
        className="mb-6 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title && <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>}
        {description && <p className="text-gray-600">{description}</p>}
      </motion.div>
      
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-6 flex flex-col items-center text-center relative z-10 shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center mb-4 shadow-md">
              <CheckCircle className="text-green-600" size={30} />
            </div>
            <h4 className="font-semibold text-green-800 text-lg mb-2">Thank you for joining!</h4>
            <p className="text-green-700">We'll be in touch when we launch in your area.</p>
            
            <div className="w-full h-1.5 bg-green-100 rounded-full mt-6 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
              />
            </div>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onSubmit={handleSubmit} 
            className="space-y-5 relative z-10"
          >
            <InputField
              id="firstName"
              type="text"
              label="First Name"
              value={firstName}
              placeholder="Your first name"
              icon={<User size={18} />}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, firstName: true }))}
              error={errors.firstName}
              disabled={status === 'submitting'}
            />
            
            <InputField
              id="email"
              type="email"
              label="Email Address"
              value={email}
              placeholder="you@example.com"
              icon={<Mail size={18} />}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
              error={errors.email}
              disabled={status === 'submitting'}
            />
            
            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-center"
                >
                  <AlertCircle size={18} className="text-red-600 mr-3 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                type="submit" 
                variant="primary" 
                disabled={status === 'submitting'}
                className="w-full py-3.5 relative overflow-hidden group shadow-md hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>{buttonText}</span>
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </Button>
            </motion.div>
            
            <p className="text-xs text-gray-500 text-center pt-2">
              By joining, you agree to our{' '}
              <a href="#" className="text-primary-600 hover:underline">Terms</a> and{' '}
              <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmailSignupForm;