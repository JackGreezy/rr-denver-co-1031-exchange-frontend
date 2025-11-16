import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";
import BottomCTA from "@/components/BottomCTA";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedServiceGrid } from "@/components/services/RelatedServiceGrid";
import {
  BRAND_NAME,
  PRIMARY_CITY,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  PRIMARY_STATE_ABBR,
} from "@/lib/constants";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  
  if (!service) {
    return {
      title: "Service Not Found | 1031 Exchange Denver",
    };
  }

  return {
    title: `${service.name} | ${BRAND_NAME}`,
    description: service.short,
    alternates: {
      canonical: `https://www.1031exchangedenver.com/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.short,
    provider: {
      "@type": "ProfessionalService",
      name: BRAND_NAME,
      telephone: PRIMARY_PHONE_TEL,
    },
    areaServed: {
      "@type": "State",
      name: PRIMARY_STATE_ABBR,
    },
  };

  const supportingLocations = locationsData.filter(
    (location) => location.type === "city"
  ).slice(0, 5);

  const relatedServices = servicesData
    .filter((s) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 4);

  const faqs = [
    {
      question: `How does this service support ${PRIMARY_CITY}?`,
      answer: `${service.name} keeps ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} exchanges aligned with local lending, intermediary, and attorney requirements so deadlines never drift.`,
    },
    {
      question: `What do you need to begin ${service.name}?`,
      answer: `We confirm relinquished sale status, estimated gain, and lender expectations for every ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} project before kicking off ${service.name.toLowerCase()} so there are no surprises.`,
    },
    {
      question: `Does ${service.name} cover compliance reporting?`,
      answer: `Yes. We document every milestone and supply your CPA or attorney in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with organized records generated during ${service.name.toLowerCase()} support.`,
    },
  ];

  return (
    <>
      <Script
        id="jsonld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.name },
          ]}
        />
        <div className="space-y-4">
          {service.category ? (
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
              {service.category}
            </p>
          ) : null}
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            {service.name}
          </h1>
          <p className="text-base text-slate-300">{service.short}</p>
        </div>

        <section className="mt-12 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">
            What is included
          </h2>
          <p className="text-sm text-slate-300">
            This service keeps your exchange aligned with IRS guidance and the
            lender, intermediary, and attorney teams supporting you.
          </p>
          <ul className="space-y-3 text-sm text-slate-200">
            <li>• Intake review covering gain, basis, and financing targets.</li>
            <li>• Calendar control for the 45 day identification and 180 day close.</li>
            <li>• Secure document exchange for intermediaries, attorneys, and lenders.</li>
          </ul>
        </section>

        <section className="mt-12">
          <RelatedServiceGrid services={relatedServices.length > 0 ? relatedServices : servicesData.slice(0, 4)} />
        </section>

        <section className="mt-12 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">
            Frequently asked questions
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

        <section className="mt-12 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">
            Where we deliver {service.name.toLowerCase()}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {supportingLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-slate-200 transition hover:-translate-y-1 hover:border-amber-200/50"
              >
                <p className="text-sm font-semibold text-white">
                  {location.name}
                </p>
                <p className="text-xs text-slate-400">
                  Learn about {location.name} exchanges
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-200/30 bg-amber-50/5 p-6 text-white">
          <h2 className="text-2xl font-semibold">
            Launch {service.name.toLowerCase()}
          </h2>
          <p className="mt-2 text-sm text-slate-200">
            Share your objectives and we will confirm intermediary fit,
            diligence needs, and reporting steps.
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
              Tell us about your exchange
            </h2>
            <p className="text-sm text-slate-300">
              Mention {service.name.toLowerCase()} so we can prefill workflow
              steps before the first call.
            </p>
            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/40 p-4">
              <LeadForm prepopulatedService={service.name} />
            </div>
          </div>
        </section>
      </div>
      <BottomCTA />
    </>
  );
}

