import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, Store, ArrowRight, CheckCircle2 } from "lucide-react";
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
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleRoleSelection = (selectedRole: "taster" | "business") => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save user data to context
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
          {step === 1 ? "Create your account" : "Complete your profile"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {step === 1
            ? "Choose how you want to use Decantr"
            : "Fill in your details to get started"}
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
                <div className="mt-6 flex items-center text-[var(--wine-red)] font-semibold">
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
                <div className="mt-6 flex items-center text-[var(--wine-red)] font-semibold">
                  Get Started <ArrowRight size={18} className="ml-2" />
                </div>
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
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
                Create Account
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