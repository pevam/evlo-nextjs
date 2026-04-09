'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RangeProjectionChartProps {
  year: number;
  annLoss: number;
  wltpRange: number;
  winterRange: number;
  summerRange: number;
  carModel: string;
}

export default function RangeProjectionChart({
  year,
  annLoss,
  wltpRange,
  winterRange,
  summerRange,
  carModel
}: RangeProjectionChartProps) {
  const currentYear = 2026;
  const carYear = year;
  const annLossPercent = parseFloat(annLoss.toString());

  // Generate projection data
  const projectionData = [];
  
  for (let i = 0; i <= 10; i++) {
    const projectionYear = carYear + i;
    const isHistorical = projectionYear <= currentYear;
    const yearsSincePurchase = projectionYear - carYear;
    
    // Calculate SoH for this year
    const projectedSoH = Math.max(0, 100 - (annLossPercent * yearsSincePurchase));
    
    // Calculate ranges based on SoH
    const wltpRangeProjected = Math.round(wltpRange * (projectedSoH / 100));
    const winterRangeProjected = Math.round(winterRange * (projectedSoH / 100));
    const summerRangeProjected = Math.round(summerRange * (projectedSoH / 100));
    
    projectionData.push({
      year: projectionYear,
      WLTP: isHistorical ? wltpRange : wltpRangeProjected,
      Summer: isHistorical ? summerRange : summerRangeProjected,
      Winter: isHistorical ? winterRange : winterRangeProjected,
      SoH: projectedSoH.toFixed(1)
    });
  }

  return (
    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
      <h5 style={{ marginBottom: '15px', color: '#1E1E1E', fontWeight: '600' }}>
        Projekcija dosega skozi leta (Zima/Poletje)
      </h5>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={projectionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis 
            dataKey="year" 
            stroke="#666" 
            label={{ value: 'Leto', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis 
            stroke="#666" 
            label={{ value: 'Doseg (km)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{ background: '#1E1E1E', border: '1px solid #B8EC3F', color: '#fff', borderRadius: '8px' }}
            formatter={(value: any, name: string) => {
              if (typeof value === 'number') {
                return [`${value} km`, name];
              }
              return value;
            }}
            labelFormatter={(label) => `Leto ${label}`}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          
          {/* WLTP Range - Grey/Neutral */}
          <Line 
            type="monotone" 
            dataKey="WLTP" 
            stroke="#999999" 
            strokeWidth={2.5}
            dot={{ fill: '#999999', r: 4 }}
            activeDot={{ r: 6 }}
            name="WLTP/Tovarniški"
            isAnimationActive={false}
          />
          
          {/* Summer Range - Green */}
          <Line 
            type="monotone" 
            dataKey="Summer" 
            stroke="#B8EC3F" 
            strokeWidth={2.5}
            dot={{ fill: '#B8EC3F', r: 4 }}
            activeDot={{ r: 6 }}
            name="Poletni doseg (80%)"
            isAnimationActive={false}
          />
          
          {/* Winter Range - Ice Blue */}
          <Line 
            type="monotone" 
            dataKey="Winter" 
            stroke="#4DA6FF" 
            strokeWidth={2.5}
            dot={{ fill: '#4DA6FF', r: 4 }}
            activeDot={{ r: 6 }}
            name="Zimski doseg (70%)"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        background: '#fff', 
        borderRadius: '8px', 
        border: '1px solid #eee',
        fontSize: '0.85rem',
        color: '#666',
        lineHeight: '1.6'
      }}>
        <strong>Interpretacija:</strong> Graf prikazuje, kako se bo doseg vašega vozila zmanjševal v prihodnjih letih
        zaradi padca zdravja baterije (SoH). Rdeči črta predstavlja WLTP (tovarniški pogoji), zelena črta poletne 
        pogoje (+20°C), modra črta pa zimske pogoje (-10°C s topljenjem baterije). Povprečni letni padec SoH: <strong>{annLossPercent.toFixed(2)}%</strong>
      </div>
    </div>
  );
}
