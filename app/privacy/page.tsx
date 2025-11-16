import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | 1031 Exchange Denver",
  description: "Privacy policy for 1031 Exchange Denver",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-20">
      <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-6">
        Privacy Policy
      </h1>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="text-sm text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">
            Information We Collect
          </h2>
          <p>
            We collect information that you provide directly to us, including when you fill out our contact form, 
            request a consultation, or communicate with us. This may include your name, email address, phone number, 
            and information about your 1031 exchange needs.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">
            How We Use Your Information
          </h2>
          <p>
            We use the information we collect to respond to your inquiries, provide our services, 
            send you relevant information about 1031 exchanges, and improve our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">
            Information Sharing
          </h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information 
            with service providers who assist us in operating our website and conducting our business, 
            as long as those parties agree to keep this information confidential.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">
            Security
          </h2>
          <p>
            We implement appropriate security measures to protect your personal information. However, 
            no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">
            Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
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


