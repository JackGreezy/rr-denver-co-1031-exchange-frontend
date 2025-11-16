import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { propertyTypesData } from "@/data/property-types";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";
import BottomCTA from "@/components/BottomCTA";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  BRAND_NAME,
  PRIMARY_CITY,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  PRIMARY_STATE_ABBR,
} from "@/lib/constants";

export async function generateStaticParams() {
  return propertyTypesData.map((propertyType) => ({
    slug: propertyType.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const propertyType = propertyTypesData.find((pt) => pt.slug === slug);
  
  if (!propertyType) {
    return {
      title: "Property Type Not Found | 1031 Exchange Denver",
    };
  }

  return {
    title: `${propertyType.name} Replacement Properties | ${BRAND_NAME}`,
    description: `${propertyType.name} 1031 replacement strategies for ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Underwriting notes, identification tips, and compliance reminders.`,
    alternates: {
      canonical: `https://www.1031exchangedenver.com/property-types/${propertyType.slug}`,
    },
  };
}

export default async function PropertyTypePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const propertyType = propertyTypesData.find((pt) => pt.slug === slug);

  if (!propertyType) {
    notFound();
  }

  const relatedServices = servicesData
    .filter(
      (service) =>
        service.name.toLowerCase().includes(propertyType.name.toLowerCase()) ||
        service.short.toLowerCase().includes(propertyType.name.toLowerCase())
    )
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${propertyType.name} Replacement Property Support`,
    provider: {
      "@type": "ProfessionalService",
      name: BRAND_NAME,
    },
    areaServed: {
      "@type": "State",
      name: PRIMARY_STATE_ABBR,
    },
    serviceType: propertyType.name,
    description: `${propertyType.name} identification and underwriting guidance for ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} exchanges.`,
  };

  const faqs = [
    {
      question: `How do investors use ${propertyType.name.toLowerCase()} assets in ${PRIMARY_CITY}?`,
      answer: `${propertyType.name} assets in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} are often selected to balance yield with long-term depreciation schedules. We align the underwriting to your basis and debt targets before identification.`,
    },
    {
      question: `What diligence is required for ${propertyType.name.toLowerCase()}?`,
      answer: `We coordinate rent roll checks, trailing twelve reviews, and market comps specific to ${propertyType.name.toLowerCase()} replacements so you can deliver a complete package to your lender in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    },
    {
      question: `Are there timeline risks for ${propertyType.name.toLowerCase()}?`,
      answer: `${propertyType.name} assets can require longer negotiations. We build backup options and confirm that your intermediary can accept identification letters that reference build-to-suit or improvement exchange strategies when needed.`,
    },
  ];

  return (
    <>
      <Script
        id="jsonld-property-type"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Property Types", href: "/property-types" },
            { label: propertyType.name },
          ]}
        />
        {propertyType.heroImage && (
          <div className="relative mb-10 h-64 w-full overflow-hidden rounded-3xl">
            <Image
              src={propertyType.heroImage}
              alt={propertyType.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
            Property Type
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            {propertyType.name} replacement properties
          </h1>
          <p className="text-base text-slate-300">
            Understand how {propertyType.name.toLowerCase()} assets fit within
            IRS identification rules, debt replacement math, and lender
            expectations for {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} exchanges.
          </p>
        </div>

        <section className="mt-12 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">
            Why investors choose {propertyType.name.toLowerCase()}
          </h2>
          <p className="text-sm text-slate-300">
            We surface rent roll considerations, operating expense norms, and
            disposition risks unique to {propertyType.name.toLowerCase()}
            assets.
          </p>
          <ul className="space-y-3 text-sm text-slate-200">
            <li>
              • Basis planning and depreciation reset modeling for{" "}
              {propertyType.name.toLowerCase()} portfolios.
            </li>
            <li>
              • Identification strategy that covers both three property and 200
              percent paths.
            </li>
            <li>
              • Lender prep packages that highlight income durability for{" "}
              {propertyType.name.toLowerCase()} replacements.
            </li>
          </ul>
        </section>

        {relatedServices.length > 0 && (
          <section className="mt-12 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">
                Related services
              </h2>
              <Link
                href="/services"
                className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-200"
              >
                View all services
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-slate-200 transition hover:-translate-y-1 hover:border-amber-200/50"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
                    {service.category}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-white">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">{service.short}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">
            Popular markets for {propertyType.name}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {locationsData
              .filter((location) => location.type === "city")
              .slice(0, 6)
              .map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-slate-200 transition hover:-translate-y-1 hover:border-amber-200/50"
                >
                  <p className="text-sm font-semibold text-white">
                    {location.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    Explore {propertyType.name.toLowerCase()} demand
                  </p>
                </Link>
              ))}
          </div>
        </section>

        <section className="mt-12 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">
            {propertyType.name} FAQ
          </h2>
          <div className="space-y-3">
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
            Start a {propertyType.name} exchange plan
          </h2>
          <p className="mt-2 text-sm text-slate-200">
            We can review current debt, lender hurdles, and intermediary options
            for {propertyType.name.toLowerCase()} replacements.
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
              Request underwriting support
            </h2>
            <p className="text-sm text-slate-300">
              Mention the property type so we can prefill lender-ready
              materials.
            </p>
            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/40 p-4">
              <LeadForm
                prepopulatedService={`${propertyType.name} 1031 Exchange`}
              />
            </div>
          </div>
        </section>
      </div>
      <BottomCTA />
    </>
  );
}

