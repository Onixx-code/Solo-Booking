import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Compass,
  Menu,
  X,
  Mail,
  Sparkles,
  ChevronDown,
  Bike,
  ShieldCheck,
  AlertTriangle,
  CreditCard,
  Luggage
} from 'lucide-react';
import { CURRENCIES } from '../data/mockData';
import { StorageService } from '../services/storageService';

export function Navbar({
  currentCurrency,
  setCurrency,
  onOpenBooking,
  onOpenKyc,
  onOpenPayment,
  onOpenSos,
  onOpenMyBookings
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [isKycVerified, setIsKycVerified] = useState(false);
  const location = useLocation();

  const updateStateFromStore = () => {
    const bookings = StorageService.getBookings();
    setBookingsCount(bookings.filter((b) => b.status !== 'Completed').length);
    const kyc = StorageService.getKyc();
    setIsKycVerified(Boolean(kyc?.isVerified));
  };

  useEffect(() => {
    updateStateFromStore();
    const unsubscribe = StorageService.subscribe(updateStateFromStore);
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Plans & Routes', path: '/plans' },
    { label: 'Pricing Calculator', path: '/pricing' },
    { label: 'Live Map', path: '/route-map' },
    { label: 'Verified Buddies', path: '/buddies' },
    { label: 'Abroad Guests', path: '/abroad' },
    { label: 'Earn as Buddy', path: '/partner' },
    { label: 'FAQ', path: '/faq' }
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: '12px',
        zIndex: 1000,
        padding: '0 16px',
        marginBottom: '16px'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          borderRadius: '999px',
          boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 0 1px 1px rgba(245, 158, 11, 0.1)',
          padding: '8px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            flexShrink: 0
          }}
          className="brand-logo"
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.35)',
              transition: 'transform 0.3s ease'
            }}
          >
            <Bike size={22} color="#FFFFFF" strokeWidth={2.3} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  letterSpacing: '-0.02em',
                  color: '#0F172A'
                }}
              >
                Solo<span className="text-gradient-amber">Ride</span>
              </span>
              <span
                style={{
                  fontSize: '0.62rem',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  background: '#FEF3C7',
                  color: '#B45309',
                  border: '1px solid #FCD34D',
                  fontWeight: 800,
                  letterSpacing: '0.04em'
                }}
              >
                UDAIPUR
              </span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 500, lineHeight: 1 }}>
              Bike Partner & Companion
            </div>
          </div>
        </Link>

        {/* Desktop Routing Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2px'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                style={{
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#C2410C' : '#334155',
                  padding: '7px 13px',
                  borderRadius: '999px',
                  background: isActive ? '#FFF7ED' : 'transparent',
                  border: isActive ? '1px solid #FED7AA' : '1px solid transparent',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          
          {/* 🚨 SOS & GPS Emergency Button */}
          <button
            onClick={onOpenSos}
            title="Live GPS & Emergency SOS Safety Hub"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 12px',
              borderRadius: '999px',
              background: '#FEF2F2',
              border: '1.5px solid #F87171',
              color: '#DC2626',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.15)'
            }}
          >
            <AlertTriangle size={14} className="animate-pulse" />
            <span>SOS / GPS</span>
          </button>

          {/* 🛡️ KYC Verification Pill */}
          <button
            onClick={onOpenKyc}
            title="Government Identity & KYC Status"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 12px',
              borderRadius: '999px',
              background: isKycVerified ? '#ECFDF5' : '#FFF7ED',
              border: isKycVerified ? '1.5px solid #10B981' : '1.5px solid #FED7AA',
              color: isKycVerified ? '#047857' : '#C2410C',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            className="kyc-header-btn"
          >
            <ShieldCheck size={14} color={isKycVerified ? '#059669' : '#EA580C'} />
            <span>{isKycVerified ? 'KYC Verified' : 'Verify ID'}</span>
          </button>

          {/* 📋 My Trips / DB Hub */}
          <button
            onClick={onOpenMyBookings}
            title="View Real-Time Bookings Database"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              background: '#F0F9FF',
              border: '1px solid #BAE6FD',
              color: '#0369A1',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Luggage size={14} />
            <span>My Trips</span>
            {bookingsCount > 0 && (
              <span
                style={{
                  background: '#0284C7',
                  color: '#FFFFFF',
                  fontSize: '0.68rem',
                  padding: '1px 6px',
                  borderRadius: '999px',
                  fontWeight: 800
                }}
              >
                {bookingsCount}
              </span>
            )}
          </button>

          {/* Currency Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                borderRadius: '999px',
                background: '#F1F5F9',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
                fontSize: '0.78rem',
                fontWeight: 700,
                transition: 'all 0.2s ease'
              }}
            >
              <span>{CURRENCIES[currentCurrency].symbol} {currentCurrency}</span>
              <ChevronDown size={12} color="#64748B" />
            </button>

            {currencyDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '6px',
                  minWidth: '120px',
                  boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)',
                  zIndex: 100
                }}
              >
                {Object.keys(CURRENCIES).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '7px 12px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: currentCurrency === curr ? '#B45309' : '#334155',
                      background: currentCurrency === curr ? '#FEF3C7' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <span>{curr}</span>
                    <span style={{ fontWeight: 700 }}>{CURRENCIES[curr].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Book Ride Button */}
          <button
            onClick={() => onOpenBooking()}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            <Sparkles size={14} />
            <span>Book Buddy</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              padding: '8px',
              color: '#0F172A',
              borderRadius: '50%',
              background: '#F1F5F9',
              border: '1px solid #CBD5E1'
            }}
            className="mobile-toggle"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            marginTop: '8px',
            maxWidth: '1280px',
            margin: '8px auto 0',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 15px 35px rgba(15, 23, 42, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#B45309' : '#334155',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: isActive ? '#FEF3C7' : 'transparent',
                  textDecoration: 'none'
                }}
              >
                {link.label}
              </NavLink>
            );
          })}

          <div
            style={{
              paddingTop: '14px',
              borderTop: '1px solid #E2E8F0',
              marginTop: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {/* Quick action buttons in mobile menu */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenKyc();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px',
                  borderRadius: '10px',
                  background: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  color: '#065F46',
                  fontWeight: 700,
                  fontSize: '0.82rem'
                }}
              >
                <ShieldCheck size={16} />
                <span>{isKycVerified ? 'KYC Verified ✓' : 'Verify KYC ID'}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSos();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px',
                  borderRadius: '10px',
                  background: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  color: '#DC2626',
                  fontWeight: 700,
                  fontSize: '0.82rem'
                }}
              >
                <AlertTriangle size={16} />
                <span>Live SOS / GPS</span>
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyBookings();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px',
                borderRadius: '10px',
                background: '#F0F9FF',
                border: '1px solid #BAE6FD',
                color: '#0369A1',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}
            >
              <Luggage size={16} />
              <span>My Trips Database ({bookingsCount})</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              <Sparkles size={16} /> Book Udaipur Buddy Now
            </button>
          </div>
        </div>
      )}

      {/* Responsive Media Query Helper */}
      <style>{`
        @media (min-width: 1100px) {
          .desktop-nav {
            display: flex !important;
          }
          .kyc-header-btn {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
