# Three Trees Website Structure & Sanity Schema Recommendations

Based on the development plan and comprehensive information about Three Trees Center for Change, I'd like to offer recommendations for your website structure and Sanity schema.

## Content Strategy Overview

For a content-managed site like this, I recommend:

1. **Put all content in Sanity** - text, headings, links, images, and even navigation labels should be editable
2. **Design for flexibility** - create reusable content blocks rather than fixed page templates
3. **Implement a modular approach** - allow pages to be built from components
4. **Consider content relationships** - link services to locations, program types, etc.

## Improved Sanity Schema Recommendations

### Program Type Schema (for Overview Pages)
```typescript
{
  title: string;                 // e.g., "Court-Ordered Programs"
  slug: {                        // Make this a slug field type in Sanity
    current: string;             // e.g., "court-ordered-programs"
  };
  subtitle: string;              // Optional subtitle
  description: string | PortableText; // Rich text description
  heroImage: Image;              // Featured image for overview page
  shortDescription: string;      // Brief summary for cards/previews
  icon: string;                  // Optional icon reference
  services: Reference[];         // Array of related services
  featuredTestimonials: Reference[]; // Relevant testimonials for this program type
  seo: {                         // SEO metadata
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  callToAction: {                // Primary CTA for this program type
    text: string;
    url: string;
    style: 'primary' | 'secondary';
  };
  additionalContent: PortableText; // Any additional content sections
}
```

### Enhanced Service Schema
```typescript
{
  title: string;                 // Service name
  slug: {
    current: string;             // URL-friendly version
  };
  programType: Reference;        // Reference to parent program type
  heroImage: Image;              // Header image
  summary: string;               // Short description (for cards)
  description: PortableText;     // Full rich text description
  
  benefits: Array<{
    title: string;
    description: string;
    icon?: string;               // Optional icon
  }>;
  
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  
  programDetails: {
    duration: string;            // e.g., "12 weeks"
    format: string[];            // e.g., ["Online", "In-person"]
    schedule: string;            // e.g., "Weekly, 1-hour sessions"
    certification: string;
    requirements: string[];
    pricing: string | null;      // Optional pricing info
  };
  
  faqs: Array<{                  // Common questions about this service
    question: string;
    answer: PortableText;
  }>;
  
  testimonials: Reference[];     // Success stories specific to this service
  
  relatedServices: Reference[];  // Other services users might be interested in
  
  availability: {                // Where this service is available
    locations: Reference[];      // References to location documents
    notes: string;               // Any special availability notes
  };
  
  callToAction: {
    text: string;                // e.g., "Enroll Now"
    url: string;
    style: 'primary' | 'secondary';
  };
  
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}
```

### Location Schema (Enhanced)
```typescript
{
  name: string;                  // e.g., "California" or "Orange County"
  slug: {
    current: string;
  };
  type: 'state' | 'county' | 'city';
  parent: Reference;             // Reference to parent location
  description: PortableText;     // Rich text description of services in this location
  
  // Available services in this location
  services: Reference[];
  
  // Local providers or partners (if applicable)
  localPartners: Array<{
    name: string;
    role: string;
    contact: string;
  }>;
  
  // Regulatory information specific to this location
  regulations: PortableText;
  
  // Location-specific testimonials
  testimonials: Reference[];
  
  // Physical location (if applicable)
  physicalLocation: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    hours: string;
  };
  
  // Contact information
  contact: {
    phone: string;
    email: string;
    contactPerson: string;
  };
  
  // Coverage information
  coverage: {
    areas: string[];
    radius: number;
  };
  
  // Location-specific FAQs
  faqs: Array<{
    question: string;
    answer: PortableText;
  }>;
  
  // SEO
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    localKeywords: string[];     // Location-specific keywords
  };
}
```

### Homepage Schema
```typescript
{
  hero: {
    heading: string;
    subheading: string;
    backgroundImage: Image;
    callToAction: {
      text: string;
      url: string;
    };
    secondaryCTA: {
      text: string;
      url: string;
    };
  };
  
  introSection: {
    heading: string;
    content: PortableText;
    image: Image;
  };
  
  valueProposition: {
    heading: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  
  programsOverview: {
    heading: string;
    description: string;
    featuredPrograms: Reference[]; // References to program types
  };
  
  testimonialSection: {
    heading: string;
    testimonials: Reference[];
  };
  
  processSection: {
    heading: string;
    steps: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  
  ctaSection: {
    heading: string;
    subheading: string;
    buttonText: string;
    buttonUrl: string;
  };
  
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}
```

### About Page Schema
```typescript
{
  hero: {
    heading: string;
    subheading: string;
    backgroundImage: Image;
  };
  
  mission: {
    heading: string;
    content: PortableText;
    image: Image;
  };
  
  history: {
    heading: string;
    content: PortableText;
    timeline: Array<{
      year: string;
      title: string;
      description: string;
    }>;
  };
  
  team: {
    heading: string;
    introduction: string;
    members: Array<{
      name: string;
      title: string;
      bio: PortableText;
      image: Image;
    }>;
  };
  
  values: {
    heading: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  
  statistics: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}
```

