import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  amount?: string;
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
        <CardTitle>{amount}</CardTitle>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
