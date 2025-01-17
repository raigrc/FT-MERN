import useFetch from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "../shared/private-layout";
import { BalanceCategoriesType } from "@/types/balance.types";
import { options } from "../shared/options";
import { Table, TableHead, TableHeader, TableRow } from "../ui/table";
import CategoryTable from "./category-table";
import NothingFound from "../shared/nothing-found";

const CategoryId = () => {
  const { categoryId } = useParams();

  const { data } = useFetch<BalanceCategoriesType[]>(
    `/balance/categories/${categoryId}`,
    options(categoryId),
  );

  console.log(data);

  return (
    <>
      {data?.map((category) => (
        <PrivateLayout key={category._id}>
          <PrivateHeader>
            <PrivateTitle className="flex items-start space-x-2">
              <h1>{category.name}</h1>
              <span
                className={`rounded px-2 text-xs ${category.type === "expense" ? "bg-destructive" : "bg-success"}`}
              >
                {category.type}
              </span>
            </PrivateTitle>
          </PrivateHeader>
          <PrivateContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              {category.transactions.length <= 0 ? (
                <NothingFound title="transactions" />
              ) : (
                category.transactions.map((transaction) => (
                  <CategoryTable
                    key={transaction._id}
                    transaction_date={transaction.transaction_date}
                    amount={transaction.amount}
                    description={transaction.description}
                  />
                ))
              )}
            </Table>
          </PrivateContent>
        </PrivateLayout>
      ))}
    </>
  );
};

export default CategoryId;
