// This contains all the type definitions needed for the website

export interface FeatureType {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface TestimonialType {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface FAQType {
  id: number;
  question: string;
  answer: string;
  category?: string;
  helpfulLinks?: Array<{
    text: string;
    url: string;
  }>;
}

export interface CTAButtonProps {
  text: string;
  href: string;
  primary?: boolean;
  className?: string;
}

export interface NavLinkType {
  name: string;
  href: string;
  icon?: string;
}