import AddBudget from "@/components/budgets/add-budget";
import BudgetCard from "@/components/budgets/budget-card";
import NothingFound from "@/components/shared/nothing-found";
import { options } from "@/components/shared/options";
import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "@/components/shared/private-layout";
import useFetch from "@/hooks/useFetch";
import { BalanceBudgetsType } from "@/types/balance.types";

const BudgetPage = () => {
  const { data } = useFetch<BalanceBudgetsType[]>("/balance/budgets", options);

  console.log(data);

  return (
    <PrivateLayout>
      <PrivateHeader className="space-y-4">
        <PrivateTitle>Budgets</PrivateTitle>
        <AddBudget />
      </PrivateHeader>
      <PrivateContent>
        <div className="flex flex-wrap items-center gap-3">
          {data?.length === 0 ? (
            <NothingFound title="Budget" />
          ) : (
            data?.map((budget) => {
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
