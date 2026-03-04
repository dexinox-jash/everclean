import { Metadata } from "next";
import Image from "next/image";
import { Award, Users, Shield, Clock } from "lucide-react";
import { AnimatedSection, GoldLineReveal, StaggerContainer, StaggerItem } from "@/components/luxury/animations";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Everclean Luxury Services - Waterloo Region's premier white-glove cleaning and estate care company.",
};

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We hold ourselves to the highest standards, treating every home as if it were our own.",
  },
  {
    icon: Users,
    title: "Discretion",
    description: "Privacy is paramount. Our unmarked vehicles and professional conduct ensure your confidentiality.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Fully bonded, insured, and background-checked. Every team member is vetted for your peace of mind.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "We arrive on time, every time. Your schedule is respected with military precision.",
  },
];

const team = [
  {
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    bio: "Former hospitality executive with 15 years of luxury service experience. Founded Everclean to bring five-star standards to residential estates.",
  },
  {
    name: "James Chen",
    role: "Operations Director",
    bio: "Expert in logistics and team management. Ensures every service meets our exacting quality standards.",
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Training",
    bio: "Specialist in fine art and antique care. Trains all staff in museum-quality cleaning techniques.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-navy-900 text-[var(--color-ivory)]">
        <div className="container-luxury">
          <AnimatedSection>
            <span className="text-eyebrow mb-4 block">Our Story</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 max-w-3xl">
              Elevating the Standard of Residential Care
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <GoldLineReveal className="mb-6" />
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="text-lg text-light-tertiary max-w-2xl leading-relaxed">
              Founded in 2020, Everclean was born from a simple belief: that discerning homeowners deserve 
              the same level of care and attention to detail found in the world&apos;s finest hotels.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-lg bg-[var(--color-ivory)]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <div className="aspect-[4/3] bg-cream relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-text-muted">Team Photo</span>
                </div>
              </div>
            </AnimatedSection>

            <div>
              <AnimatedSection delay={0.1}>
                <span className="text-eyebrow mb-4 block">Our Philosophy</span>
                <h2 className="font-serif text-3xl md:text-4xl text-stone mb-6">
                  The Art of Invisible Service
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="space-y-6 text-text-secondary leading-relaxed">
                  <p>
                    After years managing luxury properties and observing the gap between commercial 
                    hospitality standards and residential service, our founder set out to create something 
                    different—a cleaning service that understands the nuances of estate care.
                  </p>
                  <p>
                    We don&apos;t just clean homes; we preserve them. Our team is trained in the proper care 
                    of fine wood, natural stone, delicate fabrics, and priceless art. We understand that 
                    a home is more than a building—it&apos;s a sanctuary filled with memories and investments 
                    that span generations.
                  </p>
                  <p>
                    Every member of our team undergoes rigorous training and background checks. We maintain 
                    $5 million in liability insurance and provide bonding for all employees. Your trust is 
                    our most valued asset.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-lg bg-cream">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <AnimatedSection>
              <span className="text-eyebrow mb-4 block">What Guides Us</span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone mb-6">Our Core Values</h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <GoldLineReveal className="mx-auto" />
            </AnimatedSection>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gold-500/10 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-gold-500" />
                  </div>
                  <h3 className="font-serif text-xl text-stone mb-3">{value.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-lg bg-[var(--color-pure)]">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <AnimatedSection>
              <span className="text-eyebrow mb-4 block">Leadership</span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone mb-6">Meet Our Team</h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p className="text-text-secondary">
                Industry veterans united by a passion for excellence and service.
              </p>
            </AnimatedSection>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <div className="text-center">
                  <div className="aspect-square bg-cream mb-6 relative max-w-xs mx-auto">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-text-muted text-sm">{member.name}</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-xl text-stone mb-1">{member.name}</h3>
                  <p className="text-gold-600 text-sm uppercase tracking-wider mb-4">{member.role}</p>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">
                    {member.bio}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-navy-900 text-[var(--color-ivory)]">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "4+", label: "Years of Excellence" },
              { value: "127", label: "Estates Served" },
              { value: "15", label: "Team Members" },
              { value: "98%", label: "Client Retention" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-4xl md:text-5xl text-gold-500 mb-2">{stat.value}</p>
                <p className="text-sm uppercase tracking-wider text-light-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
