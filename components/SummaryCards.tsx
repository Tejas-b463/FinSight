"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Transaction = {
  _id: string;
  amount: number;
  date: string;
  category: string;
  description: string;
};

type Props = {
  transactions: Transaction[];
  onRefresh: () => void;
};

const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

export default function SummaryCards({ transactions, onRefresh }: Props) {
  const [editTxn, setEditTxn] = useState<Transaction | null>(null);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this transaction?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Transaction deleted");
      onRefresh();
    } catch {
      toast.error("Failed to delete transaction");
    }
  };

  const handleUpdate = async () => {
    if (!editTxn) return;

    try {
      const res = await fetch(`/api/transactions/${editTxn._id}`, {
        method: "PUT",
        body: JSON.stringify(editTxn),
      });
      if (!res.ok) throw new Error();
      toast.success("Transaction updated");
      setEditTxn(null);
      onRefresh();
    } catch {
      toast.error("Failed to update transaction");
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-foreground">All Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-muted-foreground">No transactions found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn._id}>
                <TableCell className={txn.amount < 0 ? "text-red-500" : "text-green-500"}>
                  {txn.amount < 0 ? `-₹${Math.abs(txn.amount)}` : `+₹${txn.amount}`}
                </TableCell>
                <TableCell>{txn.date.slice(0, 10)}</TableCell>
                <TableCell>{txn.category}</TableCell>
                <TableCell>{txn.description}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditTxn(txn)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDelete(txn._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Edit Modal */}
      <Dialog open={!!editTxn} onOpenChange={() => setEditTxn(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          {editTxn && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
              className="space-y-4"
            >
              <div className="grid gap-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={editTxn.amount}
                  onChange={(e) =>
                    setEditTxn({ ...editTxn, amount: +e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={editTxn.date.slice(0, 10)}
                  onChange={(e) =>
                    setEditTxn({ ...editTxn, date: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Input
                  type="text"
                  value={editTxn.description}
                  onChange={(e) =>
                    setEditTxn({ ...editTxn, description: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={editTxn.category}
                  onValueChange={(value) =>
                    setEditTxn({ ...editTxn, category: value })
                  }
                >
                  <SelectTrigger>
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

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEditTxn(null)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
