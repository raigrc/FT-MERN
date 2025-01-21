import TransactionForm from "./transactions-form";
import useFetch from "@/hooks/useFetch";
import { TransactionSchemaType } from "@/schema/TransactionSchema";
import { options } from "../shared/options";

const UpdateTransaction = ({ _id }: { _id: string | undefined }) => {
  const { data } = useFetch<TransactionSchemaType>(
    `/transactions/${_id}`,
    options,
  );

  console.log(data);
  return (
    <>
      <TransactionForm
        mode="update"
        transactionId={_id}
        initialValues={data || undefined}
      />
    </>
  );
};

export default UpdateTransaction;
