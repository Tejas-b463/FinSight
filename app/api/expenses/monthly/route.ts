import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const data = await Transaction.aggregate([
    {
      $group: {
        _id: { $month: "$date" },
        total: { $sum: "$amount" }
      }
    },
    {
      $sort: { "_id": 1 }
    }
  ]);
  return NextResponse.json(data);
}
