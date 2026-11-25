import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export function Testimonials() {
  return (
    <section style={{
      padding: '70px 0',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 45px' }}>
          <div className="badge-pill badge-amber" style={{ marginBottom: '12px' }}>
            GENUINE EXPERIENCES
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', marginBottom: '14px', color: '#0F172A' }}>
            Stories from <span className="text-gradient-amber">Solo Wanderers</span>
          </h2>
          <p style={{ fontSize: '0.98rem', color: '#475569' }}>
            Real reviews from domestic travellers and international backpackers who discovered Udaipur with their verified riding buddies.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-card"
              style={{
                padding: '28px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.05)',
                position: 'relative'
              }}
            >
              <div>
                {/* Rating & Route */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#D97706" color="#D97706" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#0284C7', fontWeight: 700 }}>
                    {t.tour}
                  </span>
                </div>

                {/* Review Text */}
                <p style={{
                  fontSize: '0.9rem',
                  color: '#334155',
                  lineHeight: 1.65,
                  marginBottom: '20px',
                  fontStyle: 'italic'
                }}>
                  "{t.text}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid #F1F5F9'
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#FEF3C7',
                  border: '1px solid #FCD34D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  color: '#B45309'
                }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {t.country} • {t.role}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
