import React from 'react';
import { Link } from 'react-router-dom';
import { PricingCalculator } from '../components/PricingCalculator';
import { ArrowLeft, Fuel, ShieldCheck, HeartHandshake } from 'lucide-react';

export function PricingPage({ currentCurrency, onOpenBooking }) {
  return (
    <div style={{ paddingBottom: '60px' }}>
      <div className="container" style={{ paddingTop: '20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.82rem',
          color: '#64748B',
          marginBottom: '20px'
        }}>
          <Link to="/" style={{ color: '#D97706', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowLeft size={14} /> Home
          </Link>
          <span>/</span>
          <span style={{ color: '#0F172A', fontWeight: 600 }}>Transparent Pricing Calculator</span>
        </div>

        <div className="glass-panel" style={{
          padding: 'clamp(24px, 4vw, 44px)',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 100%)',
          border: '1.5px solid #FED7AA',
          borderRadius: '24px',
          marginBottom: '20px',
          boxShadow: '0 12px 35px -5px rgba(234, 88, 12, 0.08)'
        }}>
          <div className="badge-pill badge-amber" style={{ marginBottom: '12px' }}>
            100% TRANSPARENT FINANCIAL SPLIT
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#0F172A', marginBottom: '14px' }}>
            Real-Time Trip <span className="text-gradient-amber">Expense Calculator</span>
          </h1>
          <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '720px', lineHeight: 1.7 }}>
            Founder Bhuvan Dwivedi guarantees zero hidden fees: You pay the platform booking fee which directly compensates your companion boy; petrol and meals are paid directly by you at actual cost!
          </p>
        </div>
      </div>

      <PricingCalculator
        currentCurrency={currentCurrency}
        onOpenBooking={onOpenBooking}
      />
    </div>
  );
}
