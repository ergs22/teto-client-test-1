import connect from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    // Verificar si la diferencia entre ambas fechas es menor o igual a 1 hora
    const oneHourInMilliseconds = 60 * 60 * 1000;

    const user = await User.findOne({
      verifyToken: token,
    });

    if (!user) {
      return NextResponse.json({ error: "Token invalido" }, { status: 401 });
    }

    // Convertir la marca de tiempo del token y la hora actual a objetos Date
    const tokenTime = new Date(user.verifyTokenExpiry);
    const currentTime = new Date();
    const tokenTimeMs = tokenTime.getTime();
    const currentTimeMs = currentTime.getTime();

    if (currentTimeMs - tokenTimeMs > oneHourInMilliseconds) {
      // Token expirado: generar y reenviar un nuevo token
      await sendEmail({
        email: user.email,
        emailType: "VERIFY",
        userId: user._id,
      });
      return NextResponse.json(
        { error: "Token expirado, se ha reenviado el correo de verificación." },
        { status: 403 },
      );
    }

    user.isVerified = true;
    // user.verifyToken = undefined;
    // user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Correo verificado exitosamente!",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
