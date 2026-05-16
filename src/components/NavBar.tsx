"use client";

import ButtonStand from "./ButtonStand"
import Image from "next/image"
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
const NavBar = () => {

    var { openModal, activeModal, closeModal } = useContext(ModalContext)
    // Función para alternar el modal
    const toggleModal = () => {
        if (activeModal === "home") {
            closeModal(); // Cierra el modal si está abierto
        } else {
            openModal("home"); // Abre el modal con "home"
        }
    };
    return (
        <nav className={`bg-white text-base min-h-16 z-50 px-[5%] flex py-2 justify-between items-center ${activeModal === "home" ? "fixed w-screen" : "relative"}`}>
            <div className="flex items-center w-36 h-12 ">
                <Image src="/images/logo-1.png" alt="logo" height={250} width={250} />
            </div>
            <div className=" cursor-pointer lg:hidden block" onClick={toggleModal}> <Image src="/icons/barra-de-menus.png" alt="logo" height={35} width={35} /></div>
            <div className="items-center hidden lg:flex ">
                <a href="#about-us" className=" text-black-2 px-4 hover:text-green-3">Sobre teto</a>
                <a href="#case-use" className=" text-black-2  px-4 hover:text-green-3">Cómo puede ayudarte</a>
                <a href="#experience" className=" text-black-2  px-4 hover:text-green-3">Testimonios</a>
                <a href="#FQAs" className=" text-black-2 px-4 hover:text-green-3 ">FAQs</a>
            </div>
            <div className="items-center w-64 justify-between hidden lg:flex ">
                <ButtonStand url="signup" text="Registrarse" styl="buttonA" />
                <ButtonStand url="login" text="Iniciar sesion" styl="buttonB" />
            </div>
        </nav>
    )
}

export default NavBar