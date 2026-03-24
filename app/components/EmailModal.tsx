'use client';

import { useState } from 'react';
import './EmailModal.css';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  isLoading?: boolean;
}

export default function EmailModal({ isOpen, onClose, onSubmit, isLoading = false }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Vnesite e-mail naslov');
      return;
    }

    if (!validateEmail(email)) {
      setError('Vnesite veljaven e-mail naslov');
      return;
    }

    // Save to console and state
    console.log('Email collected for lead generation:', email);
    setSubmitted(true);

    // Call the callback
    onSubmit(email);

    // Reset form
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="email-modal-overlay" onClick={onClose}>
      <div className="email-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="email-modal-close" onClick={onClose}>✕</button>

        {!submitted ? (
          <>
            <h2 className="email-modal-title">📄 EVLO Certifikat</h2>
            <p className="email-modal-subtitle">Kam naj vam pošljemo PDF diagnostični report?</p>

            <form onSubmit={handleSubmit} className="email-modal-form">
              <div className="email-modal-input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="vaš.email@primer.com"
                  className="email-modal-input"
                  disabled={isLoading}
                  autoFocus
                />
                {error && <span className="email-modal-error">{error}</span>}
              </div>

              <button 
                type="submit" 
                className="email-modal-submit"
                disabled={isLoading}
              >
                {isLoading ? '⏳ Pošiljam...' : '✓ Pošlji in prenesozivojom'}
              </button>
            </form>

            <p className="email-modal-privacy">
              Vaš e-mail nastavimo zgolj za pošiljanje certifikata in korisnih EVLO nasvetov.
            </p>
          </>
        ) : (
          <div className="email-modal-success">
            <div className="email-modal-checkmark">✓</div>
            <h3>Hvala!</h3>
            <p>Certifikat se prenaša...</p>
          </div>
        )}
      </div>
    </div>
  );
}
