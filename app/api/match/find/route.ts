import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Match from "@/models/Match";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const JWT_SECRET = process.env.JWT_SECRET || "guruji_jwt_super_secret_2024_xK9mP2qR8vL5nW";

// Log to a file we can read
function logMatch(msg: string) {
  const logPath = path.join(process.cwd(), "matchmaking.log");
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logPath, `[${timestamp}] ${msg}\n`);
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("guruji_token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const userId = decoded.uid;
    const displayName = decoded.displayName || "Anonymous Player";
    const { problemId } = await request.json();

    logMatch(`SEARCH: ${displayName} (${userId}) looking for ${problemId}`);

    // 1. Clean up any stale matches first
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    await Match.deleteMany({ status: "waiting", createdAt: { $lt: fiveMinutesAgo } });

    // 2. Find ANY waiting match for this problem
    // CRITICAL: We use a very broad search to ensure we don't miss anyone
    const waitingMatch = await Match.findOne({ 
      status: "waiting",
      problemId: problemId,
      "players.userId": { $ne: new mongoose.Types.ObjectId(userId) } 
    });

    if (waitingMatch) {
      logMatch(`JOIN: ${displayName} found room ${waitingMatch._id} created by ${waitingMatch.players[0].displayName}`);
      
      waitingMatch.players.push({
        userId: new mongoose.Types.ObjectId(userId),
        displayName,
        isReady: true,
        score: 0
      });
      
      waitingMatch.status = "active";
      waitingMatch.startedAt = new Date();
      await waitingMatch.save();
      
      logMatch(`SUCCESS: Room ${waitingMatch._id} is now LIVE`);
      return NextResponse.json(waitingMatch);
    }

    // 3. Create new room if none found
    // But first, check if THIS user already has a waiting room so we don't create duplicates
    let myExistingMatch = await Match.findOne({
      status: "waiting",
      problemId: problemId,
      "players.userId": new mongoose.Types.ObjectId(userId)
    });

    if (myExistingMatch) {
      logMatch(`WAIT: ${displayName} is already waiting in room ${myExistingMatch._id}`);
      return NextResponse.json(myExistingMatch);
    }

    logMatch(`CREATE: ${displayName} creating new room for ${problemId}`);
    const newMatch = await Match.create({
      players: [{
        userId: new mongoose.Types.ObjectId(userId),
        displayName,
        isReady: true,
        score: 0
      }],
      problemId,
      status: "waiting",
      createdAt: new Date()
    });

    return NextResponse.json(newMatch);

  } catch (error: any) {
    logMatch(`ERROR: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
