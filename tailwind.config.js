/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '1.5rem',
      },
      screens: {
        sm: '100%',
        md: '720px',
        lg: '1080px',
        xl: '1280px',
      },
    },
    extend: {
      // Implement spacing based on 4-pt rhythm
      spacing: {
        '0': '0',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '20': '80px',
      },
      // Color palette from design system
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#396AF3", // Primary 500
          foreground: "var(--primary-foreground)",
          dark: "#243D8E", // Primary 700
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "#D84848", // Error 500
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "#4B5563", // Gray 700
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        evergreen: {
          900: "#0F3D33", // Evergreen 900
        },
        sand: {
          50: "#F4F1EA", // Sand 50
        },
        gray: {
          200: "#E5E7EB", // Gray 200
          700: "#4B5563", // Gray 700
        },
      },
      // Implement type scale
      fontSize: {
        'display': ['clamp(2.75rem, 5vw + 1rem, 4rem)', { lineHeight: '1.2' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],  // H1
        '3xl': ['1.8rem', { lineHeight: '1.2' }],   // H2
        '2xl': ['1.45rem', { lineHeight: '1.3' }],  // H3
        'lg': ['1.125rem', { lineHeight: '1.5' }],  // Body-lg
        'base': ['1rem', { lineHeight: '1.5' }],    // Body
        'sm': ['0.875rem', { lineHeight: '1.5' }],  // Caption
      },
      // Breakpoints
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl2': '1300px',
        'xl': '1440px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
