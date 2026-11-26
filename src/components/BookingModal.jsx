import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  Bike,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Fuel,
  ArrowRight,
  MessageCircle,
  CreditCard,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOUR_PACKAGES, VEHICLE_OPTIONS, CURRENCIES } from '../data/mockData';
import { StorageService } from '../services/storageService';

export function BookingModal({
  isOpen,
  onClose,
  initialData = {},
  currentCurrency,
  onOpenPayment,
  onOpenKyc,
  onOpenSos
}) {
  const currencyInfo = CURRENCIES[currentCurrency] || CURRENCIES.INR;

  const [planId, setPlanId] = useState(initialData.planId || 'tour-1');
  const [vehicleId, setVehicleId] = useState(initialData.vehicleId || 're_classic');
  const defaultDate = initialData.travelDate || new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [date, setDate] = useState(defaultDate);
  const [pickupPoint, setPickupPoint] = useState('Lake Pichola / Lal Ghat');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travellerType, setTravellerType] = useState(initialData.isInternational ? 'international' : 'domestic');
  const [notes, setNotes] = useState(initialData.requestedBuddy ? `Requested companion: ${initialData.requestedBuddy}` : '');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [savedBookingData, setSavedBookingData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');
  const [kycStatus, setKycStatus] = useState(null);

  // Sync initialData changes when opened
  useEffect(() => {
    if (initialData.planId) setPlanId(initialData.planId);
    if (initialData.vehicleId) setVehicleId(initialData.vehicleId);
    if (initialData.isInternational !== undefined) {
      setTravellerType(initialData.isInternational ? 'international' : 'domestic');
    }
    const currentKyc = StorageService.getKyc();
    setKycStatus(currentKyc);
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const selectedTour = TOUR_PACKAGES.find((t) => t.id === planId) || TOUR_PACKAGES[0];
  const selectedVehicle = VEHICLE_OPTIONS.find((v) => v.id === vehicleId) || VEHICLE_OPTIONS[0];

  const companionFee = initialData.companionFeeINR || selectedTour.basePriceINR;
  const estPetrol = initialData.estPetrolINR || selectedTour.estPetrolINR;

  const formatPrice = (inr) => {
    const val = inr * currencyInfo.rate;
    if (currentCurrency === 'INR') {
      return `${currencyInfo.symbol}${inr.toLocaleString('en-IN')}`;
    }
    return `${currencyInfo.symbol}${val.toFixed(1)}`;
  };

  const getWhatsAppUrl = (refCode) => {
    const msg =
      `*🏍️ New SoloRide Udaipur Booking*\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `📌 *Booking Ref:* #${refCode}\n` +
      `👤 *Name:* ${name}\n` +
      `🌏 *Type:* ${travellerType === 'international' ? 'International Traveller' : 'Domestic Solo Traveller'}\n` +
      `📞 *Phone:* ${phone}\n` +
      `✉️ *Email:* ${email}\n` +
      `🗺️ *Plan:* ${selectedTour.title}\n` +
      `🛵 *Vehicle:* ${selectedVehicle.name}\n` +
      `📅 *Date:* ${date}\n` +
      `📍 *Pickup:* ${pickupPoint}\n` +
      `🛡️ *KYC Status:* ${kycStatus?.isVerified ? 'Verified Traveller ✅' : 'Pending Verification'}\n` +
      `💬 *Notes:* ${notes || 'Standard ride'}\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *Companion Fee:* ${formatPrice(companionFee)}\n` +
      `⛽ *Est. Petrol:* ${formatPrice(estPetrol)} (Paid by traveller at pump)\n\n` +
      `Hi Bhuvan, please confirm my local buddy rider!`;

    return `https://wa.me/917627011955?text=${encodeURIComponent(msg)}`;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const refCode = 'UDR-' + Math.floor(1000 + Math.random() * 9000);
    setBookingRef(refCode);

    // Save in Persistent Local Database
    const newBooking = StorageService.addBooking({
      id: refCode,
      planId,
      planTitle: selectedTour.title,
      vehicleId,
      vehicleName: selectedVehicle.name,
      date,
      pickupPoint,
      name,
      phone,
      email,
      travellerType,
      companionFee,
      estPetrol,
      status: 'Rider Assigned',
      assignedBuddy: 'Bhuvan Dwivedi (Founder)',
      paymentStatus: 'Unpaid',
      advanceAmount: 0,
      isKycVerified: Boolean(kycStatus?.isVerified)
    });
    setSavedBookingData(newBooking);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    // Send real automated email in the background to bhuvandwivedi1234@gmail.com
    try {
      const response = await fetch('https://formsubmit.co/ajax/bhuvandwivedi1234@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          _subject: `New SoloRide Booking [${refCode}] - ${name} (${phone})`,
          bookingReference: refCode,
          travellerName: name,
          travellerType,
          whatsappPhone: phone,
          email,
          selectedPlan: selectedTour.title,
          vehicleChoice: selectedVehicle.name,
          travelDate: date,
          pickupLocation: pickupPoint,
          specialNotes: notes || 'None',
          companionFee: formatPrice(companionFee),
          estimatedPetrol: formatPrice(estPetrol),
          message: `Booking received on SoloRide Udaipur for ${name} on ${date}. Direct contact on WhatsApp: +91 7627011955.`
        })
      });

      if (response.ok) {
        setEmailStatus('sent');
      } else {
        setEmailStatus('fallback');
      }
    } catch (err) {
      setEmailStatus('fallback');
    }

    // Auto-open WhatsApp with Bhuvan's number 7627011955
    const waUrl = getWhatsAppUrl(refCode);
    window.open(waUrl, '_blank');

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '680px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: 'clamp(20px, 3vw, 36px)',
          background: '#FFFFFF',
          border: '1.5px solid #A5B4FC',
          boxShadow: '0 25px 60px rgba(15, 23, 42, 0.2)',
          position: 'relative'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: '#64748B',
            padding: '8px',
            borderRadius: '50%',
            background: '#F1F5F9',
            border: '1px solid #CBD5E1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '24px 10px' }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: '#D1FAE5',
                border: '2px solid #059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                color: '#059669'
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <div className="badge-pill badge-emerald" style={{ marginBottom: '10px' }}>
              BOOKING CONFIRMED & LOGGED IN DATABASE
            </div>

            <h3 style={{ fontSize: '1.75rem', color: '#0F172A', marginBottom: '8px' }}>
              You're All Set for Udaipur!
            </h3>

            <p style={{ fontSize: '0.94rem', color: '#475569', maxWidth: '480px', margin: '0 auto 16px' }}>
              Booking Reference: <strong style={{ color: '#4F46E5' }}>#{bookingRef}</strong>. Ride details saved to your active dashboard and emailed to Bhuvan (<strong style={{ color: '#0F172A' }}>bhuvandwivedi1234@gmail.com</strong>).
            </p>

            {/* QUICK ADVANCE PAYMENT CTA */}
            <div
              style={{
                background: '#EEF2FF',
                border: '1.5px solid #C7D2FE',
                borderRadius: '16px',
                padding: '16px 20px',
                marginBottom: '18px',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3730A3', fontWeight: 800, fontSize: '0.92rem' }}>
                  <CreditCard size={18} />
                  <span>Lock Ride with ₹200 UPI Advance Token</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#4338CA', marginTop: '2px' }}>
                  Scan QR via GPay, PhonePe or Paytm. Remaining petrol is paid at pump.
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenPayment) onOpenPayment(savedBookingData || { id: bookingRef, name, advanceAmount: 200, planTitle: selectedTour.title });
                }}
                className="btn-primary"
                style={{ padding: '9px 18px', fontSize: '0.84rem' }}
              >
                Pay Advance (UPI QR)
              </button>
            </div>

            {/* Direct WhatsApp Callout Box */}
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
                background: '#F0FDF4',
                border: '1.5px solid #86EFAC',
                marginBottom: '20px',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#15803D', fontWeight: 800, marginBottom: '4px' }}>
                <MessageCircle size={18} />
                <span>Instant WhatsApp Dispatch to Bhuvan (+91 7627011955)</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#166534', lineHeight: 1.5, margin: 0 }}>
                We've prepared your complete ride summary. Message founder Bhuvan on WhatsApp to assign your vehicle.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href={getWhatsAppUrl(bookingRef)}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#25D366',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  padding: '11px 22px',
                  borderRadius: '999px',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                  textDecoration: 'none'
                }}
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenSos) onOpenSos();
                }}
                className="btn-secondary"
                style={{ padding: '11px 18px', fontSize: '0.86rem', color: '#DC2626', borderColor: '#FECACA' }}
              >
                <AlertTriangle size={16} />
                <span>Live GPS & SOS</span>
              </button>

              <button
                onClick={onClose}
                className="btn-secondary"
                style={{ padding: '11px 18px', fontSize: '0.86rem' }}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span className="badge-pill badge-amber" style={{ marginBottom: '8px' }}>
                RESERVE YOUR UDAIPUR BIKE BUDDY
              </span>
              <h3 style={{ fontSize: '1.6rem', color: '#0F172A', marginTop: '4px' }}>
                Complete Your Booking
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#475569' }}>
                Transparent pricing: Platform fee goes to companion; fuel is paid directly by you at pump.
              </p>
            </div>

            {/* KYC Status Strip */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '12px',
                background: kycStatus?.isVerified ? '#ECFDF5' : '#F8FAFC',
                border: kycStatus?.isVerified ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
                marginBottom: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
                <ShieldCheck size={18} color={kycStatus?.isVerified ? '#059669' : '#4F46E5'} />
                <span style={{ fontWeight: 700, color: '#0F172A' }}>
                  {kycStatus?.isVerified ? 'KYC Verified Traveller' : 'Government ID Verification'}
                </span>
                <span style={{ color: kycStatus?.isVerified ? '#059669' : '#3730A3', fontSize: '0.75rem', fontWeight: 600 }}>
                  {kycStatus?.isVerified ? '✓ Priority Companion Enabled' : '• Verification Recommended'}
                </span>
              </div>

              {!kycStatus?.isVerified && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenKyc) onOpenKyc();
                  }}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#059669',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  Verify ID Now →
                </button>
              )}
            </div>

            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Traveller Type Toggle */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '6px' }}>
                  TRAVELLER ORIGIN
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setTravellerType('domestic')}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      background: travellerType === 'domestic' ? '#EEF2FF' : '#F8FAFC',
                      border: travellerType === 'domestic' ? '2px solid #4F46E5' : '1px solid #CBD5E1',
                      color: travellerType === 'domestic' ? '#312E81' : '#64748B',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}
                  >
                    🇮🇳 Domestic (India)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTravellerType('international')}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      background: travellerType === 'international' ? '#E0F2FE' : '#F8FAFC',
                      border: travellerType === 'international' ? '2px solid #0284C7' : '1px solid #CBD5E1',
                      color: travellerType === 'international' ? '#0369A1' : '#64748B',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}
                  >
                    🌏 International Guest
                  </button>
                </div>
              </div>

              {/* Tour Plan Picker */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '4px' }}>
                  SELECT ROUTE / TOUR PLAN
                </label>
                <select
                  value={planId}
                  onChange={(e) => setPlanId(e.target.value)}
                  className="glass-input"
                  style={{ fontSize: '0.88rem' }}
                >
                  {TOUR_PACKAGES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({t.duration} • Base: ₹{t.basePriceINR})
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Picker */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '4px' }}>
                  SELECT MOTORCYCLE / SCOOTER
                </label>
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="glass-input"
                  style={{ fontSize: '0.88rem' }}
                >
                  {VEHICLE_OPTIONS.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.type} • Est. Mileage: {v.mileage})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Pickup Point */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '4px' }}>
                    TRAVEL DATE *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="glass-input"
                    style={{ fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '4px' }}>
                    PICKUP LOCATION *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lal Ghat or Hotel Name"
                    value={pickupPoint}
                    onChange={(e) => setPickupPoint(e.target.value)}
                    className="glass-input"
                    style={{ fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              {/* Personal Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '4px' }}>
                    YOUR FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Aarav Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glass-input"
                    style={{ fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '4px' }}>
                    WHATSAPP PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="glass-input"
                    style={{ fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '4px' }}>
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input"
                  style={{ fontSize: '0.88rem' }}
                />
              </div>

              {/* Price Breakdown Banner */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  background: '#F8FAFC',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700 }}>
                    COMPANION RIDER FEE
                  </span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#4F46E5' }}>
                    {formatPrice(companionFee)}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700 }}>
                    EST. FUEL (AT PUMP)
                  </span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0284C7' }}>
                    ~{formatPrice(estPetrol)}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ padding: '14px', fontSize: '1rem', width: '100%', marginTop: '6px' }}
              >
                <Sparkles size={18} />
                <span>{isSubmitting ? 'Dispatching...' : 'Confirm & Chat on WhatsApp with Bhuvan'}</span>
              </button>

              <div
                style={{
                  textAlign: 'center',
                  fontSize: '0.76rem',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
              >
                <span>
                  Direct WhatsApp/Call:{' '}
                  <a href="tel:+917627011955" style={{ color: '#059669', fontWeight: 700 }}>
                    +91 7627011955
                  </a>
                </span>
                <span>•</span>
                <span>
                  Email:{' '}
                  <a href="mailto:bhuvandwivedi1234@gmail.com" style={{ color: '#4F46E5', fontWeight: 600 }}>
                    bhuvandwivedi1234@gmail.com
                  </a>
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
