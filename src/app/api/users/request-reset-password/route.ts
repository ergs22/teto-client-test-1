export const dynamic = "force-dynamic";

import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    // 1. Inicialización de la conexión de manera segura
    await connect();

    const reqBody = await request.json();
    const { email } = reqBody;

    if (!email) {
      return NextResponse.json(
        { error: "El correo electrónico es requerido." },
        { status: 400 },
      );
    }

    // 2. Buscamos al usuario en la base de datos
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // 3. Mitigación de Enumeración de Usuarios
    // Si el usuario NO existe, respondemos EXACTAMENTE lo mismo que si existiera.
    if (!user) {
      return NextResponse.json({
        message:
          "Si el correo electrónico coincide con una cuenta registrada, recibirás un enlace de recuperación en breve.",
        success: true,
      });
    }

    // 4. Envío del email en segundo plano (Non-blocking pattern para mejorar UX)
    // No usamos 'await' directo en el flujo principal para que el frontend responda de inmediato,
    // pero manejamos el catch internamente para no dejar promesas huérfanas en el log.
    sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: user._id,
    }).catch((emailError) => {
      console.error(
        "Error asíncrono al enviar correo de recuperación:",
        emailError,
      );
    });

    // 5. Respuesta exitosa inmediata
    return NextResponse.json({
      message:
        "Si el correo electrónico coincide con una cuenta registrada, recibirás un enlace de recuperación en breve.",
      success: true,
    });
  } catch (error: any) {
    console.error(
      "Error crítico en POST /api/users/request-reset-password:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Ocurrió un error interno en el servidor al procesar la solicitud.",
      },
      { status: 500 },
    );
  }
}
