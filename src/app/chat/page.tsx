"use client";
import Image from "next/image";
import { useContext, useCallback, useEffect, useState, useRef } from "react";
import { ThreeCircles } from 'react-loader-spinner';
import SidebarChat from "@/components/SidebarChat";
import BotChat from "@/components/BotChat";
import UserChat from "@/components/UserChat";
import ModalChat from "@/components/ModalChat";
import { ModalContext } from "@/context/ModalContext";
import { useRouter } from "next/navigation";
import useChat from "@/hooks/useChat";
import useUserDetails from "@/hooks/useUserDetails";
import ModalShare from "@/components/ModalShare";
import { MessagesContext } from "@/context/MessagesContext";

export default function Page() {

    const { openModal } = useContext(ModalContext);
    const router = useRouter();
    const userData = useUserDetails(router);
    const { sendMessage, input, addInput, loader } = useChat(userData);
    const chatRef = useRef<HTMLDivElement>(null);
    const { messages, messagesOld } = useContext(MessagesContext);
    const [messagesToDisplay, setMessagesToDisplay] = useState(messages);
    const [isMobile, setIsMobile] = useState(false);

    const styles = {
        backgroundColor: loader ? '#d0cfcf' : '#f0f0f0',
    };

    // Manejar el evento de presionar "Enter"
    const handleEnter = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    }, [input]);

    const handleValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        addInput(e.target.value)
    };

    // Función para mantener el scroll al final
    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };
    // Mantener el scroll al final cuando los mensajes cambian
    useEffect(() => {
        scrollToBottom();
    }, [messagesToDisplay]);


    useEffect(() => {
        if (messagesOld.length === 0) {
            setMessagesToDisplay(messages)
        } else {
            setMessagesToDisplay(messagesOld)
        }
    }, [messages, messagesOld]);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };

        // Escuchar cambios de tamaño de la pantalla
        window.addEventListener("resize", handleResize);

        // Establecer el tamaño inicial de la pantalla
        handleResize();

        // Limpieza del evento al desmontar el componente
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="flex w-screen h-screen">
            <ModalShare />
            {/* Renderizar solo uno de los dos componentes según el tamaño de pantalla */}
            {isMobile ? (
                <ModalChat messages={messages} UserDetails={userData} />
            ) : (
                <SidebarChat messages={messages} UserDetails={userData} />
            )}
            <main className="w-[100vw] md:w-[80vw] h-screen flex flex-col justify-between">
                <div className="h-[5%] flex justify-between pr-8 pl-4 py-10 items-center md:pr-10 md:pl-10">
                    <div onClick={() => openModal("chat")} className="cursor-pointer md:hidden block hover:bg-gray-200 p-2 hover:rounded-full">
                        <Image src="/icons/barra-de-menus-2.png" alt="nav-hamb" height={32} width={32} />
                    </div>
                    <h1 className="text-lg text-[#5D5D5D]">Tetobot</h1>
                    <button onClick={() => openModal("share")}>
                        <Image width={24} height={24} alt="share" src="/icons/share.png" />
                    </button>
                </div>
                <div ref={chatRef} className="h-[69%] overflow-y-scroll flex flex-col justify-start items-center">
                    {messagesToDisplay.map((msg, index) => (
                        msg.sender === userData.fullname
                            ? <UserChat key={index} respon={msg.message} />
                            : <BotChat key={index} respon={msg.message} />
                    ))}
                </div>
                <div className="h-[15%] flex items-center justify-center relative">
                    <textarea
                        style={styles}
                        name="talk"
                        disabled={loader}
                        value={input}
                        onKeyDown={handleEnter}
                        onChange={handleValue}
                        placeholder="Envia un mensaje a Tetobot"
                        className="bg-gray-200 resize-none placeholder:text-[#5D5D5D] placeholder:font-normal placeholder:text-sm pl-6 place-content-center text-sm font-normal outline-none h-[50%] md:h-[63%] rounded-full w-[90%] md:w-[85%] lg:w-[75%] overflow-y-hidden pr-12"
                    />
                    <button disabled={loader || input.trim() === ''} onClick={sendMessage} type="submit" className="absolute z-20 right-[8.5%] md:right-[10%] lg:right-[15%]">
                        {loader ? (
                            <ThreeCircles visible={true} height="25" width="25" color="#F7F7F7" ariaLabel="three-circles-loading" />
                        ) : (
                            <Image width={20} height={20} alt="submit" src={input.trim() === '' ? "/icons/message.png" : "/icons/message-2.png"} />
                        )}
                    </button>
                </div>
            </main>
        </section>
    );
}
