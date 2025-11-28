import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../store/authStore";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ redirectTo = "/auth" }) => {
  const isAuthenticated = useAuth((s: any) => s.isAuthenticated);
  const checkAuth = useAuth((s: any) => s.checkAuth);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await checkAuth();
      setChecking(false);
    };
    verify();
  }, []);

  if (checking) return <p>Loading...</p>;

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
