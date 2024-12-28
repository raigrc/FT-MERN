import BudgetForm from "@/components/budgets/budget-form";
import BudgetLayout from "@/components/budgets/budget-layout";

const BudgetPage = () => {
  return (
    <>
      <BudgetLayout>
        <BudgetForm />
      </BudgetLayout>
    </>
  );
};

export default BudgetPage;
