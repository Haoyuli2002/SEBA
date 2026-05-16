import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, Store, ArrowRight, CheckCircle2, CreditCard, Lock, Check } from "lucide-react";
import LogoSvg from "../../imports/Logo.svg";
import { useUser } from "../context/UserContext";

export function Register() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"taster" | "business" | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "premium">("basic");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleRoleSelection = (selectedRole: "taster" | "business") => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "business") {
      // Business users go to subscription step
      setStep(3);
    } else {
      // Tasters register directly
      completeRegistration();
    }
  };

  const handleSubscriptionPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      completeRegistration();
    }, 1500);
  };

  const completeRegistration = () => {
    setUser({
      firstName,
      lastName,
      email,
      role: role!,
      businessName: role === "business" ? businessName : undefined,
      businessType: role === "business" ? businessType : undefined,
      location: "Munich, Germany",
      memberSince: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      isNewUser: true,
    });

    if (role === "business") {
      navigate("/business");
    } else {
      navigate("/explore");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-8">
          <img src={LogoSvg} alt="Decantr" className="h-20 w-auto" />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {step === 1 ? "Create your account" : step === 2 ? "Complete your profile" : "Choose your plan"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {step === 1
            ? "Choose how you want to use Decantr"
            : step === 2
            ? "Fill in your details to get started"
            : "Select a subscription to access business features"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100 sm:px-10">
          {step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wine Taster Option */}
              <button
                onClick={() => handleRoleSelection("taster")}
                className="group relative flex flex-col items-center p-8 border-2 border-gray-200 rounded-2xl hover:border-[var(--wine-red)] hover:bg-[var(--wine-red-50)] transition-all text-center"
              >
                <div className="w-16 h-16 bg-[var(--wine-red-50)] text-[var(--wine-red)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Wine Lover</h3>
                <p className="text-sm text-gray-600">
                  Discover local tastings, track your notes, and build your digital cellar.
                </p>
                <p className="mt-2 text-xs text-green-600 font-medium">Free</p>
                <div className="mt-4 flex items-center text-[var(--wine-red)] font-semibold">
                  Get Started <ArrowRight size={18} className="ml-2" />
                </div>
              </button>

              {/* Business Option */}
              <button
                onClick={() => handleRoleSelection("business")}
                className="group relative flex flex-col items-center p-8 border-2 border-gray-200 rounded-2xl hover:border-[var(--wine-red)] hover:bg-[var(--wine-red-50)] transition-all text-center"
              >
                <div className="w-16 h-16 bg-[var(--wine-red-50)] text-[var(--wine-red)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Store size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Wine Business</h3>
                <p className="text-sm text-gray-600">
                  Host events, manage wine lists, and gain insights from your customers.
                </p>
                <p className="mt-2 text-xs text-gray-500 font-medium">Subscription required</p>
                <div className="mt-4 flex items-center text-[var(--wine-red)] font-semibold">
                  Get Started <ArrowRight size={18} className="ml-2" />
                </div>
              </button>
            </div>
          ) : step === 2 ? (
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-[var(--wine-red-50)] rounded-xl border border-[var(--wine-red-100)] mb-6">
                <CheckCircle2 className="text-[var(--wine-red)]" />
                <p className="text-sm text-gray-700 font-medium">
                  Signing up as a <span className="font-bold text-[var(--wine-red)] uppercase">{role === 'taster' ? 'Wine Lover' : 'Wine Business'}</span>
                </p>
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="ml-auto text-xs text-[var(--wine-red)] hover:underline"
                >
                  Change
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]"
                />
              </div>

              {role === "business" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Business Name</label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]"
                      placeholder="e.g. Weinkultur"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Business Type</label>
                    <select
                      required
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]"
                    >
                      <option value="">Select type...</option>
                      <option value="Wine Bar">Wine Bar</option>
                      <option value="Winery">Winery</option>
                      <option value="Event Organizer">Event Organizer</option>
                      <option value="Wine Shop">Wine Shop</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-[var(--wine-red)] border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the <a href="#" className="text-[var(--wine-red)] hover:underline">Terms of Service</a> and <a href="#" className="text-[var(--wine-red)] hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[var(--wine-red)] hover:bg-[var(--wine-red-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wine-red)] transition-colors"
              >
                {role === "business" ? "Next: Choose Plan →" : "Create Account"}
              </button>
            </form>
          ) : (
            /* Step 3: Subscription Plan + Payment (Business only) */
            <form onSubmit={handleSubscriptionPayment} className="space-y-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-sm text-[var(--wine-red)] hover:underline mb-2"
              >
                ← Back to details
              </button>

              {/* Plan Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Select Your Plan</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan("basic")}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      selectedPlan === "basic"
                        ? "border-[var(--wine-red)] bg-[var(--wine-red-50)]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-bold text-gray-900">Basic</p>
                    <p className="text-2xl font-bold text-[var(--wine-red)] mt-1">€29<span className="text-sm text-gray-500 font-normal">/mo</span></p>
                    <ul className="mt-3 space-y-1 text-xs text-gray-600">
                      <li className="flex items-center gap-1"><Check size={12} className="text-green-500" /> Up to 5 events/month</li>
                      <li className="flex items-center gap-1"><Check size={12} className="text-green-500" /> Basic analytics</li>
                      <li className="flex items-center gap-1"><Check size={12} className="text-green-500" /> Wine list management</li>
                    </ul>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlan("premium")}
                    className={`p-4 border-2 rounded-xl text-left transition-all relative ${
                      selectedPlan === "premium"
                        ? "border-[var(--wine-red)] bg-[var(--wine-red-50)]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="absolute -top-2 right-3 px-2 py-0.5 bg-[var(--wine-red)] text-white text-xs font-bold rounded-full">Popular</span>
                    <p className="font-bold text-gray-900">Premium</p>
                    <p className="text-2xl font-bold text-[var(--wine-red)] mt-1">€59<span className="text-sm text-gray-500 font-normal">/mo</span></p>
                    <ul className="mt-3 space-y-1 text-xs text-gray-600">
                      <li className="flex items-center gap-1"><Check size={12} className="text-green-500" /> Unlimited events</li>
                      <li className="flex items-center gap-1"><Check size={12} className="text-green-500" /> Advanced analytics</li>
                      <li className="flex items-center gap-1"><Check size={12} className="text-green-500" /> Promoted listings</li>
                    </ul>
                  </button>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Payment Details</label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input type="text" required placeholder={`${firstName} ${lastName}`} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input type="text" required placeholder="4242 4242 4242 4242" maxLength={19} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                      <input type="text" required placeholder="MM/YY" maxLength={5} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input type="text" required placeholder="123" maxLength={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{selectedPlan === "basic" ? "Basic" : "Premium"} Plan (monthly)</span>
                  <span className="font-bold text-gray-900">€{selectedPlan === "basic" ? "29" : "59"}/mo</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Lock size={14} />
                <span>Payment secured with SSL encryption. Cancel anytime.</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[var(--wine-red)] hover:bg-[var(--wine-red-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wine-red)] transition-colors disabled:opacity-60"
              >
                {isProcessing ? "Processing payment..." : `Subscribe & Create Account — €${selectedPlan === "basic" ? "29" : "59"}/mo`}
              </button>
            </form>
          )}
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[var(--wine-red)] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
