import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "./contact-form";

const PHONE_DISPLAY = "(303) 835-0981";
const PHONE_TEL = "+13038350981";
const EMAIL = "contact@1031exchangedenver.com";
const ADDRESS = "1510 York St, Denver, CO 80206";
const BRAND_NAME = "1031 Exchange Denver";

export const metadata: Metadata = {
  title: "Contact Us | 1031 Exchange Denver",
  description: "Get in touch with 1031 Exchange Denver. Located at 1510 York St, Denver, CO 80206. Call (303) 835-0981 or email contact@1031exchangedenver.com",
  alternates: {
    canonical: "https://1031exchangedenver.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-20">
      <div className="mb-12">
        <h1 className="font-serif text-3xl font-bold text-[#16324F] md:text-4xl mb-4">
          Contact {BRAND_NAME}
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-3xl">
          Get in touch with our Denver-based 1031 exchange specialists. We're here to help you navigate your exchange with confidence.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-gray-200/60 bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-[#16324F] mb-4">
              Request a Consultation
            </h2>
            <p className="text-sm text-gray-700 mb-6">
              Complete the form below and we will confirm timelines, qualified intermediary fit, and documentation requirements.
            </p>
            <ContactForm />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#16324F] mb-4">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#DAA520] mb-2">
                  Phone
                </p>
                <Link
                  href={`tel:${PHONE_TEL}`}
                  className="text-sm text-[#16324F] transition hover:text-[#0f2236] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
                >
                  {PHONE_DISPLAY}
                </Link>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#DAA520] mb-2">
                  Email
                </p>
                <Link
                  href={`mailto:${EMAIL}`}
                  className="text-sm text-[#16324F] transition hover:text-[#0f2236] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F]"
                >
                  {EMAIL}
                </Link>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#DAA520] mb-2">
                  Address
                </p>
                <p className="text-sm text-gray-700">
                  {ADDRESS}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#16324F] mb-4">
              Business Hours
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Monday - Friday:</span> 8:00 AM - 6:00 PM Mountain
              </p>
              <p>
                <span className="font-semibold">Saturday - Sunday:</span> Closed
              </p>
              <p className="mt-4 text-xs text-gray-600">
                Statewide coverage with Denver metro specialists ready to coordinate in-person meetings when required.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-[#16324F] mb-6">
          Find Us
        </h2>
        <div className="rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=1510+York+St,+Denver,+CO+80206&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
            title="1031 Exchange Denver Location"
          />
        </div>
      </div>
    </div>
  );
}

