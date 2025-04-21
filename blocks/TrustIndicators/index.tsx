'use client';

import { 
  Award, 
  Users, 
  Clock, 
  CheckCircle, 
  ShieldCheck,
  CreditCard,
  LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Map icon names to Lucide components
const iconMap: { [key: string]: LucideIcon } = {
  Award,
  Users,
  Clock,
  CheckCircle,
  ShieldCheck,
  CreditCard
};

// Define the structure for a single indicator
interface IndicatorItem {
  iconName: keyof typeof iconMap; // Use keyof to ensure valid icon names
  text: string;
}

// Define the props for the main component
interface TrustIndicatorsProps {
  indicators?: IndicatorItem[];
  className?: string;
}

// Default values
const defaultProps: Required<TrustIndicatorsProps> = {
  className: "",
  indicators: [
    {
      iconName: 'Award',
      text: 'Evidence-Based'
    },
    {
      iconName: 'Users',
      text: '40,000+ Lives Changed'
    },
    {
      iconName: 'Clock',
      text: '15+ Years Experience'
    },
    {
      iconName: 'CheckCircle',
      text: 'Certified Professionals'
    },
    {
      iconName: 'ShieldCheck',
      text: 'Secure Online Learning'
    },
    {
      iconName: 'CreditCard',
      text: 'Flexible Payment Options'
    }
  ]
};

const TrustIndicators = (props: TrustIndicatorsProps) => {
  // Merge passed props with defaults
  const { className, indicators } = { ...defaultProps, ...props };

  return (
    <section className={cn("w-full py-3 bg-white border-b-2 border-t-2 border-primary", className)}>
      <div className="mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-1 items-center justify-center">
          {indicators.map((item, index) => {
            const IconComponent = iconMap[item.iconName]; // Get the icon component from the map
            if (!IconComponent) return null; // Handle cases where icon name might be invalid
            
            return (
              <div key={index} className="flex flex-col items-center justify-center text-center px-2">
                <IconComponent className="h-5 w-5 mb-1.5 text-primary" />
                <span className="text-xs md:text-sm font-medium text-gray-700">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators; 