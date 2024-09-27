import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const ProtectedRoute = () => {
  const { user, token, checkAuthStatus } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!user && token) {
        await checkAuthStatus();
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, [user, token, checkAuthStatus]);

  if (isLoading) {
    return;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
