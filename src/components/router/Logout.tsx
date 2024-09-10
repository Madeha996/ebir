import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@app/hooks/reduxHooks";
import { Navigate } from "react-router-dom";
import { doLogout } from "@app/store/slices/authSlice";

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoggedOut, setIsLoggedOut] = useState(false); // Change the state to track if logged out

  useEffect(() => {
    dispatch(doLogout());
    setIsLoggedOut(true); // Mark as logged out immediately after dispatch
  }, [dispatch]);

  if (!isLoggedOut) {
    return <p>Logging out...</p>; // Optionally show a loading indicator
  }

  return <Navigate to="/auth/login" replace />;
};

export default Logout;
