import type { UserUrl } from "../../types";
import { Trash2 } from "lucide-react";

interface UrlRowProps {
  url: UserUrl;
  baseUrl: string;
  onDelete: (id: number) => void;
}

export const UrlRow = ({ url, baseUrl, onDelete }: UrlRowProps) => {
  const shortUrl = `${baseUrl}/${url.short_code}`;

  return (
    <tr className="border-b text-sm">
      <td className="p-3 max-w-xs truncate">{url.original_url}</td>

      <td className="p-3">
        <a
          href={shortUrl}
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          {shortUrl}
        </a>
      </td>

      <td className="p-3 text-center">{url.click_count}</td>

      <td className="p-3">{new Date(url.created_at).toLocaleDateString()}</td>

      <td className="p-3 text-center">
        <button
          onClick={() => onDelete(url.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};
