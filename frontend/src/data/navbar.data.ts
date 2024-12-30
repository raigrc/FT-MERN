import { TbDashboard } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { LuCreditCard } from "react-icons/lu";
import { AiOutlinePieChart } from "react-icons/ai";

export const items = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: TbDashboard,
  },
  {
    name: "Categories",
    href: "/categories",
    icon: BiCategory,
  },
  {
    name: "Budget",
    href: "/budget",
    icon: AiOutlinePieChart,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: LuCreditCard,
  },
];
