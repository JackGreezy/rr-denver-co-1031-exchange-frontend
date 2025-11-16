"use client";

import { useState } from "react";

interface DebtReliefResult {
  mortgageBoot: number;
  estimatedTax: number;
  isValid: boolean;
  errors: string[];
}

export default function DebtReliefCalculator() {
  const [oldMortgage, setOldMortgage] = useState<string>("");
  const [newMortgage, setNewMortgage] = useState<string>("");
  const [taxRate, setTaxRate] = useState<string>("20");
  const [results, setResults] = useState<DebtReliefResult | null>(null);

  const calculateDebtRelief = () => {
    const errors: string[] = [];
    
    const oldMort = parseFloat(oldMortgage) || 0;
    const newMort = parseFloat(newMortgage) || 0;
    const rate = parseFloat(taxRate);

    if (oldMort < 0) {
      errors.push("Old mortgage balance cannot be negative.");
    }
    if (newMort < 0) {
      errors.push("New mortgage balance cannot be negative.");
    }
    if (isNaN(rate) || rate < 0 || rate > 100) {
      errors.push("Tax rate must be between 0 and 100.");
    }

    if (errors.length > 0) {
      setResults({ mortgageBoot: 0, estimatedTax: 0, isValid: false, errors });
      return;
    }

    // Mortgage boot = old mortgage - new mortgage (only if positive)
    const mortgageBoot = Math.max(0, oldMort - newMort);
    
    // Estimated tax on mortgage boot
    const estimatedTaxAmount = mortgageBoot * (rate / 100);

    setResults({
      mortgageBoot,
      estimatedTax: estimatedTaxAmount,
      isValid: true,
      errors: [],
    });
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = value.replace(/[^0-9.]/g, "");
    switch (field) {
      case "oldMortgage":
        setOldMortgage(numValue);
        break;
      case "newMortgage":
        setNewMortgage(numValue);
        break;
      case "taxRate":
        setTaxRate(numValue);
        break;
    }
    if (results) {
      calculateDebtRelief();
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="mb-6 font-serif text-2xl font-bold text-[#0B3C5D]">
          Debt Relief Calculator Inputs
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="old-mortgage"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Old Mortgage Balance ($)
            </label>
            <input
              id="old-mortgage"
              type="text"
              value={oldMortgage}
              onChange={(e) => handleInputChange("oldMortgage", e.target.value)}
              placeholder="500,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Mortgage balance on relinquished property
            </p>
          </div>

          <div>
            <label
              htmlFor="new-mortgage"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              New Mortgage Balance ($)
            </label>
            <input
              id="new-mortgage"
              type="text"
              value={newMortgage}
              onChange={(e) => handleInputChange("newMortgage", e.target.value)}
              placeholder="400,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Mortgage balance on replacement property
            </p>
          </div>

          <div>
            <label
              htmlFor="tax-rate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Estimated Tax Rate (%)
            </label>
            <input
              id="tax-rate"
              type="text"
              value={taxRate}
              onChange={(e) => handleInputChange("taxRate", e.target.value)}
              placeholder="20"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Estimated capital gains tax rate (illustrative only)
            </p>
          </div>
        </div>

        <button
          onClick={calculateDebtRelief}
          className="mt-6 w-full rounded-lg bg-[#C9A227] px-6 py-3 font-semibold text-gray-900 transition hover:bg-[#B8921F] focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2"
        >
          Calculate Debt Relief
        </button>
      </div>

      {results && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h2 className="mb-6 font-serif text-2xl font-bold text-[#0B3C5D]">
            Debt Relief Calculation Results
          </h2>

          {!results.isValid && results.errors.length > 0 && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="mb-2 font-semibold text-red-800">Please correct the following errors:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                {results.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {results.isValid && (
            <div className="space-y-4">
              {results.mortgageBoot > 0 ? (
                <>
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Mortgage Boot:</span>
                      <span className="text-lg font-bold text-[#0B3C5D]">
                        ${results.mortgageBoot.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">
                      Taxable boot created when new debt is less than old debt
                    </p>
                  </div>

                  <div className="rounded-lg border-2 border-[#0B3C5D] bg-[#0B3C5D]/5 p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold text-gray-900">Estimated Tax on Mortgage Boot:</span>
                      <span className="text-2xl font-bold text-[#0B3C5D]">
                        ${results.estimatedTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">
                      Estimated tax at {taxRate}% rate (illustrative only - actual rates vary)
                    </p>
                  </div>
                </>
              ) : (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="flex items-center gap-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-green-800">No Mortgage Boot</p>
                      <p className="text-xs text-green-700 mt-1">
                        Your new mortgage equals or exceeds the old mortgage. No debt relief boot is created.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Debt Difference:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${(parseFloat(oldMortgage) - parseFloat(newMortgage)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Old mortgage minus new mortgage
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-3 font-semibold text-[#0B3C5D]">Understanding Debt Relief and Mortgage Boot</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Mortgage Boot:</strong> When the new mortgage on your replacement property is less than the old mortgage on your relinquished property, the difference is considered "mortgage relief" or "mortgage boot." This creates taxable income even in a 1031 exchange.
          </p>
          <p>
            <strong>How It Works:</strong> If you had a $500,000 mortgage on the old property and only take out a $400,000 mortgage on the new property, you've received $100,000 in mortgage relief. This $100,000 is taxable boot, subject to capital gains tax.
          </p>
          <p>
            <strong>Avoiding Mortgage Boot:</strong> To avoid mortgage boot, ensure your new mortgage equals or exceeds your old mortgage. You can also add cash to the replacement property purchase to make up the difference.
          </p>
          <p>
            <strong>Tax Implications:</strong> Mortgage boot is recognized as taxable gain to the extent of your total gain on the exchange. The tax rate depends on your income bracket and how long you held the property.
          </p>
          <p>
            <strong>Important:</strong> This calculator provides illustrative estimates only. Actual tax rates and treatment depend on your specific situation. Consult a tax advisor for precise calculations.
          </p>
        </div>
      </div>
    </div>
  );
}


