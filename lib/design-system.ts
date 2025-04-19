/**
 * Three Trees Design System
 * 
 * This file contains the design tokens and guidelines for the Three Trees website.
 * It serves as a reference for maintaining design consistency throughout the project.
 */

// 1.1 Spacing & 4-pt Rhythm
export const spacing = {
  0: '0',           // element collapse
  1: '4px',         // hair-line gaps (icon padding)
  2: '8px',         // tiny gaps (between label & input)
  3: '12px',        // table cell padding
  4: '16px',        // default inner padding / column gutter
  6: '24px',        // small block gap (card → card)
  8: '32px',        // section padding mobile
  12: '48px',       // section padding desktop
  20: '80px',       // hero top/bottom on ≥ lg
};

// 1.2 Columns & Max-widths
export const breakpoints = {
  sm: '640px',      // 4 columns, 16px gutter, calc(100% - 2×16)
  md: '768px',      // 8 columns, 16px gutter, 720px max width
  lg: '1024px',     // 12 columns, 24px gutter, 1080px max width
  xl: '1440px',     // 12 columns, 24px gutter, 1280px max width
};

export const maxWidths = {
  sm: 'calc(100% - 32px)',
  md: '720px',
  lg: '1080px',
  xl: '1280px',
};

// 1.3 Type Scale (Major 1.250)
export const typography = {
  display: {
    size: 'clamp(2.75rem, 5vw + 1rem, 4rem)',
    lineHeight: '1.2',
    tailwind: 'text-5xl md:text-6xl lg:text-[3.5rem]',
  },
  h1: {
    size: '2.25rem', // 36px
    lineHeight: '1.2',
    tailwind: 'text-4xl',
  },
  h2: {
    size: '1.8rem', // 29px
    lineHeight: '1.2',
    tailwind: 'text-3xl',
  },
  h3: {
    size: '1.45rem', // 23px
    lineHeight: '1.3',
    tailwind: 'text-2xl',
  },
  bodyLg: {
    size: '1.125rem', // 18px
    lineHeight: '1.5',
    tailwind: 'text-lg',
  },
  body: {
    size: '1rem', // 16px
    lineHeight: '1.5',
    tailwind: 'text-base',
  },
  caption: {
    size: '0.875rem', // 14px
    lineHeight: '1.5',
    tailwind: 'text-sm',
  },
};

// 1.4 Color Palette (extracted from logo)
export const colors = {
  primary: {
    500: '#396AF3', // Primary color
    700: '#243D8E', // Darker shadow/hover
  },
  evergreen: {
    900: '#0F3D33', // Dark text / accents
  },
  sand: {
    50: '#F4F1EA', // Light section bg
  },
  error: {
    500: '#D84848', // Form errors
  },
  gray: {
    700: '#4B5563', // Body text
    200: '#E5E7EB', // Dividers
  },
};

// Common component styles
export const componentStyles = {
  // Section padding
  sectionPadding: {
    mobile: 'py-8', // 32px
    desktop: 'py-12', // 48px
    hero: 'py-20', // 80px
  },
  
  // Container max widths
  container: {
    center: true,
    padding: {
      DEFAULT: '1rem',
      sm: '1rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '1.5rem',
    },
    maxWidth: {
      sm: '100%',
      md: '720px',
      lg: '1080px',
      xl: '1280px',
    },
  },
  
  // Card styles
  card: {
    base: 'bg-background rounded-lg p-6 shadow-sm border border-border/50',
    hover: 'hover:border-primary/20 hover:shadow-md transition-all',
  },
  
  // Button styles
  button: {
    primary: 'bg-primary text-white hover:bg-primary-dark rounded-full',
    secondary: 'bg-transparent border border-primary text-primary hover:bg-primary/5 rounded-full',
    sizes: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3 text-lg',
    },
  },
};

// Usage guidelines
export const guidelines = {
  spacing: "Use the spacing scale for all margins, paddings, and gaps. This ensures a consistent 4-pt rhythm throughout the design.",
  typography: "Use the type scale for all text elements. Hero text and comparison tables should never exceed max width; center them for readability.",
  colors: "The primary colors come directly from the logo. Evergreen 900 provides contrast for headings.",
  layout: "Big visual spacers (hero, section dividers) combine tokens (e.g., 80px = 20 × 4). This preserves rhythm without forcing equal white-space everywhere.",
};

const designSystem = {
  spacing,
  breakpoints,
  maxWidths,
  typography,
  colors,
  componentStyles,
  guidelines,
};

export default designSystem;
