import AddBudget from "@/components/budgets/add-budget";
import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "@/components/shared/private-layout";
import { Outlet } from "react-router-dom";

const BudgetPage = () => {
  return (
    <PrivateLayout>
      <PrivateHeader className="space-y-4">
        <PrivateTitle>Budgets</PrivateTitle>
        <AddBudget />
      </PrivateHeader>
      <PrivateContent>
        <Outlet />
      </PrivateContent>
    </PrivateLayout>
  );
};

export default BudgetPage;
