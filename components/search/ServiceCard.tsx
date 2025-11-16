"use client";

import Link from "next/link";
import type { ServiceItem } from "@/data/types";

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-slate-200 transition hover:-translate-y-1 hover:border-amber-200/50 hover:bg-white/10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
        {service.category || "Exchange"}
      </p>
      <h2 className="mt-3 text-lg font-semibold text-white">{service.name}</h2>
      <p className="mt-2 text-sm text-slate-300">{service.short}</p>
      <span className="mt-auto pt-4 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
        View details
      </span>
    </Link>
  );
}

