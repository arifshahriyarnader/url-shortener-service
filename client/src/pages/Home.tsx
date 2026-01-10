import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Simple & Fast URL Shortener
      </h1>

      <p className="text-gray-600 mb-8">
        Shorten long URLs, track usage, and manage everything from one dashboard.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          to="/signup"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Get Started
        </Link>

        <Link
          to="/login"
          className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Login
        </Link>
      </div>
    </div>
  );
};


