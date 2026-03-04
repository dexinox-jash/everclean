"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnimatedSection, GoldLineReveal } from "@/components/luxury/animations";

export function CTASection() {
  return (
    <section className="relative section-xl overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cream">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-gold-500/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-eyebrow mb-6 block">Begin the Experience</span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone mb-6">
              Experience the Everclean Standard
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <GoldLineReveal className="mx-auto mb-8" width="8rem" />
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-lg text-stone-light leading-relaxed mb-10 max-w-xl mx-auto">
              Join the distinguished households of Waterloo Region who trust us with their most prized sanctuary. 
              Your consultation is complimentary.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-navy-700 text-[var(--color-ivory)] text-sm font-medium uppercase tracking-wider hover:bg-navy-800 transition-all duration-300 hover:shadow-luxury-lg"
              >
                Schedule Consultation
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+15195550123"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-navy-700 text-navy-700 text-sm font-medium uppercase tracking-wider hover:bg-navy-700 hover:text-[var(--color-ivory)] transition-all duration-300"
              >
                Call Concierge
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <p className="mt-8 text-sm text-stone-muted">
              Response within 2 business hours
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
