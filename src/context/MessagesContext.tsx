"use client";

import { currentDate, sevenDaysAgoStr, thirtyDaysAgoStr, yesterdayStr } from "@/helpers/Dates";
import generateObjectId from "@/helpers/Generateid";
import { getUniqueMessagesFromCombinedArrays } from "@/helpers/removeDuplicateChats";
import organizeMessagesByDate from "@/helpers/sortDataChat";
import sortDataChats from "@/helpers/sortDataChats";
import { CategorizedChats, Chat, ChatMessage } from "@/types/types";
import React, { createContext, useState } from "react";

// Definir el tipo de contexto para los mensajes
type MessagesContextType = {
    chat: Chat; // Chat
    sortedChat: CategorizedChats; // mensajes organizados
    messages: ChatMessage[]; // mensajes del usuario y bot
    messagesOld: ChatMessage[];
    newMessage: ChatMessage; // mensaje del usuario o bot
    addNewMessage: (message: ChatMessage) => void; //rellenar con los datos del mensaje del usuario
    addMessage: (message: any) => void;
    addSortedChat: (chats: Chat[]) => void;
    addMessageOld: (message: ChatMessage[]) => void;
    updateSortedChat: (message: any) => void;
};

// Valor inicial del contexto 
const initialMessagesContext: MessagesContextType = {
    chat: {
        date: currentDate,
        messages: [],
        userId: '',
    },
    messagesOld: [],
    sortedChat: {
        today: { date: currentDate, messages: [], userId: '' },
        yesterday: { date: yesterdayStr, messages: [], userId: '' },
        last7Days: { date: sevenDaysAgoStr, messages: [], userId: '' },
        last30Days: { date: thirtyDaysAgoStr, messages: [], userId: '' },
        older: { date: "", messages: [], userId: '' },
    },
    messages: [],
    newMessage: { sender: '', message: '', timestamp: new Date().toISOString() },
    addNewMessage: () => { }, // Implementar función para establecer el nuevo mensaje
    addMessage: () => { }, // Implementar función para agregar un mensaje
    addSortedChat: () => { }, // Implementar función para agregar un chat categorizado
    addMessageOld: () => { }, // Implementar función para agregar un chat categorizado
    updateSortedChat: () => { },
};
// Crear el contexto
export const MessagesContext = createContext<MessagesContextType>(initialMessagesContext);

type MessagesProviderProps = {
    children: React.ReactNode;
};

// Proveedor del contexto
export function MessagesProvider({ children }: MessagesProviderProps) {
    const [chat, setChat] = useState<Chat>({
        date: currentDate, // ISO 8601 string (e.g., "2024-09-24")
        messages: [],
        userId: generateObjectId(),
        _id: generateObjectId()
    });

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [messagesOld, setMessagesOld] = useState<ChatMessage[]>([]);

    const [newMessage, setNewMessage] = useState<ChatMessage>({
        sender: "",
        message: "",
        timestamp: currentDate,
        _id: generateObjectId()
    })
    const [sortedChat, setSortedChat] = useState<CategorizedChats>({
        today: { date: currentDate, messages: [], userId: "", _id: "" },
        yesterday: { date: yesterdayStr, messages: [], userId: "", _id: "" },
        last7Days: { date: sevenDaysAgoStr, messages: [], userId: "", _id: "" },
        last30Days: { date: thirtyDaysAgoStr, messages: [], userId: "", _id: "" },
        older: { date: "", messages: [], userId: "", _id: "" },
    });

    const addNewMessage = (message: ChatMessage) => {
        setNewMessage(message);
    };

    const addMessage = (message: any) => {

        setMessages((prevMessages) => {
            // Check if message is an array
            if (Array.isArray(message)) {
                return getUniqueMessagesFromCombinedArrays(prevMessages, message);
            } else {
                return [...prevMessages, message]; // Add the single message
            }
        });
    };

    const addMessageOld = (message: ChatMessage[]) => {
        setMessagesOld(message);
    };

    const addSortedChat = async (chats: Chat[]) => {
        setSortedChat(sortDataChats(chats));
    };

    const updateSortedChat = async (messages: any) => {
        setSortedChat(organizeMessagesByDate(sortedChat, messages));
    };
    return (
        <MessagesContext.Provider value={{
            messages,
            messagesOld,
            chat,
            sortedChat,
            newMessage, // El mensaje que se está escribiendo
            addMessage,// Función para agregar un mensaje
            addSortedChat,
            addNewMessage,
            addMessageOld,
            updateSortedChat
        }}>
            {children}
        </MessagesContext.Provider>
    );
}

