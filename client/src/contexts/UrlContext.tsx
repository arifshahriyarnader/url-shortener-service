import { createContext } from "react";
import type { UrlContextType } from "./UrlProvider";

export const UrlContext = createContext<UrlContextType | null>(null);