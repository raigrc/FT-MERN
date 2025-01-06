import axiosInstance from "@/api/axios.instance";
import NothingFound from "@/components/shared/nothing-found";
import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "@/components/shared/private-layout";
import AddTransaction from "@/components/transactions/add-transaction";
import TransactionTable from "@/components/transactions/transaction-table";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState, useTransition } from "react";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      const getTransactions = async () => {
        try {
          const response = await axiosInstance.get("/balance/transactions");
          console.log(response.data.transactions);

          setTransactions(response.data.transactions);
        } catch (error) {
          console.error("Error fetching transactions", error);
        }
      };
      getTransactions();
    });
  }, []);
  return (
    <PrivateLayout>
      <PrivateHeader className="space-y-4">
        <PrivateTitle>Transactions</PrivateTitle>
        <AddTransaction />
      </PrivateHeader>
      <PrivateContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <div>Loading...</div>
          ) : transactions.length === 0 ? (
            <NothingFound title="Transactions" />
          ) : (
            transactions.map((transaction: any) => {
              return (
                <TransactionTable
                  key={transaction._id}
                  date={transaction.transaction_date}
                  description={transaction.description}
                  type={transaction.categories.type}
                  amount={transaction.amount}
                />
              );
            })
          )}
        </Table>
      </PrivateContent>
    </PrivateLayout>
  );
};

export default TransactionPage;
