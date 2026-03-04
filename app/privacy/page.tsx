import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Everclean Luxury Services Privacy Policy - How we protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[var(--color-ivory)]">
      <div className="container-luxury max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl text-stone mb-6">Privacy Policy</h1>
        <p className="text-text-muted mb-12">Last updated: December 1, 2024</p>

        <div className="prose prose-stone max-w-none">
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-stone mb-4">Introduction</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Everclean Luxury Services (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services or visit our website.
            </p>
            <p className="text-text-secondary leading-relaxed">
              By accessing or using our services, you consent to the practices described in this Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-stone mb-4">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li><strong>Personal Identifiers:</strong> Name, email address, phone number, postal address</li>
              <li><strong>Commercial Information:</strong> Service history, payment information, booking details</li>
              <li><strong>Geolocation Data:</strong> Service address location</li>
              <li><strong>Professional Information:</strong> Property details, access instructions</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-stone mb-4">Your Privacy Rights</h2>
            <p className="text-text-secondary leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li>Request a copy of your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-stone mb-4">Contact Us</h2>
            <div className="text-text-secondary">
              <p>Email: privacy@everclean.ca</p>
              <p>Phone: (519) 555-0123</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
