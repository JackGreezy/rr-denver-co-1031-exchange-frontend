import ExchangeIntentSection from "../components/ExchangeIntentSection";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { RevealSection } from "@/components/RevealSection";
import { LeadForm } from "@/components/LeadForm";
import { VideoHeroBackground } from "@/components/VideoHeroBackground";
import { locationsData } from "@/data/locations";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/* ─────────── Data types ─────────── */

type Feature = {
  title: string;
  description: string;
};

type ServiceCard = {
  title: string;
  description: string;
  slug: string;
};

type CoverageItem = {
  name: string;
  description: string;
  slug: string;
};

/* ─────────── Constants ─────────── */

const PHONE_DISPLAY = "(303) 835-0981";
const PHONE_TEL = "+13038350981";
const BRAND_NAME = "1031 Exchange Denver";
const CO_TRANSFER_TAX_LINK =
  "https://cdola.colorado.gov/real-estate-transfer-tax";
const IRS_FORM_8824_LINK = "https://www.irs.gov/forms-pubs/about-form-8824";
const IRS_LIKE_KIND_LINK =
  "https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips";
const IRS_REV_PROC_2008_16_LINK =
  "https://www.irs.gov/pub/irs-drop/rp-08-16.pdf";

/* ─────────── Content arrays ─────────── */

const WHY_CHOOSE_FEATURES: Feature[] = [
  {
    title: "Colorado-Specific 1031 Knowledge",
    description:
      "Advisors trained on Colorado statutes, local transfer protocols, and state filings that complement federal guidance.",
  },
  {
    title: "Denver Tax & Real-Estate Experience",
    description:
      "Market intelligence drawn from Denver metro transactions, cap rates, and appreciation trends for precise reinvestment planning.",
  },
  {
    title: "Qualified Intermediary Network",
    description:
      "Curated relationships with bonded, insured qualified intermediaries positioned across Colorado for compliant escrow handling.",
  },
  {
    title: "Attorney & CPA Coordination",
    description:
      "Integrated review cycles with real-estate counsel and tax advisors to align purchase agreements and reporting packages.",
  },
];

const TOP_SERVICES: ServiceCard[] = [
  {
    title: "Exchange Strategy Planning",
    description:
      "Design a compliant 1031 exchange blueprint with basis analysis, gain estimates, and intermediary selection.",
    slug: "exchange-strategy-planning",
  },
  {
    title: "Replacement Property Sourcing",
    description:
      "Source and vet Colorado replacement assets aligned with debt requirements, lease stability, and identification rules.",
    slug: "replacement-property-sourcing",
  },
  {
    title: "Qualified Intermediary Oversight",
    description:
      "Coordinate escrow instructions, assignment documentation, and fund disbursement checkpoints with your QI.",
    slug: "qualified-intermediary-oversight",
  },
  {
    title: "Timeline Compliance Tracking",
    description:
      "Monitor 45-day and 180-day targets with milestone reminders, contingency planning, and executive status updates.",
    slug: "timeline-compliance-tracking",
  },
  {
    title: "Due Diligence Coordination",
    description:
      "Organize inspections, environmental reviews, and lender deliverables to keep Colorado closings efficient.",
    slug: "due-diligence-coordination",
  },
  {
    title: "Reporting & Filing Support",
    description:
      "Assemble transaction summaries, expense logs, and Form 8824 data for streamlined CPA handoff.",
    slug: "reporting-and-filing-support",
  },
];

