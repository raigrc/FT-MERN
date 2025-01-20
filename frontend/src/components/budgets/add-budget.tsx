import InsertData from "../shared/insert-data-dialog";
import BudgetForm from "./budget-form";

const AddBudget = () => {
  return (
    <InsertData buttonTitle="Add Budget" title="Add Budget">
      <BudgetForm mode="create" />
    </InsertData>
  );
};

export default AddBudget;
