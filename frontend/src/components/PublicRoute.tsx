import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../store/authStore";
import { useEffect, useState } from "react";

const PublicRoute = ({ redirectPath = "/dashboard" }) => {
  const isAuthenticated = useAuth((s: any) => s.isAuthenticated);
  const checkAuth = useAuth((s: any) => s.checkAuth);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await checkAuth();   // verify JWT on page load
      setChecking(false);
    };
    verify();
  }, []);

  if (checking) return <p>Loading...</p>;

  return isAuthenticated
    ? <Navigate to={redirectPath} replace />
    : <Outlet />;
};

export default PublicRoute;
