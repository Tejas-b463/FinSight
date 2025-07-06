import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define a strict type for transactions
type Transaction = {
  category: string;
  amount: number;
};

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // yellow
  "#ef4444", // red
  "#8b5cf6", // purple
  "#f97316", // orange
];

export default function CategoryPieChart({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const categoryTotals = transactions.reduce<Record<string, number>>(
    (acc, txn) => {
      acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
      return acc;
    },
    {} as Record<string, number> // 🔧 Explicit type for initial value
  );

  const data = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Category Breakdown</CardTitle>
      </CardHeader>

      <CardContent className="h-80 sm:h-[22rem]">
        {data.length === 0 ? (
          <p className="text-muted-foreground text-sm">No data to display.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                isAnimationActive
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "0.375rem",
                  color: "white",
                }}
                wrapperStyle={{ zIndex: 10 }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ color: "currentColor" }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
