"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { buildContactHref } from "@/lib/routing";
import { ServiceCard } from "./ServiceCard";
import { LocationCard } from "./LocationCard";
import { PropertyCard } from "./PropertyCard";
import type { ServiceItem } from "@/data/types";
import type { LocationItem } from "@/data/types";
import type { PropertyTypeItem } from "@/data/types";

type SearchItem = 
  | (ServiceItem & { label: string; href: string })
  | (LocationItem & { label: string; href: string })
  | (PropertyTypeItem & { label: string; href: string });

type SearchPanelProps = {
  items: SearchItem[];
  type: "service" | "location" | "property";
  emptyTitle: string;
  emptyDescription: string;
  fallbackPrefill?: (query: string) => string;
};

export function SearchPanel({
  items,
  type,
  emptyTitle,
  emptyDescription,
  fallbackPrefill,
}: SearchPanelProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) {
      return items;
    }

    const normalized = query.trim().toLowerCase();
    const matches = items.filter((item) =>
      item.label.toLowerCase().includes(normalized)
    );

    return matches.sort((a, b) => {
      const aExact = a.label.toLowerCase() === normalized ? 0 : 1;
      const bExact = b.label.toLowerCase() === normalized ? 0 : 1;
      return aExact - bExact;
    });
  }, [items, query]);

  const exactMatchHref = useMemo(() => {
    if (!query) return null;
    const normalized = query.trim().toLowerCase();
    const exact = items.find(
      (item) => item.label.toLowerCase() === normalized
    );
    return exact ? exact.href : null;
  }, [items, query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (exactMatchHref) {
      router.push(exactMatchHref);
      return;
    }

    const fallbackValue =
      fallbackPrefill?.(query) ??
      (query || (type === "location" ? "Other" : ""));
    router.push(buildContactHref(fallbackValue || "Other"));
  };

  const handleClear = () => setQuery("");

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur"
      >
        <label
          htmlFor={`search-${type}`}
          className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300"
        >
          Search {type === "property" ? "property types" : `${type}s`}
        </label>
        <div className="relative">
          <input
            id={`search-${type}`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${type}s`}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200/40"
          />
          {query ? (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Clear search"
            >
              Clear
            </button>
          ) : null}
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{filtered.length} result{filtered.length === 1 ? "" : "s"}</span>
          <button
            type="submit"
            className="text-amber-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {exactMatchHref ? "Open match" : "Contact us"}
          </button>
        </div>
      </form>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            if (type === "service") {
              return (
                <ServiceCard
                  key={item.label}
                  service={item as ServiceItem & { label: string; href: string }}
                />
              );
            } else if (type === "location") {
              return (
                <LocationCard
                  key={item.label}
                  location={item as LocationItem & { label: string; href: string }}
                />
              );
            } else {
              return (
                <PropertyCard
                  key={item.label}
                  propertyType={item as PropertyTypeItem & { label: string; href: string }}
                />
              );
            }
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
          <p className="text-base font-semibold text-white">{emptyTitle}</p>
          <p className="mt-2 text-slate-400">{emptyDescription}</p>
          <button
            type="button"
            onClick={() =>
              router.push(buildContactHref(query || "Other"))
            }
            className="mt-4 inline-flex items-center rounded-full bg-amber-300 px-4 py-2 text-xs font-semibold tracking-[0.28em] text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            CONTACT TEAM
          </button>
        </div>
      )}
    </div>
  );
}