const PROPERTY_TYPES = [
  {
    title: "Multifamily",
    description:
      "Stabilize income with Denver and Front Range apartments while deferring capital gains across unit portfolios.",
    slug: "multifamily",
    image: "/inventory/multifamily/multifamily.jpg",
  },
  {
    title: "Industrial",
    description:
      "Reposition proceeds into logistics and flex space serving Colorado's manufacturing and aerospace sectors.",
    slug: "industrial",
    image: "/inventory/industrial/industrial.jpeg",
  },
  {
    title: "Medical Office",
    description:
      "Capture long-term tenancy with healthcare providers anchored in high-growth Colorado corridors.",
    slug: "medical-office",
    image: "/inventory/medical-office/medical-office.jpg",
  },
  {
    title: "Retail",
    description:
      "Leverage consumer traffic in urban and mountain gateway retail with tailored NOI expectations.",
    slug: "retail",
    image: "/inventory/retail/retail.jpg",
  },
  {
    title: "Hospitality",
    description:
      "Evaluate boutique hotels and resort properties that align with safe harbor use standards.",
    slug: "hospitality",
    image: "/inventory/hospitality/hospitality.png",
  },
  {
    title: "Land",
    description:
      "Exchange into irrigated cropland and ranch assets with conservation-minded yield strategies.",
    slug: "land",
    image: "/inventory/land/land.webp",
  },
];

const CO_CITIES: CoverageItem[] = [
  {
    name: "Denver",
    description:
      "Headquartered guidance for metro Denver exchanges, from Cherry Creek to the Tech Center.",
    slug: "denver-co",
  },
  {
    name: "Boulder",
    description:
      "Investor support for Boulder County assets with university and innovation-driven demand.",
    slug: "boulder-co",
  },
  {
    name: "Colorado Springs",
    description:
      "Military, aerospace, and logistics asset planning across El Paso County markets.",
    slug: "colorado-springs-co",
  },
  {
    name: "Fort Collins",
    description:
      "Northern Colorado opportunities balanced between CSU growth and technology tenants.",
    slug: "fort-collins-co",
  },
  {
    name: "Aurora",
    description:
      "Gateway to eastern metro investment with growing medical and logistics corridors.",
    slug: "aurora-co",
  },
  {
    name: "Lakewood",
    description:
      "West Denver suburbs with strong retail fundamentals and proximity to Federal Center employment.",
    slug: "lakewood-co",
  },
];

const FEATURED_LOCATIONS = CO_CITIES.map((city) => {
  const match = locationsData.find((l) => l.slug === city.slug);
  return {
    name: city.name,
    description: city.description,
    slug: match?.slug ?? city.slug,
    heroImage: match?.heroImage ?? `/locations/1031-exchange-${city.slug}.jpg`,
  };
});

const FAQ_ENTRIES = [
  {
    question: "What are the 45 and 180 day deadlines?",
    answer:
      "The IRS allows 45 calendar days from the sale closing to identify potential replacement properties and 180 calendar days from the sale closing to complete the acquisition of selected replacements. Missing either deadline disqualifies the exchange.",
  },
  {
    question: "Which properties qualify as like-kind?",
    answer:
      "Like-kind real property covers investment or business real estate held within the United States, including land, improved assets, and long-term leaseholds. Personal property and inventory do not qualify.",
  },
  {
    question: "What is boot and how is it taxed?",
    answer:
      "Boot refers to cash or non-like-kind property received in an exchange. Boot is recognized as taxable income to the extent of gain realized, including mortgage relief not replaced.",
  },
  {
    question: "Do you owe transfer taxes in Colorado?",
    answer:
      "Colorado does not impose a state-level transfer tax, but counties and municipalities may assess documentary or recording fees that remain payable even within a 1031 exchange.",
  },
  {
    question: "Can you complete a reverse exchange?",
    answer:
      "Yes. A reverse exchange requires parking arrangements and a qualified exchange accommodation agreement that complies with IRS Revenue Procedure 2000-37 timelines.",
  },
  {
    question: "How do you report using IRS Form 8824?",
    answer:
      "Form 8824 reports relinquished and replacement property details, timelines, basis calculations, and any recognized gain. Most investors file it with their federal return for the tax year in which the exchange closes.",
  },
];

