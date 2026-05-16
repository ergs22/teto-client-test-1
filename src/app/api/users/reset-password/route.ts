export const dynamic = "force-dynamic";

import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const reqBody = await request.json();
    const { token, newPassword } = reqBody;

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "El token y la nueva contraseña son requeridos." },
        { status: 400 },
      );
    }

    // 2. Buscamos al usuario validando que el token coincida Y que no haya expirado ($gt: mayor que ahora)
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    // 3. Validación segura: Si no hay usuario, cortamos el flujo limpiamente
    if (!user) {
      return NextResponse.json(
        { error: "El enlace de recuperación es inválido o ha expirado." },
        { status: 400 },
      );
    }

    // 4. Hasheo seguro con Bcrypt
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    // 5.  Actualizamos password y DESTRUIMOS los tokens de recuperación
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message:
        "Contraseña restablecida correctamente. Ya puedes iniciar sesión.",
      success: true,
    });
  } catch (error: any) {
    console.error("Error crítico en POST /api/users/reset-password:", error);

    return NextResponse.json(
      {
        error:
          "Ocurrió un error interno en el servidor al intentar cambiar la contraseña.",
      },
      { status: 500 },
    );
  }
}
