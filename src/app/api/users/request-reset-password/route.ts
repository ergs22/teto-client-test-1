import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "No se encontró un usuario con ese correo electrónico" },
        { status: 400 }
      );
    }

    // Envía un correo con el token de restablecimiento
    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      message: "Correo de restablecimiento enviado",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
