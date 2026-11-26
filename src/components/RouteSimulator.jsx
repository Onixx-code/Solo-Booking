import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, MapPin, Gauge, Mountain, Fuel, Sparkles, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { ROUTE_SIMULATOR_STOPS } from '../data/mockData';

export function RouteSimulator({ onOpenBooking }) {
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStopIndex((prev) => {
          if (prev >= ROUTE_SIMULATOR_STOPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeStop = ROUTE_SIMULATOR_STOPS[activeStopIndex];

  const stopImages = [
    '/images/hero_udaipur.jpg',
    '/images/hero_udaipur.jpg',
    '/images/buddies.jpg',
    '/images/sajjangarh.jpg',
    '/images/bahubali.jpg',
    '/images/sajjangarh.jpg'
  ];

  return (
    <section id="route-simulator" style={{
      padding: '70px 0',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 36px' }}>
          <div className="badge-pill badge-cyan" style={{ marginBottom: '12px' }}>
            INTERACTIVE TRAIL SIMULATOR
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', marginBottom: '14px', color: '#0F172A' }}>
            Experience the <span className="text-gradient-cyan">Udaipur Mountain & Lake Circuit</span>
          </h2>
          <p style={{ fontSize: '0.98rem', color: '#475569' }}>
            Simulate a bike ride along Udaipur's legendary 42 km scenic trail. Track elevation climbs, estimated fuel burn, and secret buddy vantage points.
          </p>
        </div>

        {/* Interactive Main Simulator Box */}
        <div className="glass-panel" style={{
          padding: 'clamp(18px, 3vw, 36px)',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #BAE6FD',
          boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)'
        }}>
          
          {/* Top Control Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            paddingBottom: '18px',
            borderBottom: '1px solid #E2E8F0',
            marginBottom: '26px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: isPlaying ? '#FFE4E6' : '#E0F2FE',
                  border: isPlaying ? '1.5px solid #F43F5E' : '1.5px solid #0284C7',
                  color: isPlaying ? '#BE123C' : '#0369A1',
                  padding: '9px 18px',
                  borderRadius: '999px',
                  fontWeight: 800,
                  fontSize: '0.88rem'
                }}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                <span>{isPlaying ? 'Pause Simulator' : 'Auto-Ride Along Trail'}</span>
              </button>

              <button
                onClick={() => {
                  setIsPlaying(false);
                  setActiveStopIndex(0);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  color: '#475569',
                  padding: '9px 14px',
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
                title="Reset to Start"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>

            {/* Live Metrics Ribbons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                <Gauge size={16} color="#0284C7" />
                <span style={{ color: '#64748B' }}>Odometer:</span>
                <strong style={{ color: '#0F172A' }}>{activeStop.km}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                <Mountain size={16} color="#4F46E5" />
                <span style={{ color: '#64748B' }}>Altitude:</span>
                <strong style={{ color: '#0F172A' }}>{activeStop.elevation}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                <Fuel size={16} color="#059669" />
                <span style={{ color: '#64748B' }}>Est. Petrol:</span>
                <strong style={{ color: '#0F172A' }}>₹{Math.round((parseFloat(activeStop.km) || 1) * 3.8 + 50)}</strong>
              </div>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))',
            gap: '8px',
            marginBottom: '28px'
          }}>
            {ROUTE_SIMULATOR_STOPS.map((stop, idx) => {
              const isActive = idx === activeStopIndex;
              const isPast = idx < activeStopIndex;
              return (
                <button
                  key={stop.id}
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveStopIndex(idx);
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: isActive
                      ? '#E0F2FE'
                      : isPast
                      ? '#D1FAE5'
                      : '#F8FAFC',
                    borderBottom: isActive
                      ? '3px solid #0284C7'
                      : isPast
                      ? '3px solid #059669'
                      : '3px solid #E2E8F0',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: isActive ? '#0369A1' : isPast ? '#047857' : '#94A3B8'
                  }}>
                    STOP {idx + 1}
                  </div>
                  <div style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: isActive ? '#0F172A' : '#64748B',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {stop.name.split('&')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Checkpoint Stage */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '28px',
            alignItems: 'center'
          }} className="sim-grid">
            
            {/* Visual Photo Card of Checkpoint */}
            <div style={{
              position: 'relative',
              borderRadius: '18px',
              overflow: 'hidden',
              aspectRatio: '16/10',
              border: '1px solid #CBD5E1',
              boxShadow: '0 12px 28px rgba(15, 23, 42, 0.1)'
            }}>
              <img
                src={stopImages[activeStopIndex]}
                alt={activeStop.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)'
              }} />

              {/* Checkpoint Badge Overlay */}
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                display: 'flex',
                gap: '8px'
              }}>
                <span className="badge-pill badge-cyan">
                  Stop {activeStop.id} of 6
                </span>
                <span className="badge-pill badge-amber">
                  {activeStop.km} Mark
                </span>
              </div>

              {/* Bottom Caption on Image */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px'
              }}>
                <h4 style={{ fontSize: '1.25rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '4px' }}>
                  {activeStop.name}
                </h4>
                <div style={{ display: 'flex', gap: '14px', fontSize: '0.78rem', color: '#BAE6FD' }}>
                  <span>Elevation: {activeStop.elevation}</span>
                  <span>•</span>
                  <span>Est. Time from Start: {activeStop.time}</span>
                </div>
              </div>
            </div>

            {/* Stop Description & Buddy Secret Insights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Checkpoint Overview
                </span>
                <h3 style={{ fontSize: '1.55rem', color: '#0F172A', marginTop: '4px', marginBottom: '8px' }}>
                  {activeStop.name}
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6 }}>
                  {activeStop.description}
                </p>
              </div>

              {/* Buddy Secret Tip Box */}
              <div style={{
                padding: '16px 18px',
                borderRadius: '12px',
                background: '#EEF2FF',
                border: '1.5px solid #C7D2FE',
                display: 'flex',
                gap: '12px'
              }}>
                <Compass size={22} color="#4338CA" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#3730A3', marginBottom: '4px' }}>
                    Verified Companion Insider Tip
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                    {activeStop.tip}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '12px',
                paddingTop: '6px'
              }}>
                <button
                  onClick={() => onOpenBooking({ stopName: activeStop.name })}
                  className="btn-primary"
                  style={{ padding: '10px 22px', fontSize: '0.9rem' }}
                >
                  <Sparkles size={16} />
                  <span>Ride This Route with a Buddy</span>
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    disabled={activeStopIndex === 0}
                    onClick={() => setActiveStopIndex((p) => Math.max(0, p - 1))}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      color: activeStopIndex === 0 ? '#94A3B8' : '#0F172A',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: activeStopIndex === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Previous Stop
                  </button>
                  <button
                    disabled={activeStopIndex === ROUTE_SIMULATOR_STOPS.length - 1}
                    onClick={() => setActiveStopIndex((p) => Math.min(ROUTE_SIMULATOR_STOPS.length - 1, p + 1))}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      color: activeStopIndex === ROUTE_SIMULATOR_STOPS.length - 1 ? '#94A3B8' : '#0F172A',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: activeStopIndex === ROUTE_SIMULATOR_STOPS.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Next Stop
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 960px) {
          .sim-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
