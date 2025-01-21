import { ICategory } from "@/types/category.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormControl } from "../ui/form";
import useFetch from "@/hooks/useFetch";
import { options } from "./options";

const SelectCategories = ({
  onChange,
  defaultValue,
  type,
  selectValue,
  disabled,
}: {
  onChange: () => void;
  defaultValue: string;
  type?: string;
  selectValue?: string;
  disabled?: boolean;
}) => {
  const { data } = useFetch<ICategory[]>(
    `/category`,
    options(type, { params: { type } }),
  );

  return (
    <Select
      onValueChange={onChange}
      defaultValue={defaultValue}
      value={selectValue}
      disabled={disabled}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {data?.length === 0 ? (
          <div>No categories found</div>
        ) : (
          data?.map((category) => (
            <SelectItem key={category._id} value={category._id}>
              {category.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectCategories;
