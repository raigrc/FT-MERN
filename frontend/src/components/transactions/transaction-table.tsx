import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format-currency";
import { format } from "date-fns";
import ActionTrigger from "../shared/action-trigger";
import { BsThreeDots } from "react-icons/bs";
import { deleteTransaction } from "@/api/axios.deleteTransaction";

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
  const handleEdit = () => {
    console.log(_id);
  };
  const handleDel = (id: string) => {
    deleteTransaction(id);
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
            title={`${description} | ${type}`}
            _id={_id}
            handleDelete={() => handleDel(_id)}
            handleEdit={handleEdit}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TransactionTable;
