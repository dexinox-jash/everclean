import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Everclean Luxury Services Cookie Policy.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[var(--color-ivory)]">
      <div className="container-luxury max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl text-stone mb-6">Cookie Policy</h1>
        <p className="text-stone-muted mb-12">Last updated: December 1, 2024</p>

        <div className="prose prose-stone max-w-none">
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-stone mb-4">What Are Cookies</h2>
            <p className="text-stone-light leading-relaxed">
              Cookies are small text files stored on your device when you visit our website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-stone mb-4">How We Use Cookies</h2>
            <ul className="list-disc pl-6 space-y-2 text-stone-light">
              <li><strong>Essential:</strong> Required for the website to function</li>
              <li><strong>Preferences:</strong> Remember your settings and choices</li>
              <li><strong>Analytics:</strong> Help us understand how visitors interact with our site</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
