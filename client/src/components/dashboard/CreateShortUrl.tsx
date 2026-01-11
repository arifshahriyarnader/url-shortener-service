import { useCreateShortUrl } from "../../hooks";

export const CreateShortUrl = () => {
  const { shortUrl, longUrl, setLongUrl, loading, error, handleSubmit } =
    useCreateShortUrl();

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-lg">
      <h2 className="text-lg font-semibold mb-4">Create Short URL</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Shorten URL"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      {shortUrl && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md text-sm">
          <p className="text-gray-600 mb-1">Short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium break-all"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};
