"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { LocationItem } from "@/data/types";
import { buildContactHref } from "@/lib/routing";

type HomeLocationSearchProps = {
  cards: Array<{
    name: string;
    description: string;
    slug: string;
    heroImage?: string;
  }>;
  locations: LocationItem[];
};

export function HomeLocationSearch({ cards, locations }: HomeLocationSearchProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const displayLocations = useMemo(() => {
    if (!query.trim()) {
      return cards;
    }
    const normalized = query.toLowerCase();
    return locations
      .filter((location) => location.name.toLowerCase().includes(normalized))
      .slice(0, 8)
      .map((location) => ({
        name: location.name,
        description: "View 1031 exchange services",
        slug: location.slug,
        heroImage: location.heroImage,
      }));
  }, [cards, locations, query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) {
      router.push(buildContactHref("Other"));
      return;
    }
    const exact = locations.find(
      (location) => location.name.toLowerCase() === query.toLowerCase().trim()
    );
    if (exact) {
      router.push(`/locations/${exact.slug}`);
      return;
    }
    router.push(buildContactHref("Other"));
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4"
      >
        <label
          htmlFor="home-location-search"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300"
        >
          Search service areas
        </label>
        <div className="flex gap-2">
          <input
            id="home-location-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Denver Tech Center, Cherry Creek..."
            className="flex-1 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200/40"
          />
          <button
            type="submit"
            className="rounded-2xl bg-amber-300 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900"
          >
            Go
          </button>
        </div>
      </form>
      {displayLocations.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4 text-sm text-white">
          <p className="font-semibold">We can help with “{query}”</p>
          <p className="mt-2 text-slate-300">
            Submit the request and we will assign an advisor.
          </p>
          <Link
            href={buildContactHref("Other")}
            className="mt-4 inline-flex items-center rounded-full bg-amber-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900"
          >
            Contact team
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {displayLocations.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left text-white transition hover:-translate-y-1 hover:border-amber-200/40 hover:bg-white/10"
            >
              {location.heroImage && (
                <div className="relative h-32 w-full">
                  <Image
                    src={location.heroImage}
                    alt={location.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-semibold">{location.name}</h3>
                <p className="text-xs text-slate-300">
                  {location.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

