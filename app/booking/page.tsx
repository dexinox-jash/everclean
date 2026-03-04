"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Stripe imports - install @stripe/react-stripe-js for payment integration
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Loader2, 
  Crown, 
  CalendarClock, 
  PartyPopper,
  Home,
  Clock,
  MapPin,
  CreditCard,
  Shield
} from "lucide-react";
import { AnimatedSection } from "@/components/luxury/animations";

// Types
interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  basePrice: number;
  priceMultiplier: Record<string, number>;
  durationHours: number;
  icon: string;
}

interface BookingData {
  step1: { serviceId: string } | null;
  step2: { homeSize: string; hasPets: boolean; hasFineArt: boolean } | null;
  step3: { scheduledDate: string; scheduledTime: string } | null;
  step4: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: { street: string; city: string; postalCode: string };
    accessType: string;
    specialRequests: string;
    gdprConsent: boolean;
  } | null;
}

const homeSizes = [
  { value: "studio", label: "Studio / Bachelor", multiplier: 1 },
  { value: "1bed", label: "1 Bedroom", multiplier: 1.2 },
  { value: "2bed", label: "2 Bedroom", multiplier: 1.5 },
  { value: "3bed", label: "3-4 Bedroom", multiplier: 2 },
  { value: "4bed", label: "4-5 Bedroom", multiplier: 2.5 },
  { value: "estate", label: "Estate (5000+ sq ft)", multiplier: 3.5 },
];

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

const accessTypes = [
  { value: "present", label: "I'll be home", description: "You'll be present during the service" },
  { value: "key", label: "Leave key / Lockbox", description: "Key will be left in a secure location" },
  { value: "doorman", label: "Doorman / Concierge", description: "Building staff will provide access" },
];

// Mock services data - in production, fetch from API
const mockServices: Service[] = [
  {
    id: "1",
    slug: "estate-cleaning",
    name: "Estate White-Glove Cleaning",
    shortDescription: "Comprehensive care for distinguished residences",
    basePrice: 450,
    priceMultiplier: { studio: 1, "1bed": 1.2, "2bed": 1.5, "3bed": 2, "4bed": 2.5, estate: 3.5 },
    durationHours: 4,
    icon: "Crown",
  },
  {
    id: "2",
    slug: "concierge-maintenance",
    name: "Concierge Maintenance",
    shortDescription: "Weekly or bi-weekly scheduled care",
    basePrice: 350,
    priceMultiplier: { studio: 1, "1bed": 1.1, "2bed": 1.3, "3bed": 1.7, "4bed": 2.2, estate: 3 },
    durationHours: 3,
    icon: "CalendarClock",
  },
  {
    id: "3",
    slug: "pre-event-prep",
    name: "Pre-Event Preparation",
    shortDescription: "Immaculate presentation for special occasions",
    basePrice: 550,
    priceMultiplier: { studio: 1, "1bed": 1.1, "2bed": 1.3, "3bed": 1.6, "4bed": 2, estate: 2.8 },
    durationHours: 5,
    icon: "PartyPopper",
  },
];

const iconMap: Record<string, React.ElementType> = {
  Crown,
  CalendarClock,
  PartyPopper,
};

