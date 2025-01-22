import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/app/utils/db";
import User from "@/app/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error:any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