const EXCHANGE_FACTS = [
  {
    stat: "$100B+",
    label: "Annual 1031 Exchange Volume",
    description:
      "Section 1031 exchanges facilitate over one hundred billion dollars in real estate transactions annually across the United States, making it one of the most widely used tax deferral strategies for property investors.",
  },
  {
    stat: "45",
    label: "Day Identification Window",
    description:
      "Investors have exactly 45 calendar days from the closing of their relinquished property to formally identify up to three potential replacement properties under the standard identification rules.",
  },
  {
    stat: "180",
    label: "Day Closing Deadline",
    description:
      "The IRS requires all replacement property acquisitions to close within 180 calendar days of the original sale. Missing this deadline disqualifies the entire exchange from tax deferral.",
  },
  {
    stat: "0%",
    label: "Tax on Deferred Gains",
    description:
      "A properly structured 1031 exchange defers 100 percent of federal capital gains tax, depreciation recapture, and applicable state income tax on qualifying investment real estate transactions.",
  },
  {
    stat: "3",
    label: "Property Identification Rule",
    description:
      "The three property rule allows investors to identify up to three replacement properties of any value. Alternative rules include the 200 percent rule and the 95 percent exception for larger portfolios.",
  },
  {
    stat: "1921",
    label: "Year Section 1031 Was Enacted",
    description:
      "Like-kind exchange provisions have existed in the U.S. tax code for over a century. The Tax Cuts and Jobs Act of 2017 narrowed eligibility to real property only, eliminating personal property exchanges.",
  },
];

/* ─────────── SEO / Metadata ─────────── */

