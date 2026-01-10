import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../auth";
import { LogOut } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const authUser = authService.getAuthUser();
  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem("authUser");
    navigate("/login");
  };
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-800">
            URL Shortener
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <div className="text-sm text-gray-500">Dashboard</div>
          </Link>
          <div>
            {authUser?.name && (
              <div className="text-sm text-gray-700 font-medium">
                {authUser.name}
              </div>
            )}
          </div>

          {authService.isUserLoggedIn() && (
            <button
              onClick={handleLogout}
              className="rounded-lg border px-3 py-1.5 text-sm text-gray-400 cursor-pointer"
            >
              <LogOut />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};


