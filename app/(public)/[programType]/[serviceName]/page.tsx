import { ServicePage } from "@/components/templates/service-page";
import React from "react";
import { notFound } from "next/navigation";

interface ServiceData {
  title: string;
  description: string;
  benefits: Array<{
    title: string;
    description: string;
  }>;
  features: Array<{
    title: string;
    description: string;
  }>;
  programDetails: {
    duration?: string;
    format?: string;
    certification?: string;
    requirements?: string[];
  };
}

type ProgramServices = {
  [key: string]: ServiceData;
};

type Services = {
  [key: string]: ProgramServices;
};

// This will eventually come from Sanity
const services: Services = {
  "court-ordered-programs": {
    "domestic-violence": {
      title: "Domestic Violence Intervention Program",
      description: "A comprehensive program designed to address and prevent domestic violence through education, accountability, and personal growth.",
      benefits: [
        {
          title: "Personal Growth",
          description: "Develop self-awareness and emotional regulation skills to build healthier relationships.",
        },
        {
          title: "Accountability",
          description: "Learn to take responsibility for actions and understand their impact on others.",
        },
        {
          title: "Skill Development",
          description: "Acquire practical tools for communication, conflict resolution, and anger management.",
        },
      ],
      features: [
        {
          title: "Evidence-Based Curriculum",
          description: "Program content is based on proven research and best practices in domestic violence intervention.",
        },
        {
          title: "Group Learning Environment",
          description: "Participate in structured group sessions that promote peer learning and support.",
        },
        {
          title: "Progress Tracking",
          description: "Regular assessments and progress reports to document your journey and growth.",
        },
        {
          title: "Court Compliance",
          description: "Meets court-mandated requirements with proper documentation and reporting.",
        },
      ],
      programDetails: {
        duration: "26 weeks, with weekly 2-hour sessions",
        format: "Group sessions with individual check-ins",
        certification: "Certificate of completion provided upon successful program completion",
        requirements: [
          "Attendance at all scheduled sessions",
          "Active participation in group discussions",
          "Completion of assigned homework and exercises",
          "Compliance with program policies and guidelines",
        ],
      },
    },
    // Add more court-ordered services here
  },
  "college-university-programs": {
    "mental-health": {
      title: "Student Mental Health Support",
      description: "Comprehensive mental health services designed specifically for college and university students.",
      benefits: [
        {
          title: "Academic Success",
          description: "Learn to manage academic stress and maintain a healthy work-life balance.",
        },
        {
          title: "Personal Development",
          description: "Develop coping strategies and emotional resilience skills.",
        },
        {
          title: "Support Network",
          description: "Connect with peers and professionals in a supportive environment.",
        },
      ],
      features: [
        {
          title: "Individual Counseling",
          description: "One-on-one sessions with licensed mental health professionals.",
        },
        {
          title: "Group Workshops",
          description: "Themed workshops addressing common student challenges.",
        },
        {
          title: "Crisis Support",
          description: "24/7 access to crisis intervention services.",
        },
        {
          title: "Academic Integration",
          description: "Coordination with academic advisors and faculty when needed.",
        },
      ],
      programDetails: {
        duration: "Flexible scheduling throughout the academic year",
        format: "Individual sessions and group workshops",
        requirements: [
          "Current college/university enrollment",
          "Initial consultation completion",
          "Regular attendance at scheduled sessions",
        ],
      },
    },
    // Add more college/university services here
  },
  // Add more program types here
};

interface PageProps {
  params: {
    programType: string;
    serviceName: string;
  };
}

export default function Page({ params }: PageProps) {
  const { programType, serviceName } = params;
  
  const programServices = services[programType];
  const service = programServices?.[serviceName];

  if (!service) {
    notFound();
  }

  return <ServicePage {...service} />;
}

// This will eventually fetch from Sanity
export async function generateStaticParams() {
  return Object.entries(services).flatMap(([programType, programs]) =>
    Object.keys(programs).map((serviceName) => ({
      programType,
      serviceName,
    }))
  );
}
