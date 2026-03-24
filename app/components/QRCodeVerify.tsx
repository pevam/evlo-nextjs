'use client';

interface QRCodeVerifyProps {
  reportId: string;
}

export default function QRCodeVerify({ reportId }: QRCodeVerifyProps) {
  const verifyUrl = `https://evlo.si/verify/${reportId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(verifyUrl)}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <img 
        src={qrCodeUrl}
        alt="Verify QR Code"
        style={{ width: '120px', height: '120px', border: '1px solid #ddd', borderRadius: '8px' }}
      />
      <div style={{ fontSize: '0.75rem', color: '#999', textAlign: 'center', maxWidth: '140px' }}>
        Skeniraj za potrditev pristnosti
      </div>
    </div>
  );
}
