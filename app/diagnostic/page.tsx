'use client';

import { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RChartsTooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import EmailModal from '@/app/components/EmailModal';
import Tooltip from '@/app/components/Tooltip';
import RangeProjectionChart from '@/app/components/RangeProjectionChart';
import QRCodeVerify from '@/app/components/QRCodeVerify';
import EVLOGradeBadge from '@/app/components/EVLOGradeBadge';
import CarSelector from '@/app/components/CarSelector';
import MarketPositionGauge from '@/app/components/MarketPositionGauge';
import { EV_DATABASE, EVDatabaseEntry } from '@/app/data/ev-database';
import { getMarketPosition, getPremiumBadgeText, type MarketPosition } from '@/app/utils/marketBenchmark';

declare global {
  interface Window {
    Chart: any;
  }
}

interface DiagnosticResult {
  car: string;
  year: number;
  km: number;
  age: string;
  chemistry: string;
  fleet: number;
  score: string;
  annLoss: string;
  realRange: number;
  winterRange: number;
  summerRange: number;
  savings: number;
  isWarrantied: string;
  eol: number;
  wltp: number;
  lostRange: number;
  batteryValue: string;
  lostValue: string;
  cycles: number;
  marketPosition: MarketPosition;
  premiumBadge: string | null;
}

// EV database now imported from app/data/ev-database.ts

export default function DiagnosticPage() {
  const [screen, setScreen] = useState('input');
  const [selectedCar, setSelectedCar] = useState<EVDatabaseEntry | null>(null);
  const [batteryCapacity, setBatteryCapacity] = useState('75');
  const [wltpRange, setWltpRange] = useState('600');
  const [batteryChemistry, setBatteryChemistry] = useState('NMC');
  const [carYear, setCarYear] = useState('2022');

  // Auto-fill states when car is selected
  useEffect(() => {
    if (selectedCar) {
      setBatteryCapacity(selectedCar.batteryCapacity.toString());
      setWltpRange(selectedCar.wltpRange.toString());
      setBatteryChemistry(selectedCar.chemistry);
    }
  }, [selectedCar]);
  const [carKm, setCarKm] = useState('50000');
  const [carVin, setCarVin] = useState('');
  const [carImage, setCarImage] = useState('');
  const [maxSoC, setMaxSoC] = useState('0.95');
  const [minSoC, setMinSoC] = useState('0.95');
  const [chargeType, setChargeType] = useState('0.95');
  const [driveMode, setDriveMode] = useState('0.95');
  const [summerParking, setSummerParking] = useState('0.95');
  const [winterParking, setWinterParking] = useState('0.95');
  const [avgTemp, setAvgTemp] = useState('15');
  const [avgElevation, setAvgElevation] = useState('100');
  const [hasHeatPump, setHasHeatPump] = useState(true);
  const [hasV2L, setHasV2L] = useState(false);
  const [climateRegion, setClimateRegion] = useState('moderate'); // moderate | hot | cold
  const [dcChargingPercent, setDcChargingPercent] = useState(50); // 0-100%
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [reportId, setReportId] = useState('');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [collectedEmail, setCollectedEmail] = useState('');
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `EVLO-Certifikat-${reportId}`
  });

  const handlePrintClick = () => {
    setIsEmailModalOpen(true);
  };

  const handleEmailSubmit = (email: string) => {
    setCollectedEmail(email);
    console.log('User email for PDF:', email);
    setTimeout(() => {
      setIsEmailModalOpen(false);
      handlePrint();
    }, 500);
  };

  const EVLO_LOGO = (
    <svg width="78" height="44" viewBox="0 0 78 44" fill="none">
      <g clipPath="url(#clip0_1_378)">
        <path d="M10.7991 36.9239C8.77177 36.9239 6.98711 36.4813 5.44516 35.5961C3.90321 34.6823 2.70392 33.4117 1.84728 31.784C0.990647 30.1564 0.562328 28.2575 0.562328 26.0874C0.562328 23.8887 0.990647 21.9755 1.84728 20.3479C2.70392 18.7203 3.90321 17.4496 5.44516 16.5359C6.98711 15.6222 8.77177 15.1653 10.7991 15.1653C12.8551 15.1653 14.654 15.6222 16.196 16.5359C17.7379 17.4496 18.9372 18.7203 19.7938 20.3479C20.6505 21.9755 21.0788 23.8887 21.0788 26.0874C21.0788 26.2873 21.0645 26.5014 21.036 26.7299C21.036 26.9298 21.0217 27.1154 20.9931 27.2867H4.63136V23.6032H17.9092L16.7099 26.0874C16.7099 23.9173 16.2245 22.1326 15.2537 20.7334C14.2828 19.3342 12.798 18.6347 10.7991 18.6347C9.02876 18.6347 7.61531 19.2057 6.55879 20.3479C5.50227 21.4616 4.97401 22.9321 4.97401 24.7596V26.9869C4.97401 28.9 5.48799 30.4277 6.51596 31.5699C7.54392 32.6835 8.97165 33.2403 10.7991 33.2403C12.4839 33.2403 13.7831 32.8834 14.6968 32.1695C15.6106 31.4557 16.4101 30.5705 17.0954 29.514L20.3078 31.527C19.337 33.326 18.0806 34.6823 16.5386 35.5961C15.0252 36.4813 13.1121 36.9239 10.7991 36.9239ZM41.4376 15.5936L33.5566 36.4955H29.4876L21.1782 15.5936H25.9325L31.7576 31.8269H31.2008L36.769 15.5936H41.4376ZM47.4271 36.7097C46.6847 36.7097 46.0279 36.5384 45.4568 36.1957C44.8857 35.8245 44.4288 35.2963 44.0862 34.6109C43.7721 33.9256 43.615 33.0833 43.615 32.0839V7.32705H47.8126V30.5847C47.8126 31.4699 48.0267 32.0696 48.455 32.3837C48.9119 32.6978 49.4259 32.8548 49.997 32.8548V36.2814C49.6258 36.4242 49.226 36.5241 48.7977 36.5812C48.3694 36.6669 47.9125 36.7097 47.4271 36.7097ZM62.3356 36.9239C60.2225 36.9239 58.3522 36.4813 56.7246 35.5961C55.1255 34.6823 53.8834 33.4117 52.9982 31.784C52.113 30.1564 51.6704 28.2575 51.6704 26.0874C51.6704 23.8887 52.113 21.9755 52.9982 20.3479C53.8834 18.7203 55.1255 17.4496 56.7246 16.5359C58.3522 15.6222 60.2225 15.1653 62.3356 15.1653C64.4772 15.1653 66.3475 15.6222 67.9465 16.5359C69.5456 17.4496 70.7877 18.7203 71.6729 20.3479C72.5867 21.9755 73.0435 23.8887 73.0435 26.0874C73.0435 28.2575 72.5867 30.1564 71.6729 31.784C70.7877 33.4117 69.5456 34.6823 67.9465 35.5961C66.3475 36.4813 64.4772 36.9239 62.3356 36.9239ZM62.3356 32.812C64.2487 32.812 65.7764 32.1981 66.9186 30.9702C68.0893 29.7138 68.6747 28.0862 68.6747 26.0874C68.6747 24.06 68.0893 22.4181 66.9186 21.1617C65.7764 19.9053 64.2487 19.2771 62.3356 19.2771C60.451 19.2771 58.9233 19.9053 57.7526 21.1617C56.6104 22.3896 56.0393 24.0172 56.0393 26.0446C56.0393 28.0719 56.6104 29.7138 57.7526 30.9702C58.9233 32.1981 60.451 32.812 62.3356 32.812Z" fill="#1E1E1E"></path>
        <circle cx="73.9824" cy="12.4602" r="3.11504" fill="#B8EC3F"></circle>
      </g>
    </svg>
  );

  const calculateDiagnostic = () => {
    if (!selectedCar) {
      alert("Prosimo, izberi model vozila");
      return;
    }
    const car = selectedCar;

    const year = parseInt(carYear) || 2022;
    const km = parseFloat(carKm) || 0;
    const curYear = 2026;
    const age = Math.max(0.3, curYear - year);

    let climateStress = ((parseFloat(summerParking) + parseFloat(winterParking)) / 2) - 0.95;
    const tempDiff = Math.abs(parseFloat(avgTemp) - 20);
    climateStress += (tempDiff / 10) * 0.1;

    let maxSocStress = 0;
    if (car.chemistry === 'NMC' && parseFloat(maxSoC) >= 1.10) {
      maxSocStress = (parseFloat(maxSoC) - 1.0) * 1.5;
    }

    // Phase 11: Non-linear physics with climate and chemistry factors
    let alphaFactor = (car.baseDegration + (climateStress > 0 ? climateStress : 0) + maxSocStress) * 2.8;
    
    // Apply temperature coefficient based on climate region
    let temperatureCoefficient = 1.0;
    if (climateRegion === 'hot') temperatureCoefficient = 1.2; // 20% faster degradation in hot climates
    if (climateRegion === 'cold') temperatureCoefficient = 0.95; // 5% slower in cold climates
    
    // Apply LFP chemistry reduction (20% more stable)
    let chemistryFactor = 1.0;
    if (car.chemistry === 'LFP') chemistryFactor = 0.8;
    
    // Non-linear calendar loss: higher in first year (SEI layer formation)
    let calendarLoss = 0;
    if (age <= 1) {
      // First year: 3-4% fixed loss
      calendarLoss = 3.5 * chemistryFactor;
    } else {
      // After first year: standard log degradation
      calendarLoss = (3.5 * chemistryFactor) + (alphaFactor * temperatureCoefficient * Math.log(age));
    }

    const cycles = (km * (car.efficiency / 100)) / car.batteryCapacity;
    
    // Phase 11: DC charging penalty from slider (0-100%)
    const dcPenaltyFromSlider = (dcChargingPercent / 20) * 0.1; // +0.1% per 20% DC
    
    let dcChargingPenalty = dcPenaltyFromSlider;
    if (parseFloat(chargeType) >= 1.30) dcChargingPenalty += 0.2;
    if (parseFloat(chargeType) >= 1.50) dcChargingPenalty += 0.4;

    let wearPerCycle = parseFloat(driveMode) * (hasV2L ? 1.05 : 1.0);
    wearPerCycle += (parseFloat(avgElevation) / 100) * 0.05;

    let betaFactor = (wearPerCycle + dcChargingPenalty) * 0.12;
    let cyclicLoss = betaFactor * Math.pow(cycles, 0.55);

    let totalLoss = calendarLoss + cyclicLoss;
    const score = Math.max(0, Math.min(100, 100 - totalLoss));
    const annLoss = age > 0.5 ? (totalLoss / age) : alphaFactor * Math.log(2);

    const costEstimate = 25000; // Default estimate per kWh * capacity
    const realRange = Math.round(car.wltpRange * (score / 100));
    const winterPenalty = hasHeatPump ? 0.80 : 0.70;
    const winterRange = Math.round(realRange * winterPenalty);
    const summerRange = Math.round(realRange * 0.98);

    const avgYearlyKm = km > 0 ? Math.round(km / age) : 15000;
    const savings = Math.round((avgYearlyKm / 100) * 7.5);

    const isWarrantied = (age <= 8 && km <= 160000);
    const eol = Math.round(curYear + Math.max(1, (score - 70) / annLoss));

    const lossEuro = Math.round(costEstimate * ((100 - score) / 100));
    
    // Calculate market position
    const marketPosition = getMarketPosition(score, Math.max(0.3, curYear - year), km);

    setResult({
      car: `${car.make} ${car.model}`,
      year,
      km,
      age: age.toFixed(1),
      chemistry: car.chemistry,
      fleet: car.estimatedFleet,
      score: score.toFixed(1),
      annLoss: annLoss.toFixed(2),
      realRange,
      winterRange,
      summerRange,
      savings,
      isWarrantied: isWarrantied ? 'Veljavna' : 'Potekla',
      eol,
      wltp: car.wltpRange,
      lostRange: car.wltpRange - realRange,
      batteryValue: (costEstimate - lossEuro).toLocaleString('sl-SI'),
      lostValue: lossEuro.toLocaleString('sl-SI'),
      cycles: Math.round(cycles),
      marketPosition: marketPosition,
      premiumBadge: getPremiumBadgeText(marketPosition)
    });

    setReportId('EVLO-' + Math.random().toString(36).substr(2, 6).toUpperCase());
    setScreen('result');
  };

  const formatDate = () => {
    const d = new Date();
    return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
  };

  if (screen === 'result' && result) {
    return (
      <div className="evlo-page">
        <EmailModal 
          isOpen={isEmailModalOpen} 
          onClose={() => setIsEmailModalOpen(false)}
          onSubmit={handleEmailSubmit}
        />
        <div className="evlo-wrapper">
          <div className="evlo-card" ref={printRef} style={{ pageBreakAfter: 'avoid' }}>
            <div className="report-top-bar">
              <div className="report-logo">{EVLO_LOGO}</div>
              <div className="report-meta-info">
                <div>ID: {reportId}</div>
                <div>{formatDate()}</div>
                {carVin && <div>VIN: {carVin}</div>}
              </div>
            </div>

            <div className="diag-header">
              {carImage && (
                <img 
                  src={carImage} 
                  alt="Car" 
                  className="car-avatar"
                  style={{ display: 'block', width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover' }}
                />
              )}
              <div className="diag-header-text">
                <h3>{result.car}</h3>
                <div className="badge-container">
                  <div className="tech-badge">
                    <span className="dot" style={{ background: '#3182CE' }}></span> Kemija: <span>{result.chemistry}</span>
                  </div>
                  <div className="tech-badge">
                    <span className="dot" style={{ background: '#1E1E1E' }}></span> Primerjava: <span>{result.fleet} vozil</span>
                  </div>
                  <div className="tech-badge">
                    <span className="dot" style={{ background: '#555' }}></span> Garancija: <span>{result.isWarrantied}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ai-insight-box">
              <div className="ai-insight-title">SISTEMSKO OBVESTILO</div>
              <p className="ai-insight-text">
                Priporočamo optimalnega varovanja baterije za maksimalno dolžino življenja.
              </p>
            </div>

            <div className="score-hero">
              <div className="big-score-box">
                <div className="big-num">{result.score}%</div>
                <div className="big-unit">SoH (Zdravje Baterije)</div>
              </div>
              <div className="score-details">
                <div className="score-details-title">Diagnostični status: 
                  <span style={{ color: 'rgba(158, 225, 0, 1)' }}>
                    {parseFloat(result.score) >= 94 ? ' Optimalno' : parseFloat(result.score) >= 85 ? ' Skladno' : ' Degradacija'}
                  </span>
                </div>
                <p>Izračun temelji na Geotab/NREL modelu degradacije.</p>
              </div>
            </div>

            <div className="highlights-grid">
              <div className="highlight-card" style={{ gridColumn: 'span 3', border: '2px solid rgba(158, 225, 0, 1)', background: '#faffea' }}>
                <div className="highlight-icon">💶</div>
                <div className="highlight-value">{result.batteryValue} €</div>
                <div className="highlight-label">Vrednost baterije</div>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">🔋</div>
                <div className="highlight-value">{result.realRange} km</div>
                <div className="highlight-label">Doseg</div>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">❄️</div>
                <div className="highlight-value">{result.winterRange} km</div>
                <div className="highlight-label">Zimski doseg</div>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">☀️</div>
                <div className="highlight-value">{result.summerRange} km</div>
                <div className="highlight-label">Poletni doseg</div>
              </div>
            </div>

            <div className="data-grid">
              <div className="data-card">
                <span className="label">Originalni doseg</span>
                <div className="value">{result.wltp} km</div>
                <span className="sub" style={{ color: '#ff4d4d' }}>Izguba: -{result.lostRange} km</span>
              </div>
              <div className="data-card">
                <span className="label">Tehnična vrednost</span>
                <div className="value">{result.batteryValue} €</div>
                <span className="sub">Amortizacija: -{result.lostValue} €</span>
              </div>
              <div className="data-card">
                <span className="label">Predviden EOL</span>
                <div className="value">Leto {result.eol}</div>
                <span className="sub" style={{ color: '#3182CE' }}>Letni padec: {result.annLoss}%</span>
              </div>
            </div>

            {/* Market Position Gauge */}
            <MarketPositionGauge 
              marketPosition={result.marketPosition}
              title="Tržni položaj vozila"
            />

            {/* Premium Badge for PDF */}
            {result.premiumBadge && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(184, 236, 63, 0.1) 0%, rgba(158, 225, 0, 0.1) 100%)',
                border: '2px solid #B8EC3F',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: '#1E1E1E',
                  lineHeight: '1.6'
                }}>
                  {result.premiumBadge}
                </div>
              </div>
            )}

            <div style={{ marginTop: '40px', marginBottom: '40px' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', color: '#1E1E1E' }}>📊 Interaktivne analize</h4>
              
              {/* Chart 1: SoH Degradation */}
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
                <h5 style={{ marginBottom: '15px', color: '#1E1E1E', fontWeight: '600' }}>Krivulja degradacije (SoH skozi čas)</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={(() => {
                    const currentYear = 2026;
                    const carYear = result.year;
                    const annLoss = parseFloat(result.annLoss);
                    const data = [];
                    
                    for (let i = carYear; i <= currentYear + 5; i++) {
                      const yearsSincePurchase = i - carYear;
                      const projectedSoH = Math.max(0, 100 - (annLoss * yearsSincePurchase));
                      const isHistorical = i <= currentYear;
                      data.push({
                        year: i,
                        soh: isHistorical ? parseFloat(result.score) - (annLoss * (currentYear - carYear - yearsSincePurchase)) : projectedSoH,
                        projected: !isHistorical
                      });
                    }
                    return data;
                  })()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis dataKey="year" stroke="#666" />
                    <YAxis stroke="#666" domain={[0, 100]} />
                    <RChartsTooltip 
                      contentStyle={{ background: '#1E1E1E', border: '1px solid #B8EC3F', color: '#fff' }}
                      formatter={(value: any) => `${Number(value).toFixed(1)}%`}
                    />
                    <ReferenceLine y={70} stroke="#ff4d4d" strokeDasharray="5 5" label={{ value: 'Garancija meja (70%)', fill: '#ff4d4d' }} />
                    <Line type="monotone" dataKey="soh" stroke="#B8EC3F" strokeWidth={3} dot={{ fill: '#B8EC3F' }} name="SoH %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Chart 2: Battery Value Depreciation */}
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
                <h5 style={{ marginBottom: '15px', color: '#1E1E1E', fontWeight: '600' }}>💶 Finančni padec vrednosti (Amortizacija)</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={(() => {
                    const car = EV_DATABASE.find(c => `${c.make} ${c.model}` === result.car);
                    const currentYear = 2026;
                    const carYear = result.year;
                    const annLoss = parseFloat(result.annLoss);
                    const baseCost = car ? 25000 : 20000;
                    const data = [];
                    
                    for (let i = carYear; i <= currentYear + 5; i++) {
                      const yearsSincePurchase = i - carYear;
                      const projectedSoH = Math.max(0, 100 - (annLoss * yearsSincePurchase));
                      const batteryValue = Math.round(baseCost * (projectedSoH / 100));
                      data.push({
                        year: i,
                        value: batteryValue
                      });
                    }
                    return data;
                  })()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis dataKey="year" stroke="#666" />
                    <YAxis stroke="#666" />
                    <RChartsTooltip 
                      contentStyle={{ background: '#1E1E1E', border: '1px solid #B8EC3F', color: '#fff' }}
                      formatter={(value) => `${value.toLocaleString('sl-SI')} €`}
                    />
                    <Line type="monotone" dataKey="value" stroke="#3182CE" strokeWidth={3} dot={{ fill: '#3182CE' }} name="Vrednost €" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Chart 3: Range Comparison */}
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
                <h5 style={{ marginBottom: '15px', color: '#1E1E1E', fontWeight: '600' }}>🗺️ Primerjava dosega: Idealno vs. Poletje vs. Zima</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    {
                      name: 'Domet',
                      Idealno: result.wltp,
                      Poletje: result.summerRange,
                      Zima: result.winterRange
                    }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <RChartsTooltip 
                      contentStyle={{ background: '#1E1E1E', border: '1px solid #B8EC3F', color: '#fff' }}
                      formatter={(value) => `${value} km`}
                    />
                    <Legend />
                    <Bar dataKey="Idealno" fill="#9AE500" name="Idealno (WLTP)" />
                    <Bar dataKey="Poletje" fill="#FFB84D" name="Poletje (80%)" />
                    <Bar dataKey="Zima" fill="#4DA6FF" name="Zima (70%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Chart 4: Range Projection Over Years */}
              <RangeProjectionChart
                year={result.year}
                annLoss={parseFloat(result.annLoss)}
                wltpRange={result.wltp}
                winterRange={result.winterRange}
                summerRange={result.summerRange}
                carModel={result.car}
              />
            </div>

            {/* Methodology Section */}
            <div style={{ 
              background: '#f0f8ff', 
              padding: '25px', 
              borderRadius: '12px', 
              marginBottom: '30px',
              border: '1px solid #d0e8ff'
            }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '15px', color: '#1E1E1E' }}>
                🔬 Metodologija izračuna (Phase 11: Scientific Optimization)
              </h4>
              <p style={{ margin: '0 0 12px 0', color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Naši izračuni temeljijo na industrijskih raziskavah degradacije litij-ionskih baterij, posebej na modelih <strong>NREL</strong> 
                (National Renewable Energy Laboratory) in <strong>Geotab</strong>. Model upošteva <strong>temperaturni koeficient, DC polnilni stres in specifično kemijo baterije</strong>.
              </p>
              <ul style={{ margin: '12px 0', paddingLeft: '20px', color: '#555', fontSize: '0.9rem', lineHeight: '1.8' }}>
                <li><strong>Nelinearno staranje:</strong> Prvo leto: fiksna 3-4% degradacija (SEI sloj). Po prvem letu: logaritemski model.</li>
                <li><strong>Temperaturni vpliv:</strong> Vroča podnebja (+20% hitrost degradacije), hladna podnebja (-5% hitrost).</li>
                <li><strong>DC Charging Penalty:</strong> Vsakih 20% deleža DC polnjenja = +0.1% dodatne letne ciklične degradacije.</li>
                <li><strong>LFP Kemija:</strong> Litij-železo-fosfatne baterije so 20% bolj stabilne v mirovanju.</li>
                <li><strong>Ciklično staranje:</strong> Globina cikla, temperatura vožnje in vrste polnilnice.</li>
              </ul>
              <p style={{ margin: '12px 0 0 0', color: '#888', fontSize: '0.85rem', fontStyle: 'italic' }}>
                ℹ️ Rezultati so matematični večvidični modeli, namenjeni informativni presoji. Za absolutno točnost svetujemo strojni pregled (OBD2 sonda).
              </p>
            </div>

            <div className="audit-log-wrapper">
              <div className="audit-log-header">Tehnični podatki</div>
              <div className="audit-log">
                <div className="audit-item">
                  <span className="key">Starost / Km:</span>
                  <span className="val">{result.age} let / {result.km} km</span>
                </div>
                <div className="audit-item">
                  <span className="key">Polni cikli:</span>
                  <span className="val">{result.cycles} ciklov</span>
                </div>
                <div className="audit-item">
                  <span className="key">Letni padec:</span>
                  <span className="val">{result.annLoss}%</span>
                </div>
                <div className="audit-item">
                  <span className="key">Model:</span>
                  <span className="val">EVLO Geotab V1</span>
                </div>
              </div>
            </div>

            <button 
              className="evlo-btn-pill"
              onClick={handlePrintClick}
              style={{ marginTop: '20px', background: 'linear-gradient(135deg, #B8EC3F 0%, #9AE500 100%)', color: '#1E1E1E', fontWeight: 'bold' }}
            >
              📄 Prenesi EVLO Certifikat (PDF)
            </button>

            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ddd', fontSize: '0.75rem', color: '#888', lineHeight: '1.6' }}>
              <strong>Izjava o omejitvi odgovornosti:</strong> EVLO diagnostika je matematična projekcija, ki temelji na industrijskih modelih degradacije baterij (koledarsko in ciklično staranje). Rezultati so visoko natančni približki, namenjeni informiranju pri nakupu ali prodaji vozila. Za absolutno potrditev stanja celic je potreben strojni (OBD2) presek modula.
              <br /><br />
              <strong>Vir:</strong> EVLO Automotive Database V1.0 | Podatki o vozilih na dan 2026
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="evlo-page">
      <div className="evlo-wrapper">
        <div className="evlo-card">
          <h2>
            {EVLO_LOGO}
            <span>analiza</span>
          </h2>

          <div className="ai-scan-box">
            <div className="ai-scan-title">EVLO AI Vision</div>
            <div className="ai-scan-desc">Naloži sliko za avtomatski vnos podatkov</div>
            <button className="ai-btn">Skeniraj armaturno ploščo</button>
          </div>

          <div className="form-group">
            <label className="form-label">Model vozila</label>
            <CarSelector value={selectedCar} onSelect={setSelectedCar} />
          </div>

          <div className="evlo-grid-2">
            <div>
              <label className="form-label">Letnik</label>
              <input type="number" className="evlo-field" value={carYear} onChange={(e) => setCarYear(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Prevoženi km</label>
              <input type="number" className="evlo-field" value={carKm} onChange={(e) => setCarKm(e.target.value)} />
            </div>
          </div>

          <div className="evlo-grid-2">
            <div>
              <label className="form-label">VIN</label>
              <input type="text" className="evlo-field" placeholder="VIN" value={carVin} onChange={(e) => setCarVin(e.target.value.toUpperCase())} />
            </div>
            <div>
              <label className="form-label">Slika vozila</label>
              <div className="file-upload-wrapper">
                <div className="btn-file-upload">📷 Naloži sliko</div>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const reader = new FileReader();
                      reader.onload = (evt) => {
                        if (evt.target?.result) {
                          setCarImage(evt.target.result as string);
                        }
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '20px 0', color: '#ccc' }}>--- Podrobna analiza ---</div>

          <div className="evlo-grid-2" style={{ marginBottom: '15px' }}>
            <label className="hw-toggle-box">
              <span>Toplotna črpalka</span>
              <input type="checkbox" checked={hasHeatPump} onChange={(e) => setHasHeatPump(e.target.checked)} />
            </label>
            <label className="hw-toggle-box">
              <span>V2L</span>
              <input type="checkbox" checked={hasV2L} onChange={(e) => setHasV2L(e.target.checked)} />
            </label>
          </div>

          <div className="evlo-grid-2">
            <div>
              <label className="form-label">Polnjenje zgoraj (Max SoC)</label>
              <select className="evlo-field" value={maxSoC} onChange={(e) => setMaxSoC(e.target.value)}>
                <option value="0.95">70 - 80% (Brez stresa)</option>
                <option value="1.10">90% (Zmerno)</option>
                <option value="1.25">100% (Občasno polno)</option>
                <option value="1.45">Vedno 100% (Kritično)</option>
              </select>
            </div>
            <div>
              <label className="form-label">Praznjenje spodaj (Min SoC)</label>
              <select className="evlo-field" value={minSoC} onChange={(e) => setMinSoC(e.target.value)}>
                <option value="0.95">Redko pod 20%</option>
                <option value="1.10">Pogosto do 10%</option>
                <option value="1.30">Večkrat do 0% (Deep cycle)</option>
              </select>
            </div>
          </div>

          <div className="evlo-grid-2">
            <div>
              <label className="form-label">Vrsta polnilnic</label>
              <select className="evlo-field" value={chargeType} onChange={(e) => setChargeType(e.target.value)}>
                <option value="0.95">Počasno (AC do 11kW)</option>
                <option value="1.15">Mešano (AC/DC)</option>
                <option value="1.30">Hitro (DC do 100kW)</option>
                <option value="1.50">Supercharge (DC 150kW+)</option>
              </select>
            </div>
            <div>
              <label className="form-label">Režim vožnje</label>
              <select className="evlo-field" value={driveMode} onChange={(e) => setDriveMode(e.target.value)}>
                <option value="0.95">Eco / Mestna vožnja</option>
                <option value="1.05">Mešano (Lokalno/AC)</option>
                <option value="1.25">Avtocesta (130km/h+)</option>
                <option value="1.40">Športna / Dirkaška</option>
              </select>
            </div>
          </div>

          <div className="evlo-grid-2">
            <div>
              <label className="form-label">Parkiranje poleti</label>
              <select className="evlo-field" value={summerParking} onChange={(e) => setSummerParking(e.target.value)}>
                <option value="0.95">Hladna garaža / Podzemna</option>
                <option value="1.10">Nadstrešek (Senca)</option>
                <option value="1.35">Na prostem (Sončna vročina)</option>
              </select>
            </div>
            <div>
              <label className="form-label">Parkiranje pozimi</label>
              <select className="evlo-field" value={winterParking} onChange={(e) => setWinterParking(e.target.value)}>
                <option value="0.95">Ogrevana garaža (&gt;15°C)</option>
                <option value="1.10">Hladna garaža (5-10°C)</option>
                <option value="1.25">Zunaj pod nadstreškom</option>
                <option value="1.45">Zunaj na mrazu (pod 0°C)</option>
              </select>
            </div>
          </div>

          <div className="evlo-grid-2">
            <div>
              <label className="form-label">Povprečna temperatura (°C)</label>
              <input type="number" className="evlo-field" placeholder="npr. 15" value={avgTemp} onChange={(e) => setAvgTemp(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Povprečna višinska razlika (m)</label>
              <input type="number" className="evlo-field" placeholder="npr. 100" value={avgElevation} onChange={(e) => setAvgElevation(e.target.value)} />
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '20px 0', color: '#ccc' }}>--- Klimatski in polnilni parametri (Phase 11) ---</div>

          <div className="evlo-grid-2">
            <div>
              <label className="form-label">Podnebje (Regija)</label>
              <select className="evlo-field" value={climateRegion} onChange={(e) => setClimateRegion(e.target.value)}>
                <option value="moderate">🌍 Zmerno (Slovenija)</option>
                <option value="hot">☀️ Vroče (Sredozemlje)</option>
                <option value="cold">❄️ Hladno (Skandinavija)</option>
              </select>
            </div>
            <div>
              <label className="form-label">Delež DC Polnjenja: {dcChargingPercent}%</label>
              <input 
                type="range" 
                className="evlo-field" 
                min="0" 
                max="100" 
                value={dcChargingPercent} 
                onChange={(e) => setDcChargingPercent(parseInt(e.target.value))}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

          <button className="evlo-btn-pill" onClick={calculateDiagnostic}>Zagon Diagnostike</button>
        </div>
      </div>
    </div>
  );
}
