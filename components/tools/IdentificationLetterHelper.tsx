"use client";

import { useMemo, useState } from "react";

export function IdentificationLetterHelper() {
  const [investor, setInvestor] = useState("");
  const [intermediary, setIntermediary] = useState("");
  const [relinquished, setRelinquished] = useState("");
  const [replacementList, setReplacementList] = useState("");

  const template = useMemo(
    () =>
      `To: ${intermediary || "[Qualified Intermediary]"}
From: ${investor || "[Investor]"}

Relinquished property: ${relinquished || "[Property address]"}

Replacement properties:
${replacementList || "[List addresses, legal descriptions, or contract references]"}

This letter is delivered within the forty five day identification period. Please acknowledge receipt.`,
    [intermediary, investor, relinquished, replacementList]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(template);
  };

  const handlePrint = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<pre>${template}</pre>`);
    win.document.close();
    win.print();
  };

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <h3 className="text-xl font-semibold">Identification letter helper</h3>
      <p className="text-sm text-slate-300">
        Draft a simple letter for your intermediary. Confirm the final format with your
        intermediary and counsel.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
          Investor name
          <input
            value={investor}
            onChange={(event) => setInvestor(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white focus:border-amber-300 focus:outline-none"
            placeholder="Jane Investor"
          />
        </label>
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
          Intermediary name
          <input
            value={intermediary}
            onChange={(event) => setIntermediary(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white focus:border-amber-300 focus:outline-none"
            placeholder="Example Intermediary"
          />
        </label>
      </div>
      <label className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200 block">
        Relinquished property
        <input
          value={relinquished}
          onChange={(event) => setRelinquished(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white focus:border-amber-300 focus:outline-none"
          placeholder="123 Main St, Denver, CO"
        />
      </label>
      <label className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200 block">
        Replacement properties (one per line)
        <textarea
          value={replacementList}
          onChange={(event) => setReplacementList(event.target.value)}
          rows={4}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white focus:border-amber-300 focus:outline-none"
          placeholder="Property A&#10;Property B&#10;Property C"
        />
      </label>
      <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
        <pre className="whitespace-pre-wrap text-sm text-slate-200">{template}</pre>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]"
        >
          Copy
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]"
        >
          Print
        </button>
      </div>
    </div>
  );
}

