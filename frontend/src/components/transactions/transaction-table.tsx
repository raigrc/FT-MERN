import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <Table>
      <TableCaption>List of all Transactions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
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
    </Table>
  );
};

export default TransactionTable;
