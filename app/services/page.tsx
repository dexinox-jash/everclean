import Link from "next/link";
import { Metadata } from "next";
import { Crown, CalendarClock, PartyPopper, Hammer, Leaf, ArrowRight, Check } from "lucide-react";
import { AnimatedSection, GoldLineReveal, StaggerContainer, StaggerItem } from "@/components/luxury/animations";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Discover our range of luxury cleaning services including Estate White-Glove Cleaning, Concierge Maintenance, and Pre-Event Preparation.",
};

const iconMap: Record<string, React.ElementType> = {
  Crown,
  CalendarClock,
  PartyPopper,
  Hammer,
  Leaf,
};

// Fallback services data for static generation
const fallbackServices = [
  {
    id: "1",
    slug: "estate-cleaning",
    name: "Estate White-Glove Cleaning",
    shortDescription: "Comprehensive care for distinguished residences with meticulous attention to fine furnishings and art.",
    fullDescription: "Our signature estate cleaning service is designed for homes that demand the highest standards of care. Our trained professionals use museum-quality techniques and products specifically selected for fine wood, marble, and delicate surfaces.",
    basePrice: 450,
    priceMultiplier: { studio: 1, "1bed": 1.2, "2bed": 1.5, "3bed": 2, "4bed": 2.5, estate: 3.5 },
    durationHours: 4,
    features: [
      "Museum-quality cleaning techniques",
      "pH-neutral products for delicate surfaces",
      "HEPA filtration vacuuming",
      "Fine art and antique care",
      "Natural stone and hardwood specialists",
    ],
    bestFor: "Homes 3000+ sq ft with fine furnishings, art collections, or luxury finishes",
    requiresConsult: false,
    isActive: true,
    isPopular: true,
    sortOrder: 1,
    icon: "Crown",
  },
  {
    id: "2",
    slug: "concierge-maintenance",
    name: "Concierge Maintenance",
    shortDescription: "Weekly or bi-weekly scheduled care with the same dedicated team who learn your home's unique requirements.",
    fullDescription: "For discerning homeowners who expect their residence to be immaculate at all times. Our Concierge Maintenance Program provides consistent, scheduled care with the same dedicated team.",
    basePrice: 350,
    priceMultiplier: { studio: 1, "1bed": 1.1, "2bed": 1.3, "3bed": 1.7, "4bed": 2.2, estate: 3 },
    durationHours: 3,
    features: [
      "Dedicated team assignment",
      "Weekly or bi-weekly scheduling",
      "Priority booking availability",
      "Quarterly deep cleaning included",
      "24/7 concierge support",
    ],
    bestFor: "Busy professionals and families who value consistency and priority service",
    requiresConsult: true,
    isActive: true,
    isPopular: false,
    sortOrder: 2,
    icon: "CalendarClock",
  },
  {
    id: "3",
    slug: "pre-event-prep",
    name: "Pre-Event Preparation",
    shortDescription: "Immaculate presentation for dinner parties, open houses, or special occasions.",
    fullDescription: "Ensure your home makes the perfect impression. Our pre-event service focuses on presentation-level perfection—every surface gleaming, every detail attended to.",
    basePrice: 550,
    priceMultiplier: { studio: 1, "1bed": 1.1, "2bed": 1.3, "3bed": 1.6, "4bed": 2, estate: 2.8 },
    durationHours: 5,
    features: [
      "Presentation-level detail work",
      "Guest bathroom luxury preparation",
      "Kitchen caterer-ready deep clean",
      "Outdoor space presentation",
      "Manager final walkthrough",
    ],
    bestFor: "Hosts preparing for dinner parties, charity events, open houses, or celebrations",
    requiresConsult: false,
    isActive: true,
    isPopular: false,
    sortOrder: 3,
    icon: "PartyPopper",
  },
];

