import React, { useState } from 'react';
import { Sparkles, Shield, Fuel, HeartHandshake, MapPin, Calendar, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { VEHICLE_OPTIONS } from '../data/mockData';

export function Hero({ onOpenBooking, onSelectTour }) {
  const [selectedPlan, setSelectedPlan] = useState('tour-1');
  const [selectedVehicle, setSelectedVehicle] = useState('re_classic');
  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });

  const handleQuickBook = (e) => {
    e.preventDefault();
    onOpenBooking({
      planId: selectedPlan,
      vehicleId: selectedVehicle,
      travelDate: date
    });
  };

  return (
    <section style={{
      position: 'relative',
      paddingTop: '12px',
      paddingBottom: '42px',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '36px',
          alignItems: 'stretch'
        }} className="hero-grid">
          
          {/* Left Column: Headlines & Story */}
          <div className="animate-fade-up">
            {/* Top Chip */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: '#EEF2FF',
              border: '1px solid #C7D2FE',
              marginBottom: '20px'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#4338CA',
                boxShadow: '0 0 10px #4338CA'
              }} className="animate-pulse-glow" />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#3730A3', letterSpacing: '0.04em' }}>
                UDAIPUR SOLO TRAVELLER COMPANION PLATFORM
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2.3rem, 4.5vw, 3.6rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              marginBottom: '18px',
              color: '#0F172A'
            }}>
              Arrived in Udaipur Solo? <br />
              <span className="text-gradient-amber">Ride with a Trusted Local Buddy.</span>
            </h1>

            {/* Subheading */}
            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.12rem)',
              color: '#475569',
              marginBottom: '26px',
              maxWidth: '620px',
              lineHeight: 1.7
            }}>
              Whether you are travelling from across India or arriving from <strong style={{ color: '#0F172A' }}>abroad</strong>, don’t explore the City of Lakes on crowded tour buses. Rent a Royal Enfield, Cruiser, or Scooter with a verified local companion who navigates the secret alleys, ghats, and mountain curves with you.
            </p>

            {/* Core Transparent Model Guarantee Box */}
            <div className="glass-panel" style={{
              padding: '18px 22px',
              marginBottom: '28px',
              background: '#FFFFFF',
              border: '1px solid #C7D2FE',
              boxShadow: '0 8px 24px -4px rgba(67, 56, 202, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 800,
                color: '#3730A3',
                fontSize: '0.92rem'
              }}>
                <HeartHandshake size={18} color="#4338CA" />
                <span>Our 100% Fair & Transparent Companion Model:</span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                fontSize: '0.83rem',
                color: '#475569'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Platform/Buddy Fee:</strong> Paid via website; Bhuvan pays your local companion boy directly.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Fuel size={16} color="#0284C7" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Petrol & Fuel:</strong> Paid directly by you at actual petrol pumps per km. No markup!</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Shield size={16} color="#4F46E5" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Day Expenses:</strong> Chai & food on the road covered directly by the traveller.</span>
                </div>
              </div>
            </div>

            {/* Interactive Quick Finder Box */}
            <form onSubmit={handleQuickBook} className="glass-panel" style={{
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #E2E8F0',
              boxShadow: '0 15px 35px rgba(15, 23, 42, 0.08)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '14px',
                marginBottom: '16px'
              }}>
                {/* Tour Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                    EXPLORATION PLAN
                  </label>
                  <select
                    className="glass-input"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    style={{ cursor: 'pointer', background: '#FFFFFF' }}
                  >
                    <option value="tour-1">Royal Lakes & Heritage Alleys (Half Day)</option>
                    <option value="tour-2">Sajjangarh Sunset & Curves (Half Day)</option>
                    <option value="tour-3">3 Lakes & Bahubali Hills (Full Day)</option>
                    <option value="tour-4">Kumbhalgarh Fortress High Pass (Full Day)</option>
                  </select>
                </div>

                {/* Vehicle Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                    VEHICLE PREFERENCE
                  </label>
                  <select
                    className="glass-input"
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    style={{ cursor: 'pointer', background: '#FFFFFF' }}
                  >
                    {VEHICLE_OPTIONS.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                    TRAVEL DATE
                  </label>
                  <input
                    type="date"
                    className="glass-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    style={{ background: '#FFFFFF' }}
                  />
                </div>
              </div>

              {/* Action Button & Founder Contact Subline */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                paddingTop: '12px',
                borderTop: '1px solid #F1F5F9'
              }}>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  Questions? Email Founder: <a href="mailto:bhuvandwivedi1234@gmail.com" style={{ color: '#4F46E5', fontWeight: 600 }}>bhuvandwivedi1234@gmail.com</a>
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.92rem' }}>
                  <span>Instant Match Buddy</span>
                  <ArrowRight size={17} />
                </button>
              </div>
            </form>

            {/* Quick Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
              gap: '16px',
              marginTop: '28px'
            }}>
              <div style={{ borderLeft: '3px solid #4F46E5', paddingLeft: '12px' }}>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A' }}>450+</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Solo Rides in Udaipur</div>
              </div>
              <div style={{ borderLeft: '3px solid #0284C7', paddingLeft: '12px' }}>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A' }}>100%</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Police Verified Riders</div>
              </div>
              <div style={{ borderLeft: '3px solid #059669', paddingLeft: '12px' }}>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A' }}>4.96★</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Abroad & India Rating</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card + Balanced Live Status Card */}
          <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px' }}>
            <div className="glass-panel" style={{
              padding: '12px',
              borderRadius: '28px',
              background: '#FFFFFF',
              border: '1px solid #E7E0D3',
              boxShadow: '0 20px 45px rgba(15, 23, 42, 0.1)',
              position: 'relative',
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                flex: 1,
                minHeight: '300px'
              }}>
                <img
                  src="/images/hero_udaipur.jpg"
                  alt="Solo traveller on Royal Enfield overlooking Lake Pichola Udaipur"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.2) 50%, transparent 100%)'
                }} />

                {/* Bottom Overlay Info */}
                <div style={{
                  position: 'absolute',
                  bottom: '18px',
                  left: '18px',
                  right: '18px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end'
                }}>
                  <div>
                    <span className="badge-pill badge-amber" style={{ marginBottom: '6px' }}>
                      Lake Pichola Sunrise Ride
                    </span>
                    <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', fontWeight: 700 }}>
                      Monsoon Palace & Lake Vistas
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#F1F5F9' }}>
                      Udaipur, Rajasthan • Ride with Vicky or Priya
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectTour('tour-1')}
                    style={{
                      background: 'rgba(255, 255, 255, 0.94)',
                      color: '#0F172A',
                      padding: '8px 15px',
                      borderRadius: '999px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  >
                    View Plan <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Clean Non-Overlapping Trust Highlights Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '12px'
            }}>
              <div className="glass-panel" style={{
                padding: '12px 14px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#FFFFFF',
                border: '1px solid #BAE6FD',
                boxShadow: '0 8px 20px rgba(2, 132, 199, 0.08)'
              }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: '#E0F2FE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284C7',
                  flexShrink: 0
                }}>
                  <Compass size={17} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>Abroad Guests Welcome</div>
                  <div style={{ fontSize: '0.7rem', color: '#0284C7', fontWeight: 600 }}>English Fluent & Police Verified</div>
                </div>
              </div>

              <div className="glass-panel" style={{
                padding: '12px 14px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#FFFFFF',
                border: '1px solid #A5B4FC',
                boxShadow: '0 8px 20px rgba(79, 70, 229, 0.08)'
              }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: '#EEF2FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4F46E5',
                  flexShrink: 0
                }}>
                  <Fuel size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>Transparent Petrol Split</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Pay fuel directly • No markup</div>
                </div>
              </div>
            </div>

            {/* Live Udaipur Availability Strip to balance Hero height */}
            <div className="glass-panel" style={{
              padding: '14px 16px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 100%)',
              border: '1px solid #99F6E4',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#0D9488',
                  boxShadow: '0 0 0 4px rgba(13, 148, 136, 0.2)'
                }} className="animate-pulse-glow" />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>
                    4 Verified Buddies Active in Udaipur Today
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#0F766E', fontWeight: 600 }}>
                    Lal Ghat • Fateh Sagar • Sajjangarh Pickup Ready
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenBooking({ planId: selectedPlan, vehicleId: selectedVehicle, travelDate: date })}
                style={{
                  padding: '6px 13px',
                  borderRadius: '999px',
                  background: '#0F766E',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap'
                }}
              >
                Check Slots →
              </button>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
