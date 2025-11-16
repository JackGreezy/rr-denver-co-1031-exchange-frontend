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

const PHONE_DISPLAY = "(720) 738-1031";
const PHONE_TEL = "+17207381031";

export async function generateStaticParams() {
  return locationsData.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const location = locationsData.find((l) => l.slug === params.slug);
  
  if (!location) {
    return {
      title: "Location Not Found | 1031 Exchange Denver",
    };
  }

  return {
    title: `1031 Exchange Services in ${location.name}, CO | 1031 Exchange Denver`,
    description: `1031 exchange services in ${location.name}, Colorado. Property identification, QI coordination, and timeline management for ${location.name} investors.`,
    alternates: {
      canonical: `https://www.1031exchangedenver.com/service-areas/${location.slug}`,
    },
  };
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const location = locationsData.find((l) => l.slug === params.slug);

  if (!location) {
    notFound();
  }

  const parentLocation = location.parent ? locationsData.find((l) => l.slug === location.parent) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `1031 Exchange Services in ${location.name}`,
    description: `1031 exchange coordination services for ${location.name}, Colorado investors`,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.name,
      addressRegion: "CO",
      addressCountry: "US",
    },
    telephone: PHONE_TEL,
    url: `https://www.1031exchangedenver.com/service-areas/${location.slug}`,
  };

  return (
    <>
      <Script
        id="jsonld-location"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-20">
        {location.heroImage && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg">
            <Image
              src={location.heroImage}
              alt={`${location.name}, Colorado`}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-4">
          1031 Exchange Services in {location.name}
          {parentLocation && `, ${parentLocation.name}`}
        </h1>
        {parentLocation && (
          <p className="text-sm text-gray-600 mb-4">
            Part of <Link href={`/service-areas/${parentLocation.slug}`} className="text-[#16324F] hover:underline">{parentLocation.name}</Link>
          </p>
        )}
        <p className="text-lg text-gray-700 mb-8 max-w-3xl">
          Our Denver-based team provides comprehensive 1031 exchange coordination services for investors in {location.name}, Colorado. 
          From property identification to closing coordination, we support every phase of your exchange.
        </p>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-6">Available Services</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.slice(0, 6).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-semibold text-[#0B3C5D] mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.short}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/services"
              className="text-sm font-semibold text-[#16324F] underline decoration-2 underline-offset-4 transition hover:text-[#0f2236]"
            >
              View All {servicesData.length} Services →
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-6">Property Types</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {propertyTypesData.slice(0, 6).map((propertyType) => (
              <Link
                key={propertyType.slug}
                href={`/property-types/${propertyType.slug}`}
                className="group rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {propertyType.heroImage && (
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={propertyType.heroImage}
                      alt={propertyType.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-semibold text-[#0B3C5D] mb-2">{propertyType.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-lg border border-gray-200 bg-[#F8FAFB] p-8">
          <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] mb-4">
            Get Started with Your {location.name} 1031 Exchange
          </h2>
          <p className="text-gray-700 mb-6">
            Contact our team to discuss your 1031 exchange needs in {location.name}. We'll help you navigate the 45-day identification and 180-day closing deadlines.
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
            <LeadForm />
          </div>
        </section>
      </div>
      <BottomCTA />
    </>
  );
}

