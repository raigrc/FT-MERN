import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format-currency";
import { format } from "date-fns";

interface TransactionTableProps {
  date: string;
  description: string;
  type: string;
  amount: number;
}
const TransactionTable: React.FC<TransactionTableProps> = ({
  date,
  description,
  type,
  amount,
}) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell>{format(date, "PP")}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>{type}</TableCell>
        <TableCell
          className={`${type == "income" ? "text-green-400" : type == "expense" ? "text-red-400" : ""}`}
        >
          {type == "income" ? "+" : "-"}
          {formatCurrency(amount)}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TransactionTable;
