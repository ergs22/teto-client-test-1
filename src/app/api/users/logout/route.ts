export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      message: "Cierre de sesión exitoso.",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Máxima protección CSRF
      path: "/", // Se aplica a toda la aplicación
      expires: new Date(0), // Fuerza la expiración inmediata en el navegador
    });

    return response;
  } catch (error: any) {
    console.error("Error crítico en POST /api/users/logout:", error);

    return NextResponse.json(
      { error: "Ocurrió un error interno al intentar cerrar la sesión." },
      { status: 500 },
    );
  }
}
