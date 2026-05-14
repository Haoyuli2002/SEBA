import { useState } from "react";
import { User, Building2, CreditCard, Bell, Shield, LogOut, Camera, Globe, Mail, MapPin } from "lucide-react";

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Business Profile", icon: Building2 },
    { id: "account", label: "Account Settings", icon: User },
    { id: "billing", label: "Billing & Plan", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Manage your business profile and account preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                activeTab === tab.id
                  ? "bg-[var(--wine-red-100)] text-[var(--wine-red-dark)]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-gray-100">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm font-medium">
              <LogOut size={18} />
              Log Out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          {activeTab === "profile" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Business Information</h3>
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group">
                    <div className="w-24 h-24 bg-[var(--wine-red)] rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                      W
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full border border-gray-200 shadow-sm text-gray-600 hover:text-[var(--wine-red)] transition-colors group-hover:scale-110">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Weinkultur Schwabing</h4>
                    <p className="text-sm text-gray-500">Premium Wine Merchant & Event Host</p>
                    <button className="mt-2 text-xs font-bold text-[var(--wine-red)] uppercase tracking-wider hover:underline">Change Logo</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Business Name</label>
                    <input 
                      type="text" 
                      defaultValue="Weinkultur Schwabing"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Website</label>
                    <div className="relative">
                      <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        defaultValue="weinkultur-schwabing.de"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contact Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="email" 
                        defaultValue="events@weinkultur.de"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        defaultValue="Schwabing, Munich, DE"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Business Description</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wine-red-50)]0 resize-none"
                      defaultValue="Weinkultur is a boutique wine merchant in the heart of Schwabing, specializing in organic and natural wines from across Europe."
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                <button className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">Discard</button>
                <button className="px-6 py-2 bg-[var(--wine-red)] text-white rounded-lg text-sm font-bold hover:bg-[var(--wine-red-dark)] transition-colors shadow-sm">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab !== "profile" && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
                <SettingsPageIcon tabId={activeTab} />
              </div>
              <h3 className="font-bold text-gray-900">{tabs.find(t => t.id === activeTab)?.label}</h3>
              <p className="text-sm text-gray-500 mt-1">This section is being updated. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingsPageIcon({ tabId }: { tabId: string }) {
  switch (tabId) {
    case "account": return <User size={32} />;
    case "billing": return <CreditCard size={32} />;
    case "notifications": return <Bell size={32} />;
    case "security": return <Shield size={32} />;
    default: return <Building2 size={32} />;
  }
}
