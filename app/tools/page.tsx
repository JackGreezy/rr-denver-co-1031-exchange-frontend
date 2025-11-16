import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DeadlineCalculator } from "@/components/tools/DeadlineCalculator";
import { IdentificationRulesExplainer } from "@/components/tools/IdentificationRulesExplainer";
import { IdentificationLetterHelper } from "@/components/tools/IdentificationLetterHelper";
import { TimelineTracker } from "@/components/tools/TimelineTracker";

export const metadata: Metadata = {
  title: "1031 Exchange Tools | 1031 Exchange Denver",
  description: "Free 1031 exchange calculators and tools for Denver, CO investors. Calculate boot, estimate costs, validate identification rules, and more.",
  keywords: "1031 exchange tools, 1031 calculators, boot calculator, exchange cost estimator, identification rules checker, Denver 1031 exchange",
  openGraph: {
    title: "1031 Exchange Tools | 1031 Exchange Denver",
    description: "Free calculators and tools to help Denver, CO investors plan and execute compliant 1031 exchanges.",
    type: "website",
    url: "https://www.1031exchangedenver.com/tools",
  },
  alternates: {
    canonical: "https://www.1031exchangedenver.com/tools",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.1031exchangedenver.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: "https://www.1031exchangedenver.com/tools",
    },
  ],
};

const tools = [
  {
    name: "Boot Calculator",
    slug: "boot-calculator",
    description: "Calculate boot (cash received, mortgage relief) and estimate tax implications for your 1031 exchange.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    name: "Exchange Cost Estimator",
    slug: "exchange-cost-estimator",
    description: "Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your exchange.",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    name: "Identification Rules Checker",
    slug: "identification-rules-checker",
    description: "Validate your replacement property identification against the 3-property, 200%, or 95% identification rules.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    name: "Depreciation Recapture Estimator",
    slug: "depreciation-recapture-estimator",
    description: "Estimate depreciation recapture tax on your relinquished property and understand how 1031 exchanges can defer this tax.",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    name: "Replacement Property Value Calculator",
    slug: "replacement-property-value-calculator",
    description: "Calculate the minimum replacement property value needed to defer all gain in your 1031 exchange.",
    icon: "M3 18h18M3 10l9-6 9 6v8H3z",
  },
  {
    name: "Debt Relief Calculator",
    slug: "debt-relief-calculator",
    description: "Calculate mortgage boot when new debt is less than old debt and understand debt relief tax implications.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function ToolsPage() {
  return (
    <>
      <Script
        id="jsonld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-white">1031 exchange tools</h1>
          <p className="text-base text-slate-300">
            Calculators and templates that keep deadlines, underwriting, and documentation
            organized. Every tool is educational. Confirm details with your intermediary,
            lender, attorney, and CPA.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-white transition hover:-translate-y-1 hover:border-amber-200/40 hover:bg-white/10"
            >
              <div className="mb-4 flex items-center justify-center rounded-lg bg-white/10 p-3 w-fit">
                <svg
                  className="h-8 w-8 text-amber-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">{tool.name}</h2>
              <p className="mt-2 text-sm text-slate-200">{tool.description}</p>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
                Launch tool
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-12 grid gap-6">
          <DeadlineCalculator />
          <TimelineTracker />
          <IdentificationRulesExplainer />
          <IdentificationLetterHelper />
        </section>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
          <strong>Educational content only.</strong> Not tax, legal, or investment advice.
          Results are estimates. Confirm every step with your Qualified Intermediary and advisors.
        </div>
      </div>
    </>
  );
}

