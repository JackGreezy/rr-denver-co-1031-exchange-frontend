import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { BRAND_NAME, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About ${BRAND_NAME}`,
  description:
    "Learn how we guide Denver 1031 investors through intake, property matching, and partner coordination. Secure process. Not a Qualified Intermediary.",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/about",
  },
};

const PILLARS = [
  {
    title: "Secure intake",
    description:
      "Every request enters an encrypted workflow. We confirm sale status, gain exposure, debt targets, and intermediary selection before sharing documents.",
  },
  {
    title: "Property matching",
    description:
      "We maintain a research bench covering multifamily, industrial, retail, medical, and land assets across the Front Range. Data packs include rent rolls, trailing twelve statements, and lender-ready comps.",
  },
  {
    title: "Partner coordination",
    description:
      "Attorneys, CPAs, lenders, and Qualified Intermediaries receive synchronized updates. We monitor the calendar and log every milestone.",
  },
];

const WORKFLOW = [
  {
    title: "1. Intake call",
    details:
      "Establish relinquished sale timing, targeted basis, financing expectations, and risk tolerances.",
  },
  {
    title: "2. Identification plan",
    details:
      "Draft three property and 200 percent rule strategies with backup assets. Deliver letters for intermediary signature.",
  },
  {
    title: "3. Execution",
    details:
      "Coordinate diligence, lender conditions, and closing statements. Prepare reporting packets for your CPA.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 text-slate-100">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
          About {BRAND_NAME}
        </p>
        <h1 className="text-4xl font-semibold text-white">
          Focused on 1031 exchange execution in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}
        </h1>
        <p className="text-base text-slate-300">
          We help investors identify replacement properties, coordinate underwriting, and
          guide every partner through the 45 and 180 day deadlines. We are not a Qualified
          Intermediary, brokerage, law firm, or CPA. We work beside those professionals to
          keep each exchange compliant and organized.
        </p>
      </div>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
              {pillar.title}
            </p>
            <p className="mt-3 text-sm text-slate-300">{pillar.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white">
          How our process works
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {WORKFLOW.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
            >
              <p className="text-sm font-semibold text-white">{step.title}</p>
              <p className="mt-2 text-sm text-slate-300">{step.details}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-amber-200/30 bg-amber-50/5 p-6 text-white">
        <h2 className="text-2xl font-semibold">Why we exist</h2>
        <p className="mt-4 text-sm text-slate-200">
          Wide execution gaps remain between Qualified Intermediaries, lenders,
          attorneys, and investors. We fill that gap with disciplined project
          management, underwriting support, and transparent communication.
        </p>
        <p className="mt-3 text-sm text-slate-200">
          You maintain direct relationships with your legal, tax, and brokerage
          teams. We keep everyone aligned with the IRS calendar.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em]"
          >
            View services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900"
          >
            Talk to the team
          </Link>
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white">
          Request a consultation
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Complete the secure form. We respond within one business day.
        </p>
        <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/40 p-4">
          <LeadForm />
        </div>
      </section>
    </div>
  );
}

