import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Mail,
  MapPin,
  Bell,
  Lock,
  CreditCard,
  LogOut,
  ChevronRight,
  Edit2,
  User,
  Calendar,
} from "lucide-react";
import { useUser } from "../context/UserContext";

export function Profile() {
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useUser();

  // Fallback if no user in context
  const displayUser = user || {
    firstName: "Alex",
    lastName: "Chen",
    email: "alex.chen@example.com",
    role: "taster" as const,
    location: "Munich, Germany",
    memberSince: "January 2026",
    isNewUser: false,
  };

  const fullName = `${displayUser.firstName} ${displayUser.lastName}`;
  const initials = `${displayUser.firstName[0]}${displayUser.lastName[0]}`.toUpperCase();

  const tastePreferences = [
    { label: "Dry", selected: true },
    { label: "Fruity", selected: true },
    { label: "Light-bodied", selected: true },
    { label: "Crisp", selected: false },
    { label: "Oak", selected: false },
    { label: "Floral", selected: false },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8">
          {/* User Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-24 h-24 bg-[var(--wine-red)] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-4xl font-bold text-white">{initials}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{fullName}</h2>
                    <p className="text-gray-600 flex items-center gap-2 mb-1">
                      <Mail size={16} />
                      {displayUser.email}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2 mb-1">
                      <MapPin size={16} />
                      {displayUser.location || "Munich, Germany"}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Calendar size={16} />
                      Member since {displayUser.memberSince || "2026"}
                    </p>
                  </div>
                  <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit2 size={20} className="text-gray-600" />
                  </button>
                </div>
                {displayUser.role === "taster" && (
                  <span className="inline-block px-3 py-1 bg-[var(--wine-red-100)] text-[var(--wine-red-dark)] rounded-full text-sm font-medium">
                    Wine Enthusiast
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div className="text-center p-4 bg-gradient-to-br from-[var(--wine-red-50)] to-pink-50 rounded-lg">
                <p className="text-3xl font-bold text-[var(--wine-red-dark)] mb-1">{displayUser.isNewUser ? 0 : 8}</p>
                <p className="text-sm text-gray-600">Tastings Attended</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-[var(--wine-red-50)] to-pink-50 rounded-lg">
                <p className="text-3xl font-bold text-[var(--wine-red-dark)] mb-1">{displayUser.isNewUser ? 0 : 12}</p>
                <p className="text-sm text-gray-600">Wines in Cellar</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-[var(--wine-red-50)] to-pink-50 rounded-lg">
                <p className="text-3xl font-bold text-[var(--wine-red-dark)] mb-1">{displayUser.isNewUser ? "—" : "4.3"}</p>
                <p className="text-sm text-gray-600">Avg Rating Given</p>
              </div>
            </div>
          </div>

          {/* Taste Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Taste Preferences</h3>
            <p className="text-gray-600 mb-6">
              Based on your tasting history, you tend to prefer these wine characteristics:
            </p>
            <div className="flex flex-wrap gap-3">
              {tastePreferences.map((pref) => (
                <span
                  key={pref.label}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    pref.selected
                      ? "bg-[var(--wine-red)] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {pref.label}
                </span>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Settings</h3>
            </div>

            <button className="w-full flex items-center justify-between p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <Bell size={24} className="text-gray-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900 mb-1">Notifications</p>
                  <p className="text-sm text-gray-500">Event reminders and updates</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotifications(!notifications);
                  }}
                  className={`w-14 h-7 rounded-full transition-colors cursor-pointer ${
                    notifications ? "bg-[var(--wine-red)]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full mt-0.5 transition-transform ${
                      notifications ? "ml-7" : "ml-0.5"
                    }`}
                  />
                </div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <Lock size={24} className="text-gray-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900 mb-1">Privacy & Security</p>
                  <p className="text-sm text-gray-500">Password and data settings</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <CreditCard size={24} className="text-gray-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900 mb-1">Payment Methods</p>
                  <p className="text-sm text-gray-500">Manage saved cards</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <User size={24} className="text-gray-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900 mb-1">Account Settings</p>
                  <p className="text-sm text-gray-500">Edit profile and preferences</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-gray-400" />
            </button>
          </div>

          {/* Logout */}
          <div className="mb-8">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-4 border-2 border-red-300 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              Log Out
            </button>
          </div>

          {/* Footer Info */}
          <div className="text-center text-sm text-gray-500 pb-8">
            <p>Member since {displayUser.memberSince || "2026"}</p>
            <p className="mt-2">Decantr v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}