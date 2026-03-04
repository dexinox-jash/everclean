"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const luxuryEase: [number, number, number, number] = [0.23, 1, 0.32, 1];

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.6,
          ease: luxuryEase,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Luxury page load animation
export function PageLoadAnimation({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: luxuryEase }}
    >
      {/* Initial overlay */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1, ease: luxuryEase, delay: 0.2 }}
        style={{ originY: 0 }}
        className="fixed inset-0 bg-brand-primary z-[9999] pointer-events-none"
      />
      
      {/* Gold accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: luxuryEase, delay: 0.5 }}
        style={{ originX: 0 }}
        className="fixed top-1/2 left-0 right-0 h-px bg-brand-secondary z-[9999] pointer-events-none"
      />
      
      {children}
    </motion.div>
  );
}
