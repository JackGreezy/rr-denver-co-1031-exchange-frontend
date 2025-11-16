import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | 1031 Exchange Denver",
  description: "Terms of service for 1031 Exchange Denver",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-20">
      <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-6">
        Terms of Service
      </h1>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="text-sm text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">
            Acceptance of Terms
          </h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">
            Educational Content Only
          </h2>
          <p>
            The information provided on this website is for educational purposes only and does not constitute tax, legal, 
            or financial advice. You should consult with qualified tax advisors, attorneys, and financial professionals 
            before making any decisions regarding a 1031 exchange.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">
            No Professional Relationship
          </h2>
          <p>
            Use of this website does not create a professional relationship between you and 1031 Exchange Denver. 
            Any information you provide through our contact forms does not create an attorney-client or tax advisor-client relationship.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">
            Limitation of Liability
          </h2>
          <p>
            1031 Exchange Denver shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
            resulting from your use of or inability to use this website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">
            Contact Us
          </h2>
          <p>
            If you have questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:team@1031exchangedenver.com" className="text-[#16324F] hover:underline">
              team@1031exchangedenver.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

