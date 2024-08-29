'use client'
import Image from 'next/image'
import { ModalContext } from '@/context/ModalContext'
import { useContext } from 'react';
import ButtonStand from './ButtonStand';

const ModalHome = () => {

    const { isOpen, closeModal } = useContext(ModalContext);

    const showModal = {
        display: isOpen ? 'flex' : 'none', // Condicional para mostrar u ocultar
    };
    return (
        <section className="w-[70vw] h-screen bg-white flex flex-col fixed" style={showModal}>
            <div className='w-full flex justify-end pr-4 py-4' onClick={closeModal} >
                <Image className='cursor-pointer' width={20} height={20} src="/icons/close.png" alt="close" />
            </div>
            <a href="/login" className=" text-black-2 py-4 hover:bg-green-3 px-4">Iniciar Sesion</a>
            <a href="/signup" className=" text-black-2 py-4 px-4 hover:bg-green-3">Registrarse</a>
            <a href="#about-us" className=" text-black-2 py-4 hover:bg-green-3 px-4">Sobre teto</a>
            <a href="#case-use" className=" text-black-2 py-4 px-4 hover:bg-green-3">Casos de uso</a>
            <a href="#experience" className=" text-black-2 py-4 px-4 hover:bg-green-3">Experiencia</a>
            <a href="#FQAs" className=" text-black-2 py-4 px-4 hover:bg-green-3">FQAs</a>
        </section>

    )
}

export default ModalHome