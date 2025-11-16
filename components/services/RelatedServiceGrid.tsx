"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ServiceItem } from "@/data/types";
import { buildContactHref } from "@/lib/routing";

type RelatedServiceGridProps = {
  services: ServiceItem[];
};

export function RelatedServiceGrid({ services }: RelatedServiceGridProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return services;
    }
    const normalized = query.toLowerCase();
    return services.filter((service) =>
      service.name.toLowerCase().includes(normalized)
    );
  }, [query, services]);

  const showEmpty = query.trim().length > 0 && filtered.length === 0;

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="related-service-search"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300"
        >
          Related services
        </label>
        <div className="relative">
          <input
            id="related-service-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter related services"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200/40"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-200"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>
      {showEmpty ? (
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-200">
          <p className="font-semibold text-white">
            We can help with “{query}”
          </p>
          <p className="mt-2 text-slate-300">
            Send the request to intake and we will align the right specialist.
          </p>
          <Link
            href={buildContactHref(query)}
            className="mt-4 inline-flex items-center rounded-full bg-amber-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900"
          >
            Contact team
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-slate-200 transition hover:-translate-y-1 hover:border-amber-200/50"
            >
              <p className="text-sm font-semibold text-white">{service.name}</p>
              <p className="text-xs text-slate-400">{service.short}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

