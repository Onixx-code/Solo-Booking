import React from 'react';
import { Link } from 'react-router-dom';
import { CuratedTours } from '../components/CuratedTours';
import { ArrowLeft, Sparkles, Compass } from 'lucide-react';

export function PlansPage({ currentCurrency, onOpenBooking }) {
  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Top Page Header Banner */}
      <div className="container" style={{ paddingTop: '20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.82rem',
          color: '#64748B',
          marginBottom: '20px'
        }}>
          <Link to="/" style={{ color: '#4F46E5', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowLeft size={14} /> Home
          </Link>
          <span>/</span>
          <span style={{ color: '#0F172A', fontWeight: 600 }}>Curated Udaipur Riding Plans</span>
        </div>

        <div className="glass-panel" style={{
          padding: 'clamp(24px, 4vw, 44px)',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #EEF2FF 100%)',
          border: '1.5px solid #C7D2FE',
          borderRadius: '24px',
          marginBottom: '20px',
          boxShadow: '0 12px 35px -5px rgba(67, 56, 202, 0.08)'
        }}>
          <div className="badge-pill badge-amber" style={{ marginBottom: '12px' }}>
            ICONIC TWO-WHEELER EXPEDITIONS
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#0F172A', marginBottom: '14px' }}>
            Udaipur Lake & Mountain <span className="text-gradient-amber">Riding Routes</span>
          </h1>
          <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '720px', lineHeight: 1.7 }}>
            Every plan includes a vetted local Udaipur companion, sanitized safety helmet, and curated photography spots. Fuel is paid directly by you at actual pump rates for 100% honesty.
          </p>
        </div>
      </div>

      <CuratedTours
        currentCurrency={currentCurrency}
        onOpenBooking={onOpenBooking}
      />
    </div>
  );
}
