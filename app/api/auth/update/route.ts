import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function PATCH(req: NextRequest) {
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

    const { displayName, email } = await req.json();

    if (!displayName && !email) {
      return NextResponse.json({ error: "No fields to update provided" }, { status: 400 });
    }

    await connectDB();

    // If email is being changed, check if it's already in use
    if (email && email.toLowerCase() !== decoded.email.toLowerCase()) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return NextResponse.json({ error: "Email already in use by another account" }, { status: 409 });
      }
    }

    const updateData: any = {};
    if (displayName) updateData.displayName = displayName;
    if (email) updateData.email = email.toLowerCase();

    const updatedUser = await User.findByIdAndUpdate(
      decoded.uid,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Sign a new token with updated name
    const newToken = jwt.sign(
      { uid: updatedUser._id.toString(), email: updatedUser.email, displayName: updatedUser.displayName },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      uid: updatedUser._id.toString(),
      email: updatedUser.email,
      displayName: updatedUser.displayName,
      photoURL: updatedUser.photoURL,
    });

    response.cookies.set("guruji_token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
