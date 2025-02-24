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
import { format } from "date-fns";
import { BsThreeDotsVertical } from "react-icons/bs";
import ActionTrigger from "../shared/action-trigger";
import { deleteBudget } from "@/api/axios.deleteBudget";
import UpdateBudget from "./update-budget";
import { useBudgetsStore } from "@/store/useBudgetsStore";
import { toast } from "sonner";

interface BudgetCardProps {
  _id: string | undefined;
  title: string;
  spent: number;
  total: number;
  remaining: number;
  percentUsed: number;
  progress: number;
  start_date: Date;
  end_date: Date;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  _id,
  title,
  spent = 0,
  total = 0,
  remaining = 0,
  percentUsed = 0,
  progress = 0,
  start_date,
  end_date,
}) => {
  const { fetchBudgets } = useBudgetsStore();
  const handleDel = (id: string) => {
    deleteBudget(id).then((response) => {
      if (response.success) {
        fetchBudgets();
        toast.error(response.message);
      }
    });
  };
  return (
    <Card className="flex-1 max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-4 text-xl">
          <h1>{title}</h1>
          <div className="flex items-center justify-center">
            <span className="text-xs text-gray-400">
              {format(start_date, "P")} - {format(end_date, "P")}
            </span>

            {/*action to edit or delete budget */}
            <ActionTrigger
              icon={<BsThreeDotsVertical />}
              title={title}
              _id={_id}
              handleDelete={() => handleDel(_id!)}
              handleEdit={<UpdateBudget _id={_id} />}
            />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-2 text-2xl font-bold">
          {formatCurrency(spent)}{" "}
          <span className="text-sm font-normal text-gray-400">
            / {formatCurrency(total)}
          </span>
        </div>
        <Progress value={progress} />
        <p className="py-2 text-xs text-gray-400">
          {percentUsed}% of budget used
        </p>
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
