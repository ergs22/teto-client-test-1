"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function Page() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [user, setUser] = useState({
        email: "",
        newPassword: "",
        renewPassword: "",
    });
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    const handleEnter = async (e: any) => {
        if (e.key === "Enter") {
            await handleSubmit(token.length > 0 ? onResetPassword : onRequestReset)();
        }
    };

    const onRequestReset = async () => {
        console.log("onRequestReset")
        try {
            setLoading(true);
            console.log("onRequestReset-email:", user.email)

            const response = await axios.post("/api/users/request-reset-password", {
                email: user.email,
            });

            if (response.data.success) {
                toast.success("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
                router.push("/login");
            } else {
                toast.error(response.data.error || "Algo salió mal, inténtalo de nuevo.");
            }
        } catch (error) {
            toast.error("Error al enviar el correo de recuperación.");
        } finally {
            setLoading(false);
        }
    };

    const onResetPassword = async () => {
        console.log("onResetPassword")

        if (user.newPassword !== user.renewPassword) {
            toast.error("Las contraseñas no coinciden.");
            return;
        }
        try {
            setLoading(true);
            console.log("token,newPassword:", token, user.newPassword)

            const response = await axios.post("/api/users/reset-password", {
                token,
                newPassword: user.newPassword,
            });

            if (response.data.success) {
                toast.success("Contraseña restablecida exitosamente.");
                router.push("/login");
            } else {
                // Si el token es inválido o ha expirado, reiniciar a la etapa de solicitud de correo electrónico
                toast.error(response.data.error || "Token inválido o expirado, intenta de nuevo.");
                setToken("");
            }
        } catch (error) {
            toast.error("Error al restablecer la contraseña.");
            // Si ocurre un error, reiniciar a la etapa de solicitud de correo electrónico
            setToken("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-hero-pattern bg-size-hero bg-position-hero p-5% pt-4 pb-8">
            <div className="w-full flex justify-between items-center">
                <Link href="/">
                    <Image alt="logo" height={150} width={150} src="/images/logo-1.png" />
                </Link>
            </div>
            <div className="bg-hero w-[85vw] sm:w-[70vw] lg:w-[40vw] px-2 sm:px-8 lg:px-8 py-8 min-h-[50vh] mx-auto mt-20 flex flex-col items-center justify-around text-center">
                <h1 className="text-xl md:text-2xl font-medium">Recuperar contraseña</h1>
                <div className="flex flex-col w-full">
                    {token.length <= 0 ? (
                        <>
                            <input
                                {...register("email", { required: true })}
                                placeholder="Correo electrónico"
                                className="inputA"
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                onKeyDown={handleEnter}
                            />
                            {errors.email && <span className="text-red-600 text-left">Este campo es obligatorio</span>}
                        </>
                    ) : (
                        <>
                            <input
                                {...register("newPassword", { required: true })}
                                placeholder="Nueva contraseña"
                                className="inputA"
                                type="password"
                                value={user.newPassword}
                                onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
                                onKeyDown={handleEnter}
                            />
                            {errors.newPassword && <span className="text-red-600 text-left">Este campo es obligatorio</span>}
                            <input
                                {...register("renewPassword", { required: true })}
                                placeholder="Repite la contraseña"
                                className="inputA"
                                type="password"
                                value={user.renewPassword}
                                onChange={(e) => setUser({ ...user, renewPassword: e.target.value })}
                                onKeyDown={handleEnter}
                            />
                            {errors.renewPassword && <span className="text-red-600 text-left">Este campo es obligatorio</span>}
                        </>
                    )}
                    <button
                        type="submit"
                        className="buttonB2 my-6"
                        onClick={handleSubmit(token ? onResetPassword : onRequestReset)}
                        disabled={buttonDisabled || loading}
                    >
                        {loading ? "Enviando..." : token ? "Restablecer contraseña" : "Enviar"}
                    </button>
                    <div className="w-full flex justify-center items-center">
                        <p>
                            ¿No tienes una cuenta?
                            <Link href="/signup" className="underline"> Únete</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
