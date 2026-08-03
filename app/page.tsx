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

/* ─────────── Content arrays ─────────── */

const WHY_CHOOSE_FEATURES: Feature[] = [
  {
    title: "Start Before the Property Sells",
    description:
      "Organize the sale, independent qualified intermediary introduction, replacement criteria, and backup options before the exchange clock begins.",
  },
  {
    title: "Get a Free Property List",
    description:
      "Review direct real estate, net-lease opportunities, and professionally managed DST options that fit the sale objective.",
  },
  {
    title: "Compare Active and Passive Ownership",
    description:
      "Compare control, management responsibility, income objectives, financing, liquidity, concentration, fees, and property-level risk.",
  },
  {
    title: "Move Toward Replacement Closing",
    description:
      "Keep the owner, QI, CPA, attorney, brokers, lenders, and closing professionals working from the same transaction plan.",
  },
];

const TOP_SERVICES: ServiceCard[] = [
  {
    title: "Turnkey Exchange Solutions",
    description:
      "Build one practical plan around the property sale, exchange timeline, replacement criteria, professional team, and closing path.",
    slug: "exchange-strategy-consultation",
  },
  {
    title: "Replacement Property Search",
    description:
      "Search Denver, Colorado, and nationwide opportunities against equity, debt, income, control, workload, and closing requirements.",
    slug: "replacement-property-identification",
  },
  {
    title: "DST and Passive Property Options",
    description:
      "Explore professionally managed replacement options when another property with tenants, repairs, and leasing no longer fits.",
    slug: "dst-placement-coordination",
  },
  {
    title: "Qualified Intermediary Introduction",
    description:
      "Connect with an independent qualified intermediary before closing and keep the exchange handoff visible to the transaction team.",
    slug: "qualified-intermediary-coordination",
  },
  {
    title: "Inherited Investment Property",
    description:
      "Organize ownership, basis, property-use, co-owner, sale-timing, and replacement questions before accepting an offer.",
    slug: "inherited-property-capital-gains",
  },
  {
    title: "Landlord Exit and Management Relief",
    description:
      "Use the sale to compare lower-management real estate paths without losing sight of risk, liquidity, control, or tax questions.",
    slug: "passive-real-estate-income",
  },
];

const OWNERSHIP_PATHS = [
  {
    title: "Direct Replacement Property",
    description:
      "Keep control through another directly owned property selected around market, condition, financing, tenants, management capacity, and closing certainty.",
    href: "/services/replacement-property-identification",
    image: "/inventory/multifamily/multifamily.jpg",
  },
  {
    title: "Net-Lease Property",
    description:
      "Compare tenant credit, lease obligations, remaining term, property condition, residual value, financing, and the future reletting market.",
    href: "/services/nnn-stnl-property-sourcing",
    image: "/inventory/retail/retail.jpg",
  },
  {
    title: "Professionally Managed DST",
    description:
      "Explore passive fractional ownership in institutional-grade real estate without personally managing tenants, maintenance, leasing, or renovations.",
    href: "/services/dst-placement-coordination",
    image: "/inventory/industrial/industrial.jpeg",
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
    question: "Can you help with my entire Denver 1031 exchange?",
    answer:
      "Yes. We help Denver property owners organize the sale plan, connect with an independent qualified intermediary, build replacement criteria, compare direct and passive property options, and keep open transaction questions visible through replacement closing.",
  },
  {
    question: "How early should I call before selling?",
    answer:
      "Call before the sale closes and ideally before accepting an offer. Starting early creates time to engage an independent qualified intermediary, clarify ownership and tax questions with your advisors, estimate exchange equity and debt, and begin reviewing realistic replacement paths.",
  },
  {
    question: "Can I exchange a Denver property into real estate outside Colorado?",
    answer:
      "Potential replacement property can be located elsewhere in the United States when it otherwise fits the exchange and the owner’s plan. We can help compare Denver-area and nationwide opportunities against the same income, management, financing, and closing criteria.",
  },
  {
    question: "What is a DST replacement property?",
    answer:
      "A Delaware statutory trust can hold institutional real estate and offer eligible investors fractional beneficial interests. The sponsor manages the property, but the investor gives up day-to-day control and must review offering documents, fees, leverage, sponsor risk, property risk, liquidity limits, eligibility, and suitability.",
  },
  {
    question: "Can a DST eliminate day-to-day property management?",
    answer:
      "A DST is professionally managed, so an investor does not personally handle tenants, toilets, leasing, maintenance, or renovations. That convenience also means the sponsor controls property operations and major decisions.",
  },
  {
    question: "What is the typical minimum investment for a DST?",
    answer:
      "Some DST offerings may accept investments beginning around $100,000, but minimums and availability vary. Investment amount, investor eligibility, projected distributions, fees, leverage, risks, and suitability must be evaluated for each current offering.",
  },
  {
    question: "Should I choose direct property, a net-lease property, or a DST?",
    answer:
      "The right path depends on the control you want, the work you are willing to perform, income objectives, financing, concentration, liquidity needs, risk tolerance, and closing probability. We help place the alternatives beside the same sale objective so the differences are easier to evaluate with your advisors.",
  },
  {
    question: "Can you help after I inherit investment property?",
    answer:
      "Yes. Before the property is listed or placed under contract, organize title, ownership, basis questions, qualifying use, co-owner goals, existing debt, management burden, and sale timing with the appropriate CPA and attorney. That information determines which paths deserve consideration.",
  },
  {
    question: "Can I request a current list of replacement properties?",
    answer:
      "Yes. Submit the short contact form to request a current list of direct, net-lease, and passive replacement opportunities that may fit the facts and objectives of your planned Denver property sale.",
  },
];

