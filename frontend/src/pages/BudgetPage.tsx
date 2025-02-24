import AddBudget from "@/components/budgets/add-budget";
import BudgetCard from "@/components/budgets/budget-card";
import FilterSearch from "@/components/shared/filter-search";
import NothingFound from "@/components/shared/nothing-found";
import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "@/components/shared/private-layout";
import { useBudgetsStore } from "@/store/useBudgetsStore";
import { useEffect } from "react";

const BudgetPage = () => {
  const { budgets, fetchBudgets } = useBudgetsStore();

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <PrivateLayout>
      <PrivateHeader className="space-y-4">
        <PrivateTitle>Budgets</PrivateTitle>
        <div className="flex justify-start space-x-4 itmes-center">
          <FilterSearch
            onHandleChange={(e) => fetchBudgets({ name: e })}
            placeholder="Name of budget"
          />
          <AddBudget />
        </div>
      </PrivateHeader>
      <PrivateContent>
        <div className="flex flex-wrap items-center gap-3">
          {budgets?.length === 0 ? (
            <NothingFound title="Budget" />
          ) : (
            budgets?.map((budget) => {
              const remaining = budget.amount - budget.totalSpent;
              const percent = (budget.totalSpent / budget.amount) * 100;
              return (
                <BudgetCard
                  key={budget._id}
                  _id={budget._id}
                  title={budget.category.name}
                  start_date={budget.start_date}
                  end_date={budget.end_date}
                  progress={percent}
                  total={budget.amount}
                  spent={budget.totalSpent}
                  remaining={remaining}
                  percentUsed={parseFloat(percent.toFixed(1))}
                />
              );
            })
          )}
        </div>
      </PrivateContent>
    </PrivateLayout>
  );
};

export default BudgetPage;
