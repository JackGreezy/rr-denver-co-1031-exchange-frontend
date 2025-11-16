"use client";

import { useState } from "react";

interface DepreciationResult {
  totalDepreciation: number;
  recaptureTax: number;
  netAfterRecapture: number;
  isValid: boolean;
  errors: string[];
}

export default function DepreciationRecaptureEstimator() {
  const [originalCost, setOriginalCost] = useState<string>("");
  const [accumulatedDepreciation, setAccumulatedDepreciation] = useState<string>("");
  const [salePrice, setSalePrice] = useState<string>("");
  const [recaptureRate, setRecaptureRate] = useState<string>("25");
  const [results, setResults] = useState<DepreciationResult | null>(null);

  const calculateRecapture = () => {
    const errors: string[] = [];
    
    const cost = parseFloat(originalCost);
    const depreciation = parseFloat(accumulatedDepreciation) || 0;
    const sale = parseFloat(salePrice);
    const rate = parseFloat(recaptureRate);

    if (isNaN(cost) || cost <= 0) {
      errors.push("Original cost basis must be greater than zero.");
    }
    if (depreciation < 0) {
      errors.push("Accumulated depreciation cannot be negative.");
    }
    if (isNaN(sale) || sale <= 0) {
      errors.push("Sale price must be greater than zero.");
    }
    if (isNaN(rate) || rate < 0 || rate > 100) {
      errors.push("Recapture tax rate must be between 0 and 100.");
    }
    if (depreciation > cost) {
      errors.push("Accumulated depreciation cannot exceed original cost basis.");
    }

    if (errors.length > 0) {
      setResults({ totalDepreciation: 0, recaptureTax: 0, netAfterRecapture: 0, isValid: false, errors });
      return;
    }

    // Adjusted basis = original cost - accumulated depreciation
    const adjustedBasis = cost - depreciation;
    
    // Gain = sale price - adjusted basis
    const totalGain = sale - adjustedBasis;
    
    // Depreciation recapture is the lesser of: accumulated depreciation or total gain
    const totalDepreciationRecapture = Math.min(depreciation, Math.max(0, totalGain));
    
    // Recapture tax (typically 25% for unrecaptured Section 1250 gain)
    const recaptureTaxAmount = totalDepreciationRecapture * (rate / 100);
    
    // Net proceeds after recapture tax
    const netAfterRecapture = sale - recaptureTaxAmount;

    setResults({
      totalDepreciation: totalDepreciationRecapture,
      recaptureTax: recaptureTaxAmount,
      netAfterRecapture,
      isValid: true,
      errors: [],
    });
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = value.replace(/[^0-9.]/g, "");
    switch (field) {
      case "originalCost":
        setOriginalCost(numValue);
        break;
      case "depreciation":
        setAccumulatedDepreciation(numValue);
        break;
      case "salePrice":
        setSalePrice(numValue);
        break;
      case "rate":
        setRecaptureRate(numValue);
        break;
    }
    if (results) {
      calculateRecapture();
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="mb-6 font-serif text-2xl font-bold text-[#0B3C5D]">
          Depreciation Recapture Estimator Inputs
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="original-cost"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Original Cost Basis ($)
            </label>
            <input
              id="original-cost"
              type="text"
              value={originalCost}
              onChange={(e) => handleInputChange("originalCost", e.target.value)}
              placeholder="500,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Original purchase price plus improvements
            </p>
          </div>

          <div>
            <label
              htmlFor="accumulated-depreciation"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Accumulated Depreciation ($)
            </label>
            <input
              id="accumulated-depreciation"
              type="text"
              value={accumulatedDepreciation}
              onChange={(e) => handleInputChange("depreciation", e.target.value)}
              placeholder="100,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Total depreciation taken over ownership period
            </p>
          </div>

          <div>
            <label
              htmlFor="sale-price"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Sale Price ($)
            </label>
            <input
              id="sale-price"
              type="text"
              value={salePrice}
              onChange={(e) => handleInputChange("salePrice", e.target.value)}
              placeholder="750,000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Sale price of the relinquished property
            </p>
          </div>

          <div>
            <label
              htmlFor="recapture-rate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Recapture Tax Rate (%)
            </label>
            <input
              id="recapture-rate"
              type="text"
              value={recaptureRate}
              onChange={(e) => handleInputChange("rate", e.target.value)}
              placeholder="25"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#0B3C5D] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Typically 25% for unrecaptured Section 1250 gain (illustrative)
            </p>
          </div>
        </div>

        <button
          onClick={calculateRecapture}
          className="mt-6 w-full rounded-lg bg-[#C9A227] px-6 py-3 font-semibold text-gray-900 transition hover:bg-[#B8921F] focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2"
        >
          Calculate Depreciation Recapture
        </button>
      </div>

      {results && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h2 className="mb-6 font-serif text-2xl font-bold text-[#0B3C5D]">
            Depreciation Recapture Results
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
                  <span className="text-sm font-medium text-gray-700">Adjusted Basis:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${(parseFloat(originalCost) - (parseFloat(accumulatedDepreciation) || 0)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Original cost minus accumulated depreciation
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Gain:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${(parseFloat(salePrice) - (parseFloat(originalCost) - (parseFloat(accumulatedDepreciation) || 0))).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Sale price minus adjusted basis
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Depreciation Recapture:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${results.totalDepreciation.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Lesser of accumulated depreciation or total gain
                </p>
              </div>

              <div className="rounded-lg border-2 border-[#0B3C5D] bg-[#0B3C5D]/5 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">Recapture Tax:</span>
                  <span className="text-2xl font-bold text-[#0B3C5D]">
                    ${results.recaptureTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Tax on depreciation recapture at {recaptureRate}% rate (illustrative)
                </p>
              </div>

              <div className="rounded-lg border border-[#C9A227] bg-[#C9A227]/10 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Net Proceeds After Recapture:</span>
                  <span className="text-lg font-bold text-[#0B3C5D]">
                    ${results.netAfterRecapture.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Sale price minus recapture tax
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-3 font-semibold text-[#0B3C5D]">Understanding Depreciation Recapture</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Depreciation Recapture:</strong> When you sell a rental property, the IRS requires you to "recapture" depreciation deductions you've taken. This recaptured depreciation is taxed at a higher rate (typically 25% for unrecaptured Section 1250 gain) than long-term capital gains.
          </p>
          <p>
            <strong>How It Works:</strong> The amount subject to recapture is the lesser of: (1) the total depreciation you've taken, or (2) your total gain on the sale. Even in a 1031 exchange, depreciation recapture may still apply if boot is received.
          </p>
          <p>
            <strong>1031 Exchange Impact:</strong> A fully deferred 1031 exchange can defer depreciation recapture along with capital gains. However, if you receive boot (cash or mortgage relief), a portion of the recapture may be recognized.
          </p>
          <p>
            <strong>Important:</strong> Actual tax rates vary based on your income bracket, property type, and other factors. Consult a tax advisor for precise calculations.
          </p>
        </div>
      </div>
    </div>
  );
}


