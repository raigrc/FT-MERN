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
    options,
  );

  console.log(transactionData);

  return (
    <PrivateLayout>
      <PrivateHeader>
        <PrivateTitle>Dashboard</PrivateTitle>
      </PrivateHeader>
      <PrivateContent className="flex flex-col space-y-4">
        <div className="flex items-center justify-between space-x-4">
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
        <div className="flex justify-between gap-4">
          <DashboardChart />
          <RecentTransactions data={transactionData} />
        </div>
      </PrivateContent>
    </PrivateLayout>
  );
};

export default DashboardPage;
