import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Match from "@/models/Match";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "guruji_jwt_super_secret_2024_xK9mP2qR8vL5nW";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    await connectDB();
    const { matchId } = await params;
    const { score, status } = await request.json();

    // Get current user from JWT
    const cookieStore = await cookies();
    const token = cookieStore.get("guruji_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const userId = decoded.uid;

    const match = await Match.findById(matchId);
    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    // Update the player's score
    const player = match.players.find((p: any) => p.userId.toString() === userId);
    if (player) {
      player.score = score;
      if (status === "completed") {
        player.completedAt = new Date();
      }
    }

    if (status === "completed") {
      // Check if all players have completed
      const allCompleted = match.players.every((p: any) => p.completedAt || p.userId.toString() === userId);
      if (allCompleted) {
        match.status = "completed";
      }
    }

    await match.save();

    return NextResponse.json(match);
  } catch (error: any) {
    console.error("Score update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
