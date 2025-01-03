import axiosInstance from "@/api/axios.instance";
import AddCategory from "@/components/category/add-category";
import CategoryCard from "@/components/category/category-card";
import NothingFound from "@/components/shared/nothing-found";
import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "@/components/shared/private-layout";
import { useEffect, useState, useTransition } from "react";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      const getCategories = async () => {
        try {
          const response = await axiosInstance.get("/balance/categories");
          console.log(response.data.categories);

          setCategories(response.data.categories);
        } catch (error) {
          console.error("Error fetching categories", error);
        }
      };
      getCategories();
    });
  }, []);

  if (isLoading) return <>Loading...</>;
  return (
    <>
      <PrivateLayout>
        <PrivateHeader className="space-y-4">
          <PrivateTitle>Budgets</PrivateTitle>
          <AddCategory />
        </PrivateHeader>
        <PrivateContent>
          <div className="flex-wrap items-center md:flex">
            {categories.length === 0 ? (
              <NothingFound title="Category" />
            ) : (
              categories.map((category: any) => {
                return (
                  <CategoryCard
                    key={category._id}
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
