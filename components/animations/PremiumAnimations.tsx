"use client";

/**
 * PREMIUM ANIMATION COMPONENTS
 * 
 * High-end animation components for luxury feel
 * Uses Framer Motion for smooth, sophisticated animations
 * Respects prefers-reduced-motion for accessibility
 */

import { motion, useInView, Variants, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode, useEffect, useState } from "react";

// Luxury easing curves - refined for premium feel
const luxuryEase: [number, number, number, number] = [0.23, 1, 0.32, 1];
const smoothEase: [number, number, number, number] = [0.4, 0, 0.2, 1];
const springEase: [number, number, number, number] = [0.175, 0.885, 0.32, 1.275];
const dramaticEase: [number, number, number, number] = [0.87, 0, 0.13, 1];

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none" | "fade";
  duration?: number;
  once?: boolean;
  amount?: number;
  distance?: number;
}

const getVariants = (direction: string, distance: number = 60): Variants => {
  const directions: Record<string, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
    fade: {},
  };

  return {
    hidden: {
      opacity: 0,
      ...directions[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };
};

/**
 * AnimatedSection - Smooth reveal animation when scrolling into view
 * Uses luxury easing for premium feel
 */
export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
  once = true,
  amount = 0.3,
  distance = 40,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants(direction, distance)}
      transition={{
        duration,
        delay,
        ease: luxuryEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer - Container for staggered children animations
 * Creates elegant reveal sequences
 */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  amount?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
  amount = 0.2,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem - Individual item for staggered animations
 */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
}: StaggerItemProps) {
  return (
    <motion.div
      variants={getVariants(direction, 30)}
      transition={{
        duration: 0.6,
        ease: luxuryEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeScale - Fade in with subtle scale (for cards, images)
 */
interface FadeScaleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
}

export function FadeScale({
  children,
  className = "",
  delay = 0,
  once = true,
  amount = 0.3,
}: FadeScaleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.7,
        delay,
        ease: luxuryEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * TextReveal - Elegant text reveal animation
 */
interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
  charDelay?: number;
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  once = true,
  charDelay = 0.03,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  return (
    <motion.span ref={ref} className={`inline-block ${className}`}>
      {children.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.4,
            delay: delay + index * charDelay,
            ease: luxuryEase,
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * WordReveal - Reveal animation word by word
 */
interface WordRevealProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
  wordDelay?: number;
}

export function WordReveal({
  children,
  className = "",
  delay = 0,
  once = true,
  wordDelay = 0.1,
}: WordRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const words = children.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.6,
            delay: delay + index * wordDelay,
            ease: luxuryEase,
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * HoverLift - Elegant lift effect on hover
 */
interface HoverLiftProps {
  children: ReactNode;
  className?: string;
  lift?: number;
  scale?: number;
}

export function HoverLift({
  children,
  className = "",
  lift = 8,
  scale = 1.02,
}: HoverLiftProps) {
  return (
    <motion.div
      whileHover={{
        y: -lift,
        scale,
        transition: { duration: 0.4, ease: luxuryEase },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Magnetic - Magnetic button effect
 */
interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({
  children,
  className = "",
  strength = 0.3,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * strength;
    const y = (clientY - top - height / 2) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * GoldLineReveal - Elegant gold line reveal animation
 */
interface GoldLineRevealProps {
  className?: string;
  delay?: number;
  width?: string;
}

export function GoldLineReveal({
  className = "",
  delay = 0,
  width = "80px",
}: GoldLineRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={{ width }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 1.2,
          delay,
          ease: luxuryEase,
        }}
        style={{ originX: 0 }}
        className="h-px bg-gradient-to-r from-brand-secondary-500 via-brand-secondary-400 to-transparent"
      />
    </div>
  );
}

/**
 * ParallaxScroll - Parallax effect on scroll
 */
interface ParallaxScrollProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxScroll({
  children,
  className = "",
  speed = 0.5,
}: ParallaxScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * PageLoadAnimation - Initial page load animation wrapper
 */
interface PageLoadAnimationProps {
  children: ReactNode;
  className?: string;
}

export function PageLoadAnimation({
  children,
  className = "",
}: PageLoadAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: smoothEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * CounterAnimation - Animated number counter
 */
interface CounterAnimationProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CounterAnimation({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
}: CounterAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

/**
 * ShimmerEffect - Shimmer loading effect
 */
interface ShimmerEffectProps {
  className?: string;
}

export function ShimmerEffect({ className = "" }: ShimmerEffectProps) {
  return (
    <div
      className={`animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] ${className}`}
    />
  );
}

/**
 * SmoothScroll - Smooth scroll to element
 */
export function smoothScrollTo(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
