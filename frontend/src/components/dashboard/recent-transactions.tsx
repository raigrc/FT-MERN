import {
  Card,
  CardContent,
  CardDescription,
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

const RecentTransactions = () => {
  return (
    <div className="w-1/3">
      <Card>
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
              <TableRow>
                <TableCell>Description1</TableCell>
                <TableCell>income</TableCell>
                <TableCell className="text-green-500">500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description1</TableCell>
                <TableCell>income</TableCell>
                <TableCell className="text-green-500">500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description1</TableCell>
                <TableCell>income</TableCell>
                <TableCell className="text-green-500">500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description1</TableCell>
                <TableCell>income</TableCell>
                <TableCell className="text-green-500">500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description1</TableCell>
                <TableCell>income</TableCell>
                <TableCell className="text-green-500">500</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentTransactions;
