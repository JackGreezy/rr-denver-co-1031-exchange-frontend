"use client";

import Link from "next/link";
import Image from "next/image";
import type { PropertyTypeItem } from "@/data/types";

interface PropertyCardProps {
  propertyType: PropertyTypeItem;
}

export function PropertyCard({ propertyType }: PropertyCardProps) {
  return (
    <Link
      href={`/property-types/${propertyType.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left text-white transition hover:-translate-y-1 hover:border-amber-200/40 hover:bg-white/10"
    >
      {propertyType.heroImage && (
        <div className="relative h-48 w-full">
          <Image
            src={propertyType.heroImage}
            alt={propertyType.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
          Type
        </p>
        <h2 className="mt-3 text-lg font-semibold">{propertyType.name}</h2>
        <span className="mt-auto pt-4 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
          Explore
        </span>
      </div>
    </Link>
  );
}

