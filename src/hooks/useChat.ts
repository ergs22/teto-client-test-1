import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Message } from "@/types/types";

// Hook personalizado para manejar la lógica del chat
const useChat = (userData: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loader, setLoader] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Enviar mensaje
  const sendMessage = useCallback(async () => {
    if (!input.trim()) return; // Evita el envío de mensajes vacíos
    setLoader(true);

    const userMessage: Message = {
      sender: userData.fullname,
      message: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
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

      const botMessages: Message[] = response.data.map((msg) => ({
        sender: "bot",
        message: msg.text,
        timestamp: new Date().toISOString(),
      }));
      setMessages((prevMessages) => [...prevMessages, ...botMessages]);

      // Enviar historial del chat a la API
      const chatData = {
        userId: userData._id,
        messages: [...messages, userMessage, ...botMessages],
      };
      await axios.post("/api/users/chatadd", chatData);
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    } finally {
      setLoader(false);
    }
  }, [input, userData, messages]);

  // Mantener el scroll al final cuando los mensajes cambian
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return { messages, input, setInput, sendMessage, loader, chatRef };
};

export default useChat;
