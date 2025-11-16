"use client";

import Link from "next/link";
import Image from "next/image";
import type { LocationItem } from "@/data/types";

interface LocationCardProps {
  location: LocationItem;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 text-left text-slate-200 transition hover:-translate-y-1 hover:border-amber-200/50 hover:bg-white/10"
    >
      {location.heroImage && (
        <div className="relative h-44 w-full overflow-hidden rounded-t-3xl">
          <Image
            src={location.heroImage}
            alt={`${location.name}, Colorado`}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
          {location.type}
        </p>
        <h2 className="mt-3 text-lg font-semibold text-white">
          {location.name}
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          View {location.name} 1031 exchange support
        </p>
        <span className="mt-auto pt-4 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Explore
        </span>
      </div>
    </Link>
  );
}

