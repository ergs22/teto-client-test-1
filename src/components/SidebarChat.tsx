import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import useChat from "@/hooks/useChat";
import { MessagesContext } from "@/context/MessagesContext";
import { currentDate } from "@/helpers/Dates";

const SidebarChat = ({ messages, UserDetails }: any) => {

    const { fetchChatHistory } = useChat(UserDetails);
    const { sortedChat, updateSortedChat, addMessageOld } = useContext(MessagesContext);

    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Salida efectuada");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleCliChat = async (data: any) => {
        data.date !== currentDate ?
            addMessageOld(data.messages) : addMessageOld([])
    };

    // Helper para obtener el último mensaje
    const getLastMessage = (data: any) => {
        const lastMessage = data[data.length - 1];
        return lastMessage ? lastMessage.message : null;
    };


    useEffect(() => {
        fetchChatHistory();
    }, [UserDetails._id]);

    useEffect(() => {
        updateSortedChat(messages)
    }, [messages]);

    return (
        <div className="h-screen md:flex flex-col justify-between items-end z-30 hidden bg-hero-1 w-[45vw] md:w-[40vw] lg:w-[25vw] py-4 px-6">
            <div className="flex items-center justify-end w-full h-[10%] ">
                <p className="text-green-3 mr-2 max-[50%]">{UserDetails.username || "User"}</p>
                <div className="bg-[#87CEEB] rounded-full overflow-hidden">
                    <Image src="/images/profile-picture-user-m.png" alt="profile-picture" width={40} height={40} />
                </div>

            </div>

            <div className="overflow-y-auto custom-scrollbar h-[70%] w-full flex flex-col items-start justify-start">
                {sortedChat && (
                    <>
                        {/* Hoy */}
                        {sortedChat.today && sortedChat.today.messages.length > 0 && (
                            <div className="mb-6 overflow-hidden w-full text-green-3 ">
                                <h2>Hoy</h2>
                                <p onClick={() => handleCliChat(sortedChat.today)} className="cursor-pointer text-sm whitespace-nowrap py-2 px-2 rounded-md hover:bg-green-3 hover:text-green-b">
                                    {getLastMessage(sortedChat.today.messages)}
                                </p>
                            </div>
                        )}

                        {/* Ayer */}
                        {sortedChat.yesterday && sortedChat.yesterday.messages.length > 0 && (
                            <div className="mb-6 overflow-hidden w-full text-green-3 ">
                                <h2>Ayer</h2>
                                <p onClick={() => handleCliChat(sortedChat.yesterday)} className="cursor-pointer text-sm whitespace-nowrap py-2 px-2 rounded-md hover:bg-green-3 hover:text-green-b">
                                    {getLastMessage(sortedChat.yesterday.messages)}
                                </p>
                            </div>
                        )}

                        {/* Últimos 7 días */}
                        {sortedChat.last7Days && sortedChat.last7Days.messages.length > 0 && (
                            <div className="mb-6 overflow-hidden w-full text-green-3 ">
                                <h2>Últimos 7 días</h2>
                                <p onClick={() => handleCliChat(sortedChat.last7Days)} className="cursor-pointer text-sm whitespace-nowrap py-2 px-2 rounded-md hover:bg-green-3 hover:text-green-b">
                                    {getLastMessage(sortedChat.last7Days.messages)}
                                </p>
                            </div>
                        )}

                        {/* Últimos 30 días */}
                        {sortedChat.last30Days && sortedChat.last30Days.messages.length > 0 && (
                            <div className="mb-6 overflow-hidden w-full text-green-3 ">
                                <h2>Últimos 30 días</h2>
                                <p onClick={() => handleCliChat(sortedChat.last30Days)} className="cursor-pointer text-sm whitespace-nowrap  py-2 px-2 rounded-md hover:bg-green-3 hover:text-green-b">
                                    {getLastMessage(sortedChat.last30Days.messages)}
                                </p>
                            </div>
                        )}

                        {/* Más antiguos */}
                        {sortedChat.older && sortedChat.older.messages.length > 0 && (
                            <div className="mb-6 overflow-hidden w-full text-green-3 ">
                                <h2>Antiguos</h2>
                                <p onClick={() => handleCliChat(sortedChat.older)} className="cursor-pointer text-sm whitespace-nowrap py-2 px-2 rounded-md hover:bg-green-3 hover:text-green-b">
                                    {getLastMessage(sortedChat.older.messages)}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="flex items-center justify-start h-[10%] w-full ">
                <div onClick={logout} className="cursor-pointer">
                    <Image src="/icons/logout.png" alt="logout" width={30} height={30} />
                </div>
                <p onClick={logout} className="ml-2 cursor-pointer text-green-3">Salir</p>
            </div>
        </div>
    );
};

export default SidebarChat;
