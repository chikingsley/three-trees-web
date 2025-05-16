# Programs Component Improvements

## Container Width

- [ ] Replace `max-w-screen-lg` with `max-w-screen-xl` to increase width
- [ ] Ensure consistency with header width
- [ ] Apply consistently to all main content sections

## Card Styling

- [ ] Update card padding from `p-5` to `p-6`
- [ ] Apply consistent hover effects: `hover:border-primary/20 hover:shadow-md transition-all`
- [ ] Ensure consistent border styling with WhyChooseSection cards

## Layout & Spacing

- [ ] Ensure consistent vertical rhythm between sections
- [ ] Add subtle dividers between sections with appropriate spacing
- [ ] Update grid gap to `gap-6` for mobile and desktop

## Button Styling

- [ ] Standardize button styles:
  - [ ] Desktop: Subtle primary/10 background with primary text
  - [ ] Mobile: Solid primary background with white text

## Content Optimization

- [ ] Ensure content is concise to prevent overflow
- [ ] Balance content length across cards
- [ ] Consider truncating long descriptions on mobile

## Accessibility

- [ ] Ensure sufficient color contrast
- [ ] Add `aria-label` attributes to interactive elements
- [ ] Ensure focus states are clearly visible

## Responsive Behavior

- [ ] Fine-tune mobile carousel transitions
- [ ] Consider snap-scroll for carousel items
- [ ] Test on various screen sizes

## Hover States

- [ ] Apply consistent hover transitions
- [ ] Use consistent timing functions
- [ ] Ensure hover states are obvious but not distracting

## Navbar Scroll Behavior Refactor

- [ ] Add `useState` and `useEffect` to `Navbar` for scroll detection.
- [ ] Implement scroll event listener to update scroll state.
- [x] Apply conditional styling to `<nav>`: initial state `top-0 inset-x-0 rounded-none bg-gradient-to-b from-black/30 shadow-none`, scrolled state `top-6 inset-x-2 rounded-md bg-white shadow-md`. Apply transitions.
- [ ] Modify `LogoCard` to accept `scrolled` prop and conditionally change text colors.
- [x] Modify `LogoCard` to accept `scrolled` prop and conditionally change text colors.
- [x] Update `NavigationMenuTrigger` components for conditional styling (white ghost -> dark text).
- [x] Update "About Us" `PopoverTrigger` (`Button`) for conditional styling (white ghost -> dark text).
- [ ] Update "Enroll Now" `Button` for conditional styling (transparent bg state -> white bg state).
