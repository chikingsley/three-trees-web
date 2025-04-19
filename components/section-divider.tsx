import React from 'react';
import { cn } from '@/lib/utils';

interface SectionDividerProps {
  topColor?: string;
  bottomColor?: string;
  className?: string;
  height?: number;
  curveAmount?: number;
}

const SectionDivider = ({ 
  topColor = 'white', // sand-50 color
  bottomColor = '#EEF0FC', // ThreeTreesApproach bg color
  className,
  height = 80,
  curveAmount = 0
}: SectionDividerProps) => {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: `${height}px` }}>
      <div 
        className={cn("w-full absolute inset-0", className)}
        style={{
          background: `linear-gradient(to bottom, ${topColor} 0%, ${bottomColor} 100%)`,
        }}
      />
      <svg 
        className="absolute bottom-0 w-full h-auto"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox={`0 0 1440 ${curveAmount}`}
        preserveAspectRatio="none"
      >
        <path 
          fill={bottomColor}
          fillOpacity="1"
          d={`M0,0 C480,${curveAmount} 960,${curveAmount/2} 1440,0 L1440,${curveAmount} L0,${curveAmount} Z`}
        />
      </svg>
    </div>
  );
};

export default SectionDivider; 