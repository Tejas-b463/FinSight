"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

type Props = {
  onAdd: () => void;
};

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];

export default function AddTransactionForm({ onAdd }: Props) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = async () => {
    if (!amount || !date || !description) {
      toast.error("All fields are required 🤔");
      return;
    }

    try {
      await fetch("/api/transactions", {
        method: "POST",
        body: JSON.stringify({ amount: +amount, date, description, category }),
      });

      setAmount("");
      setDate("");
      setDescription("");

      toast.success("Transaction added successfully");
      onAdd();
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <h2 className="text-2xl font-bold">Add Transaction</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="amount">
            Amount
          </label>
          <Input
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="date">
            Date
          </label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled>Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Description
          </label>
          <Input
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="mt-2">
          Add
        </Button>
      </div>
    </div>
  );
}
