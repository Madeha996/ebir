import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@app/hooks/reduxHooks";
import { Navigate } from "react-router-dom";
import { doLogout } from "@app/store/slices/authSlice";

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(true);

  useEffect(() => {
    const logout = async () => {
      try {
        await dispatch(doLogout()).unwrap();
        setIsLoggingOut(false);
      } catch (error) {
        setIsLoggingOut(false);
      }
    };

    logout();
  }, [dispatch]);

  if (isLoggingOut) {
    return <p>Logging out...</p>; // Optionally show a loading indicator
  }

  return <Navigate to="/auth/login" replace />;
};

export default Logout;
