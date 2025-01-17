import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format-currency";
import { format } from "date-fns";
import React from "react";

interface CategoryTableProps {
  transaction_date: Date;
  description: string;
  amount: number;
}
const CategoryTable: React.FC<CategoryTableProps> = ({
  transaction_date,
  description,
  amount,
}) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell>{format(transaction_date, "PP")}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>{formatCurrency(amount)}</TableCell>
      </TableRow>
    </TableBody>
  );
};

export default CategoryTable;
