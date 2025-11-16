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
          className="inline-flex items-center gap-3 rounded-full bg-amber-300 px-6 py-4 text-sm font-semibold tracking-[0.3em] text-slate-900 shadow-2xl transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
        >
          PLAN MY EXCHANGE
        </Link>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-800 bg-slate-950/95 px-4 py-3 text-white shadow-2xl lg:hidden">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileCollapsed((prev) => !prev)}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
            aria-expanded={!mobileCollapsed}
          >
            {mobileCollapsed ? "Open CTA" : "Hide CTA"}
          </button>
          <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400">
            45 / 180 tracker
          </p>
        </div>
        {!mobileCollapsed && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href={`tel:${PRIMARY_PHONE_TEL}`}
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Call {PRIMARY_PHONE_DISPLAY}
            </a>
            <Link
              href={CONTACT_ROUTE}
              className="inline-flex items-center justify-center rounded-2xl bg-amber-300 px-4 py-3 text-sm font-semibold tracking-[0.2em] text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              CONTACT
            </Link>
          </div>
        )}
      </div>
    </>
  );
}