"use client";
import Image from "next/image";
import { useContext, useCallback } from "react";
import { ThreeCircles } from 'react-loader-spinner';
import SidebarChat from "@/components/SidebarChat";
import BotChat from "@/components/BotChat";
import UserChat from "@/components/UserChat";
import ModalChat from "@/components/ModalChat";
import { ModalContext } from "@/context/ModalContext";
import { useRouter } from "next/navigation";
import useChat from "@/hooks/useChat";
import useUserDetails from "@/hooks/useUserDetails";

export default function Page() {
    const { openModal } = useContext(ModalContext);
    const router = useRouter();
    const userData = useUserDetails(router);
    const { messages, input, setInput, sendMessage, loader, chatRef } = useChat(userData);

    // Manejar el evento de presionar "Enter"
    const handleEnter = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevenir salto de línea
            sendMessage();
        }
    }, [sendMessage]);

    const styles = {
        backgroundColor: loader ? '#d0cfcf' : '#F4F4F4',
    };

    return (
        <section className="flex w-screen h-screen">
            <ModalChat />
            <SidebarChat />
            <main className="w-[100vw] md:w-[80vw] h-screen flex flex-col justify-between">
                <div className="h-[5%] flex justify-between pr-8 pl-4 py-10 items-center md:pr-10 md:pl-10">
                    <div onClick={openModal} className="cursor-pointer md:hidden block hover:bg-gray-200 p-2 hover:rounded-full">
                        <Image src="/icons/barra-de-menus.png" alt="nav-hamb" height={32} width={32} />
                    </div>
                    <h1 className="text-lg font-medium">Tetobot</h1>
                    <button>
                        <Image width={24} height={24} alt="share" src="/icons/share.png" />
                    </button>
                </div>
                <div ref={chatRef} className="h-[69%] overflow-y-scroll flex flex-col justify-start items-center">
                    {messages.map((msg, index) => (
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
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Envia un mensaje a Tetobot"
                        className="resize-none pl-6 place-content-center outline-none h-[50%] md:h-[63%] rounded-full w-[90%] md:w-[85%] lg:w-[75%] overflow-y-hidden pr-12"
                    />
                    <button disabled={loader} onClick={sendMessage} type="submit" className="absolute z-20 right-[8.5%] md:right-[10%] lg:right-[15%]">
                        {loader ? (
                            <ThreeCircles visible={true} height="25" width="25" color="#F7F7F7" ariaLabel="three-circles-loading" />
                        ) : (
                            <Image width={20} height={20} alt="submit" src="/icons/message.png" />
                        )}
                    </button>
                </div>
            </main>
        </section>
    );
}
