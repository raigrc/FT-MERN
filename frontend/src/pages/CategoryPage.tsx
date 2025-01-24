import AddCategory from "@/components/category/add-category";
import CategoryCard from "@/components/category/category-card";
import NothingFound from "@/components/shared/nothing-found";
import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "@/components/shared/private-layout";
import { useCategoriesStore } from "@/store/useCategoriesStore";
import { useEffect } from "react";

const CategoryPage = () => {
  const { categories, fetchCategories } = useCategoriesStore();
  // const { data } = useFetch<BalanceCategoriesType[]>(
  //   "/balance/categories",
  //   options,
  // );
  useEffect(() => {
    fetchCategories();
  }, []);

  console.log(categories);

  return (
    <>
      <PrivateLayout>
        <PrivateHeader className="space-y-4">
          <PrivateTitle>Categories</PrivateTitle>
          <AddCategory />
        </PrivateHeader>
        <PrivateContent>
          <div className="flex flex-wrap items-center">
            {categories?.length === 0 ? (
              <NothingFound title="Category" />
            ) : (
              categories?.map((category: any) => {
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
