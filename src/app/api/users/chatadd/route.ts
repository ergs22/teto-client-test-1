export const dynamic = "force-dynamic";

import connect from "@/dbConfig/dbConfig";
import Chat from "@/models/chatModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { error: "No autorizado. Inicia sesión para guardar tus mensajes." },
        { status: 401 },
      );
    }

    const reqBody = await request.json();
    const { messages } = reqBody;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No se proporcionaron mensajes válidos para guardar." },
        { status: 400 },
      );
    }

    const chatsByDate: { [key: string]: any[] } = {};
    messages.forEach((message: any) => {
      const date = new Date(message.timestamp).toISOString().split("T")[0];
      if (!chatsByDate[date]) {
        chatsByDate[date] = [];
      }
      chatsByDate[date].push(message);
    });

    // 4. Preparación de operaciones en lote (Bulk Operations)
    const bulkOperations = Object.entries(chatsByDate).map(
      ([date, newMessages]) => {
        return {
          updateOne: {
            filter: { userId, date },
            update: {
              // $setOnInsert: Setea los campos base SOLO si el documento se está creando desde cero
              $setOnInsert: { userId, date },
              // $push con $each: Inserta múltiples elementos al array de mensajes de forma eficiente
              $push: {
                messages: { $each: newMessages },
              },
            },
            upsert: true, // Si no existe el documento para esa fecha, lo crea automáticamente
          },
        };
      },
    );

    // 5. Ejecución atómica en paralelo (Una sola petición a la Base de Datos)
    const bulkResult = await Chat.bulkWrite(bulkOperations);

    return NextResponse.json({
      message: "Historial de conversación sincronizado correctamente.",
      success: true,
      summary: {
        matchedCount: bulkResult.matchedCount,
        modifiedCount: bulkResult.modifiedCount,
        upsertedCount: bulkResult.upsertedCount,
      },
    });
  } catch (error: any) {
    console.error("Error crítico en POST /api/users/chatapp:", error);

    return NextResponse.json(
      { error: "Error interno del servidor al sincronizar la conversación." },
      { status: 500 },
    );
  }
}
