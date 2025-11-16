"use client";

import { useMemo, useState } from "react";

type FieldKey =
  | "propertyValue"
  | "qiFeePercentage"
  | "escrowFee"
  | "titleInsuranceRate"
  | "recordingFees";

type FieldState = Record<FieldKey, string>;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export default function ExchangeCostEstimator() {
  const [fields, setFields] = useState<FieldState>({
    propertyValue: "",
    qiFeePercentage: "1",
    escrowFee: "1500",
    titleInsuranceRate: "0.5",
    recordingFees: "500",
  });

  const parsed = useMemo(() => {
    const entries = Object.entries(fields).map(([key, value]) => [
      key,
      value === "" ? null : Number(value),
    ]);
    return Object.fromEntries(entries) as Record<FieldKey, number | null>;
  }, [fields]);

  const errors = useMemo(() => {
    const result: Partial<Record<FieldKey, string>> = {};
    if (!parsed.propertyValue || parsed.propertyValue <= 0) {
      result.propertyValue = "Enter a value above zero";
    }
    if (
      parsed.qiFeePercentage === null ||
      parsed.qiFeePercentage < 0 ||
      parsed.qiFeePercentage > 100
    ) {
      result.qiFeePercentage = "Enter 0 - 100%";
    }
    (["escrowFee", "recordingFees"] as Array<"escrowFee" | "recordingFees">).forEach(
      (key) => {
        if (parsed[key] === null || parsed[key]! < 0) {
          result[key] = "Must be zero or greater";
        }
      }
    );
    if (
      parsed.titleInsuranceRate === null ||
      parsed.titleInsuranceRate < 0 ||
      parsed.titleInsuranceRate > 2
    ) {
      result.titleInsuranceRate = "Enter a realistic percent (0 - 2%)";
    }
    return result;
  }, [parsed]);

  const canShowResults = useMemo(
    () =>
      (Object.keys(fields) as FieldKey[]).every(
        (key) => fields[key] !== "" && !errors[key]
      ),
    [errors, fields]
  );

  const results = useMemo(() => {
    if (!canShowResults) {
      return null;
    }
    const qiFee = (parsed.propertyValue ?? 0) * ((parsed.qiFeePercentage ?? 0) / 100);
    const titleInsurance =
      (parsed.propertyValue ?? 0) * ((parsed.titleInsuranceRate ?? 0) / 100);
    const escrowFee = parsed.escrowFee ?? 0;
    const recordingFees = parsed.recordingFees ?? 0;
    const totalCosts = qiFee + titleInsurance + escrowFee + recordingFees;
    return { qiFee, titleInsurance, escrowFee, recordingFees, totalCosts };
  }, [canShowResults, parsed]);

  const handleChange = (field: FieldKey, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value.replace(/[^0-9.]/g, "") }));
  };

  const getValue = (field: FieldKey) =>
    fields[field] === "" ? "" : fields[field];

  const fieldMeta: Array<{
    key: FieldKey;
    label: string;
    helper: string;
    placeholder: string;
  }> = [
    {
      key: "propertyValue",
      label: "Property value ($)",
      helper: "Estimated purchase price of the Houston replacement property.",
      placeholder: "1,000,000",
    },
    {
      key: "qiFeePercentage",
      label: "QI fee percentage (%)",
      helper: "Typical Houston rates range from 0.5% to 1.5%.",
      placeholder: "1",
    },
    {
      key: "escrowFee",
      label: "Escrow fee ($)",
      helper: "Flat fee charged by the escrow or title company.",
      placeholder: "1,500",
    },
    {
      key: "titleInsuranceRate",
      label: "Title insurance rate (%)",
      helper: "Texas promulgated rates often range near 0.5%.",
      placeholder: "0.5",
    },
    {
      key: "recordingFees",
      label: "Harris County recording fees ($)",
      helper: "Most filings fall between $275 - $525.",
      placeholder: "500",
    },
  ];

  return (
    <div className="tool-card space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl">
      <div>
        <h2 className="text-2xl font-semibold text-white">Cost inputs</h2>
        <p className="text-sm text-slate-300">
          Estimate core expenses for a Houston 1031 exchange. Adjust values to match your
          closing disclosure.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {fieldMeta.map(({ key, label, helper, placeholder }) => (
          <label key={key} className="block text-sm font-semibold text-amber-200">
            {label}
            <input
              type="number"
              inputMode="decimal"
              value={getValue(key)}
              onChange={(event) => handleChange(key, event.target.value)}
              placeholder={placeholder}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200/40"
            />
            <span className="mt-1 block text-xs text-slate-400">{helper}</span>
            {errors[key] ? (
              <span className="mt-1 block text-xs text-red-300">{errors[key]}</span>
            ) : null}
          </label>
        ))}
      </div>

      <div className="rounded-3xl border border-amber-200/40 bg-amber-50/5 p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
          Total estimated exchange costs
        </p>
        <p className="text-3xl font-semibold">
          {results ? currencyFormatter.format(results.totalCosts) : "—"}
        </p>
        <p className="text-sm text-slate-200">
          Includes qualified intermediary, escrow, title insurance, and Harris County
          recording fees.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Qualified intermediary fee
          </p>
          <p className="text-2xl font-semibold">
            {results ? currencyFormatter.format(results.qiFee) : "—"}
          </p>
          <p className="text-xs text-slate-300">
            Covers escrow of exchange proceeds, assignment paperwork, and tracking.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Escrow fee
          </p>
          <p className="text-2xl font-semibold">
            {results ? currencyFormatter.format(results.escrowFee) : "—"}
          </p>
          <p className="text-xs text-slate-300">
            Houston escrow providers typically quote a flat transaction fee.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Title insurance
          </p>
          <p className="text-2xl font-semibold">
            {results ? currencyFormatter.format(results.titleInsurance) : "—"}
          </p>
          <p className="text-xs text-slate-300">
            Texas title premiums are regulated; enter your expected rate above.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Recording fees
          </p>
          <p className="text-2xl font-semibold">
            {results ? currencyFormatter.format(results.recordingFees) : "—"}
          </p>
          <p className="text-xs text-slate-300">
            Harris County recording averages $275–$525 depending on page counts.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
        <p className="mb-2 font-semibold text-white">Note on Texas transfer taxes</p>
        <p>
          Texas does not impose a state real estate transfer tax, but local recording,
          documentary, and courier fees still apply. Always reconcile these estimates
          with your preliminary closing statement.
        </p>
      </div>
      <style jsx>{`
        @media print {
          .tool-card {
            background: #ffffff !important;
            color: #000000 !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
