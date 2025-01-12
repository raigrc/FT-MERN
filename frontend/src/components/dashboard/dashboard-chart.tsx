import { Bar, BarChart, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Card, CardContent } from "../ui/card";
const DashboardChart = () => {
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 186, mobile: 80 },
    { month: "March", desktop: 186, mobile: 80 },
    { month: "April", desktop: 186, mobile: 80 },
    { month: "May", desktop: 186, mobile: 80 },
    { month: "June", desktop: 186, mobile: 80 },
  ];

  const chartConfig = {
    desktop: { label: "Desktop", color: "hsl(var(--primary))" },
    mobile: { label: "Mobile", color: "hsl(var(--destructive))" },
  } satisfies ChartConfig;
  return (
    <div className="w-2/3">
      <Card>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <XAxis dataKey="month" />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardChart;
