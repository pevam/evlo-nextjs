'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface DiagnosticResults {
  score: number;
  current_range: number;
  winter_range: number;
  summer_range: number;
  annual_loss: number;
  eol: string;
  market_price: string;
  battery_value: string;
  savings: string;
}

export default function DiagnosticPage() {
  const [formData, setFormData] = useState({
    car: 'Tesla Model 3 LR',
    year: 2022,
    km: 45000,
    maxSoc: 100,
    minSoc: 20,
    chargeType: 'AC',
    driveStyle: 'Normal',
    chemistry: 'NMC',
  });

  const [results, setResults] = useState<DiagnosticResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value)
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Diagnostic failed');
      }

      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run diagnostic');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <div className="sticky top-24 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900">EV Battery Diagnostic</h2>
                <p className="text-slate-600 mt-1">Enter your vehicle details for analysis</p>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Vehicle Model</label>
                    <select
                      name="car"
                      value={formData.car}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Tesla Model 3 LR</option>
                      <option>Tesla Model Y LR</option>
                      <option>Nissan Leaf Plus</option>
                      <option>BMW i4</option>
                      <option>Hyundai Ioniq 5</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Manufacturing Year</label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      min="2015"
                      max={new Date().getFullYear()}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Mileage (km)</label>
                    <input
                      type="number"
                      name="km"
                      value={formData.km}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Max Charging Level (%)</label>
                    <input
                      type="number"
                      name="maxSoc"
                      value={formData.maxSoc}
                      onChange={handleChange}
                      min="50"
                      max="100"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Min Discharge Level (%)</label>
                    <input
                      type="number"
                      name="minSoc"
                      value={formData.minSoc}
                      onChange={handleChange}
                      min="0"
                      max="50"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Charging Type</label>
                    <select
                      name="chargeType"
                      value={formData.chargeType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>DC</option>
                      <option>AC</option>
                      <option>Both</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Driving Style</label>
                    <select
                      name="driveStyle"
                      value={formData.driveStyle}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Conservative</option>
                      <option>Normal</option>
                      <option>Aggressive</option>
                    </select>
                  </div>

                  {error && (
                    <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-lg transition font-semibold flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Run Diagnostic'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div>
            {results ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white border-4 border-blue-600 shadow-lg mb-4">
                      <span className="text-4xl font-bold text-blue-600">{results.score?.toFixed(1)}</span>
                      <span className="text-xl font-semibold text-blue-600 ml-1">%</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Battery Health Score</h3>
                    <p className="text-slate-600 mt-2">State of Health (SoH)</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Key Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-600 uppercase tracking-wide">Current Range</p>
                      <p className="text-lg font-bold text-slate-900 mt-1">{results.current_range?.toFixed(0)} km</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-600 uppercase tracking-wide">Winter Range</p>
                      <p className="text-lg font-bold text-slate-900 mt-1">{results.winter_range?.toFixed(0)} km</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-600 uppercase tracking-wide">Annual Loss</p>
                      <p className="text-lg font-bold text-slate-900 mt-1">{results.annual_loss?.toFixed(2)}%</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-600 uppercase tracking-wide">EOL Year</p>
                      <p className="text-lg font-bold text-slate-900 mt-1">{results.eol}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Financial Assessment</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Market Price</span>
                      <span className="font-bold text-slate-900">{results.market_price}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Battery Value</span>
                      <span className="font-bold text-slate-900">{results.battery_value}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-green-700 font-semibold">Annual Savings</span>
                      <span className="font-bold text-green-700">{results.savings}/year</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-lg p-12 text-center h-96 flex items-center justify-center">
                <div>
                  <p className="text-slate-600">Fill the form and click "Run Diagnostic" to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
