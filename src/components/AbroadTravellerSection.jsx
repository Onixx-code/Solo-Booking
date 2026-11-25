import React from 'react';
import { ShieldCheck, Globe, Plane, Wifi, HeartHandshake, DollarSign, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { ABROAD_FEATURES } from '../data/mockData';

export function AbroadTravellerSection({ onOpenBooking }) {
  return (
    <section id="abroad" style={{
      padding: '70px 0',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Banner Card */}
        <div className="glass-panel" style={{
          padding: 'clamp(24px, 4vw, 50px)',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%)',
          border: '1.5px solid #BAE6FD',
          borderRadius: '28px',
          boxShadow: '0 20px 45px rgba(2, 132, 199, 0.08)'
        }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
            alignItems: 'center'
          }} className="abroad-grid">
            
            {/* Left Column: Abroad Pitch & Features */}
            <div>
              <div className="badge-pill badge-cyan" style={{ marginBottom: '14px' }}>
                GLOBAL SOLOVAGABONDS
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', marginBottom: '16px', lineHeight: 1.2, color: '#0F172A' }}>
                Arriving from <span className="text-gradient-cyan">Abroad to Udaipur?</span> <br />
                We've Got Your Back.
              </h2>
              <p style={{ fontSize: '1rem', color: '#475569', marginBottom: '26px', lineHeight: 1.7 }}>
                India is magical, but navigating solo can feel overwhelming. We pair international travellers with vetted, English-fluent local companions so you experience the real Mewar culture without tourist traps, touts, or anxiety.
              </p>

              {/* Feature Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '30px'
              }}>
                {ABROAD_FEATURES.map((feat, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      borderRadius: '14px',
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)'
                    }}
                  >
                    <div style={{
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      color: '#0F172A',
                      marginBottom: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <CheckCircle2 size={16} color="#0284C7" />
                      <span>{feat.title}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.5 }}>
                      {feat.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                <button
                  onClick={() => onOpenBooking({ isInternational: true })}
                  className="btn-glow-cyan"
                  style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                >
                  <Sparkles size={16} />
                  <span>Book International Solo Companion</span>
                </button>

                <a
                  href="mailto:bhuvandwivedi1234@gmail.com?subject=International%20Traveller%20Inquiry%20-%20Udaipur%20SoloRide"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.86rem',
                    color: '#B45309',
                    fontWeight: 700,
                    padding: '10px 18px',
                    borderRadius: '999px',
                    background: '#FEF3C7',
                    border: '1px solid #FCD34D',
                    textDecoration: 'none'
                  }}
                >
                  <Mail size={15} />
                  <span>Email Founder directly</span>
                </a>
              </div>

            </div>

            {/* Right Column: Visual Story Card */}
            <div>
              <div style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(15, 23, 42, 0.12)',
                border: '1px solid #CBD5E1'
              }}>
                <img
                  src="/images/buddies.jpg"
                  alt="International traveller and Indian buddy with motorcycle in Udaipur"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                />
                
                {/* Floating quote bubble */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
                }}>
                  <p style={{ fontSize: '0.82rem', color: '#0F172A', fontStyle: 'italic', marginBottom: '6px', fontWeight: 500 }}>
                    "Elena from Germany paired with Vicky in Udaipur for 3 days of sunset lakeside rides. Zero tourist traps, pure cultural connection."
                  </p>
                  <div style={{ fontSize: '0.74rem', color: '#0284C7', fontWeight: 800 }}>
                    100% Genuine Mewar Hospitality
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 960px) {
          .abroad-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
