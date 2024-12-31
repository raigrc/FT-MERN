import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  value?: string;
}
const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  value,
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
        <CardTitle>{value}</CardTitle>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
