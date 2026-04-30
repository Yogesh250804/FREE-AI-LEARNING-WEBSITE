import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Progress from "@/models/Progress";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
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

    const { courseId, lessonId, percentComplete } = await req.json();

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    await connectDB();

    let progress = await Progress.findOne({ userId: decoded.uid, courseId });

    if (!progress) {
      progress = new Progress({
        userId: decoded.uid,
        courseId,
        completedLessons: lessonId ? [lessonId] : [],
        percentComplete: percentComplete || 0,
      });
    } else {
      if (lessonId && !progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
      }
      if (percentComplete !== undefined) {
        progress.percentComplete = percentComplete;
      }
      progress.lastAccessed = new Date();
    }

    await progress.save();

    return NextResponse.json(progress);
  } catch (error: any) {
    console.error("Update progress error:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
