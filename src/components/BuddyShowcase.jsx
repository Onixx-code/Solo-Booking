import React from 'react';
import { ShieldCheck, Star, Bike, Languages, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { VERIFIED_BUDDIES } from '../data/mockData';

export function BuddyShowcase({ onOpenBooking }) {
  return (
    <section id="buddies" style={{
      padding: '70px 0',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 45px' }}>
          <div className="badge-pill badge-emerald" style={{ marginBottom: '12px' }}>
            100% POLICE & ID VERIFIED
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', marginBottom: '14px', color: '#0F172A' }}>
            Meet Your Udaipur <span className="text-gradient-amber">Riding Companions</span>
          </h2>
          <p style={{ fontSize: '0.98rem', color: '#475569' }}>
            Not random drivers—these are passionate local youth, college grads, and riding enthusiasts who love their city, speak great English, and make solo travellers feel like old friends.
          </p>
        </div>

        {/* Buddies Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
          gap: '24px'
        }}>
          {VERIFIED_BUDDIES.map((buddy) => (
            <div
              key={buddy.id}
              className="glass-card"
              style={{
                padding: '24px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.06)'
              }}
            >
              <div>
                {/* Header with Avatar & Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)',
                    position: 'relative'
                  }}>
                    {buddy.name.charAt(0)}
                    <span style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#059669',
                      border: '2px solid #FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CheckCircle2 size={12} color="#FFFFFF" />
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: '#0F172A', marginBottom: '2px' }}>
                      {buddy.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#4F46E5' }}>
                      <Star size={14} fill="#4F46E5" color="#4F46E5" />
                      <strong>{buddy.rating}</strong>
                      <span style={{ color: '#64748B' }}>({buddy.ridesCompleted} rides)</span>
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  background: '#E0F2FE',
                  border: '1px solid #BAE6FD',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#0369A1',
                  marginBottom: '14px'
                }}>
                  {buddy.badge}
                </div>

                {/* Bio */}
                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.6, marginBottom: '16px' }}>
                  "{buddy.bio}"
                </p>

                {/* Quick Info Specs */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: '12px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.78rem',
                  color: '#0F172A',
                  marginBottom: '18px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Bike size={14} color="#4F46E5" />
                    <span><strong>Machine:</strong> {buddy.bike}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Languages size={14} color="#0284C7" />
                    <span><strong>Speaks:</strong> {buddy.languages.join(', ')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={14} color="#059669" />
                    <span><strong>Safety:</strong> Clean record & Police clearance</span>
                  </div>
                </div>
              </div>

              {/* Request Button */}
              <button
                onClick={() => onOpenBooking({ requestedBuddy: buddy.name })}
                className="btn-secondary"
                style={{ width: '100%', padding: '10px', fontSize: '0.84rem', justifyContent: 'center' }}
              >
                <span>Request {buddy.name.split(' ')[0]} as Buddy</span>
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
