import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const RecentTransactions = ({ data }: { data: BalanceTransactions | null }) => {
  return (
    <Card className="w-1/3">
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
              <TableRow key={transaction._id}>
                <TableCell>{transaction.description}</TableCell>
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
    </Card>
  );
};

export default RecentTransactions;
