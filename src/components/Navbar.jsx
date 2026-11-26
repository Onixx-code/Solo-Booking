import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Bike,
  ShieldCheck,
  AlertTriangle,
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
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [isKycVerified, setIsKycVerified] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

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

  useEffect(() => {
    setMoreDropdownOpen(false);
    setCurrencyDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMoreDropdownOpen(false);
        setCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'Plans & Routes', path: '/plans' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Live Map', path: '/route-map' },
    { label: 'Buddies', path: '/buddies' }
  ];

  const moreNavLinks = [
    { label: 'Abroad Guests', path: '/abroad' },
    { label: 'Earn as Buddy', path: '/partner' },
    { label: 'FAQ', path: '/faq' }
  ];

  const allNavLinks = [...primaryNavLinks, ...moreNavLinks];
  const isMoreActive = moreNavLinks.some((link) => location.pathname === link.path);

  return (
    <header
      ref={headerRef}
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
          maxWidth: '1480px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          borderRadius: '999px',
          boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 0 1px 1px rgba(99, 102, 241, 0.1)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
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
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.35)',
              transition: 'transform 0.3s ease',
              flexShrink: 0
            }}
          >
            <Bike size={20} color="#FFFFFF" strokeWidth={2.3} />
          </div>
          <div style={{ whiteSpace: 'nowrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  letterSpacing: '-0.02em',
                  color: '#0F172A'
                }}
              >
                Solo<span className="text-gradient-amber">Ride</span>
              </span>
              <span
                className="brand-city-badge"
                style={{
                  fontSize: '0.6rem',
                  padding: '2px 7px',
                  borderRadius: '999px',
                  background: '#EEF2FF',
                  color: '#3730A3',
                  border: '1px solid #A5B4FC',
                  fontWeight: 800,
                  letterSpacing: '0.04em'
                }}
              >
                UDAIPUR
              </span>
            </div>
            <div
              className="brand-tagline"
              style={{ fontSize: '0.66rem', color: '#64748B', fontWeight: 500, lineHeight: 1.1 }}
            >
              Bike Partner & Companion
            </div>
          </div>
        </Link>

        {/* Desktop Routing Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '4px'
          }}
          className="desktop-nav"
        >
          {primaryNavLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                style={{
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#3730A3' : '#334155',
                  padding: '7px 12px',
                  borderRadius: '999px',
                  background: isActive ? '#EEF2FF' : 'transparent',
                  border: isActive ? '1px solid #C7D2FE' : '1px solid transparent',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap'
                }}
              >
                {link.label}
              </NavLink>
            );
          })}

          {/* More Dropdown for Secondary Routes */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => {
                setMoreDropdownOpen(!moreDropdownOpen);
                setCurrencyDropdownOpen(false);
              }}
              style={{
                fontSize: '0.84rem',
                fontWeight: isMoreActive ? 700 : 600,
                color: isMoreActive ? '#3730A3' : '#334155',
                padding: '7px 12px',
                borderRadius: '999px',
                background: isMoreActive ? '#EEF2FF' : 'transparent',
                border: isMoreActive ? '1px solid #C7D2FE' : '1px solid transparent',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span>More</span>
              <ChevronDown
                size={14}
                style={{
                  transform: moreDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}
              />
            </button>

            {moreDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '120%',
                  left: 0,
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '6px',
                  minWidth: '170px',
                  boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
              >
                {moreNavLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setMoreDropdownOpen(false)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '9px',
                        fontSize: '0.84rem',
                        fontWeight: isActive ? 700 : 600,
                        color: isActive ? '#3730A3' : '#334155',
                        background: isActive ? '#EEF2FF' : 'transparent',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* 🚨 SOS & GPS Emergency Button */}
          <button
            onClick={onOpenSos}
            title="Live GPS & Emergency SOS Safety Hub"
            className="sos-header-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 11px',
              borderRadius: '999px',
              background: '#FEF2F2',
              border: '1.5px solid #F87171',
              color: '#DC2626',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.15)'
            }}
          >
            <AlertTriangle size={14} className="animate-pulse" />
            <span className="hide-on-xs">SOS / GPS</span>
          </button>

          {/* 🛡️ KYC Verification Pill */}
          <button
            onClick={onOpenKyc}
            title="Government Identity & KYC Status"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 11px',
              borderRadius: '999px',
              background: isKycVerified ? '#ECFDF5' : '#EEF2FF',
              border: isKycVerified ? '1.5px solid #10B981' : '1.5px solid #C7D2FE',
              color: isKycVerified ? '#047857' : '#3730A3',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            className="kyc-header-btn"
          >
            <ShieldCheck size={14} color={isKycVerified ? '#059669' : '#4338CA'} />
            <span>{isKycVerified ? 'KYC Verified' : 'Verify ID'}</span>
          </button>

          {/* 📋 My Trips / DB Hub */}
          <button
            onClick={onOpenMyBookings}
            title="View Real-Time Bookings Database"
            className="trips-header-btn"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 11px',
              borderRadius: '999px',
              background: '#F0F9FF',
              border: '1px solid #BAE6FD',
              color: '#0369A1',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
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
              onClick={() => {
                setCurrencyDropdownOpen(!currencyDropdownOpen);
                setMoreDropdownOpen(false);
              }}
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
                whiteSpace: 'nowrap',
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
                  top: '120%',
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
                      color: currentCurrency === curr ? '#3730A3' : '#334155',
                      background: currentCurrency === curr ? '#EEF2FF' : 'transparent',
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
            className="btn-primary book-header-btn"
            style={{ padding: '8px 15px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
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
            gap: '6px'
          }}
        >
          {allNavLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#3730A3' : '#334155',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: isActive ? '#EEF2FF' : 'transparent',
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
        @media (min-width: 640px) {
          .trips-header-btn {
            display: inline-flex !important;
          }
        }
        @media (max-width: 520px) {
          .hide-on-xs,
          .brand-tagline,
          .brand-city-badge {
            display: none !important;
          }
        }
        @media (min-width: 1180px) {
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
