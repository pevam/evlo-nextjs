'use client';

import { useState } from 'react';
import { EVDatabaseEntry, EV_DATABASE } from '@/app/data/ev-database';
import CarSelector from './CarSelector';

interface WizardState {
  // Step 1: Vehicle
  selectedCar: EVDatabaseEntry | null;
  carYear: string;
  carKm: string;
  carVin: string;

  // Step 2: Charging
  maxSoC: string;
  minSoC: string;
  chargeType: string;
  dcChargingPercent: number;

  // Step 3: Environment
  driveMode: string;
  summerParking: string;
  winterParking: string;
  climateRegion: string;
  avgTemp: string;
  hasHeatPump: boolean;
}

interface DiagnosticWizardProps {
  onComplete: (data: WizardState) => void;
}

const LOADING_MESSAGES = [
  'Analiziram kemijo baterije...',
  'Uporabljam model degradacije...',
  'Primerjam z 18.000 vozili...',
  'Generiram vaše poročilo...'
];

export default function DiagnosticWizard({ onComplete }: DiagnosticWizardProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [data, setData] = useState<WizardState>({
    selectedCar: null,
    carYear: new Date().getFullYear().toString(),
    carKm: '50000',
    carVin: '',
    maxSoC: '0.95',
    minSoC: '0.95',
    chargeType: '0.95',
    dcChargingPercent: 50,
    driveMode: '0.95',
    summerParking: '0.95',
    winterParking: '0.95',
    climateRegion: 'moderate',
    avgTemp: '15',
    hasHeatPump: true
  });

  const handleNext = () => {
    if (step === 1) {
      if (!data.selectedCar) {
        alert('Prosimo, izberi model vozila');
        return;
      }
      setStep(step + 1);
    } else if (step === 3) {
      startLoading();
    } else {
      setStep(step + 1);
    }
  };

  const startLoading = () => {
    setIsLoading(true);
    let messageIndex = 0;

    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[messageIndex]);
    }, 1200);

    setTimeout(() => {
      clearInterval(messageInterval);
      setIsLoading(false);
      onComplete(data);
    }, 5000);
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '400px',
        gap: '30px'
      }}>
        <div style={{ fontSize: '1.2rem', color: '#1e1e1e', fontWeight: '500' }}>
          {loadingMessage}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#B8EC3F',
                animation: `bounce 1.4s infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
        <style>{`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(1); opacity: 1; }
            40% { transform: scale(1.3); opacity: 0.7; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {/* Progress Bar */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: s < step ? '#005258' : s === step ? '#B8EC3F' : '#e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: s === step ? '#1e1e1e' : s < step ? '#fff' : '#999',
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}
              >
                {s < step ? '✓' : s}
              </div>
              {s < 3 && (
                <div
                  style={{
                    flex: 1,
                    height: '2px',
                    background: s < step ? '#005258' : '#e0e0e0',
                    margin: '0 12px'
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Vehicle */}
      {step === 1 && (
        <div style={{ animation: 'fadeIn 0.3s' }}>
          <h2 style={{ marginBottom: '30px', color: '#1e1e1e' }}>Vozilo</h2>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#1e1e1e' }}>
              Model vozila
            </label>
            <CarSelector value={data.selectedCar} onSelect={(car) => setData({ ...data, selectedCar: car })} />
            <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '6px' }}>
              Podpiramo 200+ EV modelov.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#1e1e1e' }}>
                Letnik
              </label>
              <input
                type="number"
                value={data.carYear}
                onChange={(e) => setData({ ...data, carYear: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1.5px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#1e1e1e' }}>
                Prevoženi km
              </label>
              <input
                type="number"
                value={data.carKm}
                onChange={(e) => setData({ ...data, carKm: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1.5px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#1e1e1e' }}>
              VIN
            </label>
            <input
              type="text"
              placeholder="Neobvezno"
              value={data.carVin}
              onChange={(e) => setData({ ...data, carVin: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                border: '1.5px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
            <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '6px' }}>
              Neobvezno. Izboljša točnost rezultata.
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Charging */}
      {step === 2 && (
        <div style={{ animation: 'fadeIn 0.3s' }}>
          <h2 style={{ marginBottom: '30px', color: '#1e1e1e' }}>Polnjenje</h2>

          {/* Max SoC */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '16px', fontWeight: '600', color: '#1e1e1e', fontSize: '1rem' }}>
              Do kod običajno polnite?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { value: '0.95', label: '70–80%', sub: 'Najmanj stresa' },
                { value: '1.10', label: '90%', sub: 'Zmerno' },
                { value: '1.25', label: '100% občasno', sub: 'Sprejemljivo za daljše' },
                { value: '1.45', label: 'Vedno 100%', sub: 'Pospešuje degradacijo' }
              ].map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => setData({ ...data, maxSoC: opt.value })}
                  style={{
                    padding: '12px',
                    border: `2px solid ${data.maxSoC === opt.value ? '#B8EC3F' : '#e9ecef'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: data.maxSoC === opt.value ? '#f0fdf4' : '#fff',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontWeight: '600', color: '#1e1e1e', marginBottom: '4px' }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#888' }}>
                    {opt.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Min SoC */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '16px', fontWeight: '600', color: '#1e1e1e', fontSize: '1rem' }}>
              Do kod običajno praznite?
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { value: '0.95', label: 'Redko pod 20%', sub: 'Optimalno' },
                { value: '1.10', label: 'Pogosto do 10%', sub: 'Zmerni stres' },
                { value: '1.30', label: 'Večkrat do 0%', sub: 'Visok stres na celice' }
              ].map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => setData({ ...data, minSoC: opt.value })}
                  style={{
                    padding: '12px',
                    border: `2px solid ${data.minSoC === opt.value ? '#B8EC3F' : '#e9ecef'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: data.minSoC === opt.value ? '#f0fdf4' : '#fff',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontWeight: '600', color: '#1e1e1e', marginBottom: '4px' }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#888' }}>
                    {opt.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Charge Type */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '16px', fontWeight: '600', color: '#1e1e1e', fontSize: '1rem' }}>
              Vrsta polnilnika
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { value: '0.95', label: 'Domači AC (do 11kW)' },
                { value: '1.15', label: 'Mešano AC / DC' },
                { value: '1.30', label: 'Hitri DC (do 100kW)' },
                { value: '1.50', label: 'Supercharger / HPC' }
              ].map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => setData({ ...data, chargeType: opt.value })}
                  style={{
                    padding: '12px',
                    border: `2px solid ${data.chargeType === opt.value ? '#B8EC3F' : '#e9ecef'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: data.chargeType === opt.value ? '#f0fdf4' : '#fff',
                    textAlign: 'center',
                    fontWeight: '500',
                    color: '#1e1e1e',
                    transition: 'all 0.2s'
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </div>

          {/* DC Charging Slider */}
          <div style={{ marginBottom: '40px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#1e1e1e', fontSize: '1rem' }}>
              Delež hitrega DC polnjenja: {data.dcChargingPercent}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={data.dcChargingPercent}
              onChange={(e) => setData({ ...data, dcChargingPercent: parseInt(e.target.value) })}
              style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                background: 'linear-gradient(90deg, #e9ecef 0%, #B8EC3F 100%)',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
            <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '8px' }}>
              0% = vedno domači AC · 100% = vedno hitro polnjenje
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Environment */}
      {step === 3 && (
        <div style={{ animation: 'fadeIn 0.3s' }}>
          <h2 style={{ marginBottom: '30px', color: '#1e1e1e' }}>Okolje</h2>

          {/* Drive Mode */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '16px', fontWeight: '600', color: '#1e1e1e', fontSize: '1rem' }}>
              Režim vožnje
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { value: '0.95', label: 'Eco / Mestna', sub: 'Nizek stres' },
                { value: '1.05', label: 'Mešano', sub: 'Povprečno' },
                { value: '1.25', label: 'Avtocesta (130+ km/h)', sub: 'Višja poraba' },
                { value: '1.40', label: 'Športna / agresivna', sub: 'Maksimalni stres' }
              ].map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => setData({ ...data, driveMode: opt.value })}
                  style={{
                    padding: '12px',
                    border: `2px solid ${data.driveMode === opt.value ? '#B8EC3F' : '#e9ecef'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: data.driveMode === opt.value ? '#f0fdf4' : '#fff',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontWeight: '600', color: '#1e1e1e', marginBottom: '4px' }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#888' }}>
                    {opt.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Parking */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#1e1e1e' }}>
                Parkiranje poleti
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { value: '0.95', label: 'Podzemna / garaža' },
                  { value: '1.10', label: 'Nadstrešek (senca)' },
                  { value: '1.35', label: 'Na prostem, sonce' }
                ].map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => setData({ ...data, summerParking: opt.value })}
                    style={{
                      padding: '10px 12px',
                      border: `2px solid ${data.summerParking === opt.value ? '#B8EC3F' : '#e9ecef'}`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      background: data.summerParking === opt.value ? '#f0fdf4' : '#fff',
                      fontWeight: '500',
                      color: '#1e1e1e',
                      transition: 'all 0.2s'
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#1e1e1e' }}>
                Parkiranje pozimi
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { value: '0.95', label: 'Ogrevana garaža (15°C+)' },
                  { value: '1.10', label: 'Hladna garaža (5–10°C)' },
                  { value: '1.25', label: 'Zunaj na mrazu' }
                ].map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => setData({ ...data, winterParking: opt.value })}
                    style={{
                      padding: '10px 12px',
                      border: `2px solid ${data.winterParking === opt.value ? '#B8EC3F' : '#e9ecef'}`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      background: data.winterParking === opt.value ? '#f0fdf4' : '#fff',
                      fontWeight: '500',
                      color: '#1e1e1e',
                      transition: 'all 0.2s'
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Climate Region */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#1e1e1e', fontSize: '1rem' }}>
              Podnebna regija
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              {[
                { value: 'moderate', label: 'Zmerno (Slovenija, Srednja EU)' },
                { value: 'hot', label: 'Vroče (Sredozemlje)' },
                { value: 'cold', label: 'Hladno (Skandinavija)' }
              ].map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => setData({ ...data, climateRegion: opt.value })}
                  style={{
                    padding: '10px 12px',
                    border: `2px solid ${data.climateRegion === opt.value ? '#B8EC3F' : '#e9ecef'}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: data.climateRegion === opt.value ? '#f0fdf4' : '#fff',
                    textAlign: 'center',
                    fontWeight: '500',
                    color: '#1e1e1e',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </div>

          {/* Temperature and Heat Pump */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e1e1e' }}>
                Povprečna temperatura (°C)
              </label>
              <input
                type="number"
                value={data.avgTemp}
                onChange={(e) => setData({ ...data, avgTemp: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1.5px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '600', color: '#1e1e1e', cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  checked={data.hasHeatPump}
                  onChange={(e) => setData({ ...data, hasHeatPump: e.target.checked })}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span>Toplotna črpalka</span>
              </label>
              <div style={{ fontSize: '0.85rem', color: '#888', marginLeft: '32px' }}>
                Zmanjšuje termični stres v mrazu
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', marginTop: '40px' }}>
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          style={{
            padding: '12px 24px',
            border: '1.5px solid #e9ecef',
            background: '#fff',
            borderRadius: '8px',
            cursor: step === 1 ? 'default' : 'pointer',
            color: step === 1 ? '#ccc' : '#1e1e1e',
            fontWeight: '600',
            opacity: step === 1 ? 0.5 : 1
          }}
        >
          ← Nazaj
        </button>

        <button
          onClick={handleNext}
          style={{
            padding: '12px 24px',
            background: '#005258',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {step === 3 ? 'Zaženi diagnostiko →' : 'Naprej →'}
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
