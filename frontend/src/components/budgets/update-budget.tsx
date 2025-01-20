import BudgetForm from "./budget-form";
import useFetch from "@/hooks/useFetch";
import { BudgetSchemaType } from "@/schema/BudgetSchema";
import { options } from "../shared/options";

const UpdateBudget = ({ _id }: { _id: string | undefined }) => {
  const { data } = useFetch<BudgetSchemaType>(`/budgets/${_id}`, options);

  return (
    <>
      <BudgetForm
        mode="update"
        budgetId={_id}
        initialValues={data || undefined}
      />
    </>
  );
};

export default UpdateBudget;
