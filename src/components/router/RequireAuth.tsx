import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@app/hooks/reduxHooks";
import { WithChildrenProps } from "@app/types/generalTypes";
import { readToken } from "@app/services/localStorage.service";

const RequireAuth: React.FC<WithChildrenProps> = ({ children }) => {
  const token = useAppSelector((state) => state?.auth?.token || readToken());

  return token ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

export default RequireAuth;
