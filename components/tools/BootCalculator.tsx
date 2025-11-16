"use client";

import { useMemo, useState } from "react";

type FieldKey =
  | "relinquishedValue"
  | "replacementValue"
  | "cashReceived"
  | "oldMortgage"
  | "newMortgage";

type FieldState = Record<FieldKey, string>;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export default function BootCalculator() {
  const [fields, setFields] = useState<FieldState>({
    relinquishedValue: "",
    replacementValue: "",
    cashReceived: "",
    oldMortgage: "",
    newMortgage: "",
  });

  const parsed = useMemo(() => {
    const entries = Object.entries(fields).map(([key, value]) => [
      key,
      value === "" ? null : Number(value),
    ]);
    return Object.fromEntries(entries) as Record<FieldKey, number | null>;
  }, [fields]);

  const errors = useMemo(() => {
    const map: Partial<Record<FieldKey, string>> = {};
    (Object.keys(fields) as FieldKey[]).forEach((key) => {
      const value = parsed[key];
      if (value === null) {
        map[key] = "Required";
      } else if (Number.isNaN(value)) {
        map[key] = "Enter a numeric value";
      } else if (value < 0) {
        map[key] = "Must be zero or greater";
      }
    });
    return map;
  }, [parsed, fields]);

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
    const cashBoot = Math.max(parsed.cashReceived ?? 0, 0);
    const mortgageBoot = Math.max(
      (parsed.oldMortgage ?? 0) - (parsed.newMortgage ?? 0),
      0
    );
    const totalBoot = cashBoot + mortgageBoot;
    const estimatedTax = totalBoot * 0.2;
    return { cashBoot, mortgageBoot, totalBoot, estimatedTax };
  }, [canShowResults, parsed]);

  const handleChange = (field: FieldKey, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value.replace(/[^0-9.]/g, "") }));
  };

  const fieldMeta: Array<{
    key: FieldKey;
    label: string;
    helper: string;
    placeholder: string;
  }> = [
    {
      key: "relinquishedValue",
      label: "Relinquished Property Value ($)",
      helper: "Sale price of the property being sold",
      placeholder: "1,000,000",
    },
    {
      key: "replacementValue",
      label: "Replacement Property Value ($)",
      helper: "Purchase price of the incoming property",
      placeholder: "1,200,000",
    },
    {
      key: "cashReceived",
      label: "Cash Received ($)",
      helper: "Cash retained outside the exchange",
      placeholder: "0",
    },
    {
      key: "oldMortgage",
      label: "Old Mortgage Balance ($)",
      helper: "Debt paid off on relinquished property",
      placeholder: "500,000",
    },
    {
      key: "newMortgage",
      label: "New Mortgage Balance ($)",
      helper: "Debt on the replacement property",
      placeholder: "600,000",
    },
  ];

  return (
    <div className="tool-card space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl">
      <div>
        <h2 className="text-2xl font-semibold text-white">Boot inputs</h2>
        <p className="text-sm text-slate-300">
          Values update as you type. Leave the field at zero if it does not apply.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {fieldMeta.map(({ key, label, helper, placeholder }) => (
          <label key={key} className="block text-sm font-semibold text-amber-200">
            {label}
            <input
              type="number"
              inputMode="decimal"
              value={fields[key]}
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

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Cash boot
          </p>
          <p className="text-2xl font-semibold">
            {results ? currencyFormatter.format(results.cashBoot) : "—"}
          </p>
          <p className="text-sm text-slate-300">
            Cash withheld from exchange proceeds and not reinvested.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Mortgage boot
          </p>
          <p className="text-2xl font-semibold">
            {results ? currencyFormatter.format(results.mortgageBoot) : "—"}
          </p>
          <p className="text-sm text-slate-300">
            Mortgage relief when the new loan is smaller than the old loan.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-amber-200/30 bg-amber-50/5 p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
          Total boot
        </p>
        <p className="text-3xl font-semibold">
          {results ? currencyFormatter.format(results.totalBoot) : "—"}
        </p>
        <p className="text-sm text-slate-200">
          Total boot is the sum of cash boot and mortgage boot.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
        <p className="text-sm font-semibold text-white">Illustrative tax (20%)</p>
        <p className="text-2xl font-semibold text-amber-200">
          {results ? currencyFormatter.format(results.estimatedTax) : "—"}
        </p>
        <p className="text-xs text-slate-300">
          Uses a 20% rate for demonstration. Confirm actual exposure with your tax advisor.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
        <p className="mb-2 font-semibold text-white">Boot refresher</p>
        <p>
          <strong>Cash boot</strong> equals the equity removed from the exchange.{" "}
          <strong>Mortgage boot</strong> occurs when debt decreases. Both amounts are
          generally taxable to the extent of gain.
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
