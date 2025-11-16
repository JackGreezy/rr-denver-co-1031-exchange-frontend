import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import DepreciationRecaptureEstimator from "@/components/tools/DepreciationRecaptureEstimator";

export const metadata: Metadata = {
  title: "Depreciation Recapture Estimator | 1031 Exchange Denver",
  description: "Estimate depreciation recapture tax on your relinquished property sale. Calculate recapture tax and understand how 1031 exchanges can defer this tax in Denver, CO.",
  keywords: "depreciation recapture, 1031 exchange depreciation, Section 1250 gain, recapture tax calculator, Denver 1031 exchange, Colorado tax deferral",
  openGraph: {
    title: "Depreciation Recapture Estimator | 1031 Exchange Denver",
    description: "Estimate depreciation recapture tax and understand how 1031 exchanges can defer this tax. Free tool for Denver, CO investors.",
    type: "website",
    url: "https://www.1031exchangedenver.com/tools/depreciation-recapture-estimator",
  },
  alternates: {
    canonical: "https://www.1031exchangedenver.com/tools/depreciation-recapture-estimator",
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
    {
      "@type": "ListItem",
      position: 3,
      name: "Depreciation Recapture Estimator",
      item: "https://www.1031exchangedenver.com/tools/depreciation-recapture-estimator",
    },
  ],
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Depreciation Recapture Estimator",
  applicationCategory: "FinanceApplication",
  description: "Estimate depreciation recapture tax on relinquished property and understand 1031 exchange deferral benefits",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: "https://www.1031exchangedenver.com/tools/depreciation-recapture-estimator",
};

export default function DepreciationRecaptureEstimatorPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "Depreciation Recapture Estimator" },
  ];

  return (
    <>
      <Script
        id="jsonld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="jsonld-tool"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <nav className="mx-auto max-w-4xl px-6 pt-8 md:px-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400">/</span>}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-[#0B3C5D] hover:text-[#C9A227] transition"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-600">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-20">
        <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-4">
          Depreciation Recapture Estimator
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Estimate depreciation recapture tax on your relinquished property sale. When you sell a rental property, 
          the IRS requires you to recapture depreciation deductions at a higher tax rate. A fully deferred 1031 exchange 
          can defer this recapture tax along with capital gains.
        </p>

        <DepreciationRecaptureEstimator />

        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm text-gray-700">
            <strong>Educational content only.</strong> Not tax, legal, or investment advice. 
            Results are estimates only. Consult a qualified intermediary and tax advisor before 
            making decisions. Colorado does not impose a state real estate transfer tax. Recording fees 
            and title insurance premiums still apply.
          </p>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">
            Related Resources
          </h2>
          <ul className="space-y-2">
            <li>
              <Link href="/tools/boot-calculator" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                Boot Calculator
              </Link>
            </li>
            <li>
              <Link href="/tools/replacement-property-value-calculator" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                Replacement Property Value Calculator
              </Link>
            </li>
            <li>
              <Link href="/services/reporting-and-filing-support" className="text-[#0B3C5D] underline hover:text-[#C9A227]">
                Reporting and Filing Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}


