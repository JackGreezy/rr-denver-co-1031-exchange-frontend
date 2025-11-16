export function IdentificationRulesExplainer() {
  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <h3 className="text-xl font-semibold">Identification rule refresher</h3>
      <p className="text-sm text-slate-300">
        These summaries are informational only. Confirm details with your Qualified
        Intermediary and advisors.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Three property rule
          </p>
          <p className="mt-2 text-sm text-slate-200">
            Identify up to three properties without regard to value. You may close on
            any or all of them.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Two hundred percent rule
          </p>
          <p className="mt-2 text-sm text-slate-200">
            Identify any number of properties as long as the combined fair market value
            does not exceed 200% of the relinquished value.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Ninety five percent rule
          </p>
          <p className="mt-2 text-sm text-slate-200">
            Identify any number of properties at any value. You must acquire at least
            95% of the total value identified.
          </p>
        </div>
      </div>
    </div>
  );
}