### Method Page Schema
```typescript
{
  hero: {
    heading: string;
    subheading: string;
    backgroundImage: Image;
  };
  
  introduction: {
    heading: string;
    content: PortableText;
  };
  
  cognitiveModel: {
    heading: string;
    description: PortableText;
    pillars: Array<{
      title: string;
      description: PortableText;
      icon: string;
    }>;
    image: Image;
  };
  
  approach: {
    heading: string;
    steps: Array<{
      title: string;
      description: PortableText;
      image: Image;
    }>;
  };
  
  evidence: {
    heading: string;
    content: PortableText;
    statistics: Array<{
      value: string;
      label: string;
      description: string;
    }>;
  };
  
  testimonials: {
    heading: string;
    items: Reference[];
  };
  
  faq: {
    heading: string;
    items: Array<{
      question: string;
      answer: PortableText;
    }>;
  };
  
  callToAction: {
    heading: string;
    subheading: string;
    buttonText: string;
    buttonUrl: string;
  };
  
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}
```

### Contact Page Schema
```typescript
{
  hero: {
    heading: string;
    subheading: string;
  };
  
  contactInfo: {
    mainOffice: {
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
    
    alternativeContacts: Array<{
      title: string;
      description: string;
      contact: string;
    }>;
  };
  
  formSettings: {
    heading: string;
    subheading: string;
    successMessage: string;
    // Form fields would be handled by the frontend
  };
  
  faq: {
    heading: string;
    items: Array<{
      question: string;
      answer: PortableText;
    }>;
  };
  
  map: {
    heading: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    zoom: number;
  };
  
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}
```

### Testimonial Schema
```typescript
{
  name: string;
  title: string;        // e.g., "Former Client" or "University Administrator"
  location: string;     // e.g., "South Carolina" (optional)
  quote: string;
  fullTestimonial: PortableText;
  image: Image;         // Optional
  programType: Reference; // Which program they participated in
  service: Reference;   // Which specific service, if applicable
  featured: boolean;    // Should this appear on homepage/key pages?
  date: datetime;
}
```

## Content Strategy for Key Pages

### Program Overview Pages

These pages should:

1. **Clearly explain the program category** - Court-ordered, College/University, or Corporate/Hospital
2. **Highlight key benefits** - Why this type of program is effective
3. **List available services** - Showcase the specific programs with brief descriptions
4. **Show evidence and outcomes** - Success rates and testimonials specific to this program type
5. **Include clear calls to action** - "Enroll Now," "Contact Us," etc.
6. **Answer common questions** - FAQs specific to this program type
7. **Provide contact information** - How to get more information

The overview page should give enough information to understand what Three Trees offers in this category, but leave detailed program specifics for the individual service pages.

### Service Pages

Service pages should:

1. **Clearly explain the specific program** - What it is, who it's for
2. **Detail the program structure** - Duration, format, schedule, requirements
3. **Highlight benefits and outcomes** - What participants will gain
4. **Include testimonials** - From people who completed this specific program
5. **Show credential information** - Court acceptance, certifications, etc.
6. **Explain the enrollment process** - How to sign up
7. **Address common questions** - Program-specific FAQs
8. **Show related services** - Other programs that might be relevant

### Location Pages

Location pages should be tailored to each geographic area with:

1. **Available services in that location** - Which programs are available (and any location-specific variations)
2. **Regulatory information** - How programs meet local requirements
3. **Location-specific testimonials** - From local participants or partners
4. **Local partnerships** - Courts, universities, or organizations you work with
5. **Coverage information** - Counties/cities served within a state
6. **Local contact information** - How to reach the local team or representative
7. **Location-specific FAQs** - E.g., "Are your programs accepted by [local] courts?"

The location pages are critical for SEO and should be optimized for local searches.

## Sanity Content Strategy

To answer your specific question about Sanity: yes, ideally almost all content should be in Sanity. This gives you maximum flexibility to:

1. **Change content without code updates** - Even navigation labels, footer content, etc.
2. **Reuse content across the site** - The same testimonial might appear on multiple pages
3. **Build relationships between content** - Link services to locations, program types, etc.
4. **Future-proof your site** - Add new program types or features without code changes

The only things that typically stay in code are:

1. **Component structures** - The UI components themselves
2. **Global styling** - Though you can control colors, fonts, etc., through Sanity
3. **Complex functionality** - Interactive features, forms processing, etc.

## Implementation Recommendations

1. **Use a modular approach** - Create reusable components that can be arranged in different ways
2. **Implement a preview system** - Allow content editors to see changes before publishing
3. **Consider localization** - Even if you don't need multiple languages now, structure content to support it later
4. **Set up a robust image pipeline** - For optimized image delivery
5. **Create a style guide in Sanity** - For consistent content creation

## Next Steps

1. **Refine these schemas** based on your feedback
2. **Create prototype pages** for the key templates (program overview, service page, location page)
3. **Set up the Sanity studio** with these schemas
4. **Develop component library** for the frontend
5. **Implement the content strategy** with real content

Would you like me to elaborate on any particular aspect of this plan or provide more specific recommendations for any of the page types?