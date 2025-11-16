"use client";

import { useMemo, useState } from "react";

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

const addDays = (base: Date, days: number) => {
  const copy = new Date(base);
  copy.setDate(copy.getDate() + days);
  return copy;
};

export function DeadlineCalculator() {
  const [closingDate, setClosingDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  const timezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    []
  );

  const deadlines = useMemo(() => {
    const base = new Date(closingDate);
    return {
      identifying: addDays(base, 45),
      closing: addDays(base, 180),
    };
  }, [closingDate]);

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <h3 className="text-xl font-semibold">45 and 180 day deadlines</h3>
      <p className="text-sm text-slate-300">
        Enter your relinquished closing date to calculate the IRS deadlines in{" "}
        {timezone}.
      </p>
      <label className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
        Closing date
        <input
          type="date"
          value={closingDate}
          onChange={(event) => setClosingDate(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:border-amber-300 focus:outline-none"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Identification deadline
          </p>
          <p className="mt-2 text-lg font-semibold">
            {formatDate(deadlines.identifying)}
          </p>
          <p className="text-xs text-slate-300">45 days after closing</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Replacement closing deadline
          </p>
          <p className="mt-2 text-lg font-semibold">
            {formatDate(deadlines.closing)}
          </p>
          <p className="text-xs text-slate-300">180 days after closing</p>
        </div>
      </div>
    </div>
  );
}

