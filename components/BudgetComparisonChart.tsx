import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BudgetComparisonChart({
  data,
}: {
  data: { category: string; budget: number; actual: number }[];
}) {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Budget vs Actual</CardTitle>
      </CardHeader>

      <CardContent className="h-72 sm:h-80">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="category" tick={{ fill: "currentColor" }} />
              <YAxis tick={{ fill: "currentColor" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937", // Tailwind gray-800
                  borderRadius: "0.375rem",
                  color: "white",
                  border: "none",
                }}
              />
              <Legend
                wrapperStyle={{ color: "currentColor" }}
                iconType="circle"
              />
              <Bar dataKey="budget" name="Budget" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" name="Spent" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
