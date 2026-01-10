import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../auth";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout()
    localStorage.removeItem("authUser");
    navigate("/login");
  }
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
            🔗
          </div>
          <span className="text-xl font-semibold text-gray-800">
            URL Shortener
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <div className="text-sm text-gray-500">Dashboard</div>
          </Link>
         
 <Link
            to="/login"
            className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Login
          </Link>
          <button
          
            onClick={handleLogout}
            className="rounded-lg border px-3 py-1.5 text-sm text-gray-400 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
