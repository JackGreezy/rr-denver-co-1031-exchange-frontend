"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ServiceItem } from "@/data/types";
import { buildContactHref } from "@/lib/routing";

type HomeServiceSearchProps = {
  services: ServiceItem[];
  featured: Array<{
    title: string;
    description: string;
    slug: string;
  }>;
};

export function HomeServiceSearch({ services, featured }: HomeServiceSearchProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const displayServices = useMemo(() => {
    if (!query.trim()) {
      return featured;
    }
    const normalized = query.toLowerCase();
    return services
      .filter((service) => service.name.toLowerCase().includes(normalized))
      .slice(0, 6)
      .map((service) => ({
        title: service.name,
        description: service.short,
        slug: service.slug,
      }));
  }, [featured, query, services]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) {
      return;
    }
    const exact = services.find(
      (service) => service.name.toLowerCase() === query.toLowerCase().trim()
    );
    if (exact) {
      router.push(`/services/${exact.slug}`);
      return;
    }
    router.push(buildContactHref(query));
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4"
      >
        <label
          htmlFor="home-service-search"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300"
        >
          Search services
        </label>
        <div className="flex gap-2">
          <input
            id="home-service-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Timeline tracking, replacement sourcing..."
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayServices.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-slate-200 transition hover:-translate-y-1 hover:border-amber-200/50 hover:bg-white/10"
          >
            <h3 className="text-lg font-semibold text-white">
              {service.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300">{service.description}</p>
            <span className="mt-auto pt-4 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
              View service
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

