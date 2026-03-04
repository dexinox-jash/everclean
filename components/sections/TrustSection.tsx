"use client";

import { Shield, Users, Car, Key } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/luxury/animations";

const trustFeatures = [
  {
    icon: Shield,
    title: "$5M Liability Insurance",
    description: "Comprehensive coverage protects your property and our team. Certificate available upon request.",
  },
  {
    icon: Users,
    title: "Background Checked Teams",
    description: "Every team member undergoes thorough screening, reference checks, and specialized training.",
  },
  {
    icon: Car,
    title: "Discrete Unmarked Vehicles",
    description: "Service vehicles without logos maintain your privacy and that of your neighbors.",
  },
  {
    icon: Key,
    title: "Keyholding Certification",
    description: "Licensed keyholding service with secure storage protocols and access logging.",
  },
];

export function TrustSection() {
  return (
    <section className="section-lg bg-navy-900 text-[var(--color-ivory)]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedSection>
            <span className="text-eyebrow mb-4 block">Your Peace of Mind</span>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">
              Your Sanctuary is Protected
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <p className="text-[var(--color-ivory)]/70 leading-relaxed">
              We understand that inviting someone into your home requires trust. 
              Our comprehensive protections ensure your complete confidence.
            </p>
          </AnimatedSection>
        </div>

        {/* Trust Features Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-6 bg-gold-500/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="font-serif text-xl mb-3">{feature.title}</h3>
                <p className="text-sm text-[var(--color-ivory)]/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Additional Trust Bar */}
        <AnimatedSection delay={0.4}>
          <div className="mt-16 pt-12 border-t border-[var(--color-ivory)]/10">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="text-center">
                <p className="font-serif text-3xl text-gold-500 mb-1">WSIB</p>
                <p className="text-xs uppercase tracking-wider text-[var(--color-ivory)]/50">Registered</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-[var(--color-ivory)]/20" />
              <div className="text-center">
                <p className="font-serif text-3xl text-gold-500 mb-1">Bonded</p>
                <p className="text-xs uppercase tracking-wider text-[var(--color-ivory)]/50">Employees</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-[var(--color-ivory)]/20" />
              <div className="text-center">
                <p className="font-serif text-3xl text-gold-500 mb-1">24/7</p>
                <p className="text-xs uppercase tracking-wider text-[var(--color-ivory)]/50">Support</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
