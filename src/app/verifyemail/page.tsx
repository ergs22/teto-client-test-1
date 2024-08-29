"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import Image from "next/image";


export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true);
        } catch (error: any) {
            setError(true);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
            router.push("/chat")
        }
    }, [token])
    return (
        <section className=" text-black flex bg-hero-pattern bg-size-hero bg-position-hero flex-col items-center pt-8 justify-start min-h-screen ">
            <h1 className="text-4xl px-6 sm:px-0">Verifique su correo electronico</h1>
            <h2 className="px-6 py-2 sm:px-2"> Se le ha enviado un codigo de verificacion a su correo. <Link className="underline hover:text-blue-b text-green-3" href="https://www.gmail.com"
                target="_blank">Verifique</Link>  para continuar </h2>


            <div className="w-[70vw]bg-red-400 flex justify-center items-center mx-auto mt-16">
                <div className="w-[40vw] sm:w-[35vw] md:w-[20vw] h-[40vh]">
                    <Image
                        src="/images/tetobot-picture.png"
                        alt="tetobot"
                        className="animate-float"
                        width={800} // Cambia esto a un valor mayor según la resolución de tu imagen
                        height={600} // Cambia esto a un valor mayor según la resolución
                        layout="responsive"
                    />
                </div>

            </div>

        </section>
    )
} 