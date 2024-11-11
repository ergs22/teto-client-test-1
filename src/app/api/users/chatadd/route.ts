import { connect } from "@/dbConfig/dbConfig";
import Chat from "@/models/chatModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, messages } = reqBody; // messages es un array de { sender: 'user' | 'bot', text: string, timestamp: Date }

    // Agrupar mensajes por fecha
    const chatsByDate: { [key: string]: any[] } = {};
    messages.forEach((message: any) => {
      const date = new Date(message.timestamp).toISOString().split("T")[0];
      if (!chatsByDate[date]) {
        chatsByDate[date] = [];
      }
      chatsByDate[date].push(message);
    });

    const savedChats = [];
    for (const [date, newMessages] of Object.entries(chatsByDate)) {
      // Verificar si ya existe un chat para esa fecha y ese usuario
      let existingChat = await Chat.findOne({ userId, date });

      if (existingChat) {
        // Obtener los IDs de los mensajes existentes
        const existingMessageIds = existingChat.messages.map(
          (msg: any) => msg._id
        );
        // Filtrar los mensajes nuevos para no duplicar los ya existentes
        const filteredMessages = newMessages.filter(
          (message) =>
            !existingMessageIds.some((existingId: any) =>
              existingId.equals(message._id)
            )
        );

        if (filteredMessages.length > 0) {
          // Solo agregar los mensajes nuevos
          existingChat.messages.push(...filteredMessages);
          const updatedChat = await existingChat.save();
          savedChats.push(updatedChat);
        }
      } else {
        // Crear un nuevo chat si no existe para la fecha
        const newChat = new Chat({
          userId,
          date,
          messages: newMessages, // Aquí se guardan todos los mensajes para la nueva fecha
        });
        const savedChat = await newChat.save();
        savedChats.push(savedChat);
      }
    }

    return NextResponse.json({
      message: "Chats almacenados/actualizados correctamente",
      success: true,
      savedChats,
    });
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
