import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="mx-auto max-w-5xl px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
          Contact {BRAND_NAME}
        </p>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
        />
        <h1 className="text-4xl font-semibold text-white">
          Talk with a Denver 1031 specialist
        </h1>
        <p className="text-base text-slate-300">
          We coordinate replacement property identification, underwriting, and
          partner communication for investors across {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          We are not a Qualified Intermediary, law firm, broker, or CPA. We work
          with your selected professionals to keep every deadline organized.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Request a consultation</h2>
          <p className="text-sm text-slate-300">
            Send the secure form. We respond within one business day with next steps.
          </p>
          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/40 p-4">
            <ContactForm prepopulatedProjectType={prefill} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Contact information</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-200">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
                  Phone
                </p>
                <Link
                  href={`tel:${PRIMARY_PHONE_TEL}`}
                  className="text-white hover:text-amber-200"
                >
                  {PRIMARY_PHONE_DISPLAY}
                </Link>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
                  Email
                </p>
                <Link
                  href={`mailto:${PRIMARY_EMAIL}`}
                  className="text-white hover:text-amber-200"
                >
                  {PRIMARY_EMAIL}
                </Link>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
                  Address
                </p>
                <p>{OFFICE_ADDRESS}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
                  Hours
                </p>
                <p>{SUPPORT_HOURS}</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Map</h3>
            <p className="text-sm text-slate-300">
              Meetings by appointment only.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl">
              <iframe
                src="https://www.google.com/maps?q=1510+York+St,+Denver,+CO+80206&output=embed"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${BRAND_NAME} Map`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

