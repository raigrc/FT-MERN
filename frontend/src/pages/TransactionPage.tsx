import FilterSearch from "@/components/shared/filter-search";
import NothingFound from "@/components/shared/nothing-found";
import PaginationComp from "@/components/shared/pagination";
import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "@/components/shared/private-layout";
import AddTransaction from "@/components/transactions/add-transaction";
import TransactionTable from "@/components/transactions/transaction-table";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTransactionsStore } from "@/store/useTransactionsStote";
import { useEffect, useState } from "react";

const TransactionPage = () => {
  const [page, setPage] = useState<number | undefined>(1);
  const { transactions, fetchTransactions } = useTransactionsStore();

  useEffect(() => {
    fetchTransactions({ page: page });
  }, [page]);

  return (
    <PrivateLayout>
      <PrivateHeader className="space-y-4">
        <PrivateTitle>Transactions</PrivateTitle>
        <div className="flex items-center justify-start space-x-4">
          <FilterSearch
            onHandleChange={(e) => fetchTransactions({ search: e })}
            placeholder="search for description"
          />
          <AddTransaction />{" "}
        </div>
      </PrivateHeader>
      <PrivateContent className="flex flex-col h-full">
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
          {transactions?.transactions.length === 0 ? (
            <NothingFound title="Transactions" />
          ) : (
            transactions?.transactions.map((transaction: any) => {
              return (
                <TransactionTable
                  key={transaction._id}
                  _id={transaction._id}
                  date={transaction.transaction_date}
                  description={transaction.description}
                  type={transaction.categories.type}
                  amount={transaction.amount}
                />
              );
            })
          )}
        </Table>
        {transactions?.totalPages && transactions?.totalPages > 1 && (
          <PaginationComp
            totalPages={transactions?.totalPages}
            currentPage={page}
            setPage={setPage}
          />
        )}
      </PrivateContent>
    </PrivateLayout>
  );
};

export default TransactionPage;