export const metadata: Metadata = {
  title:
    "Denver 1031 Exchange Experts | Colorado Qualified Intermediary Network",
  description:
    "Trusted 1031 exchange guidance for Colorado investors. Denver-based intermediary coordination, attorney review, and timeline management for compliant tax deferral.",
  alternates: { canonical: "https://www.1031exchangedenver.com/" },
  openGraph: {
    title: "Denver 1031 Exchange Experts",
    description:
      "Colorado 1031 exchange specialists offering full compliance support, intermediary coordination, and local attorney partnerships.",
    url: "https://www.1031exchangedenver.com/",
    siteName: "1031 Exchange Denver",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Denver 1031 Exchange Experts",
    description:
      "Defer capital gains taxes with a compliant 1031 exchange in Colorado. Local guidance, legal review, and precise deadline tracking.",
    images: ["/og-image.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: BRAND_NAME,
  url: "https://www.1031exchangedenver.com/",
  logo: "https://www.1031exchangedenver.com/logo.svg",
  telephone: PHONE_TEL,
  address: {
    "@type": "PostalAddress",
    addressRegion: "CO",
    addressCountry: "US",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: PHONE_TEL,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "1031 Exchange Denver",
  url: "https://www.1031exchangedenver.com/",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ENTRIES.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/* ═══════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════ */

export default function Page() {
  return (
    <>
      <Script
        id="jsonld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <Script
        id="jsonld-site"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ═══════════════════════════════════
          HERO — fullscreen cinematic video
          ═══════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <VideoHeroBackground />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <h1
            className={`${playfair.className} uppercase text-[clamp(2.5rem,7vw,6.5rem)] font-normal leading-[1.05] tracking-[-0.01em] text-white`}
          >
            Denver&rsquo;s Premier
            <br />
            1031 Exchange Advisors
          </h1>
          <p
            className={`${inter.className} mx-auto mt-8 max-w-lg text-[15px] font-light tracking-[0.04em] text-white/70`}
          >
            Elevating Colorado Real Estate Investment
          </p>
          <div className="mt-14">
            <Link
              href="#lead-form"
              className={`${inter.className} inline-block border border-white/50 px-14 py-5 text-[13px] font-normal uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-black`}
            >
              Start Your Exchange
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          WHY CHOOSE US — image left + highlight boxes right
          Matches "Career Highlights" layout
          ═══════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:py-44">
          <RevealSection className="grid items-start gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
            {/* Left — large photo */}
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/hero-images/denver-1.jpg"
                alt="Denver Colorado skyline"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Right — heading + 2×2 feature grid */}
            <div className="flex flex-col justify-center">
              <h2
                className={`${playfair.className} uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-black`}
              >
                Why Choose Us
              </h2>
              <div className="mt-14 grid grid-cols-2 gap-5">
                {WHY_CHOOSE_FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className="border border-gray-200 px-7 py-9 text-center transition-colors hover:border-gray-400"
                  >
                    <h3
                      className={`${playfair.className} text-[17px] leading-snug text-black`}
                    >
                      {f.title}
                    </h3>
                    <p
                      className={`${inter.className} mt-4 text-[13px] leading-relaxed text-gray-500`}
                    >
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <Link
                  href="#lead-form"
                  className={`${inter.className} inline-block bg-black px-12 py-5 text-[13px] font-normal uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-gray-800`}
                >
                  Work With Us
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════
          HOW IT WORKS — 3-step process
          ═══════════════════════════════════ */}
      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:py-40">
          <RevealSection className="text-center">
            <h2
              className={`${playfair.className} uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-black`}
            >
              How a 1031 Exchange Works
            </h2>
          </RevealSection>

          <RevealSection className="mt-20 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Sell the Relinquished Property",
                description:
                  "Execute sale agreements, assign them to your qualified intermediary, and ensure proceeds flow directly into escrow.",
                link: IRS_FORM_8824_LINK,
              },
              {
                step: "02",
                title: "Identify Replacements Within 45 Days",
                description:
                  "Document up to three properties or more under the 200 percent rule with traceable delivery to all parties.",
                link: IRS_LIKE_KIND_LINK,
              },
              {
                step: "03",
                title: "Close Within 180 Days",
                description:
                  "Complete financing, due diligence, and closing statements before the IRS deadline to secure tax deferral.",
                link: IRS_FORM_8824_LINK,
              },
            ].map((s) => (
              <div
                key={s.step}
                className="group bg-white px-10 py-14 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
              >
                <span
                  className={`${playfair.className} block text-[4rem] font-light leading-none text-gray-100 transition-colors group-hover:text-gray-200`}
                >
                  {s.step}
                </span>
                <h3
                  className={`${playfair.className} mt-8 text-[22px] leading-snug text-black`}
                >
                  {s.title}
                </h3>
                <p
                  className={`${inter.className} mt-5 text-[14px] leading-[1.8] text-gray-500`}
                >
                  {s.description}
                </p>
                <Link
                  href={s.link}
                  className={`${inter.className} mt-8 inline-block text-[13px] text-black underline underline-offset-4 decoration-gray-300 transition hover:decoration-black`}
                >
                  IRS Guidance &rarr;
                </Link>
              </div>
            ))}
          </RevealSection>

          <RevealSection className="mx-auto mt-20 max-w-3xl border-l-2 border-black bg-white px-10 py-8">
            <p
              className={`${inter.className} text-[14px] leading-[1.8] text-gray-600`}
            >
              Vacation and mixed-use properties may qualify under Rev. Proc.
              2008-16 safe harbor.{" "}
              <Link
                href={IRS_REV_PROC_2008_16_LINK}
                className="font-medium text-black underline underline-offset-4 decoration-gray-300 hover:decoration-black"
              >
                Review IRS Rev. Proc. 2008-16
              </Link>
              .
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SERVICES — numbered card grid
          ═══════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:py-40">
          <RevealSection className="text-center">
            <h2
              className={`${playfair.className} uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-black`}
            >
              Our Exchange Services
            </h2>
            <p
              className={`${inter.className} mx-auto mt-6 max-w-xl text-[15px] font-light leading-relaxed text-gray-500`}
            >
              Services designed for Colorado exchanges, from planning through
              final reporting.
            </p>
          </RevealSection>

          <RevealSection className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOP_SERVICES.map((svc, i) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group flex flex-col border border-gray-200 px-10 py-12 transition-all duration-300 hover:border-gray-400 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
              >
                <span
                  className={`${playfair.className} text-[3rem] font-light leading-none text-gray-100 group-hover:text-gray-200 transition-colors`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`${playfair.className} mt-6 text-[20px] leading-snug text-black`}
                >
                  {svc.title}
                </h3>
                <p
                  className={`${inter.className} mt-4 flex-grow text-[13px] leading-[1.8] text-gray-500`}
                >
                  {svc.description}
                </p>
                <span
                  className={`${inter.className} mt-8 text-[13px] text-black underline underline-offset-4 decoration-gray-300 group-hover:decoration-black transition`}
                >
                  Read More
                </span>
              </Link>
            ))}
          </RevealSection>

          <RevealSection className="mt-16 text-center">
            <Link
              href="/services"
              className={`${inter.className} inline-block border border-black px-12 py-5 text-[13px] font-normal uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-black hover:text-white`}
            >
              See All Services
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════
          PROPERTY TYPES — photo card grid
          ═══════════════════════════════════ */}
      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:py-40">
          <RevealSection className="text-center">
            <h2
              className={`${playfair.className} uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-black`}
            >
              Explore Property Types
            </h2>
          </RevealSection>

          <RevealSection className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {PROPERTY_TYPES.map((pt) => (
              <Link
                key={pt.slug}
                href={`/property-types/${pt.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={pt.image}
                    alt={pt.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  />
                </div>
                <h3
                  className={`${playfair.className} mt-7 text-[24px] leading-tight text-black`}
                >
                  {pt.title}
                </h3>
                <p
                  className={`${inter.className} mt-3 text-[14px] leading-[1.7] text-gray-500`}
                >
                  {pt.description}
                </p>
                <span
                  className={`${inter.className} mt-5 inline-block text-[13px] text-black underline underline-offset-4 decoration-gray-300 group-hover:decoration-black transition`}
                >
                  Read More
                </span>
              </Link>
            ))}
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════
          LOCATIONS — photo card grid
          Matches "Tour Our Most Desirable Neighborhoods"
          ═══════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:py-44">
          <RevealSection className="mx-auto max-w-3xl text-center">
            <h2
              className={`${playfair.className} uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] text-black`}
            >
              Tour Our Most Desirable
              <br className="hidden sm:block" />
              Service Areas
            </h2>
          </RevealSection>

          <RevealSection className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={loc.heroImage}
                    alt={loc.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  />
                </div>
                <h3
                  className={`${playfair.className} mt-7 text-[24px] leading-tight text-black`}
                >
                  {loc.name}
                </h3>
                <p
                  className={`${inter.className} mt-3 text-[14px] leading-[1.7] text-gray-500`}
                >
                  {loc.description}
                </p>
                <span
                  className={`${inter.className} mt-5 inline-block text-[13px] text-black underline underline-offset-4 decoration-gray-300 group-hover:decoration-black transition`}
                >
                  Read More
                </span>
              </Link>
            ))}
          </RevealSection>

          <RevealSection className="mt-16 text-center">
            <Link
              href="/locations"
              className={`${inter.className} inline-block border border-black px-12 py-5 text-[13px] font-normal uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-black hover:text-white`}
            >
              See All Locations
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════
          1031 EXCHANGE FACTS — all black background
          ═══════════════════════════════════ */}
      <section className="bg-black">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:py-40">
          <RevealSection className="text-center">
            <h2
              className={`${playfair.className} uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-white`}
            >
              1031 Exchange Facts
            </h2>
            <p
              className={`${inter.className} mx-auto mt-6 max-w-xl text-[15px] font-light leading-relaxed text-white/50`}
            >
              Key numbers every Colorado investor should know before starting an
              exchange.
            </p>
          </RevealSection>

          <RevealSection className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXCHANGE_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="group border border-white/10 px-10 py-12 transition-all duration-300 hover:border-white/30"
              >
                <span
                  className={`${playfair.className} block text-[3.5rem] font-light leading-none text-white`}
                >
                  {fact.stat}
                </span>
                <h3
                  className={`${playfair.className} mt-6 text-[18px] leading-snug text-white/90`}
                >
                  {fact.label}
                </h3>
                <p
                  className={`${inter.className} mt-4 text-[13px] leading-[1.8] text-white/50`}
                >
                  {fact.description}
                </p>
              </div>
            ))}
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════
          TOOLS — icon grid
          ═══════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:py-40">
          <RevealSection className="text-center">
            <h2
              className={`${playfair.className} uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-black`}
            >
              Free Exchange Tools
            </h2>
            <p
              className={`${inter.className} mx-auto mt-6 max-w-xl text-[15px] font-light leading-relaxed text-gray-500`}
            >
              Interactive calculators to model your exchange before you commit.
            </p>
          </RevealSection>

          <RevealSection className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Boot Calculator",
                description:
                  "Calculate boot (cash received, mortgage relief) and estimate tax implications for your exchange.",
                href: "/tools/boot-calculator",
              },
              {
                title: "Exchange Cost Estimator",
                description:
                  "Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs.",
                href: "/tools/exchange-cost-estimator",
              },
              {
                title: "Identification Rules Checker",
                description:
                  "Validate your replacement property identification against the 3-property, 200%, or 95% rules.",
                href: "/tools/identification-rules-checker",
              },
              {
                title: "Depreciation Recapture Estimator",
                description:
                  "Estimate depreciation recapture tax on your relinquished property and understand 1031 deferral benefits.",
                href: "/tools/depreciation-recapture-estimator",
              },
              {
                title: "Replacement Value Calculator",
                description:
                  "Calculate the minimum replacement property value needed to defer all gain in your exchange.",
                href: "/tools/replacement-property-value-calculator",
              },
              {
                title: "Debt Relief Calculator",
                description:
                  "Calculate mortgage boot when new debt is less than old debt and understand tax implications.",
                href: "/tools/debt-relief-calculator",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col border border-gray-200 px-10 py-12 transition-all duration-300 hover:border-gray-400 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
              >
                <h3
                  className={`${playfair.className} text-[20px] leading-snug text-black`}
                >
                  {tool.title}
                </h3>
                <p
                  className={`${inter.className} mt-4 flex-grow text-[13px] leading-[1.8] text-gray-500`}
                >
                  {tool.description}
                </p>
                <span
                  className={`${inter.className} mt-8 text-[13px] text-black underline underline-offset-4 decoration-gray-300 group-hover:decoration-black transition`}
                >
                  Use Tool
                </span>
              </Link>
            ))}
          </RevealSection>

          <RevealSection className="mt-16 text-center">
            <Link
              href="/tools"
              className={`${inter.className} inline-block border border-black px-12 py-5 text-[13px] font-normal uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-black hover:text-white`}
            >
              View All Tools
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════
          RESOURCES
          ═══════════════════════════════════ */}
      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:py-36">
          <RevealSection className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Capital Gains Estimator",
                description:
                  "Model potential capital gains exposure and evaluate the deferral impact before you list.",
                href: "/resources/calculator",
              },
              {
                title: "Timeline Reminders",
                description:
                  "Subscribe to 45-day identification and 180-day closing alerts tailored to your transaction milestones.",
                href: "/resources/timeline",
              },
            ].map((r) => (
              <div
                key={r.href}
                className="group flex h-full flex-col bg-white px-12 py-14 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
              >
                <h3
                  className={`${playfair.className} text-[26px] leading-tight text-black`}
                >
                  {r.title}
                </h3>
                <p
                  className={`${inter.className} mt-5 flex-grow text-[14px] leading-[1.8] text-gray-500`}
                >
                  {r.description}
                </p>
                <Link
                  href={r.href}
                  className={`${inter.className} mt-8 text-[13px] text-black underline underline-offset-4 decoration-gray-300 hover:decoration-black transition`}
                >
                  Open Resource
                </Link>
              </div>
            ))}
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FAQ — clean accordion
          ═══════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[800px] px-6 py-32 md:px-12 lg:py-40">
          <RevealSection className="text-center">
            <h2
              className={`${playfair.className} uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-black`}
            >
              Frequently Asked Questions
            </h2>
          </RevealSection>

          <RevealSection className="mt-16 divide-y divide-gray-200">
            {FAQ_ENTRIES.map((item) => (
              <details key={item.question} className="group">
                <summary
                  className={`flex cursor-pointer items-center justify-between gap-6 py-7 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black`}
                >
                  <span
                    className={`${playfair.className} text-[18px] leading-snug text-black group-open:text-gray-500 transition-colors`}
                  >
                    {item.question}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-gray-200 text-gray-300 transition-all group-open:border-black group-open:bg-black group-open:text-white">
                    <svg
                      className="h-4 w-4 transition-transform group-open:rotate-45"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </summary>
                <div
                  className={`${inter.className} pb-7 pr-16 text-[14px] leading-[1.8] text-gray-500`}
                >
                  {item.answer}
                </div>
              </details>
            ))}
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════
          DISCLAIMER
          ═══════════════════════════════════ */}
      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-3xl px-6 py-16 md:px-12">
          <div className="border-l-2 border-black bg-white px-10 py-8">
            <p
              className={`${inter.className} text-[13px] leading-[1.8] text-gray-500`}
            >
              A 1031 exchange defers federal and Colorado state income tax on
              qualifying real property. It does not remove county transfer or
              recording fees.{" "}
              <Link
                href={CO_TRANSFER_TAX_LINK}
                className="font-medium text-black underline underline-offset-4 decoration-gray-300 hover:decoration-black"
              >
                Review Colorado transfer fee guidance
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          LEAD FORM — dark section with white form card
          ═══════════════════════════════════ */}
      <section className="relative overflow-hidden bg-black" id="lead-form-section">
        <div className="relative z-10 mx-auto grid max-w-[1400px] gap-16 px-6 py-32 md:grid-cols-2 md:px-12 lg:py-44">
          <RevealSection className="flex flex-col justify-center">
            <h2
              className={`${playfair.className} uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-white`}
            >
              Start Your
              <br />
              1031 Exchange
            </h2>
            <p
              className={`${inter.className} mt-8 max-w-md text-[15px] font-light leading-[1.8] text-white/50`}
            >
              Share your transaction goals and we will coordinate the qualified
              intermediary, attorney, and timeline. A Denver 1031 exchange
              advisor will respond within one business day.
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href={`tel:${PHONE_TEL}`}
                className={`${inter.className} inline-flex items-center justify-center border border-white/40 px-10 py-5 text-[13px] font-normal uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-black`}
              >
                Call {PHONE_DISPLAY}
              </Link>
            </div>
          </RevealSection>

          <RevealSection as="div" className="bg-white px-10 py-14 md:px-14">
            <h3
              id="lead-form"
              className={`${playfair.className} text-[28px] leading-tight text-black`}
            >
              Request a Consultation
            </h3>
            <p
              className={`${inter.className} mt-3 text-[14px] leading-relaxed text-gray-500`}
            >
              Complete the form below and we will confirm timelines, qualified
              intermediary fit, and documentation requirements.
            </p>
            <div className="mt-10 border-t border-gray-100 pt-8">
              <LeadForm />
            </div>
          </RevealSection>
        </div>
      </section>
    <ExchangeIntentSection /></>
  );
}
