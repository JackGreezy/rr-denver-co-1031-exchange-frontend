"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CONTACT_ROUTE,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
} from "@/lib/constants";

export default function StickyCta() {
  const [mobileCollapsed, setMobileCollapsed] = useState(false);

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
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur px-4 py-3 text-gray-900 shadow-lg lg:hidden">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileCollapsed((prev) => !prev)}
            className="text-xs font-medium uppercase tracking-[0.2em] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            aria-expanded={!mobileCollapsed}
          >
            {mobileCollapsed ? "Open" : "Close"}
          </button>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
            45 / 180 tracker
          </p>
        </div>
        {!mobileCollapsed && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href={`tel:${PRIMARY_PHONE_TEL}`}
              className="inline-flex items-center justify-center border border-black px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              Call {PRIMARY_PHONE_DISPLAY}
            </a>
            <Link
              href={CONTACT_ROUTE}
              className="inline-flex items-center justify-center bg-black px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </>
  );
}