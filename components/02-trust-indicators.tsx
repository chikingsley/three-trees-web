'use client';

import { 
  Award, 
  Users, 
  Clock, 
  CheckCircle, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustIndicatorProps {
  className?: string;
}

const TrustIndicators = ({ className }: TrustIndicatorProps) => {
  const indicators = [
    {
      icon: Award,
      text: 'Evidence-Based'
    },
    {
      icon: Users,
      text: '40,000+ Lives Changed'
    },
    {
      icon: Clock,
      text: '15+ Years Experience'
    },
    {
      icon: CheckCircle,
      text: 'Certified Professionals'
    },
    {
      icon: ShieldCheck,
      text: 'Secure Online Learning'
    },
    {
      icon: CreditCard,
      text: 'Flexible Payment Options'
    }
  ];

  return (
    <section className={cn("w-full py-3 bg-white border-b-2 border-t-2 border-primary", className)}>
      <div className="mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-1 items-center justify-center">
          {indicators.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center px-2">
              <item.icon className="h-5 w-5 mb-1.5 text-primary" />
              <span className="text-xs md:text-sm font-medium text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators; 