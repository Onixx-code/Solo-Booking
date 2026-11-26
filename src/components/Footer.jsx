import React from 'react';
import { Compass, Mail, Phone, MapPin, Shield, Heart, Sparkles, Bike, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer({ onOpenBooking }) {
  return (
    <footer style={{
      background: '#FFFFFF',
      borderTop: '1px solid #E2E8F0',
      paddingTop: '60px',
      paddingBottom: '40px',
      position: 'relative'
    }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          
          {/* Col 1: Brand Info & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Bike size={20} strokeWidth={2.3} />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.3rem',
                color: '#0F172A'
              }}>
                Solo<span className="text-gradient-amber">Ride</span> Udaipur
              </span>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
              Connecting domestic and international solo travellers with verified local bike companions in Udaipur. Experience the lakes, forts, and Aravali curves with genuine freedom and zero scams.
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: '#EEF2FF',
              border: '1px solid #A5B4FC',
              fontSize: '0.78rem',
              color: '#312E81',
              fontWeight: 700
            }}>
              <Shield size={14} color="#4F46E5" />
              <span>Founder: Bhuvan Dwivedi</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ fontSize: '0.92rem', color: '#0F172A', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Explore Udaipur
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', color: '#475569' }}>
              <Link to="/plans" style={{ transition: 'color 0.2s ease' }}>• Curated Riding Plans & Alleys</Link>
              <Link to="/pricing" style={{ transition: 'color 0.2s ease' }}>• Transparent Fuel Split Calculator</Link>
              <Link to="/route-map" style={{ transition: 'color 0.2s ease' }}>• 42 km Live Trail Map & Altitude</Link>
              <Link to="/buddies" style={{ transition: 'color 0.2s ease' }}>• Meet Verified Local Buddies</Link>
              <Link to="/abroad" style={{ color: '#0284C7', fontWeight: 600 }}>• International Solo Guests Suite</Link>
            </div>
          </div>

          {/* Col 3: Community & Opportunities */}
          <div>
            <h4 style={{ fontSize: '0.92rem', color: '#0F172A', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Community & Guides
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', color: '#475569' }}>
              <Link to="/partner" style={{ color: '#4F46E5', fontWeight: 700 }}>• Earn ₹1,200 - ₹2,500/day as Buddy</Link>
              <Link to="/buddies">• Female Rider Companions (Priya)</Link>
              <Link to="/plans">• Coming Soon: Jaipur, Manali, Goa</Link>
              <Link to="/faq">• Financial Split & Fuel Policy</Link>
              <a href="mailto:bhuvandwivedi1234@gmail.com">• Contact Founder Bhuvan</a>
            </div>
          </div>

          {/* Col 4: Direct Contact Card with WhatsApp number 7627011955 */}
          <div>
            <h4 style={{ fontSize: '0.92rem', color: '#0F172A', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Official Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* WhatsApp direct link */}
              <a
                href="https://wa.me/917627011955?text=Hi%20Bhuvan,%20I%20have%20an%20inquiry%20regarding%20SoloRide%20Udaipur!"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: '#F0FDF4',
                  border: '1.5px solid #86EFAC',
                  color: '#15803D',
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  textDecoration: 'none'
                }}
              >
                <MessageCircle size={18} color="#16A34A" style={{ flexShrink: 0 }} />
                <span>WhatsApp: +91 7627011955</span>
              </a>

              {/* Email direct link */}
              <a
                href="mailto:bhuvandwivedi1234@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: '#EEF2FF',
                  border: '1px solid #A5B4FC',
                  color: '#312E81',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <Mail size={16} color="#4F46E5" style={{ flexShrink: 0 }} />
                <span>bhuvandwivedi1234@gmail.com</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.8rem', color: '#64748B' }}>
                <MapPin size={16} color="#0284C7" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Lal Ghat & Gangaur Ghat Hub, Old City, Udaipur, Rajasthan 313001</span>
              </div>

              <button
                onClick={() => onOpenBooking()}
                className="btn-primary"
                style={{ padding: '10px', fontSize: '0.86rem', width: '100%' }}
              >
                <Sparkles size={16} /> Book Ride Now
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.78rem',
          color: '#64748B'
        }}>
          <div>
            © 2026 SoloRide Udaipur. Created for solo travellers exploring Rajasthan on bikes.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>WhatsApp / Phone: +91 7627011955</span>
            <span>bhuvandwivedi1234@gmail.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
