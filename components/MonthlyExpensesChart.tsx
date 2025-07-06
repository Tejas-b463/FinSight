"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type MonthlyData = {
  month: string;
  total: number;
}[];

export default function MonthlyExpensesChart({ data }: { data: MonthlyData }) {
  const { resolvedTheme } = useTheme();

  const barColor =
    resolvedTheme === "dark"
      ? "#6366F1" // indigo-500
      : "#3B82F6"; // blue-500

  const totalAmount = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <CardTitle className="text-lg sm:text-xl">Monthly Expenses</CardTitle>
          <CardDescription>Last 6 Months</CardDescription>
        </div>
        <div className="text-2xl font-bold text-primary">
          ₹{totalAmount.toLocaleString()}
        </div>
      </CardHeader>
      <CardContent className="h-[250px]">
        {data.length === 0 ? (
          <p className="text-muted-foreground mt-4">No data yet</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'hsl(var(--foreground))',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                cursor={{ fill: 'hsl(var(--muted))' }}
              />
              <Bar
                dataKey="total"
                fill={barColor}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
