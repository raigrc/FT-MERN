import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  transactions: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  transactions = 0,
}) => {
  return (
    <Card className="lg:w-[30%] m-2">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          <span>{transactions}</span> transactions
        </p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
