import React from "react";
import { motion } from "framer-motion";

interface StepAnimationWrapperProps {
  children: React.ReactNode;
  // We pass the key from the parent <AnimatePresence> iteration directly to this motion.div
  // No specific motionKey prop needed here if the parent <AnimatePresence> handles keys correctly for its direct children.
  // However, if we need to force re-render based on a key on THIS component, we might add it.
  // For now, assuming the key on the <StepAnimationWrapper> itself in page.tsx is enough for <AnimatePresence>.
  customKey?: string | number; // Optional: if direct keying of this motion.div is needed for specific cases
}

const StepAnimationWrapper: React.FC<StepAnimationWrapperProps> = ({ children, customKey }) => {
  return (
    <motion.div
      key={customKey} // Use the passed key if provided, otherwise framer-motion might use its internal logic or parent's key
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      // NO PADDING OR WIDTH CLASSES HERE - this is purely for animation
      // Parent in page.tsx controls width (e.g., max-w-md mx-auto)
      // Individual step components control their internal padding IF needed, but ideally not on their root.
    >
      {children}
    </motion.div>
  );
};

export default StepAnimationWrapper; 