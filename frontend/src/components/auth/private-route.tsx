import { useUserStore } from "@/store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";

const PrivateRoute = () => {
  const { user, loading } = useUserStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex flex-row justify-between h-full">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default PrivateRoute;
