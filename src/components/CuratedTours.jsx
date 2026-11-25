import React from 'react';
import { Clock, MapPin, Sparkles, Check, ArrowRight, ShieldCheck, Fuel } from 'lucide-react';
import { TOUR_PACKAGES, CURRENCIES } from '../data/mockData';

export function CuratedTours({ currentCurrency, onOpenBooking }) {
  const currencyInfo = CURRENCIES[currentCurrency] || CURRENCIES.INR;

  const formatPrice = (inr) => {
    const val = inr * currencyInfo.rate;
    if (currentCurrency === 'INR') {
      return `${currencyInfo.symbol}${inr.toLocaleString('en-IN')}`;
    }
    return `${currencyInfo.symbol}${val.toFixed(1)}`;
  };

  return (
    <section id="plans" style={{
      padding: '70px 0',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 45px' }}>
          <div className="badge-pill badge-amber" style={{ marginBottom: '12px' }}>
            SIGNATURE EXPERIENCES
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', marginBottom: '14px', color: '#0F172A' }}>
            Curated Udaipur <span className="text-gradient-amber">Riding Plans</span>
          </h2>
          <p style={{ fontSize: '0.98rem', color: '#475569' }}>
            Choose an iconic route or customize your own. Every plan pairs you with an authentic local riding companion who guides, navigates, and protects your experience.
          </p>
        </div>

        {/* Tour Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '24px'
        }}>
          {TOUR_PACKAGES.map((tour) => (
            <div
              key={tour.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.06)'
              }}
            >
              {/* Tour Image */}
              <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                <img
                  src={tour.image}
                  alt={tour.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                />
                
                {/* Overlay Top Badges */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  display: 'flex',
                  gap: '6px'
                }}>
                  <span className={`badge-pill badge-${tour.badgeColor}`}>
                    {tour.badge}
                  </span>
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '12px',
                  right: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  color: '#FFFFFF'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} color="#F59E0B" /> {tour.duration}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} color="#38BDF8" /> {tour.distance}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', color: '#0F172A' }}>
                    {tour.title}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: '#D97706', marginBottom: '14px', fontWeight: 700 }}>
                    {tour.subtitle}
                  </div>

                  {/* Highlights List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                    {tour.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: '#475569' }}>
                        <Check size={14} color="#059669" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Box & CTA */}
                <div style={{
                  paddingTop: '16px',
                  borderTop: '1px solid #F1F5F9'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Platform & Companion Fee:</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                        {formatPrice(tour.basePriceINR)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Est. Petrol (Paid at pump):</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0284C7' }}>
                        +{formatPrice(tour.estPetrolINR)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBooking({ planId: tour.id })}
                    className="btn-primary"
                    style={{ width: '100%', padding: '10px 16px', fontSize: '0.88rem' }}
                  >
                    <span>Book Plan & Match Buddy</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
