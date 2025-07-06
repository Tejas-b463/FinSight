"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category?: string;
};

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-muted-foreground">No transactions found.</p>
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="text-left font-semibold">Description</TableHead>
                <TableHead className="text-left font-semibold">Date</TableHead>
                <TableHead className="text-left font-semibold">Category</TableHead>
                <TableHead className="text-left font-semibold">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn._id}>
                  <TableCell>{txn.description}</TableCell>
                  <TableCell>
                    {new Date(txn.date).toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell>{txn.category || "Other"}</TableCell>
                  <TableCell>
                    <span className={txn.amount < 0 ? "text-red-500" : "text-green-500"}>
                      {txn.amount < 0 ? `-$${Math.abs(txn.amount)}` : `+$${txn.amount}`}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
