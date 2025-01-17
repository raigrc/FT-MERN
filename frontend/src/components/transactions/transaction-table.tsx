import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format-currency";
import { format } from "date-fns";
import ActionTrigger from "../shared/action-trigger";
import { BsThreeDots } from "react-icons/bs";
import DeleteDialog from "../shared/delete-dialog";
import { Button } from "../ui/button";
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
          <ActionTrigger icon={<BsThreeDots />}>
            <Button variant="ghost" onClick={handleEdit}>
              Edit
            </Button>
            <DeleteDialog
              handleDelete={() => handleDel(_id)}
              trigger={<Button variant="ghost">Delete</Button>}
            />
          </ActionTrigger>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TransactionTable;
