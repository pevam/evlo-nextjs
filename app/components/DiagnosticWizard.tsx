'use client';

import { useState } from 'react';
import { EVDatabaseEntry } from '@/app/data/ev-database';
import CarSelector from './CarSelector';

interface WizardState {
  selectedCar: EVDatabaseEntry | null;
  carYear: string;
  carKm: string;
  carVin: string;
  maxSoC: string;
  minSoC: string;
  chargeType: string;
  dcChargingPercent: number;
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

const STEP_LABELS = ['Vozilo', 'Polnjenje', 'Okolje'];

// Reusable option card component - dark bg when selected
function OptionCard({
  label,
  sub,
  selected,
  onClick,
  fullWidth = false
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
  fullWidth?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '14px',
        border: selected ? '1.5px solid #1a1a1a' : '1px solid #e0e0e0',
        borderRadius: '8px',
        cursor: 'pointer',
        background: selected ? '#1a1a1a' : '#fff',
        transition: 'border-color 0.15s, background 0.15s',
        gridColumn: fullWidth ? '1 / -1' : undefined,
        userSelect: 'none' as const
      }}
      onMouseEnter={e => {
        if (!selected) (e.currentTarget as HTMLDivElement).style.borderColor = '#1a1a1a';
      }}
      onMouseLeave={e => {
        if (!selected) (e.currentTarget as HTMLDivElement).style.borderColor = '#e0e0e0';
      }}
    >
      <div style={{ fontWeight: 700, color: selected ? '#fff' : '#1a1a1a', fontSize: '0.95rem' }}>
        {label}
      </div>
      {sub && (
        <div style={{ color: selected ? '#ccc' : '#666', fontSize: '0.8rem', marginTop: '3px' }}>
          {sub}
        </div>
      )}
    </div>
  );
}

// Pill badge component - dark bg when selected
function PillBadge({
  label,
  selected,
  onClick,
  dotColor = '#888'
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  dotColor?: string;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        border: selected ? '1.5px solid #1a1a1a' : '1px solid #e0e0e0',
        borderRadius: '200px',
        cursor: 'pointer',
        background: selected ? '#1a1a1a' : '#fff',
        transition: 'border-color 0.15s, background 0.15s',
        userSelect: 'none' as const
      }}
      onMouseEnter={e => {
        if (!selected) (e.currentTarget as HTMLDivElement).style.borderColor = '#1a1a1a';
      }}
      onMouseLeave={e => {
        if (!selected) (e.currentTarget as HTMLDivElement).style.borderColor = '#e0e0e0';
      }}
    >
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: selected ? '#B8EC3F' : dotColor,
        flexShrink: 0
      }} />
      <span style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        color: selected ? '#fff' : '#1a1a1a'
      }}>
        {label}
      </span>
    </div>
  );
}

// Input field component
function Field({
  label,
  helper,
  optional,
  children
}: {
  label: string;
  helper?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a' }}>
        {label}{optional && <span style={{ color: '#888', fontWeight: 400, fontSize: '0.85rem' }}> (neobvezno)</span>}
      </label>
      {children}
      {helper && (
        <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '6px' }}>{helper}</div>
      )}
    </div>
  );
}

