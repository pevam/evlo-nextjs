'use client';

export default function Home() {
  return (
    <main style={{ background: '#ffffff' }}>
      <header style={{ position: 'fixed', width: '100%', top: 0, background: 'rgba(255,255,255,0.95)', borderBottom: '1px solid #e0e0e0', zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#B8EC3F', background: '#1E1E1E', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
              E
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>analiza</span>
          </div>
          <nav style={{ display: 'flex', gap: '24px' }}>
            <a href="/diagnostic" style={{ color: '#666', textDecoration: 'none' }}>Diagnostic</a>
          </nav>
          <a href="/diagnostic" style={{ background: '#3182CE', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}>
            Start
          </a>
        </div>
      </header>

      <section style={{ paddingTop: '128px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <h1 style={{ fontSize: '3.75rem', fontWeight: 'bold', color: '#1E1E1E', margin: 0 }}>
            Know Your EV Battery Health
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#666' }}>
            Professional battery diagnostics with 97% accuracy. Get detailed SoH analysis, range projections, and financial impact reports.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', paddingTop: '16px' }}>
            <a
              href="/diagnostic"
              style={{ background: '#3182CE', color: 'white', padding: '16px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Start Diagnostic →
            </a>
          </div>
        </div>
      </section>

      <section style={{ background: '#f8f8f8', paddingTop: '80px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px', color: '#1E1E1E' }}>Why EVLO?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            <div style={{ background: 'white', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🔋</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px', color: '#1E1E1E' }}>Accurate Analysis</h3>
              <p style={{ color: '#666' }}>Geotab-based degradation model with 97% accuracy across 20+ EV models</p>
            </div>
            <div style={{ background: 'white', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📊</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px', color: '#1E1E1E' }}>Detailed Reports</h3>
              <p style={{ color: '#666' }}>SoH score, range projections, degradation curves, and financial analysis</p>
            </div>
            <div style={{ background: 'white', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📄</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px', color: '#1E1E1E' }}>Professional PDFs</h3>
              <p style={{ color: '#666' }}>Generate and share certified diagnostic reports with customers</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(to right, #3182CE, #2c5aa0)', paddingTop: '80px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px', color: 'white' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', margin: 0 }}>Ready to check your battery?</h2>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, margin: 0 }}>Get your diagnostic report in minutes</p>
          <a
            href="/diagnostic"
            style={{ display: 'inline-block', background: 'white', color: '#3182CE', padding: '16px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}
          >
            Get Started Now
          </a>
        </div>
      </section>

      <footer style={{ background: '#1a1a1a', color: 'white', paddingTop: '48px', paddingBottom: '48px', paddingLeft: '16px', paddingRight: '16px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#999', margin: 0 }}>© 2024 EVLO. Professional EV Battery Diagnostics.</p>
        </div>
      </footer>
    </main>
  );
}
