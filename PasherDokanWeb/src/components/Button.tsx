import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  type = 'button',
  disabled = false,
  icon
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white shadow-md hover:shadow-lg focus:ring-primary-400",
    secondary: "bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-700 hover:to-secondary-600 text-white shadow-md hover:shadow-lg focus:ring-secondary-400",
    outline: "bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:border-primary-600 focus:ring-primary-400",
    glass: "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 shadow-md hover:shadow-lg focus:ring-white/30"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };
  
  const radiusClasses = "rounded-full"; 
  const disabledClasses = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${radiusClasses} ${disabledClasses} ${className}`}
      aria-disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;