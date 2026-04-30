import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Match from "@/models/Match";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    await connectDB();
    const { matchId } = await params;
    const match = await Match.findById(matchId);

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    return NextResponse.json(match);
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
