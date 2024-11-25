"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const chartData = [
  { date: "2024-11-17", talent: 475, client: 520 },
  { date: "2024-11-18", talent: 107, client: 170 },
  { date: "2024-11-19", talent: 341, client: 290 },
  { date: "2024-11-20", talent: 408, client: 450 },
  { date: "2024-11-18", talent: 169, client: 210 },
  { date: "2024-11-19", talent: 317, client: 270 },
  { date: "2024-11-20", talent: 480, client: 530 },
  { date: "2024-11-21", talent: 132, client: 180 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  talent: {
    label: "Мэргэжилтэн",
    color: "hsl(var(--chart-1))",
  },
  client: {
    label: "Захиалагч",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartComponentSubs() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("talent");

  const total = React.useMemo(
    () => ({
      talent: chartData.reduce((acc, curr) => acc + curr.talent, 0),
      client: chartData.reduce((acc, curr) => acc + curr.client, 0),
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>БҮРТГЭЛТЭЙ ХЭРЭГЛЭГЧДИЙН ТОО</CardTitle>
          <CardDescription>
            Нийт бүртгүүлсэн мэргэжилтэн болон захиалагдын тоо
          </CardDescription>
        </div>
        <div className="flex">
          {["talent", "client"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
