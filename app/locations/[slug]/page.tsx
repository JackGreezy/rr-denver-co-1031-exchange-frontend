import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";
import { locationsData } from "@/data/locations";
import { servicesData } from "@/data/services";
import { propertyTypesData } from "@/data/property-types";
import BottomCTA from "@/components/BottomCTA";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getLocationBatch } from "@/lib/batch-loader";
import {
  BRAND_NAME,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  PRIMARY_STATE_ABBR,
} from "@/lib/constants";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const LOCATION_TYPE_LABELS: Record<string, string> = {
  city: "City",
  neighborhood: "Neighborhood",
  suburb: "Suburb",
  district: "District",
  remote: "Remote",
};

export async function generateStaticParams() {
  return locationsData.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);

  if (!location) {
    return {
      title: "Location Not Found | 1031 Exchange Denver",
    };
  }

  const typeLabel = LOCATION_TYPE_LABELS[location.type] || "Area";
  const description = location.type === "remote"
    ? `Remote 1031 exchange coordination for out-of-state investors targeting Colorado replacement properties. Qualified intermediary alignment, 45-day identification strategy, and 180-day closing support from ${BRAND_NAME}.`
    : `Expert 1031 exchange services in ${location.name}, ${PRIMARY_STATE_ABBR}. ${typeLabel}-level replacement property identification, qualified intermediary coordination, and IRS deadline management for ${location.name} investors.`;

  return {
    title: `1031 Exchange in ${location.name}, CO | Replacement Property & QI Services | ${BRAND_NAME}`,
    description,
    alternates: {
      canonical: `https://www.1031exchangedenver.com/locations/${location.slug}`,
    },
    openGraph: {
      title: `1031 Exchange Services in ${location.name}, Colorado`,
      description,
      url: `https://www.1031exchangedenver.com/locations/${location.slug}`,
      siteName: BRAND_NAME,
      type: "website",
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);

  if (!location) {
    notFound();
  }

  const parentLocation = location.parent ? locationsData.find((l) => l.slug === location.parent) : null;
  const batchContent = getLocationBatch(slug);
  const typeLabel = LOCATION_TYPE_LABELS[location.type] || "Area";

  const featuredServices = servicesData
    .filter((service) => service.category === "Property Paths")
    .slice(0, 6);

  // Use per-location rich FAQs if available, then batch FAQs, otherwise fall back to defaults
  const faqs = location.faqs || batchContent?.faqs || [
    {
      question: `What 1031 exchange services are available in ${location.name}, ${PRIMARY_STATE_ABBR}?`,
      answer: `${location.name}, ${PRIMARY_STATE_ABBR} investors have access to replacement property identification, qualified intermediary coordination, 45-day identification strategy, 180-day closing management, and due diligence support through our Denver-based team.`,
    },
    {
      question: `Can ${location.name} investors identify replacement properties outside Colorado?`,
      answer: `Yes. IRS like-kind rules allow ${location.name}, ${PRIMARY_STATE_ABBR} investors to identify replacement properties anywhere in the United States. Geographic location is not restricted as long as the property is real property held for investment or business use.`,
    },
    {
      question: `What are the 1031 exchange deadlines for ${location.name}, ${PRIMARY_STATE_ABBR}?`,
      answer: `${location.name} exchanges follow standard IRS timelines: 45 calendar days from sale closing to identify replacement properties and 180 calendar days to complete acquisition. Our team provides deadline tracking and milestone management throughout.`,
    },
    {
      question: `How is boot taxed in a ${location.name} 1031 exchange?`,
      answer: `Boot in ${location.name}, ${PRIMARY_STATE_ABBR} exchanges includes cash not reinvested and mortgage relief not replaced. Boot is recognized as taxable income. We help structure exchanges to minimize boot through proper debt matching and full reinvestment.`,
    },
    {
      question: `Do you coordinate reverse exchanges in ${location.name}?`,
      answer: `Yes, we align qualified intermediaries and exchange accommodation titleholders for reverse exchanges in ${location.name}, ${PRIMARY_STATE_ABBR}. Reverse exchanges require parking arrangements compliant with IRS Revenue Procedure 2000-37.`,
    },
  ];

  // Nearby locations for internal linking
  const nearbyLocations = locationsData
    .filter((l) => l.slug !== slug && l.type !== "remote")
    .slice(0, 6);

  // JSON-LD: LocalBusiness
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${BRAND_NAME} - ${location.name}`,
    description: `1031 exchange coordination services for ${location.name}, ${PRIMARY_STATE_ABBR} investors. Replacement property identification, qualified intermediary alignment, and IRS deadline management.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.name,
      addressRegion: PRIMARY_STATE_ABBR,
      addressCountry: "US",
    },
    telephone: PRIMARY_PHONE_TEL,
    url: `https://www.1031exchangedenver.com/locations/${location.slug}`,
    areaServed: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "State",
        name: "Colorado",
      },
    },
  };

  // JSON-LD: FAQPage
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.1031exchangedenver.com/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.1031exchangedenver.com/locations" },
      { "@type": "ListItem", position: 3, name: location.name, item: `https://www.1031exchangedenver.com/locations/${location.slug}` },
    ],
  };

  return (
    <>
      <Script
        id="jsonld-location"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="jsonld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="bg-white">
        {/* Hero Section with Image */}
        <section className="relative">
          {location.heroImage && (
            <div className="relative h-80 md:h-96 w-full overflow-hidden">
              <Image
                src={location.heroImage}
                alt={`1031 exchange services in ${location.name}, Colorado`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
            </div>
          )}
          <div className={`${location.heroImage ? 'absolute inset-0 flex items-end' : 'bg-black py-20'}`}>
            <div className="mx-auto max-w-7xl px-6 md:px-8 py-12 md:py-16 w-full">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Locations", href: "/locations" },
                  ...(parentLocation ? [{ label: parentLocation.name, href: `/locations/${parentLocation.slug}` }] : []),
                  { label: location.name },
                ]}
                className="mb-6 text-sm"
              />
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                {typeLabel} &middot; {PRIMARY_STATE_ABBR}
              </p>
              <h1 className={`mt-4 text-3xl tracking-wide text-white sm:text-4xl md:text-5xl uppercase ${playfair.className}`}>
                1031 Exchange in {location.name}
                {parentLocation ? `, ${parentLocation.name}` : ""}, Colorado
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-white/80">
                Qualified intermediary coordination, replacement property identification,
                and IRS deadline management for {location.name}, {PRIMARY_STATE_ABBR} investors.
              </p>
            </div>
          </div>
        </section>

        {/* Main Description / Market Overview Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="mx-auto max-w-4xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-black">
                {location.name}, {PRIMARY_STATE_ABBR} Market
              </p>
              <h2 className={`mt-4 text-3xl text-gray-900 uppercase ${playfair.className}`}>
                1031 Exchange Services in {location.name}, Colorado
              </h2>
              {batchContent?.mainDescription ? (
                <div
                  className="mt-6 prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: batchContent.mainDescription }}
                />
              ) : !location.richSections?.length ? (
                <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    {location.name}, {PRIMARY_STATE_ABBR} offers distinct opportunities for 1031 exchange
                    investors seeking tax-deferred reinvestment across Colorado{`'`}s real estate markets.
                    As a {typeLabel.toLowerCase()} within the Denver metro corridor, {location.name} provides
                    access to multifamily, industrial, retail, and mixed-use replacement properties.
                  </p>
                  <p>
                    Our Denver-based team coordinates every phase of the exchange process for {location.name} investors,
                    including qualified intermediary selection, 45-day identification letter preparation,
                    replacement property underwriting, lender coordination, and 180-day closing management.
                  </p>
                  <p>
                    {location.name} investors can identify replacement properties locally within Colorado
                    or nationwide. IRS Section 1031 requires only that the replacement property be like-kind
                    real property held for investment or business use — geographic restrictions do not apply.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Rich Location Detail — per-location market texture, replaces the generic fallback above when present */}
        {location.richSections && location.richSections.length > 0 && (
          <section className="pb-16 md:pb-24">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <div className="mx-auto max-w-4xl space-y-10">
                {location.richSections.map((section) => (
                  <div key={section.heading}>
                    <h3 className={`text-2xl text-gray-900 ${playfair.className}`}>
                      {section.heading}
                    </h3>
                    <div
                      className="mt-3 prose prose-lg max-w-none text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: section.body }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Key Exchange Facts for Location */}
        <section className="bg-black py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">
                Exchange Requirements
              </p>
              <h2 className={`mt-4 text-3xl text-white uppercase ${playfair.className}`}>
                Key 1031 Deadlines for {location.name} Investors
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              {[
                {
                  stat: "45 Days",
                  label: "Identification Deadline",
                  copy: `${location.name} investors must formally identify up to three replacement properties within 45 calendar days of the relinquished property sale closing.`,
                },
                {
                  stat: "180 Days",
                  label: "Closing Deadline",
                  copy: `All replacement property acquisitions for ${location.name} exchanges must close within 180 calendar days. Missing this deadline disqualifies the exchange.`,
                },
                {
                  stat: "100%",
                  label: "Tax Deferral",
                  copy: `A properly structured 1031 exchange defers 100% of federal capital gains and depreciation recapture tax for ${location.name}, ${PRIMARY_STATE_ABBR} investors.`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-white/10 px-8 py-10 text-center"
                >
                  <span className={`block text-4xl font-light text-white ${playfair.className}`}>
                    {item.stat}
                  </span>
                  <h3 className={`mt-4 text-base text-white/90 ${playfair.className}`}>
                    {item.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Paths Section */}
        {batchContent?.popularPaths && batchContent.popularPaths.length > 0 && (
          <section className="bg-[#fafafa] py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <div className="text-center mb-12">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-black">
                  Popular in {location.name}
                </p>
                <h2 className={`mt-4 text-3xl text-gray-900 uppercase ${playfair.className}`}>
                  Top 1031 Exchange Services &amp; Property Types in {location.name}
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {batchContent.popularPaths.map((path) => {
                  const href = path.type === 'service' ? `/services/${path.slug}` : `/property-types/${path.slug}`;
                  return (
                    <Link
                      key={path.slug}
                      href={href}
                      className="group bg-white p-6 transition-all hover:bg-black"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className={`text-4xl font-light text-black/30 group-hover:text-white/30 ${playfair.className}`}>
                          {String(path.rank).padStart(2, '0')}
                        </span>
                        <span className="text-xs uppercase tracking-[0.2em] text-gray-500 group-hover:text-white/70">
                          {path.type}
                        </span>
                      </div>
                      <h3 className={`text-xl text-gray-900 group-hover:text-white ${playfair.className}`}>
                        {path.name}
                      </h3>
                      <p className="mt-3 text-sm text-gray-600 group-hover:text-white/80">
                        {path.whyPopular}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-black group-hover:text-white">
                        Explore
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Example Capability Section */}
        {batchContent?.exampleCapability && (
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-4xl px-6 md:px-8">
              <div className="text-center mb-12">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-black">
                  Example Project
                </p>
                <h2 className={`mt-4 text-3xl text-gray-900 uppercase ${playfair.className}`}>
                  {location.name} 1031 Exchange Coordination
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {batchContent.exampleCapability.disclaimer}
                </p>
              </div>
              <div className="space-y-8 bg-[#fafafa] p-8 md:p-12">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-black mb-3">
                    Situation
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {batchContent.exampleCapability.situation}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-black mb-3">
                    Our Approach
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {batchContent.exampleCapability.ourApproach}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-black mb-3">
                    Expected Outcome
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {batchContent.exampleCapability.expectedOutcome}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Featured Services Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-black">
                Available Services
              </p>
              <h2 className={`mt-4 text-3xl text-gray-900 uppercase ${playfair.className}`}>
                1031 Exchange Services for {location.name}, {PRIMARY_STATE_ABBR}
              </h2>
              <p className="mt-4 text-gray-600">
                Property sourcing, underwriting, and exchange coordination paths {location.name} investors
                most frequently request.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-[#fafafa] p-8 transition-all hover:bg-black"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-black group-hover:text-white/70">
                    {service.category}
                  </p>
                  <h3 className={`mt-3 text-xl text-gray-900 group-hover:text-white ${playfair.className}`}>
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 group-hover:text-white/80">{service.short}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-black group-hover:text-white">
                    Learn more
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <Link
                href="/services"
                className="text-sm font-medium text-black underline underline-offset-4 hover:text-gray-800"
              >
                View all {servicesData.length} services
              </Link>
            </div>
          </div>
        </section>

        {/* Property Types Section — with images */}
        <section className="bg-[#fafafa] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-black">
                Replacement Property Options
              </p>
              <h2 className={`mt-4 text-3xl text-gray-900 uppercase ${playfair.className}`}>
                1031 Exchange Property Types in {location.name}
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-gray-600">
                {location.name}, {PRIMARY_STATE_ABBR} investors exchange into these property types
                to defer capital gains and reposition their portfolios.
              </p>
            </div>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {propertyTypesData.slice(0, 6).map((propertyType) => (
                <Link
                  key={propertyType.slug}
                  href={`/property-types/${propertyType.slug}`}
                  className="group block"
                >
                  {propertyType.heroImage && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={propertyType.heroImage}
                        alt={`${propertyType.name} 1031 exchange properties in ${location.name}`}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <h3 className={`mt-5 text-xl text-gray-900 ${playfair.className}`}>
                    {propertyType.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Explore {propertyType.name.toLowerCase()} replacement options for {location.name} investors
                  </p>
                  <span className="mt-3 inline-block text-xs font-medium text-black underline underline-offset-4 decoration-gray-300 group-hover:decoration-black transition">
                    View {propertyType.name}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/property-types"
                className="inline-block border border-black px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-black transition-all hover:bg-black hover:text-white"
              >
                View All Property Types
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-black">
                Common Questions
              </p>
              <h2 className={`mt-4 text-3xl text-gray-900 uppercase ${playfair.className}`}>
                {location.name}, {PRIMARY_STATE_ABBR} 1031 Exchange FAQ
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group py-6"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-left">
                    <span className={`text-lg text-gray-900 group-open:text-gray-500 ${playfair.className}`}>
                      {faq.question}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-gray-300 text-black transition group-open:bg-black group-open:text-white">
                      <svg className="h-4 w-4 transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 pr-12">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Locations — internal linking */}
        <section className="bg-[#fafafa] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-black">
                Nearby Service Areas
              </p>
              <h2 className={`mt-4 text-3xl text-gray-900 uppercase ${playfair.className}`}>
                Other Colorado 1031 Exchange Locations
              </h2>
            </div>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {nearbyLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="group block"
                >
                  {loc.heroImage && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={loc.heroImage}
                        alt={`1031 exchange services in ${loc.name}, Colorado`}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <h3 className={`mt-5 text-xl text-gray-900 ${playfair.className}`}>
                    {loc.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-gray-400">
                    {LOCATION_TYPE_LABELS[loc.type] || "Area"}
                  </p>
                  <span className="mt-2 inline-block text-xs font-medium text-black underline underline-offset-4 decoration-gray-300 group-hover:decoration-black transition">
                    View Location
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/locations"
                className="inline-block border border-black px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-black transition-all hover:bg-black hover:text-white"
              >
                View All {locationsData.length} Locations
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-black py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
            <h2 className={`text-3xl text-white uppercase ${playfair.className}`}>
              Start Your {location.name} 1031 Exchange
            </h2>
            <p className="mt-4 text-lg font-light text-white/80">
              Call or message to confirm relinquished sale status, lender needs,
              and intermediary fit. We keep every milestone visible until the
              replacement closes.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`tel:${PRIMARY_PHONE_TEL}`}
                className="inline-flex items-center justify-center border border-white/50 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                Call {PRIMARY_PHONE_DISPLAY}
              </a>
              <Link
                href="#contact-form"
                className="inline-flex items-center justify-center border border-white bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-transparent hover:text-white"
              >
                Contact Team
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-black">
                Get Started
              </p>
              <h2 className={`mt-4 text-3xl text-gray-900 uppercase ${playfair.className}`}>
                Plan Your {location.name} Exchange
              </h2>
              <p className="mt-4 text-gray-600">
                The form routes to an encrypted intake workflow. We respond within
                one business day with next steps for your {location.name} 1031 exchange.
              </p>
            </div>
            <div className="bg-[#fafafa] p-8">
              <LeadForm prepopulatedService={`${location.name} 1031 exchange`} />
            </div>
          </div>
        </section>
      </div>
      <BottomCTA />
    </>
  );
}
