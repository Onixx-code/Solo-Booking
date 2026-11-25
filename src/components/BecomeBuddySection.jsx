import React, { useState } from 'react';
import { Bike, Shield, DollarSign, Heart, Mail, CheckCircle, ArrowRight, UserPlus, MessageCircle } from 'lucide-react';

export function BecomeBuddySection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bikeModel: '',
    experience: '',
    languages: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send background email to bhuvandwivedi1234@gmail.com
    try {
      await fetch("https://formsubmit.co/ajax/bhuvandwivedi1234@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Udaipur Buddy Application: ${formData.name} (${formData.phone})`,
          applicantName: formData.name,
          whatsappPhone: formData.phone,
          bikeModel: formData.bikeModel,
          languagesSpoken: formData.languages,
          ridingExperience: formData.experience,
          message: `Application submitted to join SoloRide Udaipur as a riding companion.`
        })
      });
    } catch (err) {}

    // Open WhatsApp directly to Bhuvan (+91 7627011955)
    const waMsg = 
      `*🏍️ New Riding Buddy Application*\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `🛵 *Bike:* ${formData.bikeModel}\n` +
      `🗣️ *Languages:* ${formData.languages}\n` +
      `📍 *Experience:* ${formData.experience}\n\n` +
      `Hi Bhuvan, I want to join SoloRide Udaipur as a verified companion!`;

    window.open(`https://wa.me/917627011955?text=${encodeURIComponent(waMsg)}`, '_blank');
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="partner" style={{
      padding: '70px 0',
      position: 'relative'
    }}>
      <div className="container">
        
        <div className="glass-panel" style={{
          padding: 'clamp(24px, 4vw, 48px)',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 100%)',
          border: '1.5px solid #FED7AA',
          borderRadius: '28px',
          boxShadow: '0 20px 45px rgba(234, 88, 12, 0.08)'
        }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
            alignItems: 'center'
          }} className="partner-grid">
            
            {/* Left Content */}
            <div>
              <div className="badge-pill badge-amber" style={{ marginBottom: '14px' }}>
                FOR LOCAL UDAIPUR RIDERS & YOUTH
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', marginBottom: '16px', lineHeight: 1.25, color: '#0F172A' }}>
                Own a Bike in Udaipur? <br />
                <span className="text-gradient-amber">Earn ₹1,200 - ₹2,500/Day</span> as a Riding Companion!
              </h2>
              <p style={{ fontSize: '0.96rem', color: '#475569', marginBottom: '24px', lineHeight: 1.6 }}>
                Guide solo travellers from across India and around the globe. Share your love for Udaipur's history, food, and hidden lake curves while earning daily guaranteed payouts.
              </p>

              {/* Benefits Bullets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <DollarSign size={18} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.86rem', color: '#0F172A' }}>
                    <strong>Guaranteed Companion Fee:</strong> Platform founder Bhuvan pays you on time directly to UPI for every completed ride.
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Bike size={18} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.86rem', color: '#0F172A' }}>
                    <strong>Zero Out-of-Pocket Petrol:</strong> The solo traveller pays all petrol and food expenses directly.
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Shield size={18} color="#0284C7" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.86rem', color: '#0F172A' }}>
                    <strong>Safety & Professionalism:</strong> Rigorous rider verification; female solo travellers can ride with female buddies.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Application Form */}
            <div className="glass-panel" style={{
              padding: '28px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              boxShadow: '0 10px 25px rgba(15, 23, 42, 0.05)'
            }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginBottom: '6px' }}>
                Apply as an Udaipur Buddy
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '18px' }}>
                Send your application directly to Bhuvan Dwivedi (+91 7627011955) for verification.
              </p>

              {submitted ? (
                <div style={{
                  padding: '24px',
                  borderRadius: '12px',
                  background: '#D1FAE5',
                  border: '1px solid #059669',
                  textAlign: 'center'
                }}>
                  <CheckCircle size={36} color="#059669" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ color: '#065F46', marginBottom: '6px' }}>Application Dispatched!</h4>
                  <p style={{ fontSize: '0.84rem', color: '#047857', marginBottom: '14px' }}>
                    Your application has been emailed to <strong>bhuvandwivedi1234@gmail.com</strong> and WhatsApp has opened to message Bhuvan directly.
                  </p>
                  <a
                    href="https://wa.me/917627011955"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 18px',
                      borderRadius: '999px',
                      background: '#25D366',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      textDecoration: 'none'
                    }}
                  >
                    <MessageCircle size={16} /> Chat with Bhuvan (+91 7627011955)
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                      YOUR FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Singh"
                      className="glass-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                        WHATSAPP NUMBER
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="glass-input"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                        BIKE MODEL / VEHICLE
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Royal Enfield 350"
                        className="glass-input"
                        value={formData.bikeModel}
                        onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                      LANGUAGES SPOKEN
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. English, Hindi, Mewari"
                      className="glass-input"
                      value={formData.languages}
                      onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                      ABOUT YOUR EXPERIENCE IN UDAIPUR
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Born in Udaipur, love photography and guiding travelers to Bahubali hills..."
                      className="glass-input"
                      style={{ resize: 'none' }}
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{ marginTop: '8px', padding: '12px', width: '100%' }}
                  >
                    <UserPlus size={16} />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Application & WhatsApp Bhuvan'}</span>
                  </button>

                  <div style={{ fontSize: '0.72rem', textAlign: 'center', color: '#64748B', marginTop: '4px' }}>
                    Applications reviewed by Bhuvan Dwivedi • WhatsApp: +91 7627011955
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 960px) {
          .partner-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
