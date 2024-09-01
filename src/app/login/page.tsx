"use client";

import LogShort from "@/components/LogShort"
import Link from "next/link"
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useForm } from 'react-hook-form';

export default function Page() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/userdata')
        if (!res.data.data.isVerified) {
            router.push("/verifyemail")
        } else if (res.data.data.isVerified) {
            router.push("/chat")
        }
    }

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user)
            toast.success("Login sucess");
            getUserDetails();
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
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])
    return (<section className="min-h-screen bg-hero-pattern bg-size-hero bg-position-hero p-5% pt-4 pb-8">
        <div className="w-full flex justify-between items-center"> <Link href="/"><Image alt="logo" height={150} width={150} src="/images/logo-1.png" /></Link></div>
        <div className="bg-hero w-[85vw] sm:w-[70vw] lg:w-[40vw] px-2 sm:px-8 lg:px-8 py-8 min-h-[80vh] mx-auto mt-4 flex flex-col items-center justify-around text-center">
            <h1 className=" text-4xl md:text-5xl font-medium mb-8">Inicia sesión</h1>
            <p>Inicia sesión y comienza a utilizar Tetobot
            </p>
            <div className=" flex flex-col w-full">
                <input {...register("email", {
                    required: true,
                })} placeholder="Correo electronico" className="inputA" type="text" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                {errors.email && <span className=" text-red-600 text-left ">Este campo es obligatorio</span>}
                <input {...register("password", {
                    required: true,
                })} placeholder="Contraseña" className="inputA" type="password" name="password" value={user.password} onKeyDown={(e) => handleEnter(e)} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                {errors.password && <span className=" text-red-600 text-left ">Este campo es obligatorio</span>}
                <button type="submit" className="buttonB2 my-6" onClick={handleSubmit(onLogin)} >Inicia sesión</button>
                <div className="w-full flex justify-center items-center"> <p>¿No tienes una cuenta?<Link href="/signup" className=" underline"> Únete</Link></p>             </div>

            </div>
            {/* <div className="flex flex-col w-full">
                <LogShort text="Iniciar sesion con Google" url="#" img="google.png" />
                <LogShort text="Iniciar sesion con Facebook" url="#" img="Facebook.png" />
            </div> */}


            <Link href="/reset-password">
                <p className="mt-4 underline text-black-3">¿Olvidaste tu contraseña?</p>
            </Link>

        </div>
    </section >)
}