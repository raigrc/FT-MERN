import React from "react";
import { Input } from "../ui/input";

interface FilterSearchProps {
  onHandleChange: (value: any) => void;
  placeholder?: string;
}

const FilterSearch: React.FC<FilterSearchProps> = ({
  onHandleChange,
  placeholder,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onHandleChange(e.target.value);
  };
  return (
    <>
      <Input
        className="w-auto"
        onChange={handleChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default FilterSearch;
