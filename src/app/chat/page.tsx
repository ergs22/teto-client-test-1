"use client"
import Image from "next/image"
import BotChat from "@/components/BotChat"
import UserChat from "@/components/UserChat"
import axios from "axios"
import { useContext, useEffect, useState, useRef } from "react"
import { Message } from "@/types/types"
import { ThreeCircles } from 'react-loader-spinner'
import SidebarChat from "@/components/SidebarChat"
import { ModalContext } from "@/context/ModalContext"
import ModalChat from "@/components/ModalChat"

export default function Page() {
    const { openModal } = useContext(ModalContext)
    const [data, setData] = useState({
        _id: "",
        username: "",
        fullname: "",
        age: "",
    });
    const chatRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [loader, setLoader] = useState(false);

    const sendMessage = async () => {
        setLoader(true);
        const userMessage: Message = { sender: data.fullname, message: input, timestamp: new Date().toISOString() };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');

        try {
            const response = await axios.post<{ text: string }[]>(process.env.RASA_URL!, {
                sender: data.fullname,  // Puedes usar un identificador único para el usuario
                message: input,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const botMessages: Message[] = response.data.map((msg) => ({ sender: 'bot', message: msg.text, timestamp: new Date().toISOString() }));
            setMessages((prevMessages) => [...prevMessages, ...botMessages]);

            // Prepare the data to be sent to the API
            const chatData = {
                userId: data._id,  // assuming you get userId from getUserDetails
                messages: [...messages, userMessage, ...botMessages],
            };
            // Send data to the API
            try {
                await axios.post('/api/users/chatadd', chatData);

            } catch (error) {
                console.error("Error saving chat:", error);
            }

        } catch (error) {
            console.error('Error enviando mensaje:', error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        getUserDetails()
    }, [])

    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            setInput('');
            sendMessage()
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/userdata')
        setData((prevData) => res.data.data);
    }

    var styles = {
        backgroundColor: loader ? '#d0cfcf' : '#F4F4F4',

    }

    // Efecto para ajustar el scroll cada vez que cambien los mensajes
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]); // Se ejecuta cada vez que 'messages' cambie


    return (
        <section className=" flex w-screen h-screen ">
            <ModalChat />
            <SidebarChat />
            <main className=" w-[100vw] md:w-[80vw] h-screen flex flex-col justify-between">
                <div className="h-[5%] flex justify-between pr-8 pl-4 py-10 items-center md:pr-10 md:pl-10">
                    <div onClick={openModal} className=" cursor-pointer md:hidden block hover:bg-gray-200 p-2 hover:rounded-full"> <Image src="/icons/barra-de-menus.png" alt="nav-hamb" height={32} width={32} /></div>
                    <h1 className=" text-lg font-medium">Tetobot</h1>
                    <button>
                        <Image width={24} height={24} alt="share" src="/icons/share.png" />
                    </button>
                </div>
                <div ref={chatRef} className="h-[69%] overflow-y-scroll flex flex-col justify-start items-center">
                    {messages.map((msg, index) => (
                        msg.sender === data.fullname ? <UserChat key={index} respon={msg.message} />
                            : <BotChat key={index} respon={msg.message} />
                    ))}
                </div>

                <div className="h-[15%] flex items-center justify-center relative">
                    <textarea style={styles} name="talk" disabled={loader} value={input} onKeyDown={(e) => handleEnter(e)} onChange={(e) => setInput(e.target.value)} placeholder="Envia un mensaje a Tetobot" className="resize-none pl-6 place-content-center outline-none h-[50%] md:h-[63%] rounded-full w-[90%] md:w-[85%] lg:w-[75%] overflow-y-hidden pr-12 " />
                    <button disabled={loader} onClick={sendMessage} type="submit" className=" absolute z-20 right-[8.5%] md:right-[10%] lg:right-[15%] ">
                        {
                            loader ? (
                                <ThreeCircles
                                    visible={true}
                                    height="25"
                                    width="25"
                                    color="#F7F7F7"
                                    ariaLabel="three-circles-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            ) : (
                                <Image width={20} height={20} alt="submit" src="/icons/message.png" />
                            )
                        }
                    </button>
                </div>
            </main>
        </section>
    )
}
