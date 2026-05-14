import { Link, useLocation, useNavigate } from "react-router";
import { Compass, Wine, Package, User, LogOut } from "lucide-react";
import LogoSvg from "../../imports/Logo.svg";
import { useUser } from "../context/UserContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const isActive = (path: string) => {
    if (path === "/explore") {
      return location.pathname === "/explore" || location.pathname.startsWith("/event");
    }
    return location.pathname.startsWith(path);
  };

  const displayName = user ? `${user.firstName} ${user.lastName}` : "Alex Chen";
  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "AC";
  const roleLabel = user?.role === "business" ? "Business Owner" : "Wine Enthusiast";

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link to="/explore" className="block">
            <img src={LogoSvg} alt="Decantr" className="h-16 w-auto" />
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <Link
            to="/explore"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              isActive("/explore")
                ? "bg-[var(--wine-red-100)] text-[var(--wine-red)]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Compass size={20} />
            <span className="font-medium">Discover Events</span>
          </Link>

          <Link
            to="/tastings"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              isActive("/tastings")
                ? "bg-[var(--wine-red-100)] text-[var(--wine-red)]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Wine size={20} />
            <span className="font-medium">My Tastings</span>
          </Link>

          <Link
            to="/cellar"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              isActive("/cellar")
                ? "bg-[var(--wine-red-100)] text-[var(--wine-red)]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Package size={20} />
            <span className="font-medium">My Cellar</span>
          </Link>

          <Link
            to="/profile"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              isActive("/profile")
                ? "bg-[var(--wine-red-100)] text-[var(--wine-red)]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <User size={20} />
            <span className="font-medium">Profile</span>
          </Link>

          <div className="my-4 border-t border-gray-200"></div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors text-gray-500 hover:bg-gray-100"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-[var(--wine-red)] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{displayName}</p>
              <p className="text-xs text-gray-600">{roleLabel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}