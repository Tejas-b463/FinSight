import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

// GET all transactions 
export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error("Error fetching transactions:", error); // ✅ Used the error variable
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

// POST a new transaction
export async function POST(req: Request) {
  try {
    await connectDB();
    const { amount, date, description, category } = await req.json();

    if (!amount || !date || !description || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newTransaction = await Transaction.create({
      amount,
      date,
      description,
      category,
    });

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
  }
}
