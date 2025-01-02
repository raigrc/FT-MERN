import { useEffect, useState } from "react";
import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "../shared/private-layout";
import DashboardCard from "./dashboard-card";
import { CiMoneyBill } from "react-icons/ci";
import { IconContext } from "react-icons/lib";
import { LuCreditCard } from "react-icons/lu";
import { TbPigMoney } from "react-icons/tb";
import axiosInstance from "@/api/axios.instance";

const DashboardLayout = () => {
  const [balance, setBalance] = useState<any>(null);
  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axiosInstance.get("/balance");

        setBalance(response.data);
      } catch (error) {
        console.error("Error getting total balance", error);
      }
    };
    getBalance();
  }, []);
  return (
    <PrivateLayout>
      <PrivateHeader>
        <PrivateTitle>Dashboard</PrivateTitle>
      </PrivateHeader>
      <PrivateContent>
        <div className="flex items-center justify-between space-x-4">
          <IconContext.Provider value={{ size: "24" }}>
            <DashboardCard
              title="Total Balance"
              icon={<CiMoneyBill />}
              amount={balance?.totalBalance}
            />
            <DashboardCard
              title="Expenses"
              icon={<LuCreditCard />}
              amount={balance?.totalExpense}
            />
            <DashboardCard title="Savings" icon={<TbPigMoney />} />
          </IconContext.Provider>
        </div>
      </PrivateContent>
    </PrivateLayout>
  );
};

export default DashboardLayout;
