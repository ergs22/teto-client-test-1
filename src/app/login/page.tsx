"use client";
import LogShort from "@/components/LogShort";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useForm } from 'react-hook-form';
import useUserDetails from "@/hooks/useUserDetails";

export default function Page() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const onLogin = async (data: any) => {
        try {
            setLoading(true);
            await axios.post("/api/users/login", data);
            toast.success("Inicio exitoso");
            router.push("/chat");
        } catch (error: any) {
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const handleEnter = async (e: any) => {
        if (e.key === 'Enter') {
            await handleSubmit(onLogin)();
        }
    }

    return (
        <section className="min-h-screen bg-hero-pattern bg-size-hero bg-position-hero p-5% pt-4 pb-8">
            <div className="w-full flex justify-between items-center">
                <Link href="/"><Image alt="logo" height={150} width={150} src="/images/logo-1.png" /></Link>
            </div>
            <div className="bg-hero w-[85vw] sm:w-[70vw] lg:w-[40vw] px-2 sm:px-8 lg:px-8 py-8 min-h-[80vh] mx-auto mt-4 flex flex-col items-center justify-around text-center">
                <h1 className="text-4xl md:text-5xl font-medium mb-8">Inicia sesión</h1>
                <p>Inicia sesión y comienza a utilizar Tetobot</p>
                <div className="flex flex-col w-full">
                    <input
                        {...register("email", { required: true })}
                        placeholder="Correo electronico"
                        className="inputA"
                        type="text"
                        onKeyDown={handleEnter}
                    />
                    {errors.email && <span className="text-red-600 text-left">Este campo es obligatorio</span>}

                    <input
                        {...register("password", { required: true })}
                        placeholder="Contraseña"
                        className="inputA"
                        type="password"
                        onKeyDown={handleEnter}
                    />
                    {errors.password && <span className="text-red-600 text-left">Este campo es obligatorio</span>}

                    <button type="submit" className="buttonB2 my-6" onClick={handleSubmit(onLogin)}>Iniciar sesión</button>
                    <div className="w-full flex justify-center items-center">
                        <p>¿No tienes una cuenta?<Link href="/signup" className="underline"> Únete</Link></p>
                    </div>
                    <div className="w-full flex justify-center items-center mt-4">
                        <Link href="/reset-password" className="underline">¿Olvidaste tu contraseña?</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
