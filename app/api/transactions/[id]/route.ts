import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// DELETE handler for deleting a transaction by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Wrap params in Promise
) {
  try {
    // Await the params promise to get the actual params object
    const { id } = await params;

    // Establish a connection to the MongoDB database
    await connectDB();

    // Find and delete the transaction by its ID
    const deleted = await Transaction.findByIdAndDelete(id);

    // If no transaction was found with the given ID, return a 404 response
    if (!deleted) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    // Return a success message if the transaction was deleted
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    // Log any errors that occur during the deletion process
    console.error("DELETE error:", err);
    // Return a 500 internal server error response
    return NextResponse.json({ message: "Error deleting transaction" }, { status: 500 });
  }
}

// PUT handler for updating a transaction by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Wrap params in Promise
) {
  try {
    // Await the params promise to get the actual params object
    const { id } = await params;

    // Establish a connection to the MongoDB database
    await connectDB();

    // Parse the request body to get the updated transaction data
    const { amount, date, description, category } = await req.json();

    // Find and update the transaction by its ID
    // { new: true } option returns the updated document
    const updated = await Transaction.findByIdAndUpdate(
      id,
      { amount, date, description, category },
      { new: true }
    );

    // If no transaction was found with the given ID, return a 404 response
    if (!updated) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    // Return the updated transaction document
    return NextResponse.json(updated);
  } catch (err) {
    // Log any errors that occur during the update process
    console.error("PUT error:", err);
    // Return a 500 internal server error response
    return NextResponse.json({ message: "Error updating transaction" }, { status: 500 });
  }
}