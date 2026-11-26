import React, { useState } from 'react';
import { Fuel, ShieldCheck, Coffee, ArrowRight, Sparkles, Bike } from 'lucide-react';
import { VEHICLE_OPTIONS, CURRENCIES } from '../data/mockData';

export function PricingCalculator({ currentCurrency, onOpenBooking }) {
  const [duration, setDuration] = useState('half'); // 'half', 'full', 'twoday'
  const [selectedVehicleId, setSelectedVehicleId] = useState('re_classic');
  const [ridingMode, setRidingMode] = useState('pillion'); // 'pillion', 'self', 'convoy'

  const currencyInfo = CURRENCIES[currentCurrency] || CURRENCIES.INR;
  const vehicle = VEHICLE_OPTIONS.find((v) => v.id === selectedVehicleId) || VEHICLE_OPTIONS[0];

  let distanceKm = 35;
  let companionBaseINR = vehicle.baseFeeHalfDay;
  let estPetrolINR = vehicle.estPetrolHalfDay;
  let estFoodAllowanceINR = 200;

  if (duration === 'full') {
    distanceKm = 75;
    companionBaseINR = vehicle.baseFeeFullDay;
    estPetrolINR = vehicle.estPetrolFullDay;
    estFoodAllowanceINR = 350;
  } else if (duration === 'twoday') {
    distanceKm = 190;
    companionBaseINR = Math.round(vehicle.baseFeeFullDay * 1.85);
    estPetrolINR = Math.round(vehicle.estPetrolFullDay * 2.2);
    estFoodAllowanceINR = 700;
  }

  if (ridingMode === 'convoy') {
    companionBaseINR += 500;
  }

  const formatPrice = (inrAmount) => {
    const converted = inrAmount * currencyInfo.rate;
    if (currentCurrency === 'INR') {
      return `${currencyInfo.symbol}${inrAmount.toLocaleString('en-IN')}`;
    }
    return `${currencyInfo.symbol}${converted.toFixed(1)}`;
  };

  const grandTotalEstimate = companionBaseINR + estPetrolINR + estFoodAllowanceINR;

  return (
    <section id="pricing" style={{
      padding: '70px 0',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
          <div className="badge-pill badge-amber" style={{ marginBottom: '12px' }}>
            100% TRANSPARENT FINANCIAL SPLIT
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', marginBottom: '14px', color: '#0F172A' }}>
            Interactive Pricing & <span className="text-gradient-amber">Expense Calculator</span>
          </h2>
          <p style={{ fontSize: '0.98rem', color: '#475569' }}>
            No hidden commissions. No surprise driver bills. Understand exactly how much goes to your companion, and how much you pay at the petrol pump.
          </p>
        </div>

        {/* Main Light Glassmorphic Calculator Container */}
        <div className="glass-panel" style={{
          padding: 'clamp(20px, 4vw, 40px)',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #E2E8F0',
          boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)'
        }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '36px'
          }} className="calc-grid">
            
            {/* Left Controls: Duration & Vehicle & Mode */}
            <div>
              {/* 1. Duration Selector */}
              <div style={{ marginBottom: '26px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                  STEP 1: SELECT TRIP DURATION & SCOPE
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '10px'
                }}>
                  {[
                    { id: 'half', title: 'Half Day (4h)', dist: '~35 km', desc: 'Old City & Sunset Peak' },
                    { id: 'full', title: 'Full Day (8h)', dist: '~75 km', desc: 'All Lakes & Bahubali' },
                    { id: 'twoday', title: '2-Day Epic (16h)', dist: '~190 km', desc: 'Udaipur + Kumbhalgarh' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDuration(d.id)}
                      style={{
                        padding: '14px',
                        borderRadius: '12px',
                        textAlign: 'left',
                        background: duration === d.id ? '#EEF2FF' : '#FFFFFF',
                        border: duration === d.id ? '2px solid #4F46E5' : '1px solid #E2E8F0',
                        boxShadow: duration === d.id ? '0 4px 14px rgba(79, 70, 229, 0.15)' : 'none',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <div style={{
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        color: duration === d.id ? '#312E81' : '#0F172A',
                        marginBottom: '4px'
                      }}>
                        {d.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#0284C7', fontWeight: 700 }}>{d.dist}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px' }}>{d.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Vehicle Selector */}
              <div style={{ marginBottom: '26px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                  STEP 2: CHOOSE YOUR RIDE / VEHICLE
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {VEHICLE_OPTIONS.map((v) => {
                    const isSelected = selectedVehicleId === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVehicleId(v.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          background: isSelected ? '#EEF2FF' : '#FFFFFF',
                          border: isSelected ? '1.5px solid #4F46E5' : '1px solid #E2E8F0',
                          boxShadow: isSelected ? '0 4px 12px rgba(79, 70, 229, 0.12)' : 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            background: isSelected ? '#4F46E5' : '#F1F5F9',
                            color: isSelected ? '#FFFFFF' : '#475569',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Bike size={18} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: isSelected ? '#312E81' : '#0F172A' }}>
                              {v.name}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                              {v.vibe} • ~{v.mileageKmPerL} km/L
                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{
                            fontSize: '0.86rem',
                            fontWeight: 800,
                            color: isSelected ? '#3730A3' : '#475569'
                          }}>
                            {formatPrice(duration === 'half' ? v.baseFeeHalfDay : v.baseFeeFullDay)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Riding Mode */}
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                  STEP 3: HOW DO YOU PREFER TO RIDE?
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '10px'
                }}>
                  {[
                    { id: 'pillion', title: 'Pillion Passenger', desc: 'Buddy drives, you relax & take photos' },
                    { id: 'self', title: 'Self Drive', desc: 'You ride, buddy navigates as pillion' },
                    { id: 'convoy', title: 'Two-Bike Convoy', desc: 'Solo rider + buddy leads on own bike' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setRidingMode(m.id)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        textAlign: 'left',
                        background: ridingMode === m.id ? '#E0F2FE' : '#FFFFFF',
                        border: ridingMode === m.id ? '1.5px solid #0284C7' : '1px solid #E2E8F0',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        fontSize: '0.84rem',
                        fontWeight: 800,
                        color: ridingMode === m.id ? '#0369A1' : '#0F172A',
                        marginBottom: '4px'
                      }}>
                        {m.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Transparent Cost Split Breakdown Card */}
            <div>
              <div className="glass-panel" style={{
                padding: '28px',
                background: 'linear-gradient(145deg, #FFFFFF, #EEF2FF)',
                border: '1.5px solid #C7D2FE',
                borderRadius: '20px',
                boxShadow: '0 15px 35px rgba(67, 56, 202, 0.08)',
                position: 'sticky',
                top: '90px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #E2E8F0',
                  marginBottom: '18px'
                }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: '#0F172A' }}>Transparent Fee Breakdown</h3>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      Estimated Distance: {distanceKm} km in Udaipur
                    </div>
                  </div>
                  <span className="badge-pill badge-amber">Live Quote</span>
                </div>

                {/* 1. Companion / Platform Fee */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: '#EEF2FF',
                  border: '1px solid #A5B4FC',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={18} color="#4F46E5" />
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#312E81' }}>
                        Platform & Companion Fee
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#3730A3' }}>
                        Founder Bhuvan pays this directly to your companion boy
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#3730A3' }}>
                    {formatPrice(companionBaseINR)}
                  </div>
                </div>

                {/* 2. Petrol / Fuel */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: '#E0F2FE',
                  border: '1px solid #BAE6FD',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Fuel size={18} color="#0284C7" />
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0369A1' }}>
                        Estimated Petrol / Fuel
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#0284C7' }}>
                        Paid directly by solo traveller at petrol pump per actual km
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0369A1' }}>
                    ~{formatPrice(estPetrolINR)}
                  </div>
                </div>

                {/* 3. Day Refreshment */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Coffee size={18} color="#64748B" />
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#334155' }}>
                        Buddy Tea & Lunch (Estimated)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        Traveller covers chai/food break on route
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#475569' }}>
                    ~{formatPrice(estFoodAllowanceINR)}
                  </div>
                </div>

                {/* Grand Total Bar */}
                <div style={{
                  padding: '16px',
                  borderRadius: '14px',
                  background: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  marginBottom: '18px',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                        Total Trip Cost (Fee + Est. Fuel + Food)
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>
                        Guaranteed fair & no hidden charges
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0F172A' }}>
                        {formatPrice(grandTotalEstimate)}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#4F46E5', fontWeight: 700 }}>
                        Only {formatPrice(companionBaseINR)} advance platform fee
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onOpenBooking({
                    vehicleId: selectedVehicleId,
                    duration: duration,
                    mode: ridingMode,
                    companionFeeINR: companionBaseINR,
                    estPetrolINR: estPetrolINR
                  })}
                  className="btn-primary"
                  style={{ width: '100%', padding: '13px', fontSize: '0.98rem' }}
                >
                  <Sparkles size={18} />
                  <span>Lock Companion at this Rate</span>
                  <ArrowRight size={18} />
                </button>

                <div style={{
                  marginTop: '14px',
                  fontSize: '0.74rem',
                  textAlign: 'center',
                  color: '#64748B'
                }}>
                  Direct inquiries to Bhuvan Dwivedi: <a href="mailto:bhuvandwivedi1234@gmail.com" style={{ color: '#4F46E5', fontWeight: 600 }}>bhuvandwivedi1234@gmail.com</a>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 960px) {
          .calc-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
