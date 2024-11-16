"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("Verifique su correo electrónico");
    const [subMessage, setSubMessage] = useState("Se le ha enviado un código de verificación a su correo.");
    const router = useRouter();

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setMessage("¡Correo verificado exitosamente!");
            setSubMessage("Redirigiendo al chat...");
            setTimeout(() => router.push("/chat"), 2000); // Redirigir tras 2 segundos
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                setMessage("El token ha expirado");
                setSubMessage("Se ha enviado un nuevo correo de verificación. Por favor, revise su bandeja de entrada.");
            } else {
                setMessage("Error al verificar el correo");
                setSubMessage("Por favor, intente nuevamente.");
            }
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <section className="text-black flex bg-hero-pattern bg-size-hero bg-position-hero flex-col items-center pt-8 justify-start min-h-screen">
            <h1 className="text-4xl px-6 sm:px-0">{message}</h1>
            <h2 className="px-6 py-2 sm:px-2">
                {subMessage}{" "}
                {message.includes("verificación") && (
                    <Link
                        className="underline hover:text-blue-b text-green-3"
                        href="https://www.gmail.com"
                        target="_blank"
                    >
                        Verifique
                    </Link>
                )}
            </h2>

            <div className="w-[70vw] flex justify-center items-center mx-auto mt-16">
                <div className="w-[40vw] sm:w-[35vw] md:w-[20vw] h-[40vh]">
                    <Image
                        src="/images/tetobot-picture.png"
                        alt="tetobot"
                        className="animate-float"
                        width={800}
                        height={600}
                    />
                </div>
            </div>
        </section>
    );
}
