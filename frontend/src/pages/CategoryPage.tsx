import AddCategory from "@/components/category/add-category";
import CategoryCard from "@/components/category/category-card";
import NothingFound from "@/components/shared/nothing-found";
import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "@/components/shared/private-layout";
import useFetch from "@/hooks/useFetch";
import { BalanceCategoriesType } from "@/types/balance.types";

const CategoryPage = () => {
  const { data } = useFetch<BalanceCategoriesType[]>("/balance/categories");
  console.log(data);

  return ( 
    <>
      <PrivateLayout>
        <PrivateHeader className="space-y-4">
          <PrivateTitle>Categories</PrivateTitle>
          <AddCategory />
        </PrivateHeader>
        <PrivateContent>
          <div className="flex flex-wrap items-center">
            {data?.length === 0 ? (
              <NothingFound title="Category" />
            ) : (
              data?.map((category: any) => {
                return (
                  <CategoryCard
                    key={category._id}
                    _id={category._id}
                    title={category.name}
                    transactions={category.totalTransactions}
                  />
                );
              })
            )}
          </div>
        </PrivateContent>
      </PrivateLayout>
    </>
  );
};

export default CategoryPage;
