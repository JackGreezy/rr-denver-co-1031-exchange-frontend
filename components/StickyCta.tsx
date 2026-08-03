"use client";

import Link from "next/link";
import {
  CONTACT_ROUTE,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
} from "@/lib/constants";

export default function StickyCta() {
  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden lg:flex">
        <Link
          href={CONTACT_ROUTE}
          className="inline-flex items-center gap-3 bg-black px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          Plan My Exchange
        </Link>
      </div>
      <a
        href={`tel:${PRIMARY_PHONE_TEL}`}
        aria-label={`Call a Denver 1031 expert at ${PRIMARY_PHONE_DISPLAY}`}
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-[0_10px_35px_rgba(0,0,0,0.35)] ring-1 ring-white/25 transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black lg:hidden"
      >
        <svg
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
          />
        </svg>
      </a>
    </>
  );
}
