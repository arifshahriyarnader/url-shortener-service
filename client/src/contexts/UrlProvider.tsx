import { useState } from "react";
import { UrlContext } from "./UrlContext";

export interface UrlContextType {
  refreshKey: number;
  refreshUrls: () => void;
}

export const UrlProvider = ({ children }: { children: React.ReactNode }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshUrls = () => setRefreshKey((k) => k + 1);

  return (
    <UrlContext.Provider value={{ refreshKey, refreshUrls }}>
      {children}
    </UrlContext.Provider>
  );
};
