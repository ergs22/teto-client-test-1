'use client'
import Image from 'next/image'
import { ModalContext } from '@/context/ModalContext'
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MessagesContext } from '@/context/MessagesContext';
import useChat from '@/hooks/useChat';
import { currentDate } from '@/helpers/Dates';

const ModalChat = ({ messages, UserDetails }: any) => {

    const { fetchChatHistory } = useChat(UserDetails);
    const { sortedChat, updateSortedChat, addMessageOld } = useContext(MessagesContext);

    const { activeModal, closeModal } = useContext(ModalContext);

    const showModal = {
        display: activeModal === "chat" ? "flex" : "none", // Mostrar solo si el modal activo es "share"
    };

    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("Salida efectuada")
            router.push("/login")
        } catch (error: any) {
            toast.error(error.message)
        }

    }

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
        <div className="w-[100vw] h-dvh bg-[#fafafa80] items-start flex flex-col fixed z-50" style={showModal}
        >
            <nav className="bg-hero h-screen py-3 px-3 w-72 flex flex-col border-r border-gray-500 border-opacity-15 shadow-lg">
                {/* Parte Superior */}
                <div className="flex items-center justify-between w-full mb-8">
                    <div className='flex items-center py-2'>
                        <div className="bg-[#87CEEB] rounded-full overflow-hidden">
                            <Image src="/images/profile-picture-user-m.png" alt="profile-picture" width={40} height={40} />
                        </div>
                        <p className="text-green-3 ml-2 max-[50%] text-sm">{UserDetails === undefined ? "User" : UserDetails?.username}</p>
                    </div>
                    <div className='flex justify-center items-center' onClick={closeModal}>
                        <Image className='cursor-pointer' width={20} height={20} src="/icons/close-2.png" alt="close" />
                    </div>
                </div>

                {/* Parte Media */}
                <div className="overflow-y-auto custom-scrollbar flex-grow h-[70%] w-full flex flex-col items-start justify-start">
                    {sortedChat && (
                        <>
                            {/* Hoy */}
                            {sortedChat.today && sortedChat.today.messages.length > 0 && (
                                <div className="mb-6 overflow-hidden w-full text-green-3">
                                    <h2 className='text-xs font-semibold'>Hoy</h2>
                                    <p onClick={() => handleCliChat(sortedChat.today)} className="cursor-pointer text-xs whitespace-nowrap p-2 rounded-md hover:bg-green-3 hover:text-green-b">
                                        {getLastMessage(sortedChat.today.messages)}
                                    </p>
                                </div>
                            )}

                            {/* Ayer */}
                            {sortedChat.yesterday && sortedChat.yesterday.messages.length > 0 && (
                                <div className="mb-6 overflow-hidden w-full text-green-3">
                                    <h2 className='text-xs font-semibold'>Ayer</h2>
                                    <p onClick={() => handleCliChat(sortedChat.yesterday)} className="cursor-pointer text-sm whitespace-nowrap py-2 px-2 rounded-md hover:bg-green-3 hover:text-green-b">
                                        {getLastMessage(sortedChat.yesterday.messages)}
                                    </p>
                                </div>
                            )}

                            {/* Últimos 7 días */}
                            {sortedChat.last7Days && sortedChat.last7Days.messages.length > 0 && (
                                <div className="mb-6 overflow-hidden w-full text-green-3">
                                    <h2 className='text-xs font-semibold'>Últimos 7 días</h2>
                                    <p onClick={() => handleCliChat(sortedChat.last7Days)} className="cursor-pointer text-sm whitespace-nowrap py-2 px-2 rounded-md hover:bg-green-3 hover:text-green-b">
                                        {getLastMessage(sortedChat.last7Days.messages)}
                                    </p>
                                </div>
                            )}

                            {/* Últimos 30 días */}
                            {sortedChat.last30Days && sortedChat.last30Days.messages.length > 0 && (
                                <div className="mb-6 overflow-hidden w-full text-green-3">
                                    <h2 className='text-xs font-semibold'>Últimos 30 días</h2>
                                    <p onClick={() => handleCliChat(sortedChat.last30Days)} className="cursor-pointer text-sm whitespace-nowrap py-2 px-2 rounded-md hover:bg-green-3 hover:text-green-b">
                                        {getLastMessage(sortedChat.last30Days.messages)}
                                    </p>
                                </div>
                            )}

                            {/* Más antiguos */}
                            {sortedChat.older && sortedChat.older.messages.length > 0 && (
                                <div className="mb-6 overflow-hidden w-full text-green-3">
                                    <h2 className='text-xs font-semibold'>Antiguos</h2>
                                    <p onClick={() => handleCliChat(sortedChat.older)} className="cursor-pointer text-sm whitespace-nowrap py-2 px-2 rounded-md hover:bg-green-3 hover:text-green-b">
                                        {getLastMessage(sortedChat.older.messages)}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Parte Inferior */}
                <div className="flex items-center justify-start w-full p-2 mt-auto">
                    <div onClick={logout} className="cursor-pointer">
                        <Image src="/icons/logout.png" alt="logout" width={30} height={30} />
                    </div>
                    <p onClick={logout} className="ml-2 cursor-pointer text-green-3 text-sm">Salir</p>
                </div>
            </nav>
        </div >
    )

}

export default ModalChat