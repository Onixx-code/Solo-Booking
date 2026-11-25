import React from 'react';
import { Link } from 'react-router-dom';
import { BuddyShowcase } from '../components/BuddyShowcase';
import { ArrowLeft, ShieldCheck, Star } from 'lucide-react';

export function BuddiesPage({ onOpenBooking }) {
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
          <Link to="/" style={{ color: '#059669', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowLeft size={14} /> Home
          </Link>
          <span>/</span>
          <span style={{ color: '#0F172A', fontWeight: 600 }}>Verified Riding Companions</span>
        </div>

        <div className="glass-panel" style={{
          padding: 'clamp(24px, 4vw, 44px)',
          background: 'linear-gradient(135deg, #ECFDF5 0%, #FFFFFF 100%)',
          border: '1.5px solid #A7F3D0',
          borderRadius: '24px',
          marginBottom: '20px',
          boxShadow: '0 10px 30px rgba(5, 150, 105, 0.08)'
        }}>
          <div className="badge-pill badge-emerald" style={{ marginBottom: '12px' }}>
            MEET THE LOCAL EXPERTS
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#0F172A', marginBottom: '14px' }}>
            Verified Udaipur <span className="text-gradient-amber">Riding Companions</span>
          </h1>
          <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '720px', lineHeight: 1.7 }}>
            Every companion is vetted with local government ID and police check. Whether you want heritage history, mountain hairpin curves, or café-hopping with female riders, meet your match below.
          </p>
        </div>
      </div>

      <BuddyShowcase onOpenBooking={onOpenBooking} />
    </div>
  );
}
