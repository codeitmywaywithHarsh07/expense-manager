import Expense from '@/app/models/Expense';
import dbConnect from '@/app/utils/db';
import { NextResponse } from 'next/server';

// Handle GET requests
export async function GET() {
  try {
    await dbConnect();
    const expenses = await Expense.find({});
    return NextResponse.json(expenses, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, amount, category, note } = body;

    await dbConnect();
    const newExpense = await Expense.create({ userId, amount, category, note });
    return NextResponse.json(newExpense, { status: 201 });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
