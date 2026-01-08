import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
            🔗
          </div>
          <span className="text-xl font-semibold text-gray-800">URL Shortener</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Dashboard</span>

          {/* <button
            disabled
            className="rounded-lg border px-3 py-1.5 text-sm text-gray-400 cursor-not-allowed"
          >
            Logout
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
