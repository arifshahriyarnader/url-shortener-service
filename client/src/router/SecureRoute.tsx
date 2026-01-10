import { Navigate } from "react-router-dom";
import { authService } from "../auth";
import type { ReactNode } from "react";

interface SecureRouteProps {
  children: ReactNode;
}

export const SecureRoute = ({ children }: SecureRouteProps) => {
  const isAuthenticated = authService.isUserLoggedIn();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
