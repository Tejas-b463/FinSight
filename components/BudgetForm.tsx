"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];

export default function BudgetForm({ onUpdate }: { onUpdate: () => void }) {
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  const handleSubmit = async () => {
    if (!amount || !category || !month)
      return toast.error("All fields are required");

    const res = await fetch("/api/budgets", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({ category, amount: +amount, month }),
    });

    if (res.ok) {
      toast.success("Budget set!");
      onUpdate();
    } else {
      toast.error("Failed to save budget");
    }
  };

  return (
    <div className="w-full space-y-6 mt-6">
      <h2 className="text-2xl font-bold tracking-tight">Set Monthly Budget</h2>

      {/* Category Select */}
      <div className="flex flex-col gap-y-2">
        <Label>Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Budget Amount Input */}
      <div className="flex flex-col gap-y-2">
        <Label>Budget Amount</Label>
        <Input
          type="number"
          placeholder="Enter budget"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Month Input */}
      <div className="flex flex-col gap-y-2">
        <Label>Month</Label>
        <Input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="w-fit">
          Save
        </Button>
      </div>
    </div>
  );
}
