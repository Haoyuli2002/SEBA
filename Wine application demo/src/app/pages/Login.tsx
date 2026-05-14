import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, Store, ArrowRight, ArrowLeft } from "lucide-react";
import LogoSvg from "../../imports/Logo.svg";
import { useUser } from "../context/UserContext";

export function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"taster" | "business" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const handleRoleSelection = (selectedRole: "taster" | "business") => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (role === "business") {
      setUser({
        firstName: "Sophie",
        lastName: "Wagner",
        email: email || "sophie@weinkultur.de",
        role: "business",
        businessName: "Weinkultur",
        businessType: "Wine Bar",
        location: "Munich, Germany",
        memberSince: "March 2025",
        isNewUser: false,
      });
      navigate("/business");
    } else {
      setUser({
        firstName: "Alex",
        lastName: "Chen",
        email: email || "alex.chen@example.com",
        role: "taster",
        location: "Munich, Germany",
        memberSince: "January 2026",
        isNewUser: false,
      });
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
          {step === 1 ? "Welcome back" : "Sign in to your account"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {step === 1
            ? "Choose how you use Decantr"
            : `Signing in as ${role === "taster" ? "Wine Lover" : "Wine Business"}`}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100 sm:px-10">
          {step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wine Lover Option */}
              <button
                onClick={() => handleRoleSelection("taster")}
                className="group relative flex flex-col items-center p-8 border-2 border-gray-200 rounded-2xl hover:border-[var(--wine-red)] hover:bg-[var(--wine-red-50)] transition-all text-center"
              >
                <div className="w-16 h-16 bg-[var(--wine-red-50)] text-[var(--wine-red)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Wine Lover</h3>
                <p className="text-sm text-gray-600">
                  Discover tastings, track your notes, and explore your palate.
                </p>
                <div className="mt-6 flex items-center text-[var(--wine-red)] font-semibold">
                  Continue <ArrowRight size={18} className="ml-2" />
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
                  Manage events, view analytics, and connect with customers.
                </p>
                <div className="mt-6 flex items-center text-[var(--wine-red)] font-semibold">
                  Continue <ArrowRight size={18} className="ml-2" />
                </div>
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-sm text-[var(--wine-red)] hover:underline mb-2"
              >
                <ArrowLeft size={16} />
                Change role
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wine-red)]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-[var(--wine-red)] border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-[var(--wine-red)] hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[var(--wine-red)] hover:bg-[var(--wine-red-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wine-red)] transition-colors"
              >
                Sign In
              </button>
            </form>
          )}
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-[var(--wine-red)] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}