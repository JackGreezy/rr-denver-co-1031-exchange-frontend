import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";
import BottomCTA from "@/components/BottomCTA";
import { LeadForm } from "@/components/LeadForm";

const PHONE_DISPLAY = "(720) 738-1031";
const PHONE_TEL = "+17207381031";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = servicesData.find((s) => s.slug === params.slug);
  
  if (!service) {
    return {
      title: "Service Not Found | 1031 Exchange Denver",
    };
  }

  return {
    title: `${service.name} | 1031 Exchange Denver`,
    description: service.short,
    alternates: {
      canonical: `https://www.1031exchangedenver.com/services/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.short,
    provider: {
      "@type": "LocalBusiness",
      name: "1031 Exchange Denver",
      telephone: PHONE_TEL,
    },
    areaServed: {
      "@type": "State",
      name: "Colorado",
    },
  };

  return (
    <>
      <Script
        id="jsonld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-20">
        <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-4">
          {service.name}
        </h1>
        {service.category && (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#DAA520] mb-4">
            {service.category}
          </p>
        )}
        <p className="text-lg text-gray-700 mb-8 max-w-3xl">
          {service.short}
        </p>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-6">Service Details</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700">
              Our {service.name.toLowerCase()} service provides comprehensive support for Colorado investors completing 1031 exchanges. 
              We coordinate with qualified intermediaries, attorneys, and lenders to ensure compliance with IRS deadlines and requirements.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-6">Available in These Service Areas</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {locationsData.filter((loc) => loc.type === "city").slice(0, 6).map((location) => (
              <Link
                key={location.slug}
                href={`/service-areas/${location.slug}`}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-semibold text-[#0B3C5D] mb-2">{location.name}</h3>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/service-areas"
              className="text-sm font-semibold text-[#16324F] underline decoration-2 underline-offset-4 transition hover:text-[#0f2236]"
            >
              View All {locationsData.length} Service Areas →
            </Link>
          </div>
        </section>

        <section className="mb-12 rounded-lg border border-gray-200 bg-[#F8FAFB] p-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">
            Get Started with {service.name}
          </h2>
          <p className="text-gray-700 mb-6">
            Contact our team to discuss how our {service.name.toLowerCase()} service can support your 1031 exchange.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center rounded-full bg-[#DAA520] px-6 py-3 text-sm font-semibold tracking-[0.18em] text-gray-900 transition hover:bg-[#c4911b]"
            >
              CALL {PHONE_DISPLAY}
            </Link>
            <Link
              href="#contact-form"
              className="inline-flex items-center justify-center rounded-full border border-[#16324F] px-6 py-3 text-sm font-semibold text-[#16324F] transition hover:bg-[#16324F] hover:text-white"
            >
              REQUEST CONSULTATION
            </Link>
          </div>
        </section>

        <section id="contact-form" className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-6">Contact Us</h2>
          <div className="rounded-lg border border-gray-200 bg-white p-8">
            <LeadForm prepopulatedService={service.name} />
          </div>
        </section>
      </div>
      <BottomCTA />
    </>
  );
}

