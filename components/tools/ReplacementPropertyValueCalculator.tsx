"use client";

import { useState } from "react";

interface ReplacementValueResult {
  minimumReplacementValue: number;
  recommendedReplacementValue: number;
  equityToReinvest: number;
  isValid: boolean;
  errors: string[];
}

export default function ReplacementPropertyValueCalculator() {
  const [relinquishedSalePrice, setRelinquishedSalePrice] = useState<string>("");
  const [relinquishedMortgage, setRelinquishedMortgage] = useState<string>("");
  const [exchangeCosts, setExchangeCosts] = useState<string>("");
  const [cashToReceive, setCashToReceive] = useState<string>("0");
  const [newMortgageAmount, setNewMortgageAmount] = useState<string>("");
  const [results, setResults] = useState<ReplacementValueResult | null>(null);

  const calculateReplacementValue = () => {
    const errors: string[] = [];
    
    const salePrice = parseFloat(relinquishedSalePrice);
    const mortgage = parseFloat(relinquishedMortgage) || 0;
    const costs = parseFloat(exchangeCosts) || 0;
    const cashOut = parseFloat(cashToReceive) || 0;
    const newMortgage = parseFloat(newMortgageAmount) || 0;

    if (isNaN(salePrice) || salePrice <= 0) {
      errors.push("Relinquished property sale price must be greater than zero.");
    }
    if (mortgage < 0) {
      errors.push("Relinquished mortgage cannot be negative.");
    }
    if (costs < 0) {
      errors.push("Exchange costs cannot be negative.");
    }
    if (cashOut < 0) {
      errors.push("Cash to receive cannot be negative.");
    }
    if (newMortgage < 0) {
      errors.push("New mortgage amount cannot be negative.");
    }
    if (mortgage > salePrice) {
      errors.push("Mortgage balance cannot exceed sale price.");
    }
    if (cashOut + costs > salePrice - mortgage) {
      errors.push("Cash to receive plus exchange costs cannot exceed net proceeds.");
    }

    if (errors.length > 0) {
      setResults({ minimumReplacementValue: 0, recommendedReplacementValue: 0, equityToReinvest: 0, isValid: false, errors });
      return;
    }

    // Net proceeds from sale = sale price - mortgage - exchange costs - cash out
    const netProceeds = salePrice - mortgage - costs - cashOut;
    
    // Equity to reinvest = net proceeds
    const equityToReinvest = netProceeds;
    
    // Minimum replacement value = equity to reinvest + new mortgage
    // To defer all gain, replacement value must equal or exceed sale price
    // But we also need to account for the new mortgage
    const minimumReplacementValue = equityToReinvest + newMortgage;
    
    // Recommended replacement value adds a buffer (5% recommended)
    const recommendedReplacementValue = minimumReplacementValue * 1.05;

    setResults({
      minimumReplacementValue,
      recommendedReplacementValue,
      equityToReinvest,
      isValid: true,
      errors: [],
    });
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = value.replace(/[^0-9.]/g, "");
    switch (field) {
      case "salePrice":
        setRelinquishedSalePrice(numValue);
        break;
      case "mortgage":
        setRelinquishedMortgage(numValue);
        break;
      case "costs":
        setExchangeCosts(numValue);
        break;
      case "cashOut":
        setCashToReceive(numValue);
        break;
      case "newMortgage":
        setNewMortgageAmount(numValue);
        break;
    }
    if (results) {
      calculateReplacementValue();
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="mb-6 font-serif text-2xl font-bold text-[#0B3C5D]">
          Replacement Property Value Calculator Inputs
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="sale-price"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Relinquished Property Sale Price ($)
            </label>
            <input
              id="sale-price"
              type="text"
              value={relinquishedSalePrice}
              onChange={(e) => handleInputChange("salePrice", e.target.value)}
              placeholder="1,000,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Sale price of the property you are selling
            </p>
          </div>

          <div>
            <label
              htmlFor="mortgage-balance"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Relinquished Mortgage Balance ($)
            </label>
            <input
              id="mortgage-balance"
              type="text"
              value={relinquishedMortgage}
              onChange={(e) => handleInputChange("mortgage", e.target.value)}
              placeholder="500,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Outstanding mortgage balance on relinquished property
            </p>
          </div>

          <div>
            <label
              htmlFor="exchange-costs"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Exchange Costs ($)
            </label>
            <input
              id="exchange-costs"
              type="text"
              value={exchangeCosts}
              onChange={(e) => handleInputChange("costs", e.target.value)}
              placeholder="15,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              QI fees, escrow, title insurance, recording fees
            </p>
          </div>

          <div>
            <label
              htmlFor="cash-out"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Cash to Receive ($)
            </label>
            <input
              id="cash-out"
              type="text"
              value={cashToReceive}
              onChange={(e) => handleInputChange("cashOut", e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Cash you plan to take out (creates boot if not zero)
            </p>
          </div>

          <div>
            <label
              htmlFor="new-mortgage"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              New Mortgage Amount ($)
            </label>
            <input
              id="new-mortgage"
              type="text"
              value={newMortgageAmount}
              onChange={(e) => handleInputChange("newMortgage", e.target.value)}
              placeholder="600,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Mortgage amount on replacement property
            </p>
          </div>
        </div>

        <button
          onClick={calculateReplacementValue}
          className="mt-6 w-full rounded-lg bg-[#C9A227] px-6 py-3 font-semibold text-gray-900 transition hover:bg-[#B8921F] focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2"
        >
          Calculate Minimum Replacement Value
        </button>
      </div>

      {results && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h2 className="mb-6 font-serif text-2xl font-bold text-[#0B3C5D]">
            Replacement Property Value Results
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
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Net Proceeds from Sale:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${results.equityToReinvest.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Sale price minus mortgage, costs, and cash out
                </p>
              </div>

              <div className="rounded-lg border-2 border-[#0B3C5D] bg-[#0B3C5D]/5 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">Minimum Replacement Value:</span>
                  <span className="text-2xl font-bold text-[#0B3C5D]">
                    ${results.minimumReplacementValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Minimum value needed to defer all gain (equity + new mortgage)
                </p>
              </div>

              <div className="rounded-lg border border-[#C9A227] bg-[#C9A227]/10 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Recommended Replacement Value:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${results.recommendedReplacementValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Recommended value with 5% buffer for contingencies
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-blue-50 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Equity to Reinvest:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${results.equityToReinvest.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Amount of equity available for reinvestment
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-3 font-semibold text-[#0B3C5D]">Understanding Replacement Property Value Requirements</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Minimum Replacement Value:</strong> To defer all gain in a 1031 exchange, the replacement property value must equal or exceed the sale price of the relinquished property. This calculator accounts for your equity, new mortgage, and exchange costs.
          </p>
          <p>
            <strong>Equity Reinvestment:</strong> All net proceeds from the sale (after paying off the mortgage, exchange costs, and any cash you take out) must be reinvested in the replacement property to achieve full tax deferral.
          </p>
          <p>
            <strong>Debt Replacement:</strong> The new mortgage should equal or exceed the old mortgage to avoid mortgage boot. If the new mortgage is less than the old mortgage, the difference creates taxable boot.
          </p>
          <p>
            <strong>Recommended Buffer:</strong> Adding a 5% buffer to the minimum replacement value helps account for unexpected costs, negotiation room, and ensures full deferral even if final costs differ slightly from estimates.
          </p>
        </div>
      </div>
    </div>
  );
}


