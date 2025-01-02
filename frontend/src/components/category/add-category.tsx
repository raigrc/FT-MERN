import InsertData from "../shared/insert-data-dialog";
import CategoryForm from "./category-form";

const AddCategory = () => {
  return (
    <InsertData buttonTitle="Add Category" title="Add Category">
      <CategoryForm />
    </InsertData>
  );
};

export default AddCategory;
