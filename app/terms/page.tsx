import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Everclean Luxury Services Terms of Service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[var(--color-ivory)]">
      <div className="container-luxury max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl text-stone mb-6">Terms of Service</h1>
        <p className="text-stone-muted mb-12">Last updated: December 1, 2024</p>

        <div className="prose prose-stone max-w-none">
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-stone mb-4">Cancellation Policy</h2>
            <ul className="list-disc pl-6 space-y-2 text-stone-light">
              <li><strong>48+ hours notice:</strong> Full refund, no fees</li>
              <li><strong>24-48 hours notice:</strong> 50% refund</li>
              <li><strong>Less than 24 hours:</strong> No refund (full charge applies)</li>
              <li><strong>No-show:</strong> Full charge applies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl text-stone mb-4">Insurance</h2>
            <p className="text-stone-light leading-relaxed">
              We maintain $5,000,000 in liability insurance and are fully bonded. Any damages must be reported within 24 hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
