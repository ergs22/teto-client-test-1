// Forzamos comportamiento dinámico para evitar que Next.js 16 cachee estáticamente los datos del perfil
export const dynamic = "force-dynamic";

import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    await connect();

    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json(
        { error: "No autorizado. Token inexistente o inválido." },
        { status: 401 },
      );
    }

    const user = await User.findById(userId).select(
      "username email fullname age isVerified",
    );

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado en la base de datos." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Usuario encontrado con éxito",
      data: user,
    });
  } catch (error: any) {
    console.error("Error crítico en GET /api/users/me:", error);

    return NextResponse.json(
      { error: "Ocurrió un error al procesar la solicitud de perfil." },
      { status: 500 },
    );
  }
}
