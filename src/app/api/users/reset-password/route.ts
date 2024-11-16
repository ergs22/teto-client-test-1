import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, newPassword } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      // Envía un correo con el token de restablecimiento
      await sendEmail({
        email: user.email,
        emailType: "RESET",
        userId: user._id,
      });

      return NextResponse.json(
        { error: "Token inválido o expirado" },
        { status: 400 }
      );
    }

    // Hashear la nueva contraseña
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    // Actualizar la contraseña del usuario
    user.password = hashedPassword;
    // user.forgotPasswordToken = undefined; // Eliminar el token usado
    // user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Contraseña restablecida correctamente",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
