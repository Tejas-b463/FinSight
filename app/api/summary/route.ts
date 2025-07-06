import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const total = await Transaction.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const lastTxn = await Transaction.find().sort({ date: -1 }).limit(1);
  const lastDate = lastTxn[0]?.date.toISOString().split("T")[0];

  const categories = await Transaction.aggregate([
    { $group: { _id: "$category", amount: { $sum: "$amount" } } },
  ]).then((data) =>
    data.map((d) => ({ category: d._id, amount: Math.abs(d.amount) }))
  );

  return NextResponse.json({
    total: total[0]?.total || 0,
    lastDate,
    categories,
  });
}
