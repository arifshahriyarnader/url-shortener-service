import { AxiosError } from "axios";
import { useState } from "react";
import { createShortUrlService } from "../api/services";
import { useUrlContext } from "../contexts";

export const useCreateShortUrl = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshUrls } = useUrlContext()!;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!longUrl.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setShortUrl(null);

      const data = await createShortUrlService(longUrl);
      setShortUrl(data.shortUrl);
      setLongUrl("");
      refreshUrls();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 403) {
          setError("Free tier limit reached. Please upgrade your plan.");
        } else {
          setError("Failed to create short URL");
        }
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    shortUrl,
    longUrl,
    setLongUrl,
    loading,
    error,
    handleSubmit,
    refreshUrls,
  };
};
