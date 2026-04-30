import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Progress from "@/models/Progress";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("guruji_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    await connectDB();

    const progressList = await Progress.find({ userId: decoded.uid }).sort({ updatedAt: -1 });

    return NextResponse.json(progressList);
  } catch (error: any) {
    console.error("Get progress error:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}
