import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Bell, CheckCircle2 } from 'lucide-react';
import { EXPANSION_CITIES } from '../data/mockData';

export function ExpansionRoadmap() {
  const [notifEmail, setNotifEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (notifEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNotifEmail('');
    }
  };

  return (
    <section id="expansion" style={{
      padding: '70px 0',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
          <div className="badge-pill badge-amber" style={{ marginBottom: '12px' }}>
            NATIONAL ROADMAP
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', marginBottom: '14px', color: '#0F172A' }}>
            Flagship in Udaipur. <br />
            <span className="text-gradient-amber">Expanding to India’s Iconic Travel Hubs.</span>
          </h2>
          <p style={{ fontSize: '0.98rem', color: '#475569' }}>
            We started by revolutionizing solo travel in Udaipur (Mewar). Next, we are bringing verified bike companions to mountain passes, coastal highways, and desert sands across India.
          </p>
        </div>

        {/* City Pills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '40px'
        }}>
          {EXPANSION_CITIES.map((city, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: city.active ? '#FFF7ED' : '#FFFFFF',
                border: city.active ? '2px solid #EA580C' : '1px solid #E2E8F0',
                boxShadow: city.active ? '0 8px 24px rgba(234, 88, 12, 0.12)' : '0 4px 12px rgba(15, 23, 42, 0.04)',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span className={`badge-pill ${city.active ? 'badge-amber' : 'badge-cyan'}`} style={{ fontSize: '0.68rem' }}>
                  {city.status}
                </span>
                <MapPin size={16} color={city.active ? '#D97706' : '#94A3B8'} />
              </div>

              <h3 style={{ fontSize: '1.05rem', color: '#0F172A', marginBottom: '4px' }}>
                {city.name}
              </h3>
              <div style={{ fontSize: '0.78rem', color: city.active ? '#B45309' : '#64748B', fontWeight: 600 }}>
                {city.rides}
              </div>
            </div>
          ))}
        </div>

        {/* City Alert Box */}
        <div className="glass-panel" style={{
          padding: '28px',
          maxWidth: '680px',
          margin: '0 auto',
          textAlign: 'center',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 8px 25px rgba(15, 23, 42, 0.05)'
        }}>
          <h4 style={{ fontSize: '1.15rem', color: '#0F172A', marginBottom: '8px' }}>
            Want SoloRide in Your Next City?
          </h4>
          <p style={{ fontSize: '0.86rem', color: '#475569', marginBottom: '18px' }}>
            Vote for where we should launch next and get 20% off your first ride.
          </p>

          {subscribed ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '999px',
              background: '#D1FAE5',
              border: '1px solid #059669',
              color: '#047857',
              fontSize: '0.88rem',
              fontWeight: 700
            }}>
              <CheckCircle2 size={16} />
              <span>Thank you! We'll notify you when your city goes live.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{
              display: 'flex',
              gap: '10px',
              maxWidth: '460px',
              margin: '0 auto',
              flexWrap: 'wrap'
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={notifEmail}
                onChange={(e) => setNotifEmail(e.target.value)}
                className="glass-input"
                style={{ flex: 1, minWidth: '220px', background: '#F8FAFC' }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
                <Bell size={15} /> Notify Me
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
