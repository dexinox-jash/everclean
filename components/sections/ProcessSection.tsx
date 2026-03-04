"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, ClipboardList, Sparkles, CheckCircle } from "lucide-react";
import { AnimatedSection, GoldLineReveal } from "@/components/luxury/animations";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consultation",
    description: "We discuss your home's unique needs, scheduling preferences, and any special requirements. Estates over $1,000 receive an in-home assessment.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Custom Protocol",
    description: "Your dedicated team develops a bespoke cleaning protocol tailored to your finishes, furnishings, and priorities.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Service Day",
    description: "Our bonded professionals arrive in unmarked vehicles, execute your custom protocol with museum-quality care, and ensure every detail meets our standard.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Inspection",
    description: "A supervisor performs a final walkthrough before departure. You'll receive confirmation and any notes about your service.",
  },
];

function ProcessStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className={`relative flex items-center gap-8 ${isEven ? "flex-row" : "flex-row-reverse"} md:gap-16`}
    >
      {/* Content */}
      <div className={`flex-1 ${isEven ? "text-right md:pr-12" : "text-left md:pl-12"}`}>
        <span className="font-serif text-5xl md:text-6xl text-gold-500/20">{step.number}</span>
        <h3 className="font-serif text-2xl md:text-3xl text-stone mt-2 mb-4">{step.title}</h3>
        <p className="text-stone-light leading-relaxed max-w-md mx-auto md:mx-0">
          {step.description}
        </p>
      </div>

      {/* Center Icon */}
      <div className="relative flex-shrink-0">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gold-500/10 flex items-center justify-center z-10 relative">
          <step.icon className="w-8 h-8 md:w-10 md:h-10 text-gold-500" />
        </div>
        {/* Connecting Line */}
        {index < steps.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
            className="absolute top-full left-1/2 -translate-x-1/2 w-px h-16 md:h-24 bg-gradient-to-b from-gold-500/50 to-transparent origin-top"
          />
        )}
      </div>

      {/* Spacer for layout */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export function ProcessSection() {
  return (
    <section className="section-lg bg-cream">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <AnimatedSection>
            <span className="text-eyebrow mb-4 block">The Experience</span>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone mb-6">
              How It Works
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <GoldLineReveal className="mx-auto mb-6" />
          </AnimatedSection>
          
          <AnimatedSection delay={0.3}>
            <p className="text-stone-light leading-relaxed">
              A seamless experience from first contact to final inspection. 
              We&apos;ve refined every touchpoint to respect your time and privacy.
            </p>
          </AnimatedSection>
        </div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
          {steps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
