import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format-currency";
import { format } from "date-fns";
import ActionTrigger from "../shared/action-trigger";
import { BsThreeDots } from "react-icons/bs";
import { deleteTransaction } from "@/api/axios.deleteTransaction";
import UpdateTransaction from "./update-transactions";
import { useTransactionsStore } from "@/store/useTransactionsStote";
import { toast } from "sonner";

interface TransactionTableProps {
  _id: string;
  date: string;
  description: string;
  type: any;
  amount: number;
}
const TransactionTable: React.FC<TransactionTableProps> = ({
  _id,
  date,
  description,
  type,
  amount,
}) => {
  const { fetchTransactions } = useTransactionsStore();
  const handleDel = (id: string) => {
    deleteTransaction(id).then((response) => {
      if (response.success) {
        fetchTransactions();
        toast.error(response.message);
      }
    });
  };
  return (
    <TableBody>
      <TableRow>
        <TableCell>{format(date, "PP")}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>{type}</TableCell>
        <TableCell
          className={`${type == "income" || type == "savings" ? "text-green-400" : "text-red-400"}`}
        >
          {type == "income" || type == "savings" ? "+" : "-"}
          {formatCurrency(amount)}
        </TableCell>
        <TableCell>
          <ActionTrigger
            icon={<BsThreeDots />}
            title={<Title description={description} type={type} />}
            _id={_id}
            handleDelete={() => handleDel(_id)}
            handleEdit={<UpdateTransaction _id={_id} />}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

const Title = ({
  description,
  type,
}: {
  description: string | undefined;
  type: string | undefined;
}) => {
  return (
    <>
      {description}{" "}
      <span
        className={` ${type === "income" ? "bg-green-400" : "bg-destructive"} rounded px-2 text-xs`}
      >
        {type}
      </span>
    </>
  );
};

export default TransactionTable;
