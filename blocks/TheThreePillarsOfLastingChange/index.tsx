'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// --- Type Definitions ---
interface TabItem {
  id: string;
  title: string;
  content: string;
  image: string;
  // color?: string; // Color seems unused, omitting for now
}

interface ThreePillarsProps {
  title?: string;
  subtitle?: string;
  tabs?: TabItem[];
}

// --- Default Values ---
const defaultProps: Required<ThreePillarsProps> = {
  title: "The Three Pillars of Lasting Change",
  subtitle: "Our methodology addresses the essential elements of sustainable behavioral transformation. This evidence-based approach has helped over 40,000 individuals create meaningful, lasting change by addressing all three dimensions of human experience.",
  tabs: [
    {
      id: 'emotional',
      title: 'Emotional Resilience',
      content: 'Developing the capacity to recognize, understand, and effectively manage emotional responses to stressors and challenges, creating a foundation for healthier relationships.',
      image: '/images/resilience2.jpg'
    },
    {
      id: 'cognitive',
      title: 'Mindful Awareness',
      content: 'Identifying and restructuring thought patterns that perpetuate harmful behaviors while enhancing rational thinking and promoting better decision-making in challenging situations.',
      image: '/images/confidence.jpg'
    },
    {
      id: 'behavioral',
      title: 'Effective Habits',
      content: 'Establishing and maintaining positive action patterns that lead to meaningful outcomes and reinforce long-term change through practical skills development and sustainable habit formation.',
      image: '/images/habits.jpg'
    }
  ]
};

const ThreeTreesApproach = (props: ThreePillarsProps) => {
  // Merge props with defaults
  const { title, subtitle, tabs } = { ...defaultProps, ...props };

  // Ensure tabs is always an array, even if undefined is passed
  const finalTabs = tabs || []; 

  const [activeTab, setActiveTab] = useState(finalTabs[0]?.id || ''); // Default to first tab ID or empty string

  const activeTabData = finalTabs.find(tab => tab.id === activeTab);

  return (
    <section className="py-8 bg-[#EEF0FC]" style={{ backgroundColor: 'rgba(91, 117, 235, 0.1)' }}>
      <div className="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-8">
        {/* Decorative line */}
        <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
        <div className="text-center mb-10">
          {/* Title */}
          {title && (
          <h2 className="text-2xl md:text-4xl font-semibold text-black mb-6">
              {title}
          </h2>
          )}
          {/* Subtitle */}
          {subtitle && (
          <p className="text-md md:text-lg text-black max-w-3xl mx-auto mb-6">
              {subtitle}
          </p>
          )}
          {/* Decorative line */}
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
        </div>
        
        {/* Desktop Version - Hidden on mobile */}
        {finalTabs.length > 0 && (
        <div className="hidden md:flex flex-col md:flex-row gap-8 mt-12">
          {/* Tab Navigation */}
          <div className="md:w-1/3">
            <div className="flex flex-col gap-3">
                {finalTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "text-left p-4 rounded-lg transition-all",
                    activeTab === tab.id
                      ? "bg-white border-l-4 border-primary shadow-md"
                      : "bg-white/60 hover:bg-white"
                  )}
                >
                  <h3 className={cn(
                    "text-lg font-semibold mb-1",
                    activeTab === tab.id ? "text-primary" : "text-black"
                  )}>
                    {tab.title}
                  </h3>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
            {activeTabData && (
          <div className="md:w-2/3 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-6">
                <h3 className="text-xl font-bold mb-4 text-primary">
                      {activeTabData.title}
                </h3>
                <p className="text-gray-700">
                      {activeTabData.content}
                </p>
              </div>
              <div className="md:w-1/2 relative min-h-[300px]">
                <Image
                      src={activeTabData.image || '/images/placeholder1.jpg'} // Fallback just in case
                      alt={activeTabData.title || "Pillar visual representation"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
            )}
        </div>
        )}

        {/* Mobile View Cards - Only visible on small screens */}
        {finalTabs.length > 0 && (
        <div className="md:hidden flex flex-col gap-4 mt-8">
            {finalTabs.map((tab) => (
            <div key={tab.id} className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-bold mb-3 text-primary">{tab.title}</h3>
              <p className="text-gray-600">
                {tab.content}
              </p>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default ThreeTreesApproach; 