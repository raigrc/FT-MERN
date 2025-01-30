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
import { options } from "@/components/shared/options";
import { BalanceTransactions } from "@/types/balance.types";

const DashboardPage = () => {
  const { data: balanceData } = useFetch<TotalBalanceType>("/balance", options);
  const { data: transactionData } = useFetch<BalanceTransactions>(
    `/balance/transactions`,
    options("", { params: { limit: 5 } }),
  );

  return (
    <PrivateLayout>
      <PrivateHeader>
        <PrivateTitle>Dashboard</PrivateTitle>
      </PrivateHeader>
      <PrivateContent className="no-scrollbar flex flex-col space-y-4 overflow-auto">
        {/* container for overflow to work */}
        <div>
          <div className="no-scrollbar flex items-center justify-between space-x-4 overflow-x-auto">
            <IconContext.Provider value={{ size: "24" }}>
              <DashboardCard
                title="Total Balance"
                icon={<CiMoneyBill />}
                amount={balanceData?.totalBalance}
              />
              <DashboardCard
                title="Expenses"
                icon={<LuCreditCard />}
                amount={balanceData?.totalExpense}
              />
              <DashboardCard
                title="Savings"
                icon={<TbPigMoney />}
                amount={balanceData?.totalSavings}
              />
            </IconContext.Provider>
          </div>
        </div>
        <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
          <DashboardChart />
          <RecentTransactions data={transactionData} />
        </div>
      </PrivateContent>
    </PrivateLayout>
  );
};

export default DashboardPage;
