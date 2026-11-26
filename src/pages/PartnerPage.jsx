import React from 'react';
import { Link } from 'react-router-dom';
import { BecomeBuddySection } from '../components/BecomeBuddySection';
import { ArrowLeft, Bike, DollarSign } from 'lucide-react';

export function PartnerPage() {
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
          <Link to="/" style={{ color: '#4F46E5', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowLeft size={14} /> Home
          </Link>
          <span>/</span>
          <span style={{ color: '#0F172A', fontWeight: 600 }}>Become an Udaipur Riding Buddy</span>
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
            EARN WITH PRIDE IN UDAIPUR
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#0F172A', marginBottom: '14px' }}>
            Join SoloRide as a <span className="text-gradient-amber">Local Riding Companion</span>
          </h1>
          <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '720px', lineHeight: 1.7 }}>
            Show off Udaipur to solo travellers from around the world. Founder Bhuvan Dwivedi pays your fee directly for every ride, and all petrol is paid directly by the traveller.
          </p>
        </div>
      </div>

      <BecomeBuddySection />
    </div>
  );
}
