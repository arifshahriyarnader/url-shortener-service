import { useEffect, useState } from "react";
import type { UserUrl } from "../types";
import { useUrlContext } from "../contexts";
import { deleteUserUrlService, getUserUrlsService } from "../api/services";

export const useUrlTable = () => {
  const [urls, setUrls] = useState<UserUrl[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { refreshKey } = useUrlContext()!;
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

  return {
    urls,
    page,
    setPage,
    totalPages,
    loading,
    handleDelete,
  };
};
