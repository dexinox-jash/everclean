"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Shield, Award, Clock } from "lucide-react";
import { WordReveal } from "@/components/luxury/animations";

const trustBadges = [
  { icon: Shield, label: "Fully Insured" },
  { icon: Award, label: "Bonded" },
  { icon: Clock, label: "Vetted Staff" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80')`,
          }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/30 to-navy-900/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/50 via-transparent to-navy-900/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-medium">
              <span className="w-8 h-px bg-gold-400" />
              Waterloo Region&apos;s Finest
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--color-ivory)] leading-[1.1] mb-6">
            <WordReveal
              text="Bespoke Care for"
              className="block"
              delay={0.3}
              wordDelay={0.08}
            />
            <WordReveal
              text="Distinguished Homes"
              className="block"
              delay={0.6}
              wordDelay={0.08}
            />
          </h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-lg md:text-xl text-[var(--color-ivory)]/80 leading-relaxed mb-10 max-w-xl"
          >
            White-glove cleaning services for estates that demand discretion. 
            Museum-quality techniques. Bonded professionals. Unmarked vehicles available.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 text-navy-900 text-sm font-medium uppercase tracking-wider hover:bg-gold-400 transition-all duration-300 hover:shadow-luxury-lg"
            >
              Reserve Your Consultation
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[var(--color-ivory)]/40 text-[var(--color-ivory)] text-sm font-medium uppercase tracking-wider hover:bg-[var(--color-ivory)]/10 hover:border-[var(--color-ivory)] transition-all duration-300"
            >
              View Services
            </Link>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="flex flex-wrap items-center gap-8 pt-8 border-t border-[var(--color-ivory)]/20"
          >
            {trustBadges.map((badge, index) => (
              <div key={badge.label} className="flex items-center gap-2">
                <badge.icon className="w-5 h-5 text-gold-400" />
                <span className="text-sm text-[var(--color-ivory)]/80">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-[var(--color-ivory)]/30 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-gold-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
