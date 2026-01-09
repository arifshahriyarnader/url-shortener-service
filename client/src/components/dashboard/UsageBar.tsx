import { useEffect, useState } from "react";
import { getUrlUsageService } from "../../api/services";

interface UrlUsageResponse {
  used: number;
  remaining: number;
  limit: number;
}

const UsageBar = () => {
  const [usage, setUsage] = useState<UrlUsageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const data = await getUrlUsageService();
        setUsage(data);
      } catch (err) {
        console.log(err);
        setError("Failed to load usage data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow text-sm">
        Loading usage...
      </div>
    );
  }
  if (error || !usage) {
    return (
      <div className="bg-white p-4 rounded-lg shadow text-sm text-red-500">
        {error}
      </div>
    );
  }

  const percentage = Math.min((usage.used / usage.limit) * 100, 100);

  return (
    <div className="w-full bg-white rounded-lg shadow p-4">
      <div className="flex justify-between mb-2 text-sm font-medium">
        <span>URL Usage</span>
        <span>
          {usage.used} / {usage.limit}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-300 ${
            percentage >= 100
              ? "bg-red-500"
              : percentage >= 80
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-gray-600">
        {usage.remaining} URLs remaining
      </p>

      {usage.remaining === 0 && (
        <p className="mt-2 text-xs text-red-500 font-medium">
          Usage limit reached. Please upgrade your plan.
        </p>
      )}
    </div>
  );
};

export default UsageBar;
