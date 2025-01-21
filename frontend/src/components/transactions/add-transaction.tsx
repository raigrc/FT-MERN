import TransactionForm from "@/components/transactions/transactions-form";
import InsertData from "../shared/insert-data-dialog";

const AddTransaction = () => {
  return (
    <InsertData buttonTitle="Add Transaction" title="Add Transaction">
      <TransactionForm mode="create"/>
    </InsertData>
  );
};

export default AddTransaction;
