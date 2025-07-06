import { connectDB } from "@/lib/mongodb";
import Budget from "@/models/Budget";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}

export async function POST(req: Request) {
  await connectDB();
  const { month, category, amount } = await req.json();
  const updated = await Budget.findOneAndUpdate(
    { month, category },
    { amount },
    { upsert: true, new: true }
  );
  return NextResponse.json(updated);
}