// ============================================================================
// STEP 1: SERVICE SELECTION
// ============================================================================
function Step1Service({ 
  data, 
  onUpdate, 
  services 
}: { 
  data: BookingData["step1"]; 
  onUpdate: (data: BookingData["step1"]) => void;
  services: Service[];
}) {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl text-text-secondary mb-2">Select Your Service</h2>
      <p className="text-text-secondary mb-8">Choose the service that best fits your needs.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Crown;
          const isSelected = data?.serviceId === service.id;
          
          return (
            <button
              key={service.id}
              onClick={() => onUpdate({ serviceId: service.id })}
              className={`relative p-8 text-left border-2 transition-all duration-300 ${
                isSelected 
                  ? "border-gold-500 bg-gold-500/5" 
                  : "border-[var(--color-border)] hover:border-gold-500/50 bg-[var(--color-pure)]"
              }`}
            >
              <Icon className={`w-10 h-10 mb-4 ${isSelected ? "text-gold-500" : "text-text-primary/40"}`} />
              <h3 className="font-serif text-lg text-text-secondary mb-2">{service.name}</h3>
              <p className="text-sm text-text-secondary mb-4">{service.shortDescription}</p>
              <p className="text-text-primary font-medium">From ${service.basePrice}</p>
              
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-gold-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-navy-900" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// STEP 2: HOME PROFILE
// ============================================================================
function Step2HomeProfile({ 
  data, 
  onUpdate, 
  selectedService 
}: { 
  data: BookingData["step2"]; 
  onUpdate: (data: BookingData["step2"]) => void;
  selectedService: Service | null;
}) {
  const [localData, setLocalData] = useState({
    homeSize: data?.homeSize || "",
    hasPets: data?.hasPets || false,
    hasFineArt: data?.hasFineArt || false,
  });

  useEffect(() => {
    if (localData.homeSize) {
      onUpdate(localData);
    }
  }, [localData]);

  const calculatePrice = () => {
    if (!selectedService || !localData.homeSize) return null;
    const multiplier = selectedService.priceMultiplier[localData.homeSize] || 1;
    return Math.round(selectedService.basePrice * multiplier);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-text-secondary mb-2">Home Profile</h2>
        <p className="text-text-secondary">Tell us about your residence so we can prepare appropriately.</p>
      </div>

      {/* Home Size */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-4">Home Size</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {homeSizes.map((size) => (
            <button
              key={size.value}
              onClick={() => setLocalData({ ...localData, homeSize: size.value })}
              className={`p-4 text-left border-2 transition-all duration-300 ${
                localData.homeSize === size.value
                  ? "border-gold-500 bg-gold-500/5"
                  : "border-[var(--color-border)] hover:border-gold-500/50"
              }`}
            >
              <Home className="w-5 h-5 text-gold-500 mb-2" />
              <p className="font-medium text-text-secondary text-sm">{size.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Special Requirements */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-text-secondary">Special Requirements</label>
        
        <label className="flex items-center gap-3 p-4 border border-[var(--color-border)] cursor-pointer hover:border-gold-500/50 transition-colors">
          <input
            type="checkbox"
            checked={localData.hasPets}
            onChange={(e) => setLocalData({ ...localData, hasPets: e.target.checked })}
            className="w-5 h-5 accent-gold-500"
          />
          <div>
            <p className="font-medium text-text-secondary">Pets on premises</p>
            <p className="text-sm text-text-secondary">Affects timing and product selection</p>
          </div>
        </label>

        <label className="flex items-center gap-3 p-4 border border-[var(--color-border)] cursor-pointer hover:border-gold-500/50 transition-colors">
          <input
            type="checkbox"
            checked={localData.hasFineArt}
            onChange={(e) => setLocalData({ ...localData, hasFineArt: e.target.checked })}
            className="w-5 h-5 accent-gold-500"
          />
          <div>
            <p className="font-medium text-text-secondary">Fine art or antiques requiring special care</p>
            <p className="text-sm text-text-secondary">Our specialists will handle these items</p>
          </div>
        </label>
      </div>

      {/* Price Estimate */}
      {calculatePrice() && (
        <div className="p-6 bg-cream">
          <p className="text-sm text-text-muted mb-1">Estimated Price</p>
          <p className="font-serif text-3xl text-text-primary">${calculatePrice()?.toLocaleString()}</p>
          <p className="text-sm text-text-secondary mt-2">Final price confirmed after booking details</p>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// STEP 3: SCHEDULE
// ============================================================================
function Step3Schedule({ 
  data, 
  onUpdate, 
  selectedService 
}: { 
  data: BookingData["step3"]; 
  onUpdate: (data: BookingData["step3"]) => void;
  selectedService: Service | null;
}) {
  const [localData, setLocalData] = useState({
    scheduledDate: data?.scheduledDate || "",
    scheduledTime: data?.scheduledTime || "",
  });

  useEffect(() => {
    if (localData.scheduledDate && localData.scheduledTime) {
      onUpdate(localData);
    }
  }, [localData]);

  // Generate next 14 days
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split("T")[0];
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-text-secondary mb-2">Select Date & Time</h2>
        <p className="text-text-secondary">Choose when you&apos;d like our team to arrive.</p>
      </div>

      {/* Date Selection */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-4">Date</label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {availableDates.map((date) => {
            const dateObj = new Date(date);
            const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
            const dayNum = dateObj.getDate();
            const isSelected = localData.scheduledDate === date;
            const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;

            return (
              <button
                key={date}
                onClick={() => setLocalData({ ...localData, scheduledDate: date, scheduledTime: "" })}
                className={`p-3 text-center border-2 transition-all duration-300 ${
                  isSelected
                    ? "border-gold-500 bg-gold-500 text-navy-900"
                    : isWeekend
                    ? "border-[var(--color-border)] bg-cream"
                    : "border-[var(--color-border)] hover:border-gold-500/50"
                }`}
              >
                <p className="text-xs uppercase mb-1 opacity-80">{dayName}</p>
                <p className="font-serif text-lg">{dayNum}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      {localData.scheduledDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <label className="block text-sm font-medium text-text-secondary">Time</label>
          <div className="grid grid-cols-4 gap-3">
            {timeSlots.map((time) => {
              const [hours, minutes] = time.split(":");
              const period = parseInt(hours) >= 12 ? "PM" : "AM";
              const displayHour = parseInt(hours) > 12 ? parseInt(hours) - 12 : parseInt(hours);
              const isSelected = localData.scheduledTime === time;

              return (
                <button
                  key={time}
                  onClick={() => setLocalData({ ...localData, scheduledTime: time })}
                  className={`p-3 text-center border-2 transition-all duration-300 ${
                    isSelected
                      ? "border-gold-500 bg-gold-500/10"
                      : "border-[var(--color-border)] hover:border-gold-500/50"
                  }`}
                >
                  <Clock className="w-4 h-4 mx-auto mb-1 text-gold-500" />
                  <p className="text-sm font-medium text-text-secondary">
                    {displayHour}:{minutes} {period}
                  </p>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Duration Estimate */}
      {selectedService && (
        <div className="p-4 bg-cream flex items-center gap-4">
          <Clock className="w-5 h-5 text-gold-500" />
          <div>
            <p className="text-sm font-medium text-text-secondary">Estimated Duration</p>
            <p className="text-sm text-text-secondary">{selectedService.durationHours} hours</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// STEP 4: CONTACT & ACCESS
// ============================================================================
function Step4Contact({ data, onUpdate }: { data: BookingData["step4"]; onUpdate: (data: BookingData["step4"]) => void }) {
  const [localData, setLocalData] = useState({
    customerName: data?.customerName || "",
    customerEmail: data?.customerEmail || "",
    customerPhone: data?.customerPhone || "",
    address: data?.address || { street: "", city: "", postalCode: "" },
    accessType: data?.accessType || "present",
    specialRequests: data?.specialRequests || "",
    gdprConsent: data?.gdprConsent || false,
  });

  const updateField = (field: string, value: string | boolean | { street: string; city: string; postalCode: string }) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData as typeof localData);
    
    // Only update parent when all required fields are filled
    if (newData.customerName && newData.customerEmail && newData.customerPhone && 
        newData.address.street && newData.address.city && newData.address.postalCode &&
        newData.gdprConsent) {
      onUpdate(newData as typeof localData);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-text-secondary mb-2">Contact & Access</h2>
        <p className="text-text-secondary">How can we reach you and access your home?</p>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Full Name *</label>
          <input
            type="text"
            value={localData.customerName}
            onChange={(e) => updateField("customerName", e.target.value)}
            className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-gold-500 focus:outline-none transition-colors"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Phone *</label>
          <input
            type="tel"
            value={localData.customerPhone}
            onChange={(e) => updateField("customerPhone", e.target.value)}
            className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-gold-500 focus:outline-none transition-colors"
            placeholder="(519) 555-0123"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-secondary mb-2">Email *</label>
          <input
            type="email"
            value={localData.customerEmail}
            onChange={(e) => updateField("customerEmail", e.target.value)}
            className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-gold-500 focus:outline-none transition-colors"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-text-secondary flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gold-500" />
          Service Address
        </label>
        <input
          type="text"
          value={localData.address.street}
          onChange={(e) => updateField("address", { ...localData.address, street: e.target.value })}
          className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-gold-500 focus:outline-none transition-colors"
          placeholder="Street Address"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={localData.address.city}
            onChange={(e) => updateField("address", { ...localData.address, city: e.target.value })}
            className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-gold-500 focus:outline-none transition-colors"
            placeholder="City"
          />
          <input
            type="text"
            value={localData.address.postalCode}
            onChange={(e) => updateField("address", { ...localData.address, postalCode: e.target.value })}
            className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-gold-500 focus:outline-none transition-colors"
            placeholder="Postal Code"
          />
        </div>
      </div>

      {/* Access Type */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-text-secondary">Access Method</label>
        {accessTypes.map((type) => (
          <label
            key={type.value}
            className={`flex items-start gap-3 p-4 border-2 cursor-pointer transition-colors ${
              localData.accessType === type.value
                ? "border-gold-500 bg-gold-500/5"
                : "border-[var(--color-border)] hover:border-gold-500/50"
            }`}
          >
            <input
              type="radio"
              name="accessType"
              value={type.value}
              checked={localData.accessType === type.value}
              onChange={(e) => updateField("accessType", e.target.value)}
              className="mt-1 w-4 h-4 accent-gold-500"
            />
            <div>
              <p className="font-medium text-text-secondary">{type.label}</p>
              <p className="text-sm text-text-secondary">{type.description}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">Special Requests</label>
        <textarea
          value={localData.specialRequests}
          onChange={(e) => updateField("specialRequests", e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-gold-500 focus:outline-none transition-colors resize-none"
          placeholder="Specific rooms to focus on? Allergies? Security systems to disable?"
        />
      </div>

      {/* GDPR Consent */}
      <label className="flex items-start gap-3 p-4 bg-cream cursor-pointer">
        <input
          type="checkbox"
          checked={localData.gdprConsent}
          onChange={(e) => updateField("gdprConsent", e.target.checked)}
          className="mt-0.5 w-5 h-5 accent-gold-500"
        />
        <p className="text-sm text-text-secondary">
          I consent to Everclean processing my personal data for booking and service delivery. 
          View our <a href="/privacy" target="_blank" className="text-gold-600 hover:underline">Privacy Policy</a>.
        </p>
      </label>
    </div>
  );
}

// ============================================================================
// STEP 5: REVIEW & PAYMENT
// ============================================================================
function Step5Payment({ 
  bookingData, 
  services,
  onComplete 
}: { 
  bookingData: BookingData; 
  services: Service[];
  onComplete: () => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const service = services.find(s => s.id === bookingData.step1?.serviceId);
  const priceMultiplier = service?.priceMultiplier[bookingData.step2?.homeSize || ""] || 1;
  const calculatedPrice = service ? Math.round(service.basePrice * priceMultiplier) : 0;

  const handleSubmit = async () => {
    setIsProcessing(true);
    setError("");

    try {
      // Create booking
      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingData.step1,
          ...bookingData.step2,
          ...bookingData.step3,
          ...bookingData.step4,
          calculatedPrice,
        }),
      });

      if (!bookingResponse.ok) {
        throw new Error("Failed to create booking");
      }

      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!service || !bookingData.step2 || !bookingData.step3 || !bookingData.step4) {
    return <div className="text-text-secondary">Please complete all previous steps</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-text-secondary mb-2">Review & Confirm</h2>
        <p className="text-text-secondary">Please review your booking details before confirming.</p>
      </div>

      {/* Summary Card */}
      <div className="bg-cream p-6 md:p-8 space-y-6">
        <h3 className="font-serif text-xl text-text-secondary">Booking Summary</h3>
        
        <div className="space-y-4 text-sm">
          <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
            <span className="text-text-secondary">Service</span>
            <span className="font-medium text-text-secondary">{service.name}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
            <span className="text-text-secondary">Home Size</span>
            <span className="font-medium text-text-secondary capitalize">{bookingData.step2.homeSize.replace(/(\d)/, " $1")}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
            <span className="text-text-secondary">Date & Time</span>
            <span className="font-medium text-text-secondary">
              {new Date(bookingData.step3.scheduledDate).toLocaleDateString()} at{" "}
              {new Date(`2000-01-01T${bookingData.step3.scheduledTime}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
            <span className="text-text-secondary">Address</span>
            <span className="font-medium text-text-secondary text-right">
              {bookingData.step4.address.street}<br />
              {bookingData.step4.address.city}, {bookingData.step4.address.postalCode}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-text-secondary font-medium">Total</span>
            <span className="font-serif text-2xl text-text-primary">${calculatedPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Payment Notice */}
      <div className="p-4 bg-navy-700/5 border-l-4 border-navy-700">
        <p className="text-sm text-text-secondary">
          <strong>Payment:</strong> You will be redirected to our secure payment processor after confirming. 
          We accept all major credit cards. Your booking is confirmed upon successful payment.
        </p>
      </div>

      {/* Terms */}
      <p className="text-sm text-text-secondary">
        By confirming, you agree to our <a href="/terms" target="_blank" className="text-gold-600 hover:underline">Terms of Service</a> including 
        our cancellation policy (48 hours for full refund).
      </p>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-navy-700 text-[var(--color-ivory)] text-sm font-medium uppercase tracking-wider hover:bg-navy-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            Complete Reservation
          </>
        )}
      </button>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
        <Shield className="w-4 h-4" />
        <span>Secure SSL Encryption</span>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN BOOKING PAGE
// ============================================================================
export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    step1: null,
    step2: null,
    step3: null,
    step4: null,
  });
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { number: 1, title: "Service", icon: Crown },
    { number: 2, title: "Home", icon: Home },
    { number: 3, title: "Schedule", icon: Clock },
    { number: 4, title: "Contact", icon: MapPin },
    { number: 5, title: "Confirm", icon: CreditCard },
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!bookingData.step1;
      case 2: return !!bookingData.step2;
      case 3: return !!bookingData.step3;
      case 4: return !!bookingData.step4;
      default: return true;
    }
  };

  const selectedService = (bookingData.step1 
    ? mockServices.find(s => s.id === bookingData.step1?.serviceId) 
    : null) ?? null;

  if (isComplete) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[var(--color-ivory)]">
        <div className="container-luxury max-w-2xl">
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-navy-900" />
            </div>
            <h1 className="font-serif text-4xl text-text-secondary mb-4">Reservation Confirmed</h1>
            <p className="text-text-secondary mb-8">
              Thank you for choosing Everclean. A confirmation email has been sent to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/portal" className="btn-primary">View in Portal</a>
              <a href="/" className="btn-secondary">Return Home</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[var(--color-ivory)]">
      <div className="container-luxury">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="text-eyebrow mb-4 block">Reserve Your Service</span>
          <h1 className="font-serif text-3xl md:text-4xl text-text-secondary mb-4">
            Book Your Cleaning
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Complete the form below to schedule your white-glove service. 
            Our concierge team will confirm your booking within 2 hours.
          </p>
        </AnimatedSection>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.number} className="flex items-center">
                  <button
                    onClick={() => isCompleted && setCurrentStep(step.number)}
                    disabled={!isCompleted && !isActive}
                    className={`flex flex-col items-center gap-2 transition-colors ${
                      isActive ? "text-gold-500" : isCompleted ? "text-text-primary" : "text-text-muted"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center border-2 transition-colors ${
                        isActive
                          ? "border-gold-500 bg-gold-500 text-navy-900"
                          : isCompleted
                          ? "border-navy-700 bg-navy-700 text-[var(--color-ivory)]"
                          : "border-stone-muted text-text-muted"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="font-serif text-lg">{step.number}</span>
                      )}
                    </div>
                    <span className="hidden sm:block text-xs uppercase tracking-wider">{step.title}</span>
                  </button>
                  {!isLast && (
                    <div
                      className={`w-12 md:w-24 h-px mx-2 md:mx-4 ${
                        isCompleted ? "bg-navy-700" : "bg-[var(--color-border)]"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--color-pure)] p-8 md:p-12 shadow-luxury"
            >
              {currentStep === 1 && (
                <Step1Service 
                  data={bookingData.step1} 
                  onUpdate={(data) => setBookingData({ ...bookingData, step1: data })}
                  services={mockServices}
                />
              )}
              {currentStep === 2 && (
                <Step2HomeProfile 
                  data={bookingData.step2} 
                  onUpdate={(data) => setBookingData({ ...bookingData, step2: data })}
                  selectedService={selectedService}
                />
              )}
              {currentStep === 3 && (
                <Step3Schedule 
                  data={bookingData.step3} 
                  onUpdate={(data) => setBookingData({ ...bookingData, step3: data })}
                  selectedService={selectedService}
                />
              )}
              {currentStep === 4 && (
                <Step4Contact 
                  data={bookingData.step4} 
                  onUpdate={(data) => setBookingData({ ...bookingData, step4: data })}
                />
              )}
              {currentStep === 5 && (
                <Step5Payment 
                  bookingData={bookingData}
                  services={mockServices}
                  onComplete={() => setIsComplete(true)}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {currentStep < 5 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-text-secondary hover:text-gold-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-8 py-3 bg-navy-700 text-[var(--color-ivory)] text-sm font-medium uppercase tracking-wider hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
