import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, fullname, age } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "Este usuario ya existe" },
        { status: 400 }
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

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "Usuario creado correctamente",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      // Código específico para error de clave duplicada en MongoDB
      return NextResponse.json(
        { error: "El nombre de usuario ya está en uso" },
        { status: 400 }
      );
    }
    // Para otros errores
    return NextResponse.json(
      { error: "Ocurrió un error inesperado, por favor intente más tarde." },
      { status: 500 }
    );
  }
}
