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

const DashboardLayout = () => {
  return (
    <PrivateLayout>
      <PrivateHeader>
        <PrivateTitle>Dashboard</PrivateTitle>
      </PrivateHeader>
      <PrivateContent>
        <div className="flex items-center justify-between space-x-4">
          <IconContext.Provider value={{ size: "24" }}>
            <DashboardCard title="Total Balance" icon={<CiMoneyBill />} />
            <DashboardCard title="Expenses" icon={<LuCreditCard />} />
            <DashboardCard title="Savings" icon={<TbPigMoney />} />
          </IconContext.Provider>
        </div>
      </PrivateContent>
    </PrivateLayout>
  );
};

export default DashboardLayout;
