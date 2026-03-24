'use client';

interface EVLOGradeBadgeProps {
  soh: number;
}

export default function EVLOGradeBadge({ soh }: EVLOGradeBadgeProps) {
  let grade = 'D';
  let label = 'Kritično';
  let color = '#ff4d4d';
  let bgColor = 'rgba(255, 77, 77, 0.1)';

  if (soh >= 90) {
    grade = 'A';
    label = 'Odlično';
    color = '#22c55e';
    bgColor = 'rgba(34, 197, 94, 0.1)';
  } else if (soh >= 80) {
    grade = 'B';
    label = 'Dobro';
    color = '#84cc16';
    bgColor = 'rgba(132, 204, 22, 0.1)';
  } else if (soh >= 70) {
    grade = 'C';
    label = 'Sprejemljivo';
    color = '#f59e0b';
    bgColor = 'rgba(245, 158, 11, 0.1)';
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        background: bgColor,
        padding: '20px',
        borderRadius: '16px',
        border: `2px solid ${color}`,
        marginTop: '15px'
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <div
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white'
          }}
        >
          {grade}
        </div>
      </div>
      <div>
        <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1E1E1E' }}>
          Ocena: <span style={{ color }}>{grade}</span>
        </div>
        <div style={{ fontSize: '0.95rem', color: '#666', marginTop: '4px' }}>
          {label}
        </div>
      </div>
    </div>
  );
}
