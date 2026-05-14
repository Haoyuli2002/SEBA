import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Calendar, MapPin, Users, Star, Check, CreditCard, Lock } from "lucide-react";
import { useUser } from "../context/UserContext";

const eventData: Record<string, any> = {
  "summer-rose": {
    title: "Summer Rosé Tasting",
    date: "June 14, 2026",
    time: "18:00–20:30",
    venue: "Weinkultur, Schwabing",
    address: "Leopoldstraße 45, Munich",
    price: 15,
    registered: 12,
    capacity: 20,
    rating: 4.7,
    host: "Weinkultur",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=400&fit=crop",
    description:
      "Join us for an evening exploring premium Rosé wines from Provence. Taste 4 carefully selected wines, learn about the region, and enjoy light snacks paired with each wine.",
    included: [
      "4 premium wine tastings",
      "Tasting sheet and notes",
      "Light snacks and bread",
      "Expert sommelier guidance",
    ],
  },
};

export function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<"details" | "payment" | "confirmation">("details");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const event = eventData[eventId || ""];

  if (!event) {
    return <div className="p-4">Event not found</div>;
  }

  const handleRegister = () => {
    setStep("payment");
  };

  const { registerForEvent } = useUser();

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Register the event in user context
      registerForEvent({
        id: eventId || "unknown",
        title: event.title,
        date: event.date,
        time: event.time.split("–")[0] || event.time,
        venue: event.venue,
        image: event.image,
        price: event.price,
        status: "confirmed",
        registeredAt: new Date().toISOString().split("T")[0],
      });
      setStep("confirmation");
    }, 1500);
  };

  const handleStartTasting = () => {
    navigate(`/event/${eventId}/tasting`);
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-y-auto">
      {/* Header Image */}
      <div className="relative">
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
        <Link
          to="/explore"
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 pb-24">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h1>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar size={18} className="text-[var(--wine-red)]" />
            <span className="text-sm">{event.date} · {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin size={18} className="text-[var(--wine-red)]" />
            <span className="text-sm">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Users size={18} className="text-[var(--wine-red)]" />
            <span className="text-sm">{event.registered}/{event.capacity} registered</span>
          </div>
        </div>

        {/* Host */}
        <div className="flex items-center gap-3 py-3 border-y border-gray-200 mb-4">
          <div className="w-12 h-12 rounded-full bg-[var(--wine-red-100)] flex items-center justify-center">
            <span className="text-lg font-semibold text-[var(--wine-red-dark)]">W</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Hosted by</p>
            <p className="font-semibold text-gray-900">{event.host}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{event.rating}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h2 className="font-semibold text-gray-900 mb-2">About this event</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{event.description}</p>
        </div>

        {/* What's Included */}
        <div className="mb-4">
          <h2 className="font-semibold text-gray-900 mb-2">What's included</h2>
          <ul className="space-y-2">
            {event.included.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Location */}
        <div className="mb-4">
          <h2 className="font-semibold text-gray-900 mb-2">Location</h2>
          <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={32} className="text-gray-400 mx-auto mb-1" />
              <p className="text-sm text-gray-600">{event.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-600">Price per person</p>
            <p className="text-xl font-bold text-gray-900">€{event.price}</p>
          </div>
          <button
            onClick={handleRegister}
            className="flex-1 bg-[var(--wine-red)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors"
          >
            Register Now
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {step === "payment" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Complete Payment</h2>
              <p className="text-sm text-gray-600">Secure checkout for your event registration</p>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">{event.title}</span>
                <span className="font-semibold text-gray-900">€{event.price}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-[var(--wine-red)]">€{event.price}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 border-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    paymentMethod === "card"
                      ? "border-[var(--wine-red)] bg-[var(--wine-red-50)]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard size={20} className={paymentMethod === "card" ? "text-[var(--wine-red)]" : "text-gray-600"} />
                  <span className={`font-medium text-sm ${paymentMethod === "card" ? "text-[var(--wine-red)]" : "text-gray-700"}`}>Credit Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className={`p-3 border-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    paymentMethod === "paypal"
                      ? "border-[var(--wine-red)] bg-[var(--wine-red-50)]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className={`font-bold text-sm ${paymentMethod === "paypal" ? "text-[var(--wine-red)]" : "text-gray-700"}`}>PayPal</span>
                </button>
              </div>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === "card" && (
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input type="text" required placeholder="Alex Chen" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input type="text" required placeholder="4242 4242 4242 4242" maxLength={19} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input type="text" required placeholder="MM/YY" maxLength={5} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input type="text" required placeholder="123" maxLength={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                  <Lock size={14} />
                  <span>Your payment is secured with SSL encryption</span>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setStep("details")} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">Cancel</button>
                  <button type="submit" disabled={isProcessing} className="flex-1 px-4 py-3 bg-[var(--wine-red)] text-white rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors disabled:opacity-60">
                    {isProcessing ? "Processing..." : `Pay €${event.price}`}
                  </button>
                </div>
              </form>
            )}

            {/* PayPal */}
            {paymentMethod === "paypal" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">You will be redirected to PayPal to complete your payment of <strong>€{event.price}</strong>.</p>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setStep("details")} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={(e) => handlePayment(e as any)} disabled={isProcessing} className="flex-1 px-4 py-3 bg-[#0070ba] text-white rounded-lg font-semibold hover:bg-[#005ea6] transition-colors disabled:opacity-60">
                    {isProcessing ? "Processing..." : "Pay with PayPal"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {step === "confirmation" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 text-sm">
                You're registered for <strong>{event.title}</strong>. A confirmation has been sent to your email.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Amount paid</span>
                <span className="font-semibold text-green-600">€{event.price}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleStartTasting}
                className="w-full bg-[var(--wine-red)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--wine-red-dark)] transition-colors"
              >
                Start Tasting Experience
              </button>
              <button
                onClick={() => navigate("/explore")}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back to Events
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
