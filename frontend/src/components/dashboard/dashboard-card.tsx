import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";
interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  amount?: number;
}
const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  amount = 0,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between text-sm">
          {title}
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>{formatCurrency(amount)}</CardTitle>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
