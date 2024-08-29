"use client";

import ButtonStand from "./ButtonStand"
import Image from "next/image"
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
const NavBar = () => {

    var { openModal } = useContext(ModalContext)

    return (
        <nav className="bg-white text-base min-h-16 px-[5%] flex py-2  justify-between items-center">
            <div className="flex items-center w-36 h-12 "> <Image src="/images/logo-1.png" alt="logo" height={250} width={250} /></div>
            <div className=" cursor-pointer md:hidden block" onClick={openModal}> <Image src="/icons/barra-de-menus.png" alt="logo" height={35} width={35} /></div>
            <div className="items-center hidden md:flex">
                <a href="#about-us" className=" text-black-2 px-4 hover:text-green-3">Sobre teto</a>
                <a href="#case-use" className=" text-black-2  px-4 hover:text-green-3">Casos de uso</a>
                <a href="#experience" className=" text-black-2  px-4 hover:text-green-3">Experiencia</a>
                <a href="#FQAs" className=" text-black-2 px-4 hover:text-green-3 ">FQAs</a>
            </div>
            <div className="items-center w-64 justify-between hidden md:flex ">
                <ButtonStand url="signup" text="Registrarse" styl="buttonA" />
                <ButtonStand url="login" text="Iniciar sesion" styl="buttonB" />
            </div>
        </nav>
    )
}

export default NavBar