import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  Building2,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Receipt,
  Download,
  Fuel,
  Bike
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StorageService } from '../services/storageService';

export function PaymentModal({
  isOpen,
  onClose,
  bookingData = null,
  initialAmount = 250,
  currentCurrency = 'INR',
  onPaymentSuccess
}) {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'netbanking'
  const [amount, setAmount] = useState(bookingData?.advanceAmount || initialAmount);
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [completedTxn, setCompletedTxn] = useState(null);

  // Card form states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState(bookingData?.name || '');

  // Net banking state
  const [selectedBank, setSelectedBank] = useState('hdfc');

  // UPI details for Bhuvan
  const primaryUpiId = 'bhuvandwivedi1234@okaxis';
  const phonePeUpiId = '7627011955@paytm';

  const upiIntentUri = `upi://pay?pa=${encodeURIComponent(
    primaryUpiId
  )}&pn=SoloRide%20Udaipur&am=${amount}&cu=INR&tn=SoloRide%20Advance%20Token`;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    upiIntentUri
  )}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(primaryUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleCompletePayment = async (methodType, refId = null) => {
    setIsProcessing(true);

    // Simulate gateway handshakes
    await new Promise((r) => setTimeout(r, 1200));

    const txnId = refId || `TXN-UDR-${Math.floor(100000 + Math.random() * 900000)}`;

    const paymentRecord = StorageService.savePayment({
      txnId,
      bookingId: bookingData?.id || null,
      planTitle: bookingData?.planTitle || 'Udaipur Companion Advance Token',
      amount: Number(amount),
      currency: currentCurrency,
      method: methodType,
      travellerName: bookingData?.name || cardName || 'Solo Traveller',
      status: 'SUCCESS'
    });

    setCompletedTxn(paymentRecord);
    setIsProcessing(false);
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    if (onPaymentSuccess) {
      onPaymentSuccess(paymentRecord);
    }
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, '').length < 16) {
      alert('Please enter a valid 16-digit card number.');
      return;
    }
    handleCompletePayment('Card (Visa/Mastercard)');
  };

  const handleUtrSubmit = (e) => {
    e.preventDefault();
    if (!utrNumber.trim()) {
      alert('Please enter your 12-digit UPI UTR / Transaction Reference Number.');
      return;
    }
    handleCompletePayment('UPI Direct (UTR Verified)', `UTR-${utrNumber.trim()}`);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '620px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: 'clamp(20px, 3.5vw, 36px)',
          background: '#FFFFFF',
          border: '1.5px solid #6366F1',
          boxShadow: '0 25px 60px rgba(99, 102, 241, 0.2)',
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

        {isSuccess && completedTxn ? (
          /* PAYMENT SUCCESS SCREEN */
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: '#D1FAE5',
                border: '2px solid #059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: '#059669'
              }}
            >
              <CheckCircle2 size={42} />
            </div>

            <div className="badge-pill badge-emerald" style={{ marginBottom: '8px' }}>
              PAYMENT VERIFIED & RECORDED
            </div>

            <h3 style={{ fontSize: '1.65rem', color: '#0F172A', marginBottom: '6px' }}>
              ₹{completedTxn.amount} Advance Received!
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '20px' }}>
              Your ride slot with local companion has been secured. Transaction receipt is logged into the system.
            </p>

            {/* Official Digital Receipt Card */}
            <div
              style={{
                background: '#F8FAFC',
                border: '1.5px dashed #CBD5E1',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'left',
                fontSize: '0.86rem',
                marginBottom: '24px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px', marginBottom: '10px' }}>
                <span style={{ color: '#64748B' }}>Transaction ID:</span>
                <strong style={{ color: '#0F172A' }}>{completedTxn.txnId}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px', marginBottom: '10px' }}>
                <span style={{ color: '#64748B' }}>Paid By:</span>
                <strong style={{ color: '#0F172A' }}>{completedTxn.travellerName}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px', marginBottom: '10px' }}>
                <span style={{ color: '#64748B' }}>Method:</span>
                <strong style={{ color: '#059669' }}>{completedTxn.method}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px', marginBottom: '10px' }}>
                <span style={{ color: '#64748B' }}>Timestamp:</span>
                <strong style={{ color: '#0F172A' }}>{new Date(completedTxn.timestamp).toLocaleString()}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                <span style={{ color: '#64748B', fontWeight: 700 }}>Total Advance:</span>
                <strong style={{ color: '#4F46E5', fontSize: '1.1rem' }}>₹{completedTxn.amount}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={onClose}
                className="btn-primary"
                style={{ padding: '12px 28px' }}
              >
                <CheckCircle2 size={18} /> Done & Return
              </button>
            </div>
          </div>
        ) : (
          /* PAYMENT GATEWAY INTERFACE */
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span className="badge-pill badge-amber" style={{ marginBottom: '8px' }}>
                SECURE INSTANT CHECKOUT
              </span>
              <h3 style={{ fontSize: '1.55rem', color: '#0F172A', marginTop: '4px' }}>
                Live Payment & UPI Advance Token
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#475569' }}>
                Lock your companion bike ride with a quick advance token. Remaining fuel is paid directly at pump!
              </p>
            </div>

            {/* Quick Amount Selector */}
            <div
              style={{
                background: '#EEF2FF',
                border: '1.5px solid #C7D2FE',
                borderRadius: '14px',
                padding: '14px 18px',
                marginBottom: '18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#3730A3', textTransform: 'uppercase' }}>
                  Advance Token Amount
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>
                  ₹{amount}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {[150, 250, 500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      border: amount === preset ? '1.5px solid #4F46E5' : '1px solid #CBD5E1',
                      background: amount === preset ? '#6366F1' : '#FFFFFF',
                      color: amount === preset ? '#FFFFFF' : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    ₹{preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Method Tabs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
                marginBottom: '18px'
              }}
            >
              {[
                { id: 'upi', label: 'UPI / QR Scan', icon: QrCode },
                { id: 'card', label: 'Card (Visa/MC)', icon: CreditCard },
                { id: 'netbanking', label: 'Net Banking', icon: Building2 }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = paymentMethod === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setPaymentMethod(tab.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '10px 8px',
                      borderRadius: '12px',
                      border: isActive ? '2px solid #4F46E5' : '1px solid #E2E8F0',
                      background: isActive ? '#EEF2FF' : '#FFFFFF',
                      color: isActive ? '#312E81' : '#475569',
                      fontWeight: isActive ? 800 : 500,
                      fontSize: '0.78rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Icon size={18} color={isActive ? '#4F46E5' : '#64748B'} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: UPI PAYMENT */}
            {paymentMethod === 'upi' && (
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px',
                    borderRadius: '16px',
                    background: '#F8FAFC',
                    border: '1.5px solid #E2E8F0',
                    marginBottom: '18px'
                  }}
                >
                  {/* Dynamic QR Code */}
                  <div
                    style={{
                      background: '#FFFFFF',
                      padding: '12px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                      marginBottom: '12px',
                      border: '1px solid #CBD5E1'
                    }}
                  >
                    <img
                      src={qrImageUrl}
                      alt="UPI QR Code"
                      style={{ width: '180px', height: '180px', display: 'block' }}
                    />
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '8px' }}>
                    Scan with any UPI App: <strong>GPay, PhonePe, Paytm, BHIM, CRED</strong>
                  </div>

                  {/* UPI ID Copy Pill */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 14px',
                      borderRadius: '999px',
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.82rem',
                      color: '#0F172A',
                      fontWeight: 700
                    }}
                  >
                    <span>{primaryUpiId}</span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      style={{
                        color: copiedUpi ? '#059669' : '#4F46E5',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontSize: '0.75rem',
                        fontWeight: 800
                      }}
                    >
                      <Copy size={12} /> {copiedUpi ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Instant Mobile Deep Links */}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <a
                    href={upiIntentUri}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: '#4285F4',
                      color: '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    Google Pay
                  </a>

                  <a
                    href={upiIntentUri}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: '#5F259F',
                      color: '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    PhonePe
                  </a>

                  <a
                    href={upiIntentUri}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: '#00BAF2',
                      color: '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    Paytm UPI
                  </a>
                </div>

                {/* UTR Verification Form */}
                <form onSubmit={handleUtrSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ textAlign: 'left' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '4px' }}>
                      PAID VIA UPI? ENTER 12-DIGIT UTR / TXN REF NO.
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 428198765432"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      className="glass-input"
                      style={{ fontSize: '0.88rem' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="btn-primary"
                      style={{ flex: 1, padding: '12px' }}
                    >
                      {isProcessing ? 'Verifying Bank UTR...' : 'Verify & Confirm Advance'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCompletePayment('UPI Auto-Simulated', `SIM-${Date.now().toString().slice(-6)}`)}
                      className="btn-secondary"
                      style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#059669', borderColor: '#86EFAC' }}
                      title="Test payment instantly"
                    >
                      Simulate Success
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: CREDIT / DEBIT CARD */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleCardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '4px' }}>
                    CARDHOLDER NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Name as printed on card"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="glass-input"
                    style={{ fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '4px' }}>
                    CARD NUMBER
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="4532 •••• •••• 9821"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => {
                      const val = e.target.value
                        .replace(/\D/g, '')
                        .replace(/(.{4})/g, '$1 ')
                        .trim();
                      setCardNumber(val);
                    }}
                    className="glass-input"
                    style={{ fontSize: '0.88rem', letterSpacing: '0.05em' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '4px' }}>
                      EXPIRY (MM/YY)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="glass-input"
                      style={{ fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '4px' }}>
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="•••"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="glass-input"
                      style={{ fontSize: '0.88rem' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary"
                  style={{ padding: '13px', marginTop: '6px' }}
                >
                  {isProcessing ? 'Connecting to 3D Secure Gateway...' : `Pay ₹${amount} Securely`}
                </button>
              </form>
            )}

            {/* TAB 3: NET BANKING */}
            {paymentMethod === 'netbanking' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>
                  POPULAR INDIAN BANKS
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { id: 'hdfc', name: 'HDFC Bank' },
                    { id: 'sbi', name: 'State Bank of India' },
                    { id: 'icici', name: 'ICICI Bank' },
                    { id: 'axis', name: 'Axis Bank' }
                  ].map((bank) => (
                    <button
                      type="button"
                      key={bank.id}
                      onClick={() => setSelectedBank(bank.id)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: selectedBank === bank.id ? '2px solid #4F46E5' : '1px solid #CBD5E1',
                        background: selectedBank === bank.id ? '#EEF2FF' : '#FFFFFF',
                        color: selectedBank === bank.id ? '#312E81' : '#0F172A',
                        fontWeight: selectedBank === bank.id ? 800 : 500,
                        fontSize: '0.85rem',
                        textAlign: 'left'
                      }}
                    >
                      {bank.name}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleCompletePayment(`Net Banking (${selectedBank.toUpperCase()})`)}
                  disabled={isProcessing}
                  className="btn-primary"
                  style={{ padding: '13px' }}
                >
                  {isProcessing ? 'Redirecting to Net Banking Portal...' : `Proceed with ${selectedBank.toUpperCase()} NetBanking`}
                </button>
              </div>
            )}

            {/* Security Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '18px',
                fontSize: '0.74rem',
                color: '#64748B'
              }}
            >
              <ShieldCheck size={14} color="#059669" />
              <span>PCI-DSS Compliant • 256-Bit SSL Encrypted Advance Gateway</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
