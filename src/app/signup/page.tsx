"use client";

import LogShort from "@/components/LogShort"
import Link from "next/link"
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useForm } from 'react-hook-form';
import { ThreeCircles } from "react-loader-spinner";

export default function Page() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
        fullname: "",
        age: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            await axios.post("/api/users/signup", user);
            router.push("/login");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Ahora puedes acceder a las propiedades de AxiosError
                error.response ? toast.error(error.response.data.error) : toast.error("Ocurrió un error inesperado");
            } else {
                // Manejo de otros tipos de errores
                toast.error("Ocurrió un error inesperado");
            }
        } finally {
            setLoading(false);
        }
    }
    const handleEnter = async (e: any) => {
        if (e.key === 'Enter') {
            await handleSubmit(onSignup)();
        }
    }
    useEffect(
        () => {
            if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
            }
        }, [user]
    )

    return (<section className="min-h-screen bg-hero-pattern bg-size-hero bg-position-hero p-5% pt-4 pb-8">
        <div className="w-full h-[10vh] flex justify-between items-center "> <Link href="/"><Image alt="logo" height={150} width={150} src="/images/logo-1.png" /></Link></div>
        <div className="min-h-[80vh] flex justify-center items-center mt-6">
            <div className="rounded-lg-exten bg-hero-1 w-[85vw] sm:w-[70vw] lg:w-[40vw] h-[40rem] px-2 sm:px-8 lg:px-8 py-8 flex flex-col items-center text-center justify-around">
                <h1 className=" text-5xl leading-6 font-medium mb-8">Únete</h1>
                <p >Únete a cientos de usuarios que han encontrado apoyo y alivio con Tetobot</p>
                <div className=" flex flex-col w-full">
                    <input {...register("username", {
                        required: true,
                        maxLength: 10,
                        pattern: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/
                    })} value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder="Usuario" className="inputA" type="text" name="username" />
                    {errors.username && (
                        <span className="text-red-600 text-left">
                            {errors.username.type === 'required' && 'Este campo es obligatorio'}
                            {errors.username.type === 'maxLength' && 'Máximo 10 caracteres'}
                            {errors.username.type === 'pattern' && 'No se permiten numeros'}
                        </span>
                    )}
                    <input {...register("fullname", {
                        required: true,
                        maxLength: 40,
                        pattern: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/
                    })} value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })} placeholder="Nombre completo" className="inputA" type="text" name="fullname" />
                    {errors.fullname && (
                        <span className="text-red-600 text-left">
                            {errors.fullname?.type === 'required' && 'Este campo es obligatorio'}
                            {errors.fullname?.type === 'pattern' && 'No se permiten numeros'}
                        </span>
                    )}


                    <input {...register("age", {
                        required: true,
                        pattern: /^(?:1[2-9]|[2-9]\d|\d{3,})$/
                    })} placeholder="Edad" className="inputA" type="text" name="age" value={user.age} onChange={(e) => setUser({ ...user, age: e.target.value })} />
                    {errors.age && (
                        <span className="text-red-600 text-left">
                            {errors.age.type === 'required' && 'Este campo es obligatorio'}
                            {errors.age.type === 'pattern' && 'Debe ser mayor de 11 años'}
                        </span>
                    )}
                    <input {...register("email", {
                        required: true,
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
                    })} placeholder="Correo electronico" className="inputA" type="text" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    {errors.email && (
                        <span className="text-red-600 text-left">
                            {errors.email.type === 'required' && 'Este campo es obligatorio'}
                            {errors.email.type === 'pattern' && 'Ingrese un correo electronico valido'}
                        </span>
                    )}

                    <input onKeyDown={(e) => handleEnter(e)} {...register("password", {
                        required: true,
                        minLength: 8,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
                    })} placeholder="Contraseña" className="inputA" type="password" name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    {errors.password && (
                        <span className="text-red-600 text-left">
                            {errors.password?.type === 'required' && 'Este campo es obligatorio'}
                            {errors.password?.type === 'pattern' && 'La contraseña debe tener mayúsculas, minúsculas, números y un carácter especial (@$!%*?&#)'}
                            {errors.password?.type === 'minLength' && 'La contraseña debe tener minimo 8 caracteres'}

                        </span>
                    )}
                    <button type="submit" className="buttonB2 my-6 flex justify-center items-center" onClick={handleSubmit(onSignup)}>    {loading ? (
                        <ThreeCircles visible={true} height="25" width="25" color="#F7F7F7" ariaLabel="three-circles-loading" />
                    ) : "Únete"}</button>
                    <div className="w-full flex justify-center items-center"><p>¿Ya tienes una cuenta? <Link href="/login" className=" underline"> Inicia sesión
                    </Link></p></div>
                </div>
                {/* <div className="flex flex-col w-full">
                    <LogShort text="Registrate con Google" url="#" img="google.png" />
                    <LogShort text="Registrate con Facebook" url="#" img="Facebook.png" />

                </div> */}
            </div>

        </div>
    </section >)
}