import React from "react";

interface StepHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const StepHeader: React.FC<StepHeaderProps> = ({ 
  title, 
  subtitle, 
  className 
}) => {
  return (
    <div className={`mb-4 text-center ${className ?? ""}`}>
      <h2 className="text-xl md:text-2xl font-bold mb-1 text-primary px-2">{title}</h2>
      {subtitle && (
        <p className="text-secondary font-semibold text-sm md:text-lg px-4">{subtitle}</p>
      )}
    </div>
  );
};

export default StepHeader; 