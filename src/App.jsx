import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { KycVerificationModal } from './components/KycVerificationModal';
import { PaymentModal } from './components/PaymentModal';
import { SosSafetyModal } from './components/SosSafetyModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { MouseFollower } from './components/MouseFollower';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { PlansPage } from './pages/PlansPage';
import { PricingPage } from './pages/PricingPage';
import { RouteMapPage } from './pages/RouteMapPage';
import { BuddiesPage } from './pages/BuddiesPage';
import { AbroadPage } from './pages/AbroadPage';
import { PartnerPage } from './pages/PartnerPage';
import { FaqPage } from './pages/FaqPage';

import { Mail, Sparkles, MessageCircle, AlertTriangle, ShieldCheck, Luggage } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState('INR');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState({});

  // 4 New Technical Feature Modal States
  const [isKycOpen, setIsKycOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentBookingData, setPaymentBookingData] = useState(null);
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  const handleOpenBooking = (data = {}) => {
    setBookingInitialData(data);
    setIsBookingOpen(true);
  };

  const handleSelectTour = (tourId) => {
    handleOpenBooking({ planId: tourId });
  };

  const handleOpenKyc = () => {
    setIsKycOpen(true);
  };

  const handleOpenPayment = (booking = null) => {
    setPaymentBookingData(booking);
    setIsPaymentOpen(true);
  };

  const handleOpenSos = () => {
    setIsSosOpen(true);
  };

  const handleOpenMyBookings = () => {
    setIsMyBookingsOpen(true);
  };

  return (
    <BrowserRouter>
      {/* Interactive custom mouse trailing cursor animation */}
      <MouseFollower />
      <ScrollToTop />

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* Modern Floating Header Navbar */}
        <Navbar
          currentCurrency={currency}
          setCurrency={setCurrency}
          onOpenBooking={() => handleOpenBooking()}
          onOpenKyc={handleOpenKyc}
          onOpenPayment={() => handleOpenPayment()}
          onOpenSos={handleOpenSos}
          onOpenMyBookings={handleOpenMyBookings}
        />

        {/* Dedicated Page Routes */}
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  currentCurrency={currency}
                  onOpenBooking={handleOpenBooking}
                  onSelectTour={handleSelectTour}
                />
              }
            />
            <Route
              path="/plans"
              element={
                <PlansPage
                  currentCurrency={currency}
                  onOpenBooking={handleOpenBooking}
                />
              }
            />
            <Route
              path="/pricing"
              element={
                <PricingPage
                  currentCurrency={currency}
                  onOpenBooking={handleOpenBooking}
                />
              }
            />
            <Route
              path="/route-map"
              element={
                <RouteMapPage
                  onOpenBooking={handleOpenBooking}
                />
              }
            />
            <Route
              path="/buddies"
              element={
                <BuddiesPage
                  onOpenBooking={handleOpenBooking}
                />
              }
            />
            <Route
              path="/abroad"
              element={
                <AbroadPage
                  onOpenBooking={handleOpenBooking}
                />
              }
            />
            <Route
              path="/partner"
              element={<PartnerPage />}
            />
            <Route
              path="/faq"
              element={<FaqPage />}
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer onOpenBooking={() => handleOpenBooking()} />

        {/* 1. Interactive Booking Drawer / Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialData={bookingInitialData}
          currentCurrency={currency}
          onOpenPayment={(data) => handleOpenPayment(data)}
          onOpenKyc={handleOpenKyc}
          onOpenSos={handleOpenSos}
        />

        {/* 2. Live KYC / ID Verification Modal */}
        <KycVerificationModal
          isOpen={isKycOpen}
          onClose={() => setIsKycOpen(false)}
          onSuccess={(kycData) => {
            // Keep user informed
          }}
        />

        {/* 3. Live Payment Gateway & UPI Advance Payment Modal */}
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          bookingData={paymentBookingData}
          currentCurrency={currency}
          onPaymentSuccess={(txn) => {
            // Updated in storage automatically
          }}
        />

        {/* 4. Live GPS Tracking & Emergency SOS Modal */}
        <SosSafetyModal
          isOpen={isSosOpen}
          onClose={() => setIsSosOpen(false)}
        />

        {/* 5. Real-Time Trips & Local Database Dashboard Modal */}
        <MyBookingsModal
          isOpen={isMyBookingsOpen}
          onClose={() => setIsMyBookingsOpen(false)}
          onOpenBooking={() => handleOpenBooking()}
          onOpenPayment={(b) => handleOpenPayment(b)}
          onOpenKyc={handleOpenKyc}
          onOpenSos={handleOpenSos}
        />

        {/* Floating Quick Action Dock */}
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 900,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'flex-end'
          }}
        >
          {/* 🚨 Emergency SOS & Live GPS Floating Trigger */}
          <button
            onClick={handleOpenSos}
            title="Emergency SOS & Live GPS Location"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '999px',
              background: '#DC2626',
              boxShadow: '0 6px 20px rgba(220, 38, 38, 0.45)',
              color: '#FFFFFF',
              fontSize: '0.86rem',
              fontWeight: 800,
              cursor: 'pointer',
              border: '1.5px solid #FCA5A5',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) scale(1)')}
          >
            <AlertTriangle size={18} className="animate-pulse" />
            <span>🚨 SOS & Live GPS</span>
          </button>

          {/* Direct WhatsApp Chat with Bhuvan */}
          <a
            href="https://wa.me/917627011955?text=Hi%20Bhuvan,%20I%20am%20visiting%20Udaipur%20and%20looking%20for%20a%20riding%20buddy!"
            target="_blank"
            rel="noreferrer"
            title="Chat on WhatsApp with Bhuvan Dwivedi"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '999px',
              background: '#25D366',
              boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
              color: '#FFFFFF',
              fontSize: '0.86rem',
              fontWeight: 800,
              textDecoration: 'none',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <MessageCircle size={18} />
            <span>WhatsApp (+91 7627011955)</span>
          </a>

          {/* Quick Database / My Trips */}
          <button
            onClick={handleOpenMyBookings}
            title="View My Bookings & DB Status"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 16px',
              borderRadius: '999px',
              background: '#FFFFFF',
              border: '1.5px solid #BAE6FD',
              boxShadow: '0 6px 20px rgba(2, 132, 199, 0.15)',
              color: '#0369A1',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <Luggage size={16} color="#0284C7" />
            <span>My Bookings (DB)</span>
          </button>

          {/* Instant Booking Trigger Button */}
          <button
            onClick={() => handleOpenBooking()}
            className="btn-primary animate-pulse-glow"
            style={{
              padding: '12px 22px',
              fontSize: '0.92rem',
              borderRadius: '999px',
              boxShadow: '0 8px 25px rgba(217, 119, 6, 0.45)'
            }}
          >
            <Sparkles size={18} />
            <span>Book Udaipur Buddy</span>
          </button>
        </div>

      </div>
    </BrowserRouter>
  );
}
