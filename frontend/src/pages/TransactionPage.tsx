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
import useFetch from "@/hooks/useFetch";
import { BalanceTransactions } from "@/types/balance.types";
import { useMemo, useState } from "react";

const TransactionPage = () => {
  const [page, setPage] = useState<number | undefined>(1);

  const options = useMemo(() => ({ params: { page } }), [page]); // to ensure that it does not refetch always
  const { data } = useFetch<BalanceTransactions>(
    `/balance/transactions`,
    options,
  );

  console.log(data);

  return (
    <PrivateLayout>
      <PrivateHeader className="space-y-4">
        <PrivateTitle>Transactions</PrivateTitle>
        <AddTransaction />
      </PrivateHeader>
      <PrivateContent className="flex h-full flex-col">
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
          {data?.transactions.length === 0 ? (
            <NothingFound title="Transactions" />
          ) : (
            data?.transactions.map((transaction: any) => {
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
        {data?.totalPages && data?.totalPages > 1 && (
          <PaginationComp
            totalPages={data?.totalPages}
            currentPage={page}
            setPage={setPage}
          />
        )}
      </PrivateContent>
    </PrivateLayout>
  );
};

export default TransactionPage;
