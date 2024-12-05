"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
  { browser: "Боловсрол", visitors: 25, fill: "var(--color-chrome)" },
  { browser: "Гэр ахуй", visitors: 20, fill: "var(--color-safari)" },
  { browser: "Орчуулга", visitors: 28, fill: "var(--color-firefox)" },
  { browser: "Гоо сайхан", visitors: 17, fill: "var(--color-edge)" },
  { browser: "IT", visitors: 19, fill: "var(--color-other)" },
  { browser: "Дизайн ба урлаг", visitors: 19, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Захиалгын тоо",
  },
  chrome: {
    label: "Боловсрол",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Гэр ахуй",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Орчуулга",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Гоо сайхан",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "IT",
    color: "hsl(var(--chart-5))",
  },
  others: {
    label: "Дизайн ба урлаг",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ChartComponentCategoryOrder() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Нийт ажлын захиалгын тоо</CardTitle>
        <CardDescription>July-Dec 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Нийт захиалгын тоо
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Өмнөх сартай харьцуулахад 2.5% өсөлттэй байна{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Сүүлийн 3 сарын дата
        </div>
      </CardFooter>
    </Card>
  );
}
