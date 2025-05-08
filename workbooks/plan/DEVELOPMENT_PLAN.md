# Three Trees Development Plan

## Site Architecture

### 1. Marketing Pages (Static/Hard-Coded Initially, Sanity Later)

- Homepage (`/`)
- About Us (`/about`)
- Contact (`/contact`)
- Method (`/about/method`)
- Presence Overview (`/about/presence`)

### 2. Program Structure

#### Overview Pages (Custom Template)

- Court-Ordered Programs (`/court-ordered-programs`)
- College & University Programs (`/college-university-programs`)
- Corporate & Hospital Programs (`/corporate-hospital-programs`)

#### Service Pages (Standard Template)

- Court-Ordered Services
  - `/court-ordered-programs/domestic-violence`
  - `/court-ordered-programs/anger-management`
  - etc.
- College Services
  - `/college-university-programs/mental-health`
  - `/college-university-programs/substance-abuse`
  - etc.
- Corporate Services
  - `/corporate-hospital-programs/staff-training`
  - `/corporate-hospital-programs/certifications`
  - etc.

### 3. Geographic Presence Pages

Base structure: `/locations/[state]/[county?]/[city?]`

Initial implementation:

- State level only: `/locations/california`
- Prepared for expansion:
  - County level: `/locations/california/orange-county`
  - City level: `/locations/california/orange-county/irvine`

### 4. Blog System

Structure: `/blog/[category]/[slug]`

- Main blog page (`/blog`)
- Category pages (`/blog/mental-health`, `/blog/research`, etc.)
- Individual posts (`/blog/mental-health/understanding-cognitive-behavioral-therapy`)

## Development Phases

### Phase 1: Core Structure

- [x] Basic routing setup
- [x] Service page template
- [ ] Overview page template
- [ ] Navigation system
- [ ] Footer system

### Phase 2: Content Management (Sanity Integration)

- [ ] Set up Sanity Studio
- [ ] Define schemas:
  - [ ] Services
  - [ ] Blog posts
  - [ ] Location pages
  - [ ] Authors
- [ ] Content migration plan for marketing pages

### Phase 3: Geographic System

- [ ] State-level pages
- [ ] Location finder
- [ ] Prepare county/city structure
- [ ] SEO optimization for location pages

### Phase 4: Blog System

- [ ] Blog homepage
- [ ] Category system
- [ ] Author pages
- [ ] Related posts
- [ ] Search functionality

### Phase 5: Marketing Pages Migration

- [ ] Homepage components in Sanity
- [ ] About page sections
- [ ] Method page
- [ ] Presence page

### Phase 6: Advanced Features

- [ ] Search system
- [ ] Program finder
- [ ] Location-based service recommendations
- [ ] Contact form with location awareness
- [ ] Analytics integration

## Sanity Schema Planning

### Service Schema

```typescript
{
  title: string;
  slug: string;
  programType: Reference;
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
    duration: string;
    format: string;
    certification: string;
    requirements: string[];
  };
}
```

### Location Schema

```typescript
{
  name: string;
  slug: string;
  type: 'state' | 'county' | 'city';
  parent: Reference; // Reference to parent location
  description: string;
  services: Reference[]; // Available services
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  coverage: {
    areas: string[];
    radius: number;
  };
}
```

### Blog Post Schema

```typescript
{
  title: string;
  slug: string;
  author: Reference;
  category: Reference;
  publishedAt: datetime;
  featured: boolean;
  excerpt: string;
  content: array; // Portable Text
  relatedServices: Reference[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}
```

## Next Steps

1. Complete service page template implementation
2. Create overview page template
3. Set up Sanity schemas
4. Implement state-level location pages
5. Begin blog system development

## Questions to Resolve

- [ ] Geographic targeting strategy
- [ ] Content migration approach
- [ ] SEO strategy for location pages
- [ ] Blog categories structure
- [ ] Service finder algorithm
- [ ] Analytics requirements
