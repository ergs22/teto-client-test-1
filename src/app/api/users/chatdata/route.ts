export const dynamic = "force-dynamic";

import connect from "@/dbConfig/dbConfig";
import Chat from "@/models/chatModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request: NextRequest) {
  try {
    await connect();

    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json(
        { error: "No autorizado. Inicia sesión para ver tu historial." },
        { status: 401 },
      );
    }

    // 3. Configuración de Paginación vía SearchParams
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10); // Bloques de 20 chats por defecto
    const skip = (page - 1) * limit;

    // 4. Consulta: Busca chats que pertenezcan AL USUARIO autenticado
    // Usamos paginación (.skip y .limit) para mantener el payload ultra ligero
    const chats = await Chat.find({ userId })
      .sort({ date: -1 }) // Primero los más recientes
      .skip(skip)
      .limit(limit);

    // total de chats del usuario
    const totalChats = await Chat.countDocuments({ userId });

    return NextResponse.json({
      message: "Historial de chats recuperado correctamente.",
      success: true,
      pagination: {
        currentPage: page,
        limit,
        totalPages: Math.ceil(totalChats / limit),
        totalChats,
      },
      chats,
    });
  } catch (error: any) {
    console.error("Error crítico en GET /api/chatdata:", error);

    return NextResponse.json(
      { error: "Ocurrió un error interno al recuperar el historial de chats." },
      { status: 500 },
    );
  }
}
