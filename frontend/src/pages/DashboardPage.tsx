import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { useUserStore } from "@/store/useUserStore";

const DashboardPage = () => {
  const { user } = useUserStore();

  console.log(user);

  return (
    <>
      <DashboardLayout />
    </>
  );
};

export default DashboardPage;
