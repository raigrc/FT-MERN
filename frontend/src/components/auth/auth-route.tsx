import { useUserStore } from "@/store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const { user, loading } = useUserStore();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
};

export default AuthRoute;
