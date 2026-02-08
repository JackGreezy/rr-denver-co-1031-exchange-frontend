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
    <div className="space-y-8 bg-[#fafafa] p-8">
      <div>
        <h2 className="text-2xl font-medium text-black">Identification Letter Helper</h2>
        <p className="mt-2 text-sm text-gray-600">
          Draft a simple letter for your intermediary. Confirm the final format with your
          intermediary and counsel.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-black">
            Investor Name
          </label>
          <input
            value={investor}
            onChange={(event) => setInvestor(event.target.value)}
            className="mt-2 w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Jane Investor"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-black">
            Intermediary Name
          </label>
          <input
            value={intermediary}
            onChange={(event) => setIntermediary(event.target.value)}
            className="mt-2 w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Example Intermediary"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.1em] text-black">
          Relinquished Property
        </label>
        <input
          value={relinquished}
          onChange={(event) => setRelinquished(event.target.value)}
          className="mt-2 w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          placeholder="123 Main St, Denver, CO"
        />
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-[0.1em] text-black">
          Replacement Properties (one per line)
        </label>
        <textarea
          value={replacementList}
          onChange={(event) => setReplacementList(event.target.value)}
          rows={4}
          className="mt-2 w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          placeholder="Property A&#10;Property B&#10;Property C"
        />
      </div>

      <div className="bg-white p-6">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-black mb-4">Letter Preview</p>
        <pre className="whitespace-pre-wrap text-sm text-gray-700">{template}</pre>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="border border-black px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-black transition hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          Copy
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="border border-black px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-black transition hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          Print
        </button>
      </div>
    </div>
  );
}
