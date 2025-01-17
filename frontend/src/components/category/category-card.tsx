import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface CategoryCardProps {
  title: string;
  transactions: number;
  id: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  transactions = 0,
  id,
}) => {
  return (
    <Card className="m-2 lg:w-[30%]">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <span>{transactions}</span> transactions
          </p>
          <Link to={`${id}`}>
            <Button variant="link" size="sm">
              see transactions
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
