import type { Metadata } from "next";
import { locationsData } from "@/data/locations";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchPanel } from "@/components/search/SearchPanel";
import BottomCTA from "@/components/BottomCTA";

export const metadata: Metadata = {
  title: "1031 Exchange Locations | 1031 Exchange Denver",
  description:
    "Explore Denver metro 1031 exchange coverage. Neighborhood intelligence, nearby FAQs, and rapid contact options.",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/locations",
  },
};

export default function LocationsPage() {
  const itemsWithLabels = locationsData.map((location) => ({
    ...location,
    label: location.name,
    href: `/locations/${location.slug}`,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Locations" },
        ]}
      />
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
          Metro Coverage
        </p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          1031 exchange locations around Denver
        </h1>
        <p className="text-base text-slate-300">
          Search cities, suburbs, and business districts served by our 1031
          exchange desk. Each page outlines FAQs, locally relevant services,
          and a quick path to secure intake if your location does not appear.
        </p>
      </div>
      <div className="mt-12">
        <SearchPanel
          items={itemsWithLabels}
          type="location"
          emptyTitle="Need help outside this list?"
          emptyDescription="Send us your target market and we will coordinate remote sourcing support."
        />
      </div>
      <BottomCTA />
    </div>
  );
}

