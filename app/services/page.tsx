import type { Metadata } from "next";
import { servicesData } from "@/data/services";
import BottomCTA from "@/components/BottomCTA";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchPanel } from "@/components/search/SearchPanel";

export const metadata: Metadata = {
  title: "1031 Exchange Services | 1031 Exchange Denver",
  description:
    "Detailed 1031 exchange services for Denver investors. Identification, underwriting, intermediary coordination, and reporting support.",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/services",
  },
};

export default function ServicesPage() {
  const itemsWithLabels = servicesData.map((service) => ({
    ...service,
    label: service.name,
    href: `/services/${service.slug}`,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
          Exchange Operations
        </p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          1031 exchange services for Denver investors
        </h1>
        <p className="text-base text-slate-300">
          Every service aligns with IRS timelines, intermediary procedures, and
          Colorado market realities. Use the search field to jump directly to a
          service or request a consultation if you need a custom scope.
        </p>
      </div>

      <div className="mt-12">
        <SearchPanel
          items={itemsWithLabels}
          type="service"
          emptyTitle="Need a different 1031 support path?"
          emptyDescription="Tell us what you are trying to identify and we will route you to the correct specialist."
        />
      </div>
      <BottomCTA />
    </div>
  );
}

