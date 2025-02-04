import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";
import CountUp from "react-countup";
import { DashboardCardProps } from "@/types/dashboard-types";

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  amount = 0,
}) => {
  return (
    <Card className="h-full min-w-[250px] md:w-full">
      <CardHeader>
        <div className="flex items-center justify-between text-sm">
          {title}
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <CountUp
          end={amount}
          duration={1}
          formattingFn={(value) => formatCurrency(value)}
        >
          {({ countUpRef }: { countUpRef: any }) => (
            <CardTitle ref={countUpRef}></CardTitle>
          )}
        </CountUp>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
