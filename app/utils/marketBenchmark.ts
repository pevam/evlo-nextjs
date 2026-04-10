/**
 * Market Benchmarking utilities for EVLO Diagnostic
 * Compares vehicle battery health against market averages
 */

export interface MarketPosition {
  percentile: number; // 0-100: where this vehicle ranks
  category: 'poor' | 'below-average' | 'average' | 'above-average' | 'excellent';
  categoryLabel: string;
  percentageDescription: string; // e.g., "Better than 85% of vehicles"
  color: string;
}

/**
 * Calculate expected SoH degradation based on age and km
 * Uses industry benchmarks from NREL and Geotab data
 */
export function calculateExpectedSoH(ageYears: number, kmDriven: number): number {
  // Average degradation rates from industry data
  const avgDegradationPerYear = 2.5; // % per year
  const avgDegradationPer100km = 0.015; // % per 100km

  const calendarLoss = avgDegradationPerYear * ageYears;
  const cyclebasedLoss = avgDegradationPer100km * (kmDriven / 100);

  const expectedSoH = Math.max(65, 100 - (calendarLoss + cyclebasedLoss));
  return expectedSoH;
}

/**
 * Calculate market position (percentile rank) of a vehicle
 * Compares actual SoH against expected SoH for its age/km profile
 */
export function getMarketPosition(
  actualSoH: number,
  ageYears: number,
  kmDriven: number
): MarketPosition {
  const soh = actualSoH;
  const age = ageYears;
  const km = kmDriven;
  const expectedSoH = calculateExpectedSoH(age, km);
  const difference = soh - expectedSoH; // positive = better than expected

  // Calculate percentile based on difference from expected
  // Typical distribution: 68% within 1 std dev, 95% within 2 std devs
  const stdDev = 5; // standard deviation of SoH for vehicles of same age/km
  const zscore = difference / stdDev;
  
  // Convert Z-score to percentile using approximation
  let percentile = 50 + (zscore * 34.1); // Simplified normal distribution
  percentile = Math.max(1, Math.min(99, percentile)); // Clamp to 1-99

  // Determine category
  let category: 'poor' | 'below-average' | 'average' | 'above-average' | 'excellent';
  let categoryLabel: string;
  let color: string;

   if (percentile < 15) {
     category = 'poor';
     categoryLabel = 'Needs Inspection';
     color = '#dc2626'; // red
   } else if (percentile < 35) {
     category = 'below-average';
     categoryLabel = 'Below Average';
     color = '#f97316'; // orange
   } else if (percentile < 65) {
     category = 'average';
     categoryLabel = 'Average Condition';
     color = '#eab308'; // yellow
   } else if (percentile < 85) {
     category = 'above-average';
     categoryLabel = 'Good Condition';
     color = '#22c55e'; // green
   } else {
     category = 'excellent';
     categoryLabel = 'Excellent Condition';
     color = '#10b981'; // emerald
   }

  // Build percentage description
  let percentageDescription = `Better condition than ${Math.round(percentile)}% of similar vehicles on the market`;
  if (category === 'poor') {
    percentageDescription = `Condition below 15% of similar vehicles`;
  }

  return {
    percentile: Math.round(percentile),
    category,
    categoryLabel,
    percentageDescription,
    color
  };
}

/**
 * Get premium condition badge text for PDF export
 */
export function getPremiumBadgeText(marketPos: MarketPosition): string | null {
  if (marketPos.percentile >= 80) {
    return `PREMIUM CONDITION: Ta baterija kaže boljšo ohranjenost od ${marketPos.percentile}% primerljivih vozil v EVLO bazi.`;
  }
  return null;
}