async function getServices() {
  try {
    const services = await db.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return services.length > 0 ? services : fallbackServices;
  } catch (error) {
    console.error("Failed to fetch services from database, using fallback data");
    return fallbackServices;
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-navy-900 text-[var(--color-ivory)]">
        <div className="container-luxury">
          <AnimatedSection>
            <span className="text-eyebrow mb-4 block">What We Offer</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Our Services
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <GoldLineReveal className="mb-6" />
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="text-lg text-[var(--color-ivory)]/70 max-w-2xl leading-relaxed">
              Each service is meticulously designed for residences that demand the highest standards. 
              From intimate homes to grand estates, we deliver excellence with discretion.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services List */}
      <section className="section-lg bg-[var(--color-ivory)]">
        <div className="container-luxury">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Crown;
              const isEven = index % 2 === 0;
              const multiplier = service.priceMultiplier as Record<string, number> | null;
              
              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={isEven ? "" : "lg:order-2"}>
                    {service.isPopular && (
                      <span className="inline-flex items-center px-3 py-1 text-xs uppercase tracking-wider bg-gold-500/10 text-gold-600 mb-4">
                        Most Popular
                      </span>
                    )}
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gold-500" />
                      </div>
                      <span className="text-sm text-stone-muted uppercase tracking-wider">
                        {service.durationHours} hours estimated
                      </span>
                    </div>
                    
                    <h2 className="font-serif text-3xl md:text-4xl text-stone mb-4">
                      {service.name}
                    </h2>
                    
                    <p className="text-stone-light leading-relaxed mb-6">
                      {service.fullDescription}
                    </p>

                    {service.bestFor && (
                      <p className="text-sm text-stone-muted uppercase tracking-wider mb-6">
                        Best for: {service.bestFor}
                      </p>
                    )}

                    {/* Features */}
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-3 mb-8">
                        {service.features.slice(0, 5).map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                            <span className="text-stone">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mb-8">
                      <span className="font-serif text-3xl text-navy-700">
                        From ${Number(service.basePrice).toLocaleString()}
                      </span>
                      <span className="text-stone-light">per service</span>
                    </div>

                    {/* Multipliers */}
                    {multiplier && (
                      <div className="mb-8 p-4 bg-cream">
                        <p className="text-sm font-medium text-stone mb-3">Pricing by home size:</p>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          {Object.entries(multiplier).map(([size, mult]) => (
                            <div key={size} className="flex justify-between">
                              <span className="text-stone-light capitalize">{size}:</span>
                              <span className="text-navy-700 font-medium">
                                ${Math.round(Number(service.basePrice) * mult).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <Link
                      href={service.requiresConsult ? "/contact?subject=consultation" : "/booking"}
                      className="group inline-flex items-center gap-2 px-8 py-4 bg-navy-700 text-[var(--color-ivory)] text-sm font-medium uppercase tracking-wider hover:bg-navy-800 transition-all"
                    >
                      {service.requiresConsult ? "Request Consultation" : "Book This Service"}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Visual Placeholder */}
                  <div className={`${isEven ? "" : "lg:order-1"}`}>
                    <div className="aspect-[4/3] bg-cream flex items-center justify-center">
                      <div className="text-center p-8">
                        <Icon className="w-20 h-20 text-gold-500/30 mx-auto mb-4" />
                        <p className="text-stone-muted text-sm">Service Photography</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-lg bg-cream">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <span className="text-eyebrow mb-4 block">Common Questions</span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone mb-6">
                Frequently Asked Questions
              </h2>
              <GoldLineReveal className="mx-auto" />
            </AnimatedSection>

            <StaggerContainer className="space-y-6">
              {[
                {
                  q: "What areas do you serve?",
                  a: "We currently serve the Waterloo Region including Kitchener, Waterloo, Cambridge, and surrounding areas. For estates outside this area, please contact our concierge to discuss arrangements.",
                },
                {
                  q: "Are your staff insured and bonded?",
                  a: "Yes. Every team member is covered by our $5 million liability insurance policy, and all employees are bonded. We carry WSIB coverage and can provide certificates of insurance upon request.",
                },
                {
                  q: "Do I need to be home during the cleaning?",
                  a: "Not at all. Many clients provide keys or access codes. We offer keyholding services with secure storage protocols. You can indicate your access preferences during booking.",
                },
                {
                  q: "What products do you use?",
                  a: "We use pH-neutral, museum-grade cleaning products specifically selected for delicate surfaces including marble, hardwood, and fine art. All products are eco-friendly and safe for pets and children.",
                },
                {
                  q: "How do I reschedule or cancel?",
                  a: "You can reschedule or cancel through your client portal up to 48 hours before your appointment for a full refund. Within 48 hours, a 50% fee applies. Same-day cancellations are non-refundable.",
                },
              ].map((faq, index) => (
                <StaggerItem key={index}>
                  <div className="bg-[var(--color-pure)] p-8">
                    <h3 className="font-serif text-xl text-stone mb-3">{faq.q}</h3>
                    <p className="text-stone-light leading-relaxed">{faq.a}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </>
  );
}
