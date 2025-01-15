import { CiMoneyBill } from "react-icons/ci";
import { IconContext } from "react-icons/lib";
import { LuCreditCard } from "react-icons/lu";
import { TbPigMoney } from "react-icons/tb";
import DashboardCard from "@/components/dashboard/dashboard-card";
import {
  PrivateLayout,
  PrivateHeader,
  PrivateTitle,
  PrivateContent,
} from "@/components/shared/private-layout";
import useFetch from "@/hooks/useFetch";
import { TotalBalanceType } from "@/types/balance.types";
import DashboardChart from "@/components/dashboard/dashboard-chart";
import RecentTransactions from "@/components/dashboard/recent-transactions";

const DashboardPage = () => {
  const { data } = useFetch<TotalBalanceType>("/balance");

  return (
    <PrivateLayout className="h-full">
      <PrivateHeader>
        <PrivateTitle>Dashboard</PrivateTitle>
      </PrivateHeader>
      <PrivateContent className="flex h-full flex-col space-y-6">
        <div className="flex items-center justify-between space-x-4">
          <IconContext.Provider value={{ size: "24" }}>
            <DashboardCard
              title="Total Balance"
              icon={<CiMoneyBill />}
              amount={data?.totalBalance}
            />
            <DashboardCard
              title="Expenses"
              icon={<LuCreditCard />}
              amount={data?.totalExpense}
            />
            <DashboardCard
              title="Savings"
              icon={<TbPigMoney />}
              amount={data?.totalSavings}
            />
          </IconContext.Provider>
        </div>
        <div className="flex justify-between gap-4">
          <DashboardChart />
          <RecentTransactions />
        </div>
      </PrivateContent>
    </PrivateLayout>
  );
};

export default DashboardPage;
