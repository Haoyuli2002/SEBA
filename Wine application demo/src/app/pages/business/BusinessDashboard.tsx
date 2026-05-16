import { Link, Outlet, useLocation } from "react-router";
import {
  LayoutDashboard,
  Calendar,
  Wine,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import LogoSvg from "../../../imports/Logo.svg";

export function BusinessDashboard() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/business") {
      return location.pathname === "/business" || location.pathname === "/business/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link to="/business" className="block">
            <img src={LogoSvg} alt="Decantr" className="h-16 w-auto mb-2" />
            <p className="text-sm text-gray-600">Business Dashboard</p>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <Link
            to="/business/events"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              isActive("/business/events")
                ? "bg-[var(--wine-red-100)] text-[var(--wine-red)]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Calendar size={20} />
            <span className="font-medium">Events</span>
          </Link>

          <Link
            to="/business/wines"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              isActive("/business/wines")
                ? "bg-[var(--wine-red-100)] text-[var(--wine-red)]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Wine size={20} />
            <span className="font-medium">Wines</span>
          </Link>

          <Link
            to="/business"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              isActive("/business") && location.pathname === "/business"
                ? "bg-[var(--wine-red-100)] text-[var(--wine-red)]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            to="/business/analytics"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              isActive("/business/analytics")
                ? "bg-[var(--wine-red-100)] text-[var(--wine-red)]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BarChart3 size={20} />
            <span className="font-medium">Analytics</span>
          </Link>

          <Link
            to="/business/settings"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              isActive("/business/settings")
                ? "bg-[var(--wine-red-100)] text-[var(--wine-red)]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            to="/login"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-4 transition-colors text-gray-500 hover:bg-gray-100"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </Link>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-[var(--wine-red)] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">W</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">Weinkultur</p>
              <p className="text-xs text-gray-600">Premium Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
