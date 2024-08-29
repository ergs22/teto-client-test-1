import { connect } from "@/dbConfig/dbConfig";
import Chat from "@/models/chatModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, messages } = reqBody; // messages is an array of { sender: 'user' | 'bot', text: string, timestamp: Date }

    // Group messages by date
    const chatsByDate: { [key: string]: any[] } = {};
    messages.forEach((message: any) => {
      const date = new Date(message.timestamp).toISOString().split("T")[0];
      if (!chatsByDate[date]) {
        chatsByDate[date] = [];
      }
      chatsByDate[date].push(message);
    });

    // Save each group of messages by date
    const savedChats = [];
    for (const [date, messages] of Object.entries(chatsByDate)) {
      const newChat = new Chat({
        userId,
        date,
        messages,
      });
      try {
        const savedChat = await newChat.save();
        savedChats.push(savedChat);
      } catch (saveError) {
        console.error(`Error saving chat for date ${date}:`, saveError);
      }
    }

    return NextResponse.json({
      message: "Chats almacenados correctamente",
      success: true,
      savedChats,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
