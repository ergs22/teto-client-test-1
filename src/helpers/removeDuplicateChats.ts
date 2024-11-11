import { ChatMessage } from "@/types/types";

export default function removeDuplicateChats(chats: ChatMessage) {
  if (!Array.isArray(chats)) {
    console.error("Se esperaba un array, pero se recibió:", chats);
    return []; // Retorna un array vacío si no es un array
  }
  const seenIds = new Set<string>();
  return chats.filter((chat) => {
    if (seenIds.has(chat._id)) {
      return false; // Si el ID ya se ha visto, filtra
    } else {
      seenIds.add(chat._id); // Agrega el ID al conjunto
      return true; // Mantiene el objeto en el nuevo array
    }
  });
}

export function findUniqueMessagesInSecondArray(
  array1: ChatMessage[],
  array2: ChatMessage[]
): ChatMessage[] {
  // Crear un conjunto para almacenar los IDs
  const idsSet = new Set<string>();

  // Agregar todos los IDs del primer array al conjunto
  array1.forEach((message) => {
    if (message._id) {
      idsSet.add(message._id);
    }
  });

  // Filtrar el segundo array para encontrar mensajes únicos
  const findUniqueMessagesInSecondArray = array2.filter((message) => {
    return message._id && !idsSet.has(message._id); // Solo incluir mensajes cuyo ID no esté en el conjunto
  });

  return findUniqueMessagesInSecondArray;
}

export function getUniqueMessagesFromCombinedArrays(
  array1: ChatMessage[],
  array2: ChatMessage[]
): ChatMessage[] {
  const uniqueMessages: ChatMessage[] = [];
  const seenIds = new Set<string>();

  // Combinar ambos arrays
  const combinedMessages = [...array1, ...array2];

  combinedMessages.forEach((message) => {
    if (message._id && !seenIds.has(message._id)) {
      seenIds.add(message._id); // Agregar el ID al conjunto
      uniqueMessages.push(message); // Agregar el mensaje único
    }
  });

  return uniqueMessages;
}
