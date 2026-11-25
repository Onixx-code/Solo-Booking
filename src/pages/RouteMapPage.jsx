import React from 'react';
import { Link } from 'react-router-dom';
import { RouteSimulator } from '../components/RouteSimulator';
import { ArrowLeft, Compass, Mountain, Gauge } from 'lucide-react';

export function RouteMapPage({ onOpenBooking }) {
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
          <Link to="/" style={{ color: '#0284C7', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowLeft size={14} /> Home
          </Link>
          <span>/</span>
          <span style={{ color: '#0F172A', fontWeight: 600 }}>Interactive Live Route Map</span>
        </div>

        <div className="glass-panel" style={{
          padding: 'clamp(24px, 4vw, 44px)',
          background: 'linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 100%)',
          border: '1.5px solid #BAE6FD',
          borderRadius: '24px',
          marginBottom: '20px',
          boxShadow: '0 10px 30px rgba(2, 132, 199, 0.08)'
        }}>
          <div className="badge-pill badge-cyan" style={{ marginBottom: '12px' }}>
            42 KM SCENIC ARAVALI CIRCUIT
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#0F172A', marginBottom: '14px' }}>
            Interactive Udaipur <span className="text-gradient-cyan">Route & Elevation Map</span>
          </h1>
          <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '720px', lineHeight: 1.7 }}>
            Explore the 6 iconic stops from Lake Pichola to Sajjangarh Monsoon Palace and Bahubali Hills cliff. Test the auto-ride simulator, check fuel burn, and read insider tips from verified buddies.
          </p>
        </div>
      </div>

      <RouteSimulator onOpenBooking={onOpenBooking} />
    </div>
  );
}
