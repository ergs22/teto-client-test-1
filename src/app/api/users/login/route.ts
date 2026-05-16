import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      // Mensaje más amigable para el usuario
      return NextResponse.json(
        {
          error: "No hemos encontrado una cuenta con este correo electrónico.",
        },
        { status: 400 },
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      // Mensaje más amigable para el usuario
      return NextResponse.json(
        { error: "La contraseña que ingresaste es incorrecta." },
        { status: 400 },
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Inicio de sesión exitoso. ¡Bienvenido de nuevo!",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    // Mensaje más amigable para errores inesperados
    return NextResponse.json(
      {
        error: "Ocurrió un error inesperado. Por favor, inténtalo nuevamente.",
      },
      { status: 500 },
    );
  }
}
