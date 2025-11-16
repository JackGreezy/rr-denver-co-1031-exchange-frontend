"use client";

import { useMemo, useState } from "react";

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);

const addDays = (base: Date, days: number) => {
  const copy = new Date(base);
  copy.setDate(copy.getDate() + days);
  return copy;
};

export function TimelineTracker() {
  const [closingDate, setClosingDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  const milestones = useMemo(() => {
    const base = new Date(closingDate);
    return [
      {
        label: "Sale closed",
        date: base,
        notes: "Funds move directly to the intermediary.",
      },
      {
        label: "Identification plan drafted",
        date: addDays(base, 15),
        notes: "Begin documenting potential replacement properties.",
      },
      {
        label: "45 day deadline",
        date: addDays(base, 45),
        notes: "Identification letter delivered to intermediary.",
      },
      {
        label: "Financing and diligence complete",
        date: addDays(base, 120),
        notes: "Appraisals, inspections, and lender approvals on file.",
      },
      {
        label: "180 day deadline",
        date: addDays(base, 180),
        notes: "Replacement property closing complete.",
      },
    ];
  }, [closingDate]);

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <h3 className="text-xl font-semibold">Timeline tracker</h3>
      <p className="text-sm text-slate-300">
        Visualize major actions between the relinquished sale and replacement closing.
      </p>
      <label className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200 block">
        Sale closing date
        <input
          type="date"
          value={closingDate}
          onChange={(event) => setClosingDate(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:border-amber-300 focus:outline-none"
        />
      </label>
      <ol className="space-y-4">
        {milestones.map((milestone) => (
          <li
            key={milestone.label}
            className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
              {milestone.label}
            </p>
            <p className="text-lg font-semibold">{formatDate(milestone.date)}</p>
            <p className="text-sm text-slate-300">{milestone.notes}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

