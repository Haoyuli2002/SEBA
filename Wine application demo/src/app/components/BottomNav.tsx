import { Link, useLocation } from "react-router";
import { Compass, Wine, Package, User } from "lucide-react";

export function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="flex justify-around py-2">
        <Link
          to="/explore"
          className={`flex flex-col items-center gap-1 px-6 py-2 ${
            isActive("/explore") ? "text-[var(--wine-red)]" : "text-gray-400"
          }`}
        >
          <Compass size={24} />
          <span className="text-xs">Explore</span>
        </Link>
        <Link
          to="/tastings"
          className={`flex flex-col items-center gap-1 px-6 py-2 ${
            isActive("/tastings") ? "text-[var(--wine-red)]" : "text-gray-400"
          }`}
        >
          <Wine size={24} />
          <span className="text-xs">My Tastings</span>
        </Link>
        <Link
          to="/cellar"
          className={`flex flex-col items-center gap-1 px-6 py-2 ${
            isActive("/cellar") ? "text-[var(--wine-red)]" : "text-gray-400"
          }`}
        >
          <Package size={24} />
          <span className="text-xs">Cellar</span>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center gap-1 px-6 py-2 ${
            isActive("/profile") ? "text-[var(--wine-red)]" : "text-gray-400"
          }`}
        >
          <User size={24} />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
}