export default function DiagnosticWizard({ onComplete }: DiagnosticWizardProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [data, setData] = useState<WizardState>({
    selectedCar: null,
    carYear: '2022',
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
    avgTemp: '12',
    hasHeatPump: true
  });

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '0.95rem',
    background: '#fff',
    color: '#1a1a1a',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s'
  };

  const handleNext = () => {
    if (step === 3) startLoading();
    else setStep(step + 1);
  };

  const startLoading = () => {
    setIsLoading(true);
    let idx = 0;
    const iv = setInterval(() => {
      idx = (idx + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[idx]);
    }, 1200);
    setTimeout(() => {
      clearInterval(iv);
      setIsLoading(false);
      onComplete(data);
    }, 5000);
  };

  // Loading state
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '360px',
        gap: '24px',
        padding: '40px'
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'linear-gradient(90deg, #00E58E 0%, #B8EC3F 100%)',
                animation: 'evloBounce 1.4s infinite',
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: '0.95rem', color: '#666', fontWeight: 400 }}>
          {loadingMessage}
        </div>
        <style>{`
          @keyframes evloBounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Gabarito', sans-serif" }}>

      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginBottom: '40px' }}>
        {[1, 2, 3].map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: s < step ? '#1a1a1a' : s === step ? '#B8EC3F' : '#fff',
                border: s === step ? 'none' : s < step ? 'none' : '1px solid #ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: s < step ? '#fff' : s === step ? '#1a1a1a' : '#888',
                fontWeight: 700,
                fontSize: '0.95rem',
                flexShrink: 0
              }}>
                {s < step ? '✓' : s}
              </div>
              <span style={{
                fontSize: '12px',
                color: s === step ? '#1a1a1a' : '#888',
                fontWeight: s === step ? 500 : 400,
                whiteSpace: 'nowrap'
              }}>
                {STEP_LABELS[s - 1]}
              </span>
            </div>
            {i < 2 && (
              <div style={{
                flex: 1,
                height: '1px',
                background: s < step ? '#1a1a1a' : '#ddd',
                margin: '0 12px',
                marginBottom: '22px'
              }} />
            )}
          </div>
        ))}
      </div>

      {/* STEP 1 — Vozilo */}
      {step === 1 && (
        <div style={{ animation: 'evloFadeIn 0.25s ease' }}>
          <div style={{
            background: '#f8f9fa',
            border: '1.5px solid #10B981',
            borderRadius: '16px',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginBottom: '32px'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.25rem', color: '#1a1a1a', marginBottom: '4px' }}>
                Povejte nam o vozilu
              </div>
              <div style={{ fontSize: '0.95rem', color: '#666' }}>
                Osnovni podatki za identifikacijo baterije in kemije.
              </div>
            </div>

            <Field label="Model vozila" helper="Podpiramo 200+ EV modelov.">
              <CarSelector
                value={data.selectedCar}
                onSelect={(car) => setData({ ...data, selectedCar: car })}
              />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="Letnik">
                <input
                  type="number"
                  placeholder="npr. 2022"
                  value={data.carYear}
                  onChange={e => setData({ ...data, carYear: e.target.value })}
                  style={inputStyle}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#1a1a1a'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#e0e0e0'}
                />
              </Field>
              <Field label="Prevoženi km">
                <input
                  type="number"
                  placeholder="npr. 50000"
                  value={data.carKm}
                  onChange={e => setData({ ...data, carKm: e.target.value })}
                  style={inputStyle}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#1a1a1a'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#e0e0e0'}
                />
              </Field>
            </div>

            <Field label="VIN" optional helper="Neobvezno. Izboljša točnost rezultata.">
              <input
                type="text"
                placeholder="npr. WVWZZZAUZLW000000"
                value={data.carVin}
                onChange={e => setData({ ...data, carVin: e.target.value.toUpperCase() })}
                style={inputStyle}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#1a1a1a'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#e0e0e0'}
              />
            </Field>
          </div>
        </div>
      )}

      {/* STEP 2 — Polnjenje */}
      {step === 2 && (
        <div style={{ animation: 'evloFadeIn 0.25s ease' }}>
          <div style={{
            background: '#f8f9fa',
            border: '1.5px solid #10B981',
            borderRadius: '16px',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            marginBottom: '32px'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.25rem', color: '#1a1a1a', marginBottom: '4px' }}>
                Navade polnjenja
              </div>
              <div style={{ fontSize: '0.95rem', color: '#666' }}>
                Način polnjenja je največji dejavnik degradacije baterije.
              </div>
            </div>

            {/* Max SoC */}
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a', marginBottom: '12px' }}>
                Do kod običajno polnite?
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { value: '0.95', label: '70–80%', sub: 'Najmanj stresa' },
                  { value: '1.10', label: '90%', sub: 'Zmerno' },
                  { value: '1.25', label: '100% občasno', sub: 'Sprejemljivo za daljše vožnje' },
                  { value: '1.45', label: 'Vedno 100%', sub: 'Pospešuje degradacijo' }
                ].map(opt => (
                  <OptionCard
                    key={opt.value}
                    label={opt.label}
                    sub={opt.sub}
                    selected={data.maxSoC === opt.value}
                    onClick={() => setData({ ...data, maxSoC: opt.value })}
                  />
                ))}
              </div>
            </div>

            {/* Min SoC */}
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a', marginBottom: '12px' }}>
                Do kod običajno praznite?
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { value: '0.95', label: 'Redko pod 20%', sub: 'Optimalno' },
                  { value: '1.10', label: 'Pogosto do 10%', sub: 'Zmerni stres' },
                  { value: '1.30', label: 'Večkrat do 0%', sub: 'Visok stres na celice', fullWidth: true }
                ].map(opt => (
                  <OptionCard
                    key={opt.value}
                    label={opt.label}
                    sub={opt.sub}
                    selected={data.minSoC === opt.value}
                    onClick={() => setData({ ...data, minSoC: opt.value })}
                    fullWidth={opt.fullWidth}
                  />
                ))}
              </div>
            </div>

            {/* Charger Type Pills */}
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a', marginBottom: '12px' }}>
                Vrsta polnilnika
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  { value: '0.95', label: 'Domači AC (do 11kW)', dot: '#3182CE' },
                  { value: '1.15', label: 'Mešano AC / DC', dot: '#6366f1' },
                  { value: '1.30', label: 'Hitri DC (do 100kW)', dot: '#f59e0b' },
                  { value: '1.50', label: 'Supercharger / HPC', dot: '#ef4444' }
                ].map(opt => (
                  <PillBadge
                    key={opt.value}
                    label={opt.label}
                    selected={data.chargeType === opt.value}
                    onClick={() => setData({ ...data, chargeType: opt.value })}
                    dotColor={opt.dot}
                  />
                ))}
              </div>
            </div>

            {/* DC Charging Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a' }}>
                  Delež hitrega DC polnjenja
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a1a' }}>
                  {data.dcChargingPercent}%
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  width: `${data.dcChargingPercent}%`,
                  height: '8px',
                  background: 'linear-gradient(90deg, #00E58E 0%, #B8EC3F 100%)',
                  borderRadius: '200px',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  zIndex: 1
                }} />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${data.dcChargingPercent}%`,
                  right: 0,
                  height: '8px',
                  background: '#e8f5e9',
                  borderRadius: '200px',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }} />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={data.dcChargingPercent}
                  onChange={e => setData({ ...data, dcChargingPercent: parseInt(e.target.value) })}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    height: '8px',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    background: 'transparent',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>
              <style>{`
                input[type=range]::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #fff;
                  border: 2px solid #1a1a1a;
                  cursor: pointer;
                }
                input[type=range]::-moz-range-thumb {
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #fff;
                  border: 2px solid #1a1a1a;
                  cursor: pointer;
                }
              `}</style>
              <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '8px' }}>
                0% = vedno domači AC · 100% = vedno hitro polnjenje
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 — Okolje */}
      {step === 3 && (
        <div style={{ animation: 'evloFadeIn 0.25s ease' }}>
          <div style={{
            background: '#f8f9fa',
            border: '1.5px solid #10B981',
            borderRadius: '16px',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            marginBottom: '32px'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.25rem', color: '#1a1a1a', marginBottom: '4px' }}>
                Okolje uporabe
              </div>
              <div style={{ fontSize: '0.95rem', color: '#666' }}>
                Temperatura in pogoji parkiranja vplivajo na koledarsko staranje baterije.
              </div>
            </div>

            {/* Drive Mode */}
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a', marginBottom: '12px' }}>
                Režim vožnje
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { value: '0.95', label: 'Eco / Mestna', sub: 'Nizek stres' },
                  { value: '1.05', label: 'Mešano', sub: 'Povprečno' },
                  { value: '1.25', label: 'Avtocesta (130+ km/h)', sub: 'Višja poraba' },
                  { value: '1.40', label: 'Športna / agresivna', sub: 'Maksimalni stres' }
                ].map(opt => (
                  <OptionCard
                    key={opt.value}
                    label={opt.label}
                    sub={opt.sub}
                    selected={data.driveMode === opt.value}
                    onClick={() => setData({ ...data, driveMode: opt.value })}
                  />
                ))}
              </div>
            </div>

            {/* Parking grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a', marginBottom: '12px' }}>
                  Parkiranje poleti
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { value: '0.95', label: 'Podzemna / garaža', sub: 'Najboljše' },
                    { value: '1.10', label: 'Nadstrešek (senca)', sub: 'Dobro' },
                    { value: '1.35', label: 'Na prostem, sonce', sub: 'Pospešuje staranje' }
                  ].map(opt => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      sub={opt.sub}
                      selected={data.summerParking === opt.value}
                      onClick={() => setData({ ...data, summerParking: opt.value })}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a', marginBottom: '12px' }}>
                  Parkiranje pozimi
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { value: '0.95', label: 'Ogrevana garaža (15°C+)', sub: 'Najboljše' },
                    { value: '1.10', label: 'Hladna garaža (5–10°C)', sub: 'Dobro' },
                    { value: '1.25', label: 'Zunaj na mrazu', sub: 'Višje staranje' }
                  ].map(opt => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      sub={opt.sub}
                      selected={data.winterParking === opt.value}
                      onClick={() => setData({ ...data, winterParking: opt.value })}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Climate Region Pills */}
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a', marginBottom: '12px' }}>
                Podnebna regija
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  { value: 'moderate', label: 'Zmerno (Slovenija, Srednja EU)', dot: '#3182CE' },
                  { value: 'hot', label: 'Vroče (Sredozemlje)', dot: '#ef4444' },
                  { value: 'cold', label: 'Hladno (Skandinavija)', dot: '#6366f1' }
                ].map(opt => (
                  <PillBadge
                    key={opt.value}
                    label={opt.label}
                    selected={data.climateRegion === opt.value}
                    onClick={() => setData({ ...data, climateRegion: opt.value })}
                    dotColor={opt.dot}
                  />
                ))}
              </div>
            </div>

            {/* Temperature + Heat pump */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <Field label="Povprečna temperatura (°C)" helper="Letno povprečje kjer vozilo večinoma stoji.">
                <input
                  type="number"
                  placeholder="npr. 12"
                  value={data.avgTemp}
                  onChange={e => setData({ ...data, avgTemp: e.target.value })}
                  style={inputStyle}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#1a1a1a'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#e0e0e0'}
                />
              </Field>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a', marginBottom: '8px' }}>
                  Toplotna črpalka
                </div>
                <OptionCard
                  label="Vozilo ima toplotno črpalko"
                  sub="Zmanjšuje termični stres v mrazu"
                  selected={data.hasHeatPump}
                  onClick={() => setData({ ...data, hasHeatPump: !data.hasHeatPump })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: step === 1 ? 'flex-end' : 'space-between', gap: '12px' }}>
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{
              padding: '12px 32px',
              border: '1.5px solid #1a1a1a',
              background: 'transparent',
              borderRadius: '200px',
              cursor: 'pointer',
              color: '#1a1a1a',
              fontWeight: 700,
              fontSize: '0.95rem',
              fontFamily: 'inherit',
              transition: 'background 0.15s'
            }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#f8f9fa'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}
          >
            ← Nazaj
          </button>
        )}
        <button
          onClick={handleNext}
          style={{
            padding: '12px 32px',
            background: '#1a1a1a',
            border: 'none',
            borderRadius: '200px',
            cursor: 'pointer',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            transition: 'opacity 0.15s'
          }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
        >
          {step === 3 ? 'Zaženi diagnostiko →' : 'Naprej →'}
        </button>
      </div>

      <style>{`
        @keyframes evloFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
