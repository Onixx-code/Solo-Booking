/**
 * SoloRide Udaipur - Real-Time Local Database & Storage Service
 * Provides persistent local database storage for Bookings, KYC Verifications,
 * Advance UPI/Card Payments, and Emergency SOS Guardian Settings.
 */

const STORAGE_KEYS = {
  BOOKINGS: 'soloride_db_bookings',
  KYC: 'soloride_db_kyc',
  PAYMENTS: 'soloride_db_payments',
  EMERGENCY: 'soloride_db_emergency'
};

const DEFAULT_BOOKINGS = [
  {
    id: 'UDR-8421',
    planId: 'tour-1',
    planTitle: 'Old City & Royal Ghats Heritage Run',
    vehicleId: 're_classic',
    vehicleName: 'Royal Enfield Classic 350',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    pickupPoint: 'Lake Pichola / Lal Ghat',
    name: 'Aarav Sharma',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@example.com',
    travellerType: 'domestic',
    companionFee: 799,
    estPetrol: 350,
    status: 'Rider Assigned', // Pending, Rider Assigned, In Progress, Completed
    assignedBuddy: 'Bhuvan Dwivedi (Founder)',
    paymentStatus: 'Advance Paid', // Unpaid, Advance Paid, Fully Paid
    advanceAmount: 200,
    paymentRef: 'UPI-TXN-984210',
    isKycVerified: true,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'UDR-7193',
    planId: 'tour-3',
    planTitle: 'Sajjangarh Sunset & Rani Road Circuit',
    vehicleId: 'ktm_adv',
    vehicleName: 'KTM 390 Adventure',
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    pickupPoint: 'Fateh Sagar Paal',
    name: 'Chloe Dupont',
    phone: '+33 6 12 34 56 78',
    email: 'chloe.dupont@paris.fr',
    travellerType: 'international',
    companionFee: 999,
    estPetrol: 450,
    status: 'Confirmed',
    assignedBuddy: 'Deepak Rao (Local Explorer)',
    paymentStatus: 'Unpaid',
    advanceAmount: 0,
    paymentRef: null,
    isKycVerified: false,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const DEFAULT_EMERGENCY = {
  guardianName: 'Pooja Sharma (Emergency Contact)',
  guardianPhone: '+91 98765 12345',
  notifyOnSos: true,
  shareLiveTracking: true
};

// Dispatch event on any write to keep React components reactive
function emitStoreUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('soloride_store_update'));
  }
}

export const StorageService = {
  // ---- BOOKINGS ----
  getBookings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
        return DEFAULT_BOOKINGS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load bookings from storage', e);
      return DEFAULT_BOOKINGS;
    }
  },

  addBooking: (booking) => {
    try {
      const current = StorageService.getBookings();
      const newBooking = {
        id: booking.id || `UDR-${Math.floor(1000 + Math.random() * 9000)}`,
        status: booking.status || 'Confirmed',
        assignedBuddy: booking.assignedBuddy || 'Bhuvan Dwivedi (Founder)',
        paymentStatus: booking.paymentStatus || 'Unpaid',
        advanceAmount: booking.advanceAmount || 0,
        createdAt: new Date().toISOString(),
        ...booking
      };
      const updated = [newBooking, ...current];
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      emitStoreUpdate();
      return newBooking;
    } catch (e) {
      console.error('Failed to save booking', e);
      return booking;
    }
  },

  updateBooking: (id, updates) => {
    try {
      const current = StorageService.getBookings();
      const updated = current.map((item) => (item.id === id ? { ...item, ...updates } : item));
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      emitStoreUpdate();
      return true;
    } catch (e) {
      console.error('Failed to update booking', e);
      return false;
    }
  },

  deleteBooking: (id) => {
    try {
      const current = StorageService.getBookings();
      const updated = current.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      emitStoreUpdate();
      return true;
    } catch (e) {
      console.error('Failed to delete booking', e);
      return false;
    }
  },

  // ---- KYC VERIFICATION ----
  getKyc: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.KYC);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveKyc: (kycData) => {
    try {
      const record = {
        ...kycData,
        isVerified: true,
        verifiedAt: new Date().toISOString(),
        kycRefNumber: kycData.kycRefNumber || `KYC-UDR-${Math.floor(100000 + Math.random() * 900000)}`
      };
      localStorage.setItem(STORAGE_KEYS.KYC, JSON.stringify(record));
      
      // Auto-update all user bookings with isKycVerified: true
      const bookings = StorageService.getBookings();
      const updatedBookings = bookings.map(b => ({ ...b, isKycVerified: true }));
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedBookings));

      emitStoreUpdate();
      return record;
    } catch (e) {
      console.error('Failed to save KYC', e);
      return null;
    }
  },

  clearKyc: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.KYC);
      emitStoreUpdate();
    } catch (e) {}
  },

  // ---- PAYMENTS ----
  getPayments: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  savePayment: (payment) => {
    try {
      const current = StorageService.getPayments();
      const newPayment = {
        txnId: payment.txnId || `TXN-UDR-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'SUCCESS',
        timestamp: new Date().toISOString(),
        ...payment
      };
      const updated = [newPayment, ...current];
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(updated));

      // If associated with a booking ID, update that booking's payment status
      if (payment.bookingId) {
        StorageService.updateBooking(payment.bookingId, {
          paymentStatus: 'Advance Paid',
          advanceAmount: payment.amount,
          paymentRef: newPayment.txnId
        });
      }

      emitStoreUpdate();
      return newPayment;
    } catch (e) {
      console.error('Failed to save payment', e);
      return null;
    }
  },

  // ---- EMERGENCY GUARDIAN SETTINGS ----
  getEmergency: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EMERGENCY);
      return data ? JSON.parse(data) : DEFAULT_EMERGENCY;
    } catch (e) {
      return DEFAULT_EMERGENCY;
    }
  },

  saveEmergency: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.EMERGENCY, JSON.stringify(settings));
      emitStoreUpdate();
      return true;
    } catch (e) {
      return false;
    }
  },

  // ---- REACTIVE LISTENER HOOK HELPER ----
  subscribe: (callback) => {
    if (typeof window === 'undefined') return () => {};
    const handler = () => callback();
    window.addEventListener('soloride_store_update', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('soloride_store_update', handler);
      window.removeEventListener('storage', handler);
    };
  }
};
