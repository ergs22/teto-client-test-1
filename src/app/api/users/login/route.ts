export const dynamic = "force-dynamic";

import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json(
        { error: "El correo electrónico y la contraseña son requeridos." },
        { status: 400 },
      );
    }

    // Normalized email para evitar fallos de mayúsculas/minúsculas
    const normalizedEmail = email.toLowerCase().trim();

    // 2. Buscamos al usuario por correo
    const user = await User.findOne({ email: normalizedEmail });

    // 3. Verificación de contraseña

    const validPassword = user
      ? await bcryptjs.compare(password, user.password)
      : false;

    // 4. Mensaje de seguridad
    if (!user || !validPassword) {
      return NextResponse.json(
        { error: "El correo electrónico o la contraseña son incorrectos." },
        { status: 401 },
      );
    }

    // 5. Payload del JWT
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
    };

    if (!process.env.JWT_SECRET_KEY) {
      throw new Error(
        "JWT_SECRET_KEY no está definida en las variables de entorno.",
      );
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // 6. Respuesta de éxito
    const response = NextResponse.json({
      message: "Inicio de sesión exitoso. ¡Bienvenido de nuevo!",
      success: true,
      user: {
        username: user.username,
        email: user.email,
        fullname: user.fullname,
      },
    });

    // 7. Seteo blindado de la Cookie con persistencia real (1 hora = 3600 segundos)
    response.cookies.set("token", token, {
      httpOnly: true, // Protege contra ataques XSS
      secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
      sameSite: "strict", // Bloquea CSRF de manera radical
      path: "/", // Válido para toda la app
      maxAge: 60 * 60, // Duración de 1 hora en segundos (Persiste aunque cierren el navegador)
    });

    return response;
  } catch (error: any) {
    console.error("Error crítico en POST /api/users/login:", error);

    return NextResponse.json(
      {
        error:
          "Ocurrió un error inesperado. Por favor, inténtalo nuevamente más tarde.",
      },
      { status: 500 },
    );
  }
}
