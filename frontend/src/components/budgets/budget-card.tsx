import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "../ui/progress";
import { formatCurrency } from "@/lib/format-currency";
import React from "react";

interface BudgetCardProps {
  title: string;
  spent: number;
  total: number;
  remaining: number;
  progress: number;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  title,
  spent = 0,
  total = 0,
  remaining = 0,
  progress = 0,
}) => {
  return (
    <Card className="flex-1 max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gray-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 text-2xl font-bold">
          {formatCurrency(spent)}{" "}
          <span className="text-sm font-normal text-gray-400">
            / {formatCurrency(total)}
          </span>
        </div>
        <Progress value={progress} />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          {formatCurrency(remaining)} remaining
        </p>
      </CardFooter>
    </Card>
  );
};

export default BudgetCard;
