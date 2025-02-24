import { useUserStore } from "@/store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import LoadingState from "../shared/loading";

const PrivateRoute = () => {
  const { user, loading } = useUserStore();

  if (loading) {
    return <LoadingState />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex flex-col items-center justify-start h-full lg:flex-row lg:justify-between">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default PrivateRoute;
