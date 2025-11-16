import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { locationsData } from "@/data/locations";
import { servicesData } from "@/data/services";
import { propertyTypesData } from "@/data/property-types";
import BottomCTA from "@/components/BottomCTA";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  BRAND_NAME,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  PRIMARY_STATE_ABBR,
} from "@/lib/constants";

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

  return {
    title: `1031 Exchange Services in ${location.name}, CO | ${BRAND_NAME}`,
    description: `Location-specific 1031 exchange coordination for ${location.name}, ${PRIMARY_STATE_ABBR}. Identification help, underwriting, and intermediary alignment for regional investors.`,
    alternates: {
      canonical: `https://www.1031exchangedenver.com/locations/${location.slug}`,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${BRAND_NAME} - ${location.name}`,
    description: `1031 exchange coordination services for ${location.name}, ${PRIMARY_STATE_ABBR} investors.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.name,
      addressRegion: PRIMARY_STATE_ABBR,
      addressCountry: "US",
    },
    telephone: PRIMARY_PHONE_TEL,
    url: `https://www.1031exchangedenver.com/locations/${location.slug}`,
  };

  const featuredServices = servicesData
    .filter((service) => service.category === "Property Paths")
    .slice(0, 4);

  const faqs = [
    {
      question: `How fast can you mobilize in ${location.name}?`,
      answer: `We stage intake calls within one business day for ${location.name}, ${PRIMARY_STATE_ABBR} investors and begin property matching once debt and equity targets are confirmed.`,
    },
    {
      question: `Do you cover identification tours in ${location.name}?`,
      answer: `Yes, we coordinate broker and property tours in ${location.name}, ${PRIMARY_STATE_ABBR} when travel makes sense and supply remote alternatives when timelines are compressed.`,
    },
    {
      question: `Can you support reverse exchanges in ${location.name}?`,
      answer: `We align qualified intermediaries and exchange accommodation arrangements that meet IRS requirements for reverse exchanges in ${location.name}, ${PRIMARY_STATE_ABBR}.`,
    },
    {
      question: `Who manages closing calendars for ${location.name}?`,
      answer: `Our Denver desk tracks the 45 and 180 day milestones for ${location.name}, ${PRIMARY_STATE_ABBR} projects and updates your intermediary, lender, and attorney weekly.`,
    },
  ];

  return (
    <>
      <Script
        id="jsonld-location"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Locations", href: "/locations" },
            { label: location.name },
          ]}
        />
        {location.heroImage && (
          <div className="relative mb-10 h-64 w-full overflow-hidden rounded-3xl">
            <Image
              src={location.heroImage}
              alt={`${location.name}, Colorado`}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
            {location.type === "remote" ? "Remote Support" : "Local Focus"}
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            1031 exchange services in {location.name}
            {parentLocation ? `, ${parentLocation.name}` : ""}
          </h1>
          <p className="text-base text-slate-300">
            Deadline surveillance, identification planning, and lender prep
            tailored to {location.name}, {PRIMARY_STATE_ABBR}. We synchronize
            intermediaries, attorneys, and local brokers while keeping every
            stakeholder on the 45 and 180 day rails.
          </p>
        </div>

        <section className="mt-12 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white">
              Featured services for {location.name}
            </h2>
            <p className="text-sm text-slate-300">
              Property sourcing and underwriting paths Denver investors most
              often request for {location.name}.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 transition hover:-translate-y-1 hover:border-amber-200/40"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
                  {service.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{service.short}</p>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services"
              className="text-sm font-semibold text-amber-200 underline decoration-2 underline-offset-4 hover:text-white"
            >
              View all {servicesData.length} services
            </Link>
            <Link
              href="/locations"
              className="text-sm font-semibold text-amber-200 underline decoration-2 underline-offset-4 hover:text-white"
            >
              View all locations
            </Link>
          </div>
        </section>

        <section className="mt-12 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">
            Property types popular in {location.name}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {propertyTypesData.slice(0, 3).map((propertyType) => (
              <Link
                key={propertyType.slug}
                href={`/property-types/${propertyType.slug}`}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-slate-200 transition hover:-translate-y-1 hover:border-amber-200/50"
              >
                <p className="text-sm font-semibold text-white">
                  {propertyType.name}
                </p>
                <p className="text-xs text-slate-400">
                  Explore {propertyType.name.toLowerCase()} use cases
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-white">FAQ</h2>
            <p className="text-sm text-slate-300">
              Guidance specific to {location.name}, {PRIMARY_STATE_ABBR}.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
              >
                <summary className="cursor-pointer text-sm font-semibold text-white">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm text-slate-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-200/30 bg-amber-50/5 p-6 text-white">
          <h2 className="text-2xl font-semibold">
            Plan your {location.name} 1031 exchange
          </h2>
          <p className="mt-2 text-sm text-slate-200">
            Call or message to confirm relinquished sale status, lender needs,
            and intermediary fit. We keep every milestone visible until the
            replacement closes.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${PRIMARY_PHONE_TEL}`}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em]"
            >
              Call {PRIMARY_PHONE_DISPLAY}
            </a>
            <Link
              href="#contact-form"
              className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-900"
            >
              Contact team
            </Link>
          </div>
        </section>

        <section id="contact-form" className="mt-12">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">
              Tell us about your timelines
            </h2>
            <p className="text-sm text-slate-300">
              The form routes to an encrypted intake workflow. We respond within
              one business day.
            </p>
            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/40 p-4">
              <LeadForm prepopulatedService={`${location.name} location`} />
            </div>
          </div>
        </section>
      </div>
      <BottomCTA />
    </>
  );
}