/* ─────────── SEO / Metadata ─────────── */

export const metadata: Metadata = {
  title:
    "1031 Exchange Denver | Turnkey Exchange Solutions",
  description:
    "Get turnkey 1031 exchange help in Denver. Compare direct property, net-lease and DST options, request a free property list, or call (303) 835-0981.",
  alternates: { canonical: "https://www.1031exchangedenver.com/" },
  openGraph: {
    title: "1031 Exchange Denver | Turnkey Exchange Solutions",
    description:
      "Get turnkey 1031 exchange help in Denver. Compare direct property, net-lease and DST options, request a free property list, or call (303) 835-0981.",
    url: "https://www.1031exchangedenver.com/",
    siteName: "1031 Exchange Denver",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1031 Exchange Denver | Turnkey Exchange Solutions",
    description:
      "Get turnkey 1031 exchange help in Denver. Compare direct property, net-lease and DST options, request a free property list, or call (303) 835-0981.",
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
          <p
            className={`${inter.className} mb-7 text-[12px] font-medium uppercase tracking-[0.28em] text-white/75 sm:text-[13px]`}
          >
            One Call. One Complete Exchange Plan.
          </p>
          <h1
            className={`${playfair.className} uppercase text-[clamp(2.35rem,6.4vw,6rem)] font-normal leading-[1.03] tracking-[-0.01em] text-white`}
          >
            Turnkey 1031 Exchange
            <br />{" "}
            Solutions in Denver, CO
          </h1>
          <p
            className={`${inter.className} mx-auto mt-8 max-w-3xl text-[15px] font-light leading-[1.8] text-white/75 sm:text-[16px]`}
          >
            Selling investment property in Denver? Get help planning the sale,
            engaging an independent qualified intermediary, comparing direct
            and passive replacement properties, and moving toward replacement
            closing.
          </p>
          <div className="mx-auto mt-8 grid max-w-3xl gap-x-10 gap-y-3 text-left sm:grid-cols-2">
            {[
              "Get a free list of replacement properties",
              "Compare direct, net-lease, and DST options",
              "Leave tenants, maintenance, and leasing behind",
              "Explore institutional-grade property opportunities",
            ].map((benefit) => (
              <div
                key={benefit}
                className={`${inter.className} flex items-start gap-3 text-[13px] leading-relaxed text-white/80 sm:text-[14px]`}
              >
                <span className="mt-[0.65em] h-px w-5 shrink-0 bg-white/60" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#lead-form"
              className={`${inter.className} inline-flex min-w-[250px] items-center justify-center bg-white px-10 py-5 text-[12px] font-medium uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-white/85`}
            >
              Start My Exchange
            </Link>
            <Link
              href={`tel:${PHONE_TEL}`}
              className={`${inter.className} inline-flex min-w-[250px] flex-col items-center justify-center gap-1 border border-white/60 px-10 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-white hover:text-black sm:flex-row sm:gap-2 sm:py-5 sm:text-[12px]`}
            >
              <span>Talk to an Expert</span>
              {" "}
              <span>{PHONE_DISPLAY}</span>
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
              <p
                className={`${inter.className} mb-5 text-[12px] font-medium uppercase tracking-[0.24em] text-gray-500`}
              >
                Complete Exchange Solutions
              </p>
              <h2
                className={`${playfair.className} uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-black`}
              >
                One Call Can Put the Entire Exchange in Motion
              </h2>
              <p
                className={`${inter.className} mt-7 max-w-xl text-[15px] leading-[1.8] text-gray-500`}
              >
                You should not have to independently figure out the sale,
                qualified intermediary, replacement search, DST alternatives,
                financing, diligence, advisor questions, and closing schedule.
                We help turn those moving pieces into one practical Denver
                exchange plan.
              </p>
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
                  Get Free Exchange Guidance
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════
          OWNERSHIP PATHS — direct, net lease, and DST
          ═══════════════════════════════════ */}
      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:py-40">
          <RevealSection className="mx-auto max-w-4xl text-center">
            <p
              className={`${inter.className} mb-5 text-[12px] font-medium uppercase tracking-[0.24em] text-gray-500`}
            >
              Change the Property. Change the Workload.
            </p>
            <h2
              className={`${playfair.className} uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-black`}
            >
              Done With Tenants, Repairs, and Property Management?
            </h2>
            <p
              className={`${inter.className} mx-auto mt-7 max-w-3xl text-[15px] leading-[1.8] text-gray-500`}
            >
              A Denver property sale can be more than a tax decision. It can be
              the moment an owner leaves leasing, vendor calls, renovations,
              vacancies, and day-to-day landlord work behind. Compare the
              ownership paths against the life and income objectives the sale
              is meant to serve.
            </p>
          </RevealSection>

          <RevealSection className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-3">
            {OWNERSHIP_PATHS.map((path) => (
              <Link
                key={path.title}
                href={path.href}
                className="group block"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={path.image}
                    alt={path.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <h3
                  className={`${playfair.className} mt-7 text-[24px] leading-tight text-black`}
                >
                  {path.title}
                </h3>
                <p
                  className={`${inter.className} mt-4 text-[14px] leading-[1.8] text-gray-500`}
                >
                  {path.description}
                </p>
                <span
                  className={`${inter.className} mt-8 inline-block text-[13px] text-black underline underline-offset-4 decoration-gray-300 transition hover:decoration-black`}
                >
                  Explore This Path
                </span>
              </Link>
            ))}
          </RevealSection>

          <RevealSection className="mx-auto mt-16 max-w-4xl border-l-2 border-black bg-white px-8 py-8 md:px-10">
            <p
              className={`${inter.className} text-[14px] leading-[1.8] text-gray-600`}
            >
              Some DST offerings may begin around $100,000. Current inventory,
              projected distributions, sponsor and asset risk, fees, leverage,
              illiquidity, investor eligibility, and suitability vary by
              offering.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact?request=properties"
                className={`${inter.className} inline-flex items-center justify-center bg-black px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-gray-800`}
              >
                Get a Free Property List
              </Link>
              <Link
                href={`tel:${PHONE_TEL}`}
                className={`${inter.className} inline-flex items-center justify-center border border-black px-8 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white`}
              >
                Free Consultation {PHONE_DISPLAY}
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════
          HOW IT WORKS — unnumbered exchange stages
          ═══════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:py-40">
          <RevealSection className="mx-auto max-w-3xl text-center">
            <h2
              className={`${playfair.className} uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-black`}
            >
              How a 1031 Exchange Moves Forward
            </h2>
            <p
              className={`${inter.className} mx-auto mt-7 max-w-2xl text-[15px] leading-[1.8] text-gray-500`}
            >
              The rules matter, but owners usually need a clear plan for the
              sale, professional handoffs, replacement decisions, and closing.
            </p>
          </RevealSection>

          <RevealSection className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Before You Sell",
                description:
                  "Clarify ownership, property use, expected equity, debt, tax and legal questions, management goals, and replacement criteria before the proceeds are at risk.",
              },
              {
                title: "Once Under Contract",
                description:
                  "Engage an independent qualified intermediary, confirm closing instructions, align the transaction calendar, and prepare the replacement search.",
              },
              {
                title: "During the Property Search",
                description:
                  "Compare primary and backup candidates for income objectives, financing, diligence, control, workload, risk, and realistic closing probability.",
              },
              {
                title: "Through Replacement Closing",
                description:
                  "Keep title, lender, insurance, inspection, entity, funding, advisor, and closing questions visible until the replacement acquisition is complete.",
              },
            ].map((stage) => (
              <div
                key={stage.title}
                className="border border-gray-200 bg-[#fafafa] px-9 py-12 transition-all duration-300 hover:border-gray-400 hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
              >
                <h3
                  className={`${playfair.className} text-[21px] leading-snug text-black`}
                >
                  {stage.title}
                </h3>
                <p
                  className={`${inter.className} mt-5 text-[13px] leading-[1.8] text-gray-500`}
                >
                  {stage.description}
                </p>
              </div>
            ))}
          </RevealSection>

          <RevealSection className="mt-16 text-center">
            <p
              className={`${playfair.className} text-[24px] leading-snug text-black`}
            >
              Is this your first exchange? We can walk you through it.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`tel:${PHONE_TEL}`}
                className={`${inter.className} inline-flex min-w-[250px] items-center justify-center bg-black px-8 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-gray-800`}
              >
                Talk to an Expert {PHONE_DISPLAY}
              </Link>
              <Link
                href="#lead-form"
                className={`${inter.className} inline-flex min-w-[250px] items-center justify-center border border-black px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-black transition hover:bg-black hover:text-white`}
              >
                Start My Exchange
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SERVICES — customer-facing exchange solutions
          ═══════════════════════════════════ */}
      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:py-40">
          <RevealSection className="text-center">
            <h2
              className={`${playfair.className} uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-black`}
            >
              Denver 1031 Exchange Solutions
            </h2>
            <p
              className={`${inter.className} mx-auto mt-7 max-w-3xl text-[15px] font-light leading-[1.8] text-gray-500`}
            >
              Denver owners sell for different reasons: too much management,
              rising capital needs, concentrated equity, retirement, an
              inherited property, or a change in income goals. Start with that
              reason, then build the exchange around the property sale and the
              replacement path that actually fits.
            </p>
          </RevealSection>

          <RevealSection className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOP_SERVICES.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group flex flex-col border border-gray-200 bg-white px-10 py-12 transition-all duration-300 hover:border-gray-400 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
              >
                <h3
                  className={`${playfair.className} text-[21px] leading-snug text-black`}
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
              href="/contact?request=guide"
              className={`${inter.className} inline-block border border-black px-12 py-5 text-[13px] font-normal uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-black hover:text-white`}
            >Get Free Denver 1031 Information</Link>
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

          <RevealSection className="mt-16 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <Link
              href="/locations"
              className={`${inter.className} inline-block border border-black px-12 py-5 text-[13px] font-normal uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-black hover:text-white`}
            >
              See All Locations
            </Link>
            <Link
              href="/contact?request=properties"
              className={`${inter.className} inline-block bg-black px-12 py-5 text-[13px] font-normal uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-gray-800`}
            >
              Get a Free Property List
            </Link>
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
                title: "Replacement Value Calculator",
                description:
                  "Calculate the minimum replacement property value needed to defer all gain in your exchange.",
                href: "/tools/replacement-property-value-calculator",
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

          <RevealSection className="mt-16 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <Link
              href="/contact?request=properties"
              className={`${inter.className} inline-block bg-black px-12 py-5 text-[13px] font-normal uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-gray-800`}
            >Request the Denver Property List</Link>
            <Link
              href="/tools"
              className={`${inter.className} inline-block border border-black px-12 py-5 text-[13px] font-normal uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-black hover:text-white`}
            >View All Exchange Tools</Link>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════
          PROPERTY LIST CTA
          ═══════════════════════════════════ */}
      <section className="bg-black">
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center md:px-12 lg:py-28">
          <RevealSection>
            <p
              className={`${inter.className} text-[12px] font-medium uppercase tracking-[0.26em] text-white/55`}
            >
              Direct Property. Net Lease. DST.
            </p>
            <h2
              className={`${playfair.className} mx-auto mt-5 max-w-4xl uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-white`}
            >
              See Replacement Properties Before the Exchange Clock Controls the Search
            </h2>
            <p
              className={`${inter.className} mx-auto mt-7 max-w-2xl text-[15px] leading-[1.8] text-white/60`}
            >
              Request a current property list and tell us what the Denver sale
              needs to accomplish. We will help narrow the conversation around
              ownership, income, management, financing, risk, and timing.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact?request=properties"
                className={`${inter.className} inline-flex min-w-[250px] items-center justify-center bg-white px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-black transition hover:bg-white/85`}
              >
                Get a Free Property List
              </Link>
              <Link
                href={`tel:${PHONE_TEL}`}
                className={`${inter.className} inline-flex min-w-[250px] items-center justify-center border border-white/50 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black`}
              >
                Call {PHONE_DISPLAY}
              </Link>
            </div>
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
          LEAD FORM — dark section with white form card
          ═══════════════════════════════════ */}
      <section className="relative overflow-hidden bg-black" id="lead-form-section">
        <div className="relative z-10 mx-auto grid max-w-[1400px] gap-16 px-6 py-32 md:grid-cols-2 md:px-12 lg:py-44">
          <RevealSection className="flex flex-col justify-center">
            <h2
              className={`${playfair.className} uppercase text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-white`}
            >
              Get Free Denver
              <br />
              Exchange Guidance
            </h2>
            <p
              className={`${inter.className} mt-8 max-w-md text-[15px] font-light leading-[1.8] text-white/50`}
            >
              Tell us what you are selling and what you want the exchange to
              accomplish. A Denver 1031 specialist will contact you to discuss
              the sale, replacement-property options, and practical next steps.
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
              Start My Exchange
            </h3>
            <p
              className={`${inter.className} mt-3 text-[14px] leading-relaxed text-gray-500`}
            >
              Complete the short form for free exchange guidance and a clearer
              starting point for the sale and replacement search.
            </p>
            <div className="mt-10 border-t border-gray-100 pt-8">
              <LeadForm />
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
