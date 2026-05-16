export const dynamic = "force-dynamic";

import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const reqBody = await request.json();
    const { username, email, password, fullname, age } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "Este usuario ya existe" },
        { status: 400 },
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      fullname,
      age,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // 3. Envío de email (Envuelto en un try/catch interno opcional por si falla el SMTP, que no tumbe el registro)
    try {
      await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    } catch (emailError) {
      console.error("Error enviando el correo de verificación:", emailError);
      // No bloqueamos el flujo principal si el usuario ya se guardó con éxito
    }

    return NextResponse.json({
      message: "Usuario creado correctamente",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.error("Error en el servidor:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "El nombre de usuario ya está en uso" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Ocurrió un error inesperado, por favor intente más tarde." },
      { status: 500 },
    );
  }
}
