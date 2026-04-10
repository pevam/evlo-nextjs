'use client';

import { MarketPosition } from '@/app/utils/marketBenchmark';

interface MarketPositionGaugeProps {
  marketPosition: MarketPosition;
  title?: string;
}

export default function MarketPositionGauge({ marketPosition, title = "Market Comparison" }: MarketPositionGaugeProps) {
  const percentile = Math.min(100, Math.max(0, marketPosition.percentile));
  const gaugeWidth = percentile;

  return (
    <div style={{
      background: '#f8f9fa',
      padding: '25px',
      borderRadius: '12px',
      marginBottom: '30px',
      border: `2px solid ${marketPosition.color}`
    }}>
      <h4 style={{
        fontSize: '1.1rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#1E1E1E'
      }}>
        {title}
      </h4>

      {/* Market Position Label */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <span style={{ fontSize: '0.95rem', color: '#555', fontWeight: '600' }}>
          {marketPosition.categoryLabel}
        </span>
        <span style={{
          fontSize: '0.85rem',
          color: '#888',
          fontStyle: 'italic'
        }}>
          {marketPosition.percentageDescription}
        </span>
      </div>

      {/* Gauge Background with EVLO Gradient */}
      <div style={{
        background: '#F1F3F5',
        height: '16px',
        borderRadius: '200px',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '10px'
      }}>
        {/* Gradient Fill */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${gaugeWidth}%`,
          background: 'linear-gradient(90deg, #00E58E 0%, #B8EC3F 100%)',
          transition: 'width 0.3s ease'
        }} />
        
        {/* Percentile Number */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#1E1E1E',
          fontWeight: 'bold',
          fontSize: '12px',
          zIndex: 10
        }}>
          {percentile}%
        </div>
      </div>

      {/* Scale Labels */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: '#888',
        marginBottom: '15px'
      }}>
        <span>Slabo (0%)</span>
        <span>Povprečno (50%)</span>
        <span>Odlično (100%)</span>
      </div>

      {/* Interpretation Text */}
      <div style={{
        background: 'white',
        padding: '12px',
        borderRadius: '8px',
        border: `1px solid ${marketPosition.color}`,
        fontSize: '0.9rem',
        color: '#555',
        lineHeight: '1.6'
      }}>
        {marketPosition.percentile >= 80 && (
          <>
            <strong style={{ color: marketPosition.color }}>Odlično stanje:</strong> Ta vozilo je v zelo dobrem stanju v primerjavi s podobnimi vozili na trgu. Baterija kaže manjšo degradacijo kot povprečna vozila te starosti in kilometraže.
          </>
        )}
        {marketPosition.percentile >= 60 && marketPosition.percentile < 80 && (
          <>
            <strong style={{ color: marketPosition.color }}>Dobro stanje:</strong> Stanje baterije je nad povprečjem. Vozilo je primerna izbira za nakup s poudarkom na dolgoročni zanesljivosti.
          </>
        )}
        {marketPosition.percentile >= 40 && marketPosition.percentile < 60 && (
          <>
            <strong style={{ color: marketPosition.color }}>Povprečno stanje:</strong> Baterija je v povprečnem stanju za to starost in kilometražo. Tipično vozilo na trgu.
          </>
        )}
        {marketPosition.percentile >= 20 && marketPosition.percentile < 40 && (
          <>
            <strong style={{ color: marketPosition.color }}>Slabše od povprečja:</strong> Stanje baterije je pod povprečjem. Razmislite o dodatni inspeksiji ali zmanjšanju cene.
          </>
        )}
        {marketPosition.percentile < 20 && (
          <>
            <strong style={{ color: marketPosition.color }}>Opozorilo:</strong> Baterija je v slabem stanju. Priporočljiv je pregled specialista pred nakupom.
          </>
        )}
      </div>
    </div>
  );
}
