import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params;

    await connectDB();

    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ message: "Error deleting transaction" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params;

    await connectDB();
    
    const { amount, date, description, category } = await req.json();

    const updated = await Transaction.findByIdAndUpdate(
      id,
      { amount, date, description, category },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ message: "Error updating transaction" }, { status: 500 });
  }
}