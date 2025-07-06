import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SpendingInsights({
  data,
}: {
  data: { category: string; budget: number; actual: number }[];
}) {
  return (
    <Card className="mt-6 w-full">
      <CardHeader>
        <CardTitle className="text-xl">Spending Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((item) => {
          const difference = Math.abs(item.actual - item.budget);
          const isOverspent = item.actual > item.budget;
          const isUnder = item.actual < item.budget;

          return (
            <div
              key={item.category}
              className="flex items-center justify-between bg-muted/40 rounded-md px-4 py-3"
            >
              <div className="text-sm text-muted-foreground">
                {isOverspent && (
                  <span>
                    You <span className="text-red-500 font-medium">overspent</span> in{" "}
                    <span className="font-semibold">{item.category}</span> by ₹{difference}
                  </span>
                )}
                {isUnder && (
                  <span>
                    You&apos;re{" "}
                    <span className="text-green-500 font-medium">under budget</span> in{" "}
                    <span className="font-semibold">{item.category}</span> by ₹{difference}
                  </span>
                )}
                {!isOverspent && !isUnder && (
                  <span>
                    You spent exactly your budget in{" "}
                    <span className="font-semibold">{item.category}</span>
                  </span>
                )}
              </div>
              <Badge
                variant={isOverspent ? "destructive" : "outline"}
                className={isUnder ? "bg-green-100 text-green-700 border border-green-300" : ""}
              >
                ₹{item.actual} / ₹{item.budget}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
