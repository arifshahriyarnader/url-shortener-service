import { useContext } from "react";
import { UrlContext } from "./UrlContext";

export const useUrlContext = () => {
  const ctx = useContext(UrlContext);
  if (!ctx) {
    throw new Error("useUrlContext must be used inside UrlProvider");
  }
  return ctx;
};
