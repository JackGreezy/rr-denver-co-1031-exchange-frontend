import Link from "next/link";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";

const BRAND_NAME = "1031 Exchange Denver";
const PHONE_DISPLAY = "(720) 738-1031";
const PHONE_TEL = "+17207381031";
const EMAIL = "team@1031exchangedenver.com";
const IRS_FORM_8824_LINK = "https://www.irs.gov/forms-pubs/about-form-8824";
const IRS_LIKE_KIND_LINK =
  "https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips";
const IRS_REV_PROC_2008_16_LINK =
  "https://www.irs.gov/pub/irs-drop/rp-08-16.pdf";

const tools = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

const mainServices = servicesData.filter((s) => 
  s.category === "Property Paths" || s.slug === "replacement-property-identification"
).slice(0, 7);

const mainLocations = [
  locationsData.find((l) => l.slug === "denver-co"),
  ...locationsData.filter((l) => 
    l.type === "city" && l.slug !== "denver-co"
  ).slice(0, 7)
].filter((loc): loc is NonNullable<typeof loc> => loc !== undefined);

export default function Footer() {
  return (
    <footer className="bg-[#16324F] text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 md:grid md:grid-cols-5 md:gap-12 md:px-8">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#DAA520]">
            {BRAND_NAME}
          </span>
          <p className="text-2xl font-serif">
            Rocky Mountain Equity
          </p>
          <p className="text-sm text-slate-200">
            Trusted Colorado 1031 intermediary coordination, tax documentation, and statewide transaction management.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#DAA520]">
            Services
          </p>
          {mainServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="text-sm text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {service.name}
            </Link>
          ))}
          <Link
            href="/services"
            className="text-sm text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            View All {servicesData.length} Services →
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#DAA520]">
            Service Areas
          </p>
          {mainLocations.map((location) => (
            <Link
              key={location.slug}
              href={`/service-areas/${location.slug}`}
              className="text-sm text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {location.name}
            </Link>
          ))}
          <Link
            href="/service-areas"
            className="text-sm text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            View All {locationsData.length} Service Areas →
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#DAA520]">
            Tools
          </p>
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="text-sm text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {tool.name}
            </Link>
          ))}
          <Link
            href="/tools"
            className="text-sm text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            View All Tools →
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#DAA520]">
            Contact
          </p>
          <Link
            href={`tel:${PHONE_TEL}`}
            className="text-sm text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Call {PHONE_DISPLAY}
          </Link>
          <Link
            href={`mailto:${EMAIL}`}
            className="text-sm text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {EMAIL}
          </Link>
          <p className="text-sm text-slate-200">
            Statewide service with Denver headquarters available by appointment.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#DAA520]">
              Compliance
            </p>
            <Link
              href={IRS_FORM_8824_LINK}
              className="text-sm text-slate-100 underline decoration-2 underline-offset-4 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              IRS Form 8824
            </Link>
            <Link
              href={IRS_LIKE_KIND_LINK}
              className="text-sm text-slate-100 underline decoration-2 underline-offset-4 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              IRS Like-Kind Property Rules
            </Link>
            <Link
              href={IRS_REV_PROC_2008_16_LINK}
              className="text-sm text-slate-100 underline decoration-2 underline-offset-4 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Rev. Proc. 2008-16
            </Link>
            <p className="text-xs text-slate-300 mt-2">
              Information provided is for educational purposes. Consult your tax advisor and attorney before executing a 1031 exchange.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-slate-300 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
            <span>·</span>
            <Link href="/sitemap.xml" className="hover:text-white transition">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

