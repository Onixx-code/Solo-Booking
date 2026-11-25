import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  MapPin,
  Bike,
  ShieldCheck,
  CreditCard,
  AlertTriangle,
  MessageCircle,
  Clock,
  CheckCircle2,
  Trash2,
  Plus,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { StorageService } from '../services/storageService';

export function MyBookingsModal({
  isOpen,
  onClose,
  onOpenBooking,
  onOpenPayment,
  onOpenKyc,
  onOpenSos
}) {
  if (!isOpen) return null;

  const [bookings, setBookings] = useState([]);
  const [kyc, setKyc] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed

  const loadData = () => {
    setBookings(StorageService.getBookings());
    setKyc(StorageService.getKyc());
  };

  useEffect(() => {
    loadData();
    const unsubscribe = StorageService.subscribe(loadData);
    return () => unsubscribe();
  }, [isOpen]);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to cancel booking #${id}?`)) {
      StorageService.deleteBooking(id);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'active') return b.status !== 'Completed' && b.status !== 'Cancelled';
    if (filter === 'completed') return b.status === 'Completed';
    return true;
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2100,
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
          maxWidth: '740px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: 'clamp(20px, 3.5vw, 36px)',
          background: '#FFFFFF',
          border: '1.5px solid #0284C7',
          boxShadow: '0 25px 60px rgba(2, 132, 199, 0.2)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
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

        {/* Header */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge-pill badge-cyan">
              REAL-TIME TRIP DATABASE & PROFILE
            </span>
            {kyc?.isVerified && (
              <span className="badge-pill badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} /> KYC VERIFIED
              </span>
            )}
          </div>

          <h3 style={{ fontSize: '1.65rem', color: '#0F172A', marginTop: '2px' }}>
            My Trips & Companion Bookings
          </h3>

          <p style={{ fontSize: '0.86rem', color: '#475569' }}>
            Live status of your Udaipur bike companions, advance payment records, and verified traveller ID pass.
          </p>
        </div>

        {/* Quick Summary Pill Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '10px',
            marginBottom: '20px'
          }}
        >
          {/* Total Bookings */}
          <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', padding: '12px 14px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.72rem', color: '#0369A1', fontWeight: 700 }}>ACTIVE TRIPS</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A' }}>
              {bookings.filter((b) => b.status !== 'Completed').length}
            </div>
          </div>

          {/* KYC Status */}
          <div
            onClick={onOpenKyc}
            style={{
              background: kyc?.isVerified ? '#ECFDF5' : '#FFF7ED',
              border: kyc?.isVerified ? '1px solid #A7F3D0' : '1px solid #FED7AA',
              padding: '12px 14px',
              borderRadius: '12px',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: kyc?.isVerified ? '#065F46' : '#C2410C', fontWeight: 700 }}>
              KYC VERIFICATION
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: kyc?.isVerified ? '#059669' : '#EA580C', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {kyc?.isVerified ? 'Verified Traveller ✓' : 'Pending Verification ⚠️'}
            </div>
          </div>

          {/* SOS Safety Hub Trigger */}
          <div
            onClick={onOpenSos}
            style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              padding: '12px 14px',
              borderRadius: '12px',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: '#B91C1C', fontWeight: 700 }}>SAFETY STATUS</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertTriangle size={14} /> Open Live GPS / SOS
            </div>
          </div>
        </div>

        {/* Filter and Add New Trip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'capitalize',
                  background: filter === f ? '#0284C7' : '#F1F5F9',
                  color: filter === f ? '#FFFFFF' : '#475569',
                  transition: 'all 0.2s ease'
                }}
              >
                {f} ({f === 'all' ? bookings.length : f === 'active' ? bookings.filter((b) => b.status !== 'Completed').length : bookings.filter((b) => b.status === 'Completed').length})
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onClose();
              if (onOpenBooking) onOpenBooking();
            }}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            <Plus size={14} /> Book Another Ride
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748B' }}>
            <Bike size={40} color="#CBD5E1" style={{ margin: '0 auto 10px' }} />
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0F172A' }}>No bookings found</div>
            <p style={{ fontSize: '0.84rem', marginTop: '4px' }}>Book your first Udaipur buddy tour to see it tracked here!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredBookings.map((b) => {
              const isPaid = b.paymentStatus === 'Advance Paid' || b.paymentStatus === 'Fully Paid';
              return (
                <div
                  key={b.id}
                  className="glass-card"
                  style={{
                    padding: '18px',
                    borderRadius: '16px',
                    border: '1.5px solid #E2E8F0',
                    background: '#FFFFFF'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#D97706' }}>
                          #{b.id}
                        </span>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '999px',
                            background: b.status === 'Rider Assigned' ? '#D1FAE5' : '#EFF6FF',
                            color: b.status === 'Rider Assigned' ? '#065F46' : '#1D498F'
                          }}
                        >
                          {b.status}
                        </span>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '999px',
                            background: isPaid ? '#ECFDF5' : '#FFFBEB',
                            color: isPaid ? '#047857' : '#B45309'
                          }}
                        >
                          {isPaid ? `Advance Paid (₹${b.advanceAmount || 200})` : 'Advance Pending'}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', color: '#0F172A', margin: 0 }}>
                        {b.planTitle}
                      </h4>
                    </div>

                    <button
                      onClick={() => handleDelete(b.id)}
                      title="Cancel booking"
                      style={{ color: '#94A3B8', padding: '4px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Details Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                      gap: '8px',
                      fontSize: '0.8rem',
                      color: '#475569',
                      background: '#F8FAFC',
                      padding: '12px',
                      borderRadius: '10px',
                      marginBottom: '14px'
                    }}
                  >
                    <div>
                      <span style={{ color: '#64748B' }}>📅 Date: </span>
                      <strong>{b.date}</strong>
                    </div>

                    <div>
                      <span style={{ color: '#64748B' }}>🛵 Vehicle: </span>
                      <strong>{b.vehicleName}</strong>
                    </div>

                    <div>
                      <span style={{ color: '#64748B' }}>👤 Companion: </span>
                      <strong style={{ color: '#0284C7' }}>{b.assignedBuddy}</strong>
                    </div>

                    <div>
                      <span style={{ color: '#64748B' }}>📍 Pickup: </span>
                      <strong>{b.pickupPoint}</strong>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {!isPaid && (
                      <button
                        onClick={() => {
                          onClose();
                          if (onOpenPayment) onOpenPayment(b);
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                          color: '#FFFFFF',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          padding: '7px 14px',
                          borderRadius: '8px',
                          boxShadow: '0 2px 8px rgba(217, 119, 6, 0.3)'
                        }}
                      >
                        <CreditCard size={14} /> Pay ₹200 Advance (UPI/QR)
                      </button>
                    )}

                    <a
                      href={`https://wa.me/917627011955?text=Hi%20Bhuvan,%20I%20am%20checking%20status%20for%20my%20Booking%20%23${b.id}%20(${encodeURIComponent(b.planTitle)})`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#25D366',
                        color: '#FFFFFF',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        padding: '7px 14px',
                        borderRadius: '8px',
                        textDecoration: 'none'
                      }}
                    >
                      <MessageCircle size={14} /> Chat on WhatsApp
                    </a>

                    <button
                      onClick={() => {
                        onClose();
                        if (onOpenSos) onOpenSos();
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#FFFFFF',
                        border: '1px solid #FECACA',
                        color: '#DC2626',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        padding: '6px 12px',
                        borderRadius: '8px'
                      }}
                    >
                      <AlertTriangle size={14} /> Live GPS & SOS
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
