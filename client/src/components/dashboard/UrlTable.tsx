import { useEffect, useState } from "react";
import { UrlRow } from "./UrlRow";
import type { UserUrl } from "../../types";
import { getUserUrlsService, deleteUserUrlService } from "../../api/services";
import { appConfig } from "../../common/config";
import { useUrlContext } from "../../contexts";

const BASE_URL = appConfig.BASE_URL;

export const UrlTable = () => {
  const [urls, setUrls] = useState<UserUrl[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const {refreshKey} = useUrlContext()!;

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const data = await getUserUrlsService(page, 10);
      setUrls(data.urls);
      setTotalPages(data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [page, refreshKey]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this URL?")) return;
    await deleteUserUrlService(id);
    fetchUrls();
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded shadow text-sm">Loading URLs...</div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="p-3">Original URL</th>
            <th className="p-3">Short Code</th>
            <th className="p-3">Short URL</th>
            <th className="p-3 text-center">Clicks</th>
            <th className="p-3">Created</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {urls.map((url) => (
            <UrlRow
              key={url.id}
              url={url}
              baseUrl={BASE_URL}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center p-4 text-sm">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
