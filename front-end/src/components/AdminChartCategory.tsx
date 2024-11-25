"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { category: "Боловсрол", visitors: 275, fill: "var(--color-chrome)" },
  { category: "Гоо сайхан", visitors: 200, fill: "var(--color-safari)" },
  { category: "Барилга Интерьер", visitors: 187, fill: "var(--color-firefox)" },
  { category: "Дизайн ба Урлаг", visitors: 173, fill: "var(--color-edge)" },
  { category: "Гэр ахуй", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Боловсрол",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Гоо сайхан",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Барилга Интерьер",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Дизайн ба Урлаг",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Гэр ахуй",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ChartComponentCategoryOrder() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Label List</CardTitle>
        <CardDescription>July - Nov 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="category"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total order numbers for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
