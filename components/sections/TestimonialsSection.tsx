"use client";

import { Star } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem, CounterAnimation } from "@/components/luxury/animations";

const testimonials = [
  {
    quote: "Everclean has been caring for our estate for two years. Their discretion is absolute, and the attention to detail with our antiques collection gives us complete peace of mind.",
    author: "Margaret L.",
    location: "Uptown Waterloo",
    rating: 5,
  },
  {
    quote: "As someone who travels frequently for work, having a team I can trust in my home is invaluable. They follow my protocols exactly, every single time.",
    author: "Robert T.",
    location: "Laurelwood",
    rating: 5,
  },
  {
    quote: "The pre-event service is exceptional. Our home has never looked better for hosting, and the team understands exactly what presentation-level means.",
    author: "Sarah & David K.",
    location: "Beechwood",
    rating: 5,
  },
];

const stats = [
  { value: 4.9, suffix: "/5", label: "Average Rating" },
  { value: 127, suffix: "+", label: "Estates Served" },
  { value: 5, suffix: "M", label: "Insurance Coverage" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

export function TestimonialsSection() {
  return (
    <section className="section-lg bg-[var(--color-pure)]">
      <div className="container-luxury">
        {/* Stats Bar */}
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 mb-20 border-y border-[var(--color-border)]">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl md:text-4xl text-navy-700 mb-2">
                  <CounterAnimation 
                    end={stat.value} 
                    suffix={stat.suffix}
                    duration={2}
                  />
                </div>
                <div className="text-xs uppercase tracking-wider text-stone-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedSection>
            <span className="text-eyebrow mb-4 block">Testimonials</span>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone mb-6">
              Trusted by Waterloo Region&apos;s Most Distinguished Households
            </h2>
          </AnimatedSection>
        </div>

        {/* Testimonials Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.author}>
              <div className="bg-cream p-8 md:p-10 h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-stone leading-relaxed mb-8 flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-medium text-stone">{testimonial.author}</p>
                  <p className="text-sm text-stone-light">{testimonial.location}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
