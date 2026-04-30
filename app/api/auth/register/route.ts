import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    console.log("Registration attempt for:", email);
    await connectDB();
    console.log("DB connected");

    const existing = await User.findOne({ email: email.toLowerCase() });
    console.log("Existing user check done:", !!existing);
    if (existing) {
      return NextResponse.json({ error: "User already exists with this email." }, { status: 409 });
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Password hashed");
    const photoURL = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;

    console.log("Creating user in DB...");
    const newUser = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      displayName: name,
      photoURL,
    });
    console.log("User created:", newUser._id);

    const token = jwt.sign(
      { uid: newUser._id.toString(), email: newUser.email, displayName: newUser.displayName },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log("JWT signed");

    const response = NextResponse.json({
      uid: newUser._id.toString(),
      email: newUser.email,
      displayName: newUser.displayName,
      photoURL: newUser.photoURL,
      metadata: {
        creationTime: newUser.createdAt?.toISOString() || new Date().toISOString(),
        lastSignInTime: new Date().toISOString(),
      },
    });

    response.cookies.set("guruji_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("DETAILED Register error:", error);
    return NextResponse.json({ error: `Registration failed: ${error.message || "Unknown error"}` }, { status: 500 });
  }
}
