import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, service, date, message } = data;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    // Prepare WhatsApp message
    const waText = encodeURIComponent(
      `Hello Dream Byte Studio! I would like to book a studio session.\n\n` +
      `👤 Name: ${name}\n` +
      `📞 Phone: ${phone}\n` +
      `🎬 Service: ${service || "Not specified"}\n` +
      `📅 Preferred Date: ${date || "Flexible"}\n` +
      `📝 Project Scope: ${message || "Standard session"}`
    );

    const whatsAppUrl = `https://wa.me/918279720490?text=${waText}`;

    // Return success response with generated WhatsApp link
    return NextResponse.json({
      success: true,
      message: "Booking enquiry recorded successfully.",
      whatsAppUrl,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error processing enquiry." },
      { status: 500 }
    );
  }
}
