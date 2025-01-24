import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useFetch from "@/hooks/useFetch";
import { options } from "../shared/options";
import { format, parse } from "date-fns";

interface TransactionPerMonthProps {
  _id: {
    transaction_date: string;
  };
  income: number;
  expense: number;
}

const DashboardChart = () => {
  const { data } = useFetch<TransactionPerMonthProps[]>(
    `/balance/transactions-per-month`,
    options,
  );

  const formattedDate = data?.map((item) => {
    const formatToMonth = format(
      parse(item._id.transaction_date, "yyyy-MM", new Date()),
      "MMMM",
    );
    return {
      ...item,
      _id: {
        ...item._id,
        formatToMonth,
      },
    };
  });

  console.log(formattedDate);

  const chartConfig = {
    income: { label: "Income", color: "hsl(var(--primary))" },
    expense: { label: "Expense", color: "hsl(var(--destructive))" },
  } satisfies ChartConfig;
  return (
    <Card className="w-3/5">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-auto">
          <BarChart accessibilityLayer data={formattedDate}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="_id.formatToMonth"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DashboardChart;
