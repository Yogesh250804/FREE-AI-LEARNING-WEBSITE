import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SupportTicket from "@/models/SupportTicket";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, subject, message } = body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await connectDB();

    const ticket = await SupportTicket.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      subject,
      message,
      status: "new",
    });

    return NextResponse.json({ success: true, id: ticket._id.toString() });
  } catch (error) {
    console.error("Support ticket error:", error);
    return NextResponse.json({ error: "Failed to submit support ticket." }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const tickets = await SupportTicket.find().sort({ createdAt: -1 }).limit(50);
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tickets." }, { status: 500 });
  }
}
