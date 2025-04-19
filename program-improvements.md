# Programs Component Improvements

## Container Width
- Replace `max-w-screen-lg` with `max-w-screen-xl` to increase width
- This will better utilize screen real estate on desktop and match header width
- Apply consistently to all main content sections for visual harmony

## Card Styling
- Update card padding from `p-5` to `p-6` to match the WhyChooseSection cards
- Apply consistent hover effects:
  ```css
  hover:border-primary/20 hover:shadow-md transition-all
  ```
- Make border styling consistent with WhyChooseSection cards

## Layout & Spacing
- Ensure consistent spacing between sections (vertical rhythm)
- Add a subtle divider between sections with appropriate spacing
- Update grid gap to `gap-6` for both mobile and desktop views

## Button Styling
- Standardize button styles across components:
  - Desktop: Use subtle primary/10 background with primary text
  - Mobile: Use solid primary background with white text

## Content Optimization
- Ensure content is concise to prevent overflow
- Balance content length across cards for visual harmony
- Consider truncating longer descriptions with a "More" interaction on mobile

## Accessibility
- Ensure sufficient color contrast for all text
- Add `aria-label` attributes to interactive elements
- Make sure focus states are clearly visible

## Responsive Behavior
- Fine-tune the mobile carousel for smooth transitions
- Consider a snap-scroll effect for carousel items
- Test on various screen sizes for optimal display

## Hover States
- Apply consistent hover transitions to all interactive elements
- Use the same timing function across components
- Make sure hover states are obvious but not distracting 