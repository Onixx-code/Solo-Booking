import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" style={{
      padding: '70px 0',
      position: 'relative'
    }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge-pill badge-cyan" style={{ marginBottom: '12px' }}>
            GOT QUESTIONS?
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', marginBottom: '14px', color: '#0F172A' }}>
            Frequently Asked <span className="text-gradient-cyan">Questions</span>
          </h2>
          <p style={{ fontSize: '0.98rem', color: '#475569' }}>
            Everything you need to know about Udaipur bike companions, petrol splits, payouts, and safety.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  background: isOpen ? '#FFF7ED' : '#FFFFFF',
                  border: isOpen ? '1.5px solid #FED7AA' : '1px solid #E2E8F0',
                  boxShadow: isOpen ? '0 8px 24px rgba(234, 88, 12, 0.08)' : '0 2px 8px rgba(15, 23, 42, 0.04)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    color: '#0F172A'
                  }}
                >
                  <span style={{ fontSize: '0.98rem', fontWeight: 800, paddingRight: '16px', color: isOpen ? '#92400E' : '#0F172A' }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isOpen ? '#FEF3C7' : '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isOpen ? <ChevronUp size={16} color="#D97706" /> : <ChevronDown size={16} color="#64748B" />}
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 22px 20px 22px',
                    fontSize: '0.9rem',
                    color: '#475569',
                    lineHeight: 1.65,
                    borderTop: '1px solid rgba(245, 158, 11, 0.15)',
                    paddingTop: '14px'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
