import { useEffect, useState } from "react";
import { getUrlUsageService } from "../api/services";

interface UrlUsageResponse {
  used: number;
  remaining: number;
  limit: number;
}
export const useUsageBar = () => {
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
  return { usage, loading, error };
};
