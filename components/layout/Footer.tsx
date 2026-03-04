"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Estate Cleaning", href: "/services#estate" },
    { label: "Concierge Maintenance", href: "/services#concierge" },
    { label: "Pre-Event Preparation", href: "/services#event" },
    { label: "Gift Cards", href: "/gift-cards" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Careers", href: "/contact?subject=careers" },
    { label: "Press", href: "/contact?subject=press" },
  ],
  support: [
    { label: "Client Portal", href: "/portal" },
    { label: "FAQs", href: "/faqs" },
    { label: "Cancellation Policy", href: "/terms#cancellation" },
    { label: "Contact Concierge", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-light-primary">
      {/* Main Footer */}
      <div className="container-luxury section-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl font-medium">Everclean</span>
              <span className="block text-xs uppercase tracking-[0.2em] text-light-muted mt-1">
                Luxury Services
              </span>
            </Link>
            <p className="text-light-secondary text-sm leading-relaxed mb-6 max-w-sm">
              Waterloo Region&apos;s premier white-glove cleaning and estate care service. 
              Discretion, excellence, and meticulous attention to detail since 2020.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1 text-xs bg-light-primary/10 text-light-secondary">
                $5M Insured
              </span>
              <span className="inline-flex items-center px-3 py-1 text-xs bg-light-primary/10 text-light-secondary">
                Bonded
              </span>
              <span className="inline-flex items-center px-3 py-1 text-xs bg-light-primary/10 text-light-secondary">
                Vetted Staff
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-muted hover:text-gold-500 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-muted hover:text-gold-500 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-muted hover:text-gold-500 transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h2 className="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4">Services</h2>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-light-secondary hover:text-light-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4">Company</h2>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-light-secondary hover:text-light-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4">Support</h2>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-light-secondary hover:text-light-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2">
            <h2 className="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4">Contact</h2>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+15195550123"
                  className="flex items-center gap-2 text-sm text-light-secondary hover:text-light-primary transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-500" aria-hidden="true" />
                  <span>(519) 555-0123</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:concierge@everclean.ca"
                  className="flex items-center gap-2 text-sm text-light-secondary hover:text-light-primary transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold-500" aria-hidden="true" />
                  <span>concierge@everclean.ca</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-light-secondary">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Waterloo Region, Ontario</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-light-primary/10">
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-light-muted">
              &copy; {currentYear} Everclean Luxury Services. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-light-muted hover:text-light-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
