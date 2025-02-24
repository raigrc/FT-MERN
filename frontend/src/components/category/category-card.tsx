import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import ActionTrigger from "../shared/action-trigger";
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteCategoryById } from "@/api/axios.deleteCategory";
import UpdateCategory from "./update-category";
import { useCategoriesStore } from "@/store/useCategoriesStore";
import { toast } from "sonner";

interface CategoryCardProps {
  title: string;
  transactions: number;
  _id: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  transactions = 0,
  _id,
}) => {
  const { fetchCategories } = useCategoriesStore();
  const handleDel = (id: string) => {
    deleteCategoryById(id).then((response) => {
      if (response?.success) {
        toast.error(response.message);
        fetchCategories();
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <Card className="m-2 lg:w-[30%]">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center justify-between">
          <h1 className="text-xl">{title}</h1>
          <ActionTrigger
            icon={<BsThreeDotsVertical size={16} />}
            title={title}
            handleDelete={() => handleDel(_id)}
            handleEdit={<UpdateCategory _id={_id} />}
            _id={_id}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{transactions} transactions</p>
      </CardContent>
      <CardFooter className="float-right">
        <Link to={`${_id}`}>
          <Button variant="link" size="sm">
            see transactions
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
