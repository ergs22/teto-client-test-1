'use client'
import Image from 'next/image'
import { ModalContext } from '@/context/ModalContext'
import { useContext } from 'react';

const ModalHome = () => {

    const { activeModal, closeModal } = useContext(ModalContext);

    const showModal = {
        display: activeModal === "home" ? "flex" : "none", // Mostrar solo si el modal activo es "share"
    };

    return (
        <section className="w-[70vw] z-50 h-screen bg-white flex justify-around pt-8 fixed" style={showModal}>
            <div className='flex flex-col'  >
                <a href="/login" className=" text-black-2 pb-4 hover:bg-green-3 ">Iniciar Sesion</a>
                <a href="/signup" className=" text-black-2 py-4 hover:bg-green-3">Registrarse</a>
                <a href="#about-us" className=" text-black-2 py-4 hover:bg-green-3 ">Sobre teto</a>
                <a href="#case-use" className=" text-black-2 py-4  hover:bg-green-3">Cómo puede ayudarte</a>
                <a href="#experience" className=" text-black-2 py-4  hover:bg-green-3">Testimonios</a>
                <a href="#FQAs" className=" text-black-2 py-4  hover:bg-green-3">FQAs</a>
            </div>

            <div onClick={closeModal} >
                <Image className='cursor-pointer' width={20} height={20} src="/icons/close.png" alt="close" />
            </div>

        </section>

    )
}

export default ModalHome