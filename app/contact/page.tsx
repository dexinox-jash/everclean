"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock, Check, Loader2 } from "lucide-react";
import { AnimatedSection, GoldLineReveal } from "@/components/luxury/animations";

const subjects = [
  { value: "consultation", label: "Request Consultation" },
  { value: "quote", label: "Request Quote" },
  { value: "general", label: "General Inquiry" },
  { value: "careers", label: "Careers" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[var(--color-ivory)]">
        <div className="container-luxury max-w-2xl">
          <div className="bg-[var(--color-pure)] p-12 text-center shadow-luxury">
            <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-navy-900" />
            </div>
            <h1 className="font-serif text-3xl text-stone mb-4">Message Received</h1>
            <p className="text-stone-light mb-8">
              Thank you for contacting Everclean. Our concierge team will respond within 2 business hours.
            </p>
            <a href="/" className="btn-secondary">Return Home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-navy-900 text-[var(--color-ivory)]">
        <div className="container-luxury">
          <AnimatedSection>
            <span className="text-eyebrow mb-4 block">Get in Touch</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Contact Our Concierge
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <GoldLineReveal className="mb-6" />
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="text-lg text-[var(--color-ivory)]/70 max-w-2xl leading-relaxed">
              Whether you have questions about our services, need a custom quote, 
              or wish to discuss your estate&apos;s unique requirements, we&apos;re here to assist.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-lg bg-[var(--color-ivory)]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="font-serif text-2xl text-stone mb-8">Contact Information</h2>
              
                <div className="space-y-6">
                  <a href="tel:+15195550123" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                      <Phone className="w-5 h-5 text-gold-500" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-muted uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-stone group-hover:text-gold-600 transition-colors">(519) 555-0123</p>
                    </div>
                  </a>

                  <a href="mailto:concierge@everclean.ca" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                      <Mail className="w-5 h-5 text-gold-500" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-muted uppercase tracking-wider mb-1">Email</p>
                      <p className="text-stone group-hover:text-gold-600 transition-colors">concierge@everclean.ca</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gold-500" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-muted uppercase tracking-wider mb-1">Service Area</p>
                      <p className="text-stone">Waterloo Region, Ontario</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-gold-500" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-muted uppercase tracking-wider mb-1">Response Time</p>
                      <p className="text-stone">Within 2 business hours</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
                  <h3 className="font-serif text-lg text-stone mb-4">Office Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-stone-light">Monday - Friday</span>
                      <span className="text-stone">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-light">Saturday</span>
                      <span className="text-stone">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-light">Sunday</span>
                      <span className="text-stone">Closed</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={0.2}>
                <div className="bg-[var(--color-pure)] p-8 md:p-12 shadow-luxury">
                  <h2 className="font-serif text-2xl text-stone mb-2">Send a Message</h2>
                  <p className="text-stone-light mb-8">Fill out the form below and our concierge will respond promptly.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-stone mb-2">Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-gold-500 focus:outline-none transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-gold-500 focus:outline-none transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-stone mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-gold-500 focus:outline-none transition-colors"
                          placeholder="(519) 555-0123"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone mb-2">Subject *</label>
                        <select
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-gold-500 focus:outline-none transition-colors bg-white"
                        >
                          {subjects.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone mb-2">Message *</label>
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-gold-500 focus:outline-none transition-colors resize-none"
                        placeholder="Please describe your inquiry in detail..."
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-navy-700 text-[var(--color-ivory)] text-sm font-medium uppercase tracking-wider hover:bg-navy-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
