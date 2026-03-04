"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Crown, CalendarClock, PartyPopper, ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem, GoldLineReveal } from "@/components/luxury/animations";

const services = [
  {
    icon: Crown,
    title: "Estate White-Glove Cleaning",
    description: "Comprehensive care for distinguished residences with meticulous attention to fine furnishings and art.",
    price: "From $450",
    bestFor: "Homes 3000+ sq ft with fine art",
    href: "/services#estate",
    featured: true,
  },
  {
    icon: CalendarClock,
    title: "Concierge Maintenance",
    description: "Weekly or bi-weekly scheduled care with the same dedicated team who learn your home's unique requirements.",
    price: "From $350",
    bestFor: "Busy professionals and families",
    href: "/services#concierge",
    featured: false,
  },
  {
    icon: PartyPopper,
    title: "Pre-Event Preparation",
    description: "Immaculate presentation for dinner parties, open houses, or special occasions with presentation-level perfection.",
    price: "From $550",
    bestFor: "Hosts preparing for events",
    href: "/services#event",
    featured: false,
  },
];

export function ServicesSection() {
  return (
    <section className="section-lg bg-[var(--color-ivory)]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedSection>
            <span className="text-eyebrow mb-4 block">Our Services</span>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone mb-6">
              Tailored Excellence for Every Residence
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <GoldLineReveal className="mx-auto mb-6" />
          </AnimatedSection>
          
          <AnimatedSection delay={0.3}>
            <p className="text-stone-light leading-relaxed">
              From intimate apartments to grand estates, each service is customized 
              to your home&apos;s unique requirements and your discerning standards.
            </p>
          </AnimatedSection>
        </div>

        {/* Services Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <StaggerItem key={service.title}>
              <Link href={service.href} className="group block h-full">
                <motion.div
                  className={`relative h-full bg-[var(--color-pure)] p-8 md:p-10 transition-all duration-500 ${
                    service.featured ? "border-2 border-gold-500/30" : "border border-[var(--color-border)]"
                  }`}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  {/* Featured Badge */}
                  {service.featured && (
                    <span className="absolute top-4 right-4 inline-flex items-center px-3 py-1 text-xs uppercase tracking-wider bg-gold-500/10 text-gold-600">
                      Most Popular
                    </span>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 flex items-center justify-center mb-6 ${
                    service.featured ? "bg-gold-500/10" : "bg-navy-700/5"
                  }`}>
                    <service.icon className={`w-7 h-7 ${
                      service.featured ? "text-gold-500" : "text-navy-700"
                    }`} />
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-xl md:text-2xl text-stone mb-3 group-hover:text-gold-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-stone-light text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Best For */}
                  <p className="text-xs text-stone-muted uppercase tracking-wider mb-4">
                    Best for: {service.bestFor}
                  </p>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
                    <span className="font-serif text-lg text-navy-700">{service.price}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gold-600 group-hover:gap-2 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-gold-500/0 group-hover:border-gold-500/20 transition-colors duration-500 pointer-events-none" />
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.4} className="text-center">
          <p className="text-stone-light text-sm mb-4">
            All services include our white-glove guarantee
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy-700 hover:text-gold-600 transition-colors"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
