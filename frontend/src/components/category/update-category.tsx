import useFetch from "@/hooks/useFetch";
import CategoryForm from "./category-form";
import { ICategorySchema } from "@/schema/CategorySchema";
import { options } from "../shared/options";

const UpdateCategory = ({ _id }: { _id: string | undefined }) => {
  const { data } = useFetch<ICategorySchema>(`/category/${_id}`, options);

  return (
    <>
      <CategoryForm
        mode="update"
        initialValues={data || undefined}
        categoryId={_id}
      />
    </>
  );
};

export default UpdateCategory;
