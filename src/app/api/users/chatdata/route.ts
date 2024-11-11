import { connect } from "@/dbConfig/dbConfig";
import Chat from "@/models/chatModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId"); // Si deseas filtrar por userId

    // Verificar si el userId fue pasado como parámetro de búsqueda
    let filter: any = {};
    if (userId) {
      filter.userId = userId;
    }

    // Traer todos los chats o filtrar por userId
    const chats = await Chat.find(filter).sort({ date: -1 }); // Ordenados por fecha descendente
    return NextResponse.json({
      message: "Chats recuperados correctamente",
      success: true,
      chats,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
