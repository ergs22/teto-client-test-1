export const dynamic = "force-dynamic";

import connect from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const reqBody = await request.json();
    const { token } = reqBody;

    if (!token) {
      return NextResponse.json(
        { error: "El token es requerido" },
        { status: 400 },
      );
    }

    // 2. Buscamos al usuario por el token
    const user = await User.findOne({ verifyToken: token });

    if (!user) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    // 3. Validación limpia de expiración utilizando objetos Date nativos
    // Asumiendo que 'verifyTokenExpiry' almacena la fecha límite de validez
    const isExpired = new Date() > new Date(user.verifyTokenExpiry);

    if (isExpired) {
      // Si expiró, disparamos el reenvío asíncrono
      try {
        await sendEmail({
          email: user.email,
          emailType: "VERIFY",
          userId: user._id,
        });
      } catch (emailError) {
        console.error(
          "Error al reenviar el email de verificación:",
          emailError,
        );
      }

      return NextResponse.json(
        {
          error:
            "Token expirado, se ha reenviado un nuevo correo de verificación.",
        },
        { status: 403 },
      );
    }

    // 4. Mutación segura del estado del usuario y limpieza de credenciales de un solo uso
    user.isVerified = true;
    user.verifyToken = undefined; // Eliminamos el token para evitar ataques de reutilización
    user.verifyTokenExpiry = undefined; // Limpiamos la expiración

    await user.save();

    return NextResponse.json({
      message: "¡Correo verificado exitosamente!",
      success: true,
    });
  } catch (error: any) {
    console.error("Error crítico en /api/users/verifyemail:", error);

    // Protegemos al cliente ocultando detalles del backend
    return NextResponse.json(
      {
        error:
          "Ocurrió un error interno en el servidor al verificar el correo.",
      },
      { status: 500 },
    );
  }
}
