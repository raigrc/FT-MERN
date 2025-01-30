import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { BalanceTransactions } from "@/types/balance.types";
import { formatCurrency } from "@/lib/format-currency";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const RecentTransactions = ({ data }: { data: BalanceTransactions | null }) => {
  return (
    <Card className="w-full lg:w-2/5">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.transactions.map((transaction: any) => (
              <TableRow key={transaction._id} className="hover:bg-accent">
                <TableCell className="py-3">
                  <h1>{transaction.description}</h1>
                  <p className="text-xs text-gray-400/75">
                    {format(transaction.transaction_date, "PP")}
                  </p>
                </TableCell>
                <TableCell>{transaction.categories.type}</TableCell>
                <TableCell
                  className={`${transaction.categories.type === "income" ? "text-green-500" : "text-destructive"}`}
                >
                  {transaction.categories.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-end">
        <Link
          to="/transactions"
          className="px-6 decoration-1 underline-offset-4 hover:text-primary hover:underline"
        >
          see all
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecentTransactions;
