import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "./contact-form";
import {
  BRAND_NAME,
  OFFICE_ADDRESS,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  PRIMARY_EMAIL,
  SUPPORT_HOURS,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
} from "@/lib/constants";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Contact Us | 1031 Exchange Denver",
  description:
    "Call, email, or send a secure intake form to reach 1031 Exchange Denver at 1510 York St, Denver, CO 80206.",
  alternates: {
    canonical: "https://1031exchangedenver.com/contact",
  },
};

type ContactPageProps = {
  searchParams?: { projectType?: string };
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const prefill = searchParams?.projectType
    ? decodeURIComponent(searchParams.projectType)
    : undefined;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-black py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact" },
            ]}
            className="mb-8 text-sm flex justify-center"
          />
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
            Contact {BRAND_NAME}
          </p>
          <h1 className={`mt-4 text-3xl uppercase tracking-wide text-white sm:text-4xl md:text-5xl ${playfair.className}`}>
            Talk With a Denver 1031 Specialist
          </h1>
          <p className="mt-6 text-lg font-light leading-relaxed text-white/80">
            We coordinate replacement property identification, underwriting, and
            partner communication for investors across {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          </p>
        </div>
      </section>

      {/* Single Centered Form Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-6 md:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-black">
              Request a Consultation
            </p>
            <h2 className={`mt-4 text-2xl text-gray-900 uppercase ${playfair.className}`}>
              Send the Secure Form
            </h2>
            <p className="mt-2 text-gray-600">
              We respond within one business day with next steps.
            </p>
          </div>

          <div className="bg-[#fafafa] p-8">
            <ContactForm prepopulatedProjectType={prefill} />
          </div>

          {/* Contact Details */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3 text-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-black">
                Phone
              </p>
              <Link
                href={`tel:${PRIMARY_PHONE_TEL}`}
                className="mt-2 block text-sm text-gray-700 hover:text-black"
              >
                {PRIMARY_PHONE_DISPLAY}
              </Link>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-black">
                Email
              </p>
              <Link
                href={`mailto:${PRIMARY_EMAIL}`}
                className="mt-2 block text-sm text-gray-700 hover:text-black"
              >
                {PRIMARY_EMAIL}
              </Link>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-black">
                Hours
              </p>
              <p className="mt-2 text-sm text-gray-700">{SUPPORT_HOURS}</p>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12">
            <p className="text-center text-xs font-medium uppercase tracking-[0.15em] text-black">
              {OFFICE_ADDRESS}
            </p>
            <p className="mt-1 text-center text-xs text-gray-500">
              Meetings by appointment only
            </p>
            <div className="mt-4 overflow-hidden border border-gray-200">
              <iframe
                src="https://www.google.com/maps?q=1510+York+St,+Denver,+CO+80206&output=embed"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${BRAND_NAME} Map`}
                className="grayscale"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
