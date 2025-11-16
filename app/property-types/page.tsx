import type { Metadata } from "next";
import { propertyTypesData } from "@/data/property-types";
import BottomCTA from "@/components/BottomCTA";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchPanel } from "@/components/search/SearchPanel";

export const metadata: Metadata = {
  title: "1031 Exchange Property Types | 1031 Exchange Denver",
  description:
    "Review replacement property types for Colorado exchanges. Multifamily, industrial, medical, retail, and land options with underwriting support.",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/property-types",
  },
};

export default function PropertyTypesPage() {
  const itemsWithLabels = propertyTypesData.map((propertyType) => ({
    ...propertyType,
    label: propertyType.name,
    href: `/property-types/${propertyType.slug}`,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Property Types" },
        ]}
      />
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
          Replacement Inventory
        </p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          Compare 1031 replacement property classes
        </h1>
        <p className="text-base text-slate-300">
          Filter by property type to evaluate identification fit, underwriting
          implications, and timeline risk. The search bar jumps directly to the
          property page or routes you to intake if you need a different asset.
        </p>
      </div>
      <div className="mt-12">
        <SearchPanel
          items={itemsWithLabels}
          type="property"
          emptyTitle="Need guidance on a different property class?"
          emptyDescription="Enter the asset type you are pursuing and we will assign an underwriter to review it."
        />
      </div>
      <BottomCTA />
    </div>
  );
}

