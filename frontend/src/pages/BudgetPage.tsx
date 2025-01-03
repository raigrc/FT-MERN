import axiosInstance from "@/api/axios.instance";
import AddBudget from "@/components/budgets/add-budget";
import BudgetCard from "@/components/budgets/budget-card";
import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "@/components/shared/private-layout";
import { useEffect, useState } from "react";

const BudgetPage = () => {
  const [budgets, setBudgets] = useState<any>([]);
  useEffect(() => {
    const getBudgets = async () => {
      try {
        const response = await axiosInstance.get("/balance/budgets");
        console.log(response.data.budgets);

        setBudgets(response.data.budgets);
      } catch (error) {
        console.error("Error getting budgets", error);
      }
    };

    getBudgets();
  }, []);
  return (
    <PrivateLayout>
      <PrivateHeader className="space-y-4">
        <PrivateTitle>Budgets</PrivateTitle>
        <AddBudget />
      </PrivateHeader>
      <PrivateContent className="flex flex-wrap items-center gap-4">
        {budgets.map((budget: any) => {
          const remaining = budget.amount - budget.totalSpent;
          const percent = (budget.totalSpent / budget.amount) * 100;
          return (
            <BudgetCard
              key={budget._id}
              title={budget.category.name}
              progress={percent}
              total={budget.amount}
              spent={budget.totalSpent}
              remaining={remaining}
              percentUsed={percent}
            />
          );
        })}
      </PrivateContent>
    </PrivateLayout>
  );
};

export default BudgetPage;
