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

import { MessageCircle } from 'lucide-react';

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
            <Route
              path="*"
              element={
                <HomePage
                  currentCurrency={currency}
                  onOpenBooking={handleOpenBooking}
                  onSelectTour={handleSelectTour}
                />
              }
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

        {/* Clean Single Floating WhatsApp Button (other actions live cleanly in Navbar) */}
        <a
          href="https://wa.me/917627011955?text=Hi%20Bhuvan,%20I%20am%20visiting%20Udaipur%20and%20looking%20for%20a%20riding%20buddy!"
          target="_blank"
          rel="noreferrer"
          title="Chat on WhatsApp with Bhuvan Dwivedi (+91 7627011955)"
          style={{
            position: 'fixed',
            bottom: '22px',
            right: '22px',
            zIndex: 900,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '11px 18px',
            borderRadius: '999px',
            background: '#25D366',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
            color: '#FFFFFF',
            fontSize: '0.86rem',
            fontWeight: 800,
            textDecoration: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(37, 211, 102, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.4)';
          }}
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>

      </div>
    </BrowserRouter>
  );
}
