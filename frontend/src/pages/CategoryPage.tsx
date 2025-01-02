import AddCategory from "@/components/category/add-category";
import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "@/components/shared/private-layout";

const CategoryPage = () => {
  return (
    <>
      <PrivateLayout>
        <PrivateHeader className="space-y-4">
          <PrivateTitle>Budgets</PrivateTitle>
          <AddCategory />
        </PrivateHeader>
        <PrivateContent>
        </PrivateContent>
      </PrivateLayout>
    </>
  );
};

export default CategoryPage;
