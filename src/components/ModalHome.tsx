'use client'
import Image from 'next/image'
import { ModalContext } from '@/context/ModalContext'
import { useContext } from 'react';
import ButtonStand from './ButtonStand';

const ModalHome = () => {

    const { activeModal, closeModal } = useContext(ModalContext);

    const showModal = activeModal === "home";


    return (
        <section className={`w-screen z-50 h-dvh bg-[#F4F8FB] flex flex-col fixed top-16 pt-2 transition-transform duration-700 ease-in-out ${showModal ? 'translate-y-0' : '-translate-y-[110%]'}`}>
            <div className='flex flex-col font-medium text-lg w-full'  >
                <a href="#about-us" className=" text-black-2 py-4 px-4 hover:bg-green-3 ">Sobre teto</a>
                <a href="#case-use" className=" text-black-2 py-4  px-4 hover:bg-green-3">Cómo puede ayudarte</a>
                <a href="#experience" className=" text-black-2 py-4 px-4 hover:bg-green-3">Testimonios</a>
                <a href="#FQAs" className=" text-black-2 py-4 px-4 hover:bg-green-3">FQAs</a>
            </div>
            <div className=' flex flex-col px-4 mt-8'>
                <ButtonStand url="login" styl="buttonA w-full h-[3.2rem]" text="Registrarse" />
                <ButtonStand url="signup" styl="buttonBM w-full h-[3.2rem]" text="Iniciar sesion" />
            </div>
        </section>

    )
}

export default ModalHome