// EVLO Copy Engine — Strokovnjak za pisanje besedil za diagnostiko baterij
// Generiira tehnično zaupanja vredne opise brez hvalisanja ali praznih besed

interface CopyEngineInput {
  score: number; // SoH percentage 0-100
  annLoss: number; // Annual loss percentage
  realRange: number; // Current range in km
  winterRange: number; // Winter range in km
  summerRange: number; // Summer range in km
  year: number; // Vehicle year
  km: number; // Kilometers driven
  age: number; // Vehicle age in years
  eol: number; // End of life year
  isWarrantied: boolean;
  percentile: number; // Market percentile 0-100
  fleet: number; // Number of vehicles in comparison fleet
}

// 1. HEADLINE (max 8 words)
export function generateHeadline(input: CopyEngineInput): string {
  return `Zdravje baterije: ${input.score.toFixed(1)}% — ${getConditionLabel(input.score)}`;
}

// 2. OZNAKA STANJA (2–4 words for visual badge)
export function generateStatusBadge(input: CopyEngineInput): string {
  if (input.score >= 85) return 'Nadpovprečna ohranjenost';
  if (input.score >= 77) return 'Standardna ohranjenost';
  if (input.score >= 70) return 'Povečana obraba';
  return 'Napredna degradacija';
}

// 3. KAJ POMENI SOH (2 sentences)
export function generateSoHExplanation(input: CopyEngineInput): string {
  return `SoH (State of Health) je odstotek preostale kapacitete baterije glede na novo. Vaša baterija ima ${input.score.toFixed(1)}% preostale kapacitete z intervalom zaupanja ±3%.`;
}

// 4. DOSEG (2 sentences - with actual km values)
export function generateRangeExplanation(input: CopyEngineInput): string {
  const seasonalDifference = input.summerRange - input.winterRange;
  return `Poletna vožnja omogoča do ${input.summerRange} km, zimska vožnja pa ${input.winterRange} km dosega. Razlika ${seasonalDifference} km je tipična za Electric Vehicle in je posledica nižjih zimskih temperatur.`;
}

// 5. TRŽNI POLOŽAJ (1–2 sentences with percentile and fleet reference)
export function generateMarketPosition(input: CopyEngineInput): string {
  const percentileText = getPercentileDescription(input.percentile);
  return `Vaše vozilo je v ${percentileText} bolje ohranjenih vozil glede na primerjavo s ${input.fleet} vozili iste marke in letnika. To pomeni, da je stanje baterije ${input.percentile >= 75 ? 'nadpovprečno' : input.percentile >= 50 ? 'povprečno' : 'podpovprečno'} za to generacijo.`;
}

// 6. NAPOVED EOL (1 sentence - when SoH reaches 70%)
export function generateEOLPrediction(input: CopyEngineInput): string {
  const yearsRemaining = Math.max(1, input.eol - new Date().getFullYear());
  return `Baterija bo dosegla garancijsko mejo 70% SoH predvidoma leta ${input.eol}, torej v približno ${yearsRemaining} ${yearsRemaining === 1 ? 'letu' : 'letih'}.`;
}

// 7. GARANCIJA (1 sentence - always cautious)
export function generateWarrantyStatement(input: CopyEngineInput): string {
  if (input.isWarrantied) {
    return 'Vozilo je znotraj predvidenih parametrov garancije proizvajalca (starost in km). Status zahteva potrditev s formalno VIN dokumentacijo pri pooblaščenem servisu.';
  }
  return 'Status garancije zahteva potrditev pri pooblaščenem servisu s formalno VIN dokumentacijo.';
}

// 8. ZA KUPCA (2–3 sentences - what buyer needs to know)
export function generateForBuyer(input: CopyEngineInput): string {
  let message = '';
  
  if (input.score < 77) {
    message = `Pred nakupom upoštevajte, da baterija kaže znake povečane obrabe s ${input.score.toFixed(1)}% SoH. `;
  } else {
    message = `Baterija je v dobrem stanju s ${input.score.toFixed(1)}% SoH in bi morala zadoščati za dolgoročno uporabo. `;
  }
  
  message += `Realni doseg je ${input.realRange} km (${input.summerRange} km poleti, ${input.winterRange} km pozimi). `;
  message += `Priporočamo dodatni hardverski OBD2 pregled pri servisu za potrditev stanja celic.`;
  
  return message;
}

// 9. ZA PRODAJALCA (2–3 sentences - how to pitch results)
export function generateForSeller(input: CopyEngineInput): string {
  let message = '';
  
  if (input.percentile >= 75) {
    message = `Podatki kažejo, da je vaše vozilo v zgornji četrtini ohranjenosti (${input.percentile.toFixed(0)}. percentil) glede na primerjavo z ${input.fleet} vozili. `;
  } else if (input.percentile >= 50) {
    message = `Vaše vozilo je povprečno ohranjeno (${input.percentile.toFixed(0)}. percentil) glede na ${input.fleet} vozil iste kategorije. `;
  } else {
    message = `Vozilo ima dokumentirano stanje baterije ${input.score.toFixed(1)}% SoH, ki omogoča realna primerjava s konkurenco. `;
  }
  
  message += `Potrdilo EVLO diagnostike je neodvisna potrditev, ki povečuje zaupanje kupca. `;
  message += `Lahko ga uporabite v oglasu ali pri pogajanju o ceni.`;
  
  return message;
}

// 10. DISCLAIMER (always the same)
export function generateDisclaimer(): string {
  return 'EVLO diagnostika je matematična ocena, ki temelji na industrijskih modelih degradacije baterij (NREL, Geotab). Rezultati so informativni in ne nadomeščajo hardverskega OBD2 pregleda baterijskih celic pri pooblaščenem servisu.';
}

// Helper functions
function getConditionLabel(score: number): string {
  if (score >= 85) return 'Odličko ohranjeno';
  if (score >= 77) return 'Dobro ohranjeno';
  if (score >= 70) return 'Obnošeno';
  return 'Kritično';
}

function getPercentileDescription(percentile: number): string {
  if (percentile >= 85) return 'med 15% bolje ohranjenih';
  if (percentile >= 75) return 'med 25% bolje ohranjenih';
  if (percentile >= 50) return 'blizu povprečja';
  if (percentile >= 25) return 'med 25% slabše ohranjenih';
  return 'med 15% slabše ohranjenih';
}

// Main function to generate all copy blocks
export interface FullCopyOutput {
  headline: string;
  statusBadge: string;
  sohExplanation: string;
  rangeExplanation: string;
  marketPosition: string;
  eolPrediction: string;
  warranty: string;
  forBuyer: string;
  forSeller: string;
  disclaimer: string;
}

export function generateFullCopy(input: CopyEngineInput): FullCopyOutput {
  return {
    headline: generateHeadline(input),
    statusBadge: generateStatusBadge(input),
    sohExplanation: generateSoHExplanation(input),
    rangeExplanation: generateRangeExplanation(input),
    marketPosition: generateMarketPosition(input),
    eolPrediction: generateEOLPrediction(input),
    warranty: generateWarrantyStatement(input),
    forBuyer: generateForBuyer(input),
    forSeller: generateForSeller(input),
    disclaimer: generateDisclaimer(),
  };
}
