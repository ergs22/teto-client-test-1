import { useCallback, useContext, useState } from "react";
import axios from "axios";
import { Chat, ChatMessage, UserData } from "@/types/types";
import generateObjectId from "@/helpers/Generateid";
import { MessagesContext } from "@/context/MessagesContext";
import sortDataChats from "@/helpers/sortDataChats";

// Hook personalizado para manejar la lógica del chat
const useChat = (userData: UserData) => {
  const { addSortedChat, addMessage, messages, addMessageOld } =
    useContext(MessagesContext);
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);

  const addInput = (value: string) => {
    setInput(value);
  };

  const addLoader = () => {
    setLoader(() => !loader);
  };

  // Función para obtener el historial de chat
  const fetchChatHistory = useCallback(async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `/api/users/chatdata?userId=${userData._id}`
      );

      if (response.data && response.data.chats) {
        addSortedChat(response.data.chats);

        const sortedData = sortDataChats(response.data.chats);
        /*probar con menzaje hoy - pendiente con el getUnique*/
        if (sortedData.today) {
          addMessage(sortedData.today.messages);
        }
      }
    } catch (error) {
      console.error("Error recuperando el historial del chat:", error);
    } finally {
      setLoader(false);
    }
  }, []);

  // Enviar mensaje
  const sendMessage = useCallback(async () => {
    addMessageOld([]);
    if (!input.trim()) return; // Evita el envío de mensajes vacíos

    setLoader(true);

    const userMessage: ChatMessage = {
      sender: userData.fullname,
      message: input,
      timestamp: new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
      ).toISOString(),
      _id: generateObjectId(),
    };
    addMessage(userMessage);
    setInput("");

    try {
      const response = await axios.post<{ text: string }[]>(
        process.env.RASA_URL!,
        {
          sender: userData.fullname,
          message: input,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const botMessages: ChatMessage[] = response.data.map((msg) => ({
        sender: "bot",
        message: msg.text,
        timestamp: new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000
        ).toISOString(),
        _id: generateObjectId(),
      }));

      // Actualiza los mensajes con los mensajes del bot
      addMessage(botMessages);

      // Envía el historial del chat a la API
      const chatData: Chat = {
        userId: userData._id,
        date: "",
        messages: [userMessage, ...botMessages], // Incluye todos los mensajes
      };
      await axios.post("/api/users/chatadd", chatData);
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    } finally {
      setLoader(false);
    }
  }, [messages, input]);

  return {
    fetchChatHistory,
    sendMessage,
    addInput,
    addLoader,
    input,
    loader,
  };
};

export default useChat;
