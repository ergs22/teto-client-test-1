import { CategorizedChats } from "@/types/types";
import messageExists from "./messageExists";
import { currentDate } from "./Dates";

const organizeMessagesByDate = (
  sortedData: CategorizedChats,
  entrandSorted: any
) => {
  // Iterar sobre cada mensaje en entrandSorted
  entrandSorted.forEach((msg: any) => {
    // Extraer la fecha del timestamp del mensaje
    const messageDate = currentDate;

    // Comparar con la fecha de today
    if (messageDate === sortedData.today.date) {
      if (!sortedData.today.messages) {
        sortedData.today.messages = [];
      }
      if (!messageExists(sortedData.today.messages, msg._id)) {
        sortedData.today.messages.push(msg);
      }
    }
    // Comparar con la fecha de yesterday (hace un día)
    else if (
      messageDate ===
      new Date(sortedData.today.date)
        .setDate(new Date(sortedData.today.date).getDate() - 1)
        .toString()
        .split("T")[0]
    ) {
      if (!sortedData.yesterday) {
        sortedData.yesterday = { messages: [] };
      }
      if (!messageExists(sortedData.yesterday.messages, msg._id)) {
        sortedData.yesterday.messages.push(msg);
      }
    }
    // Comparar con la fecha de last7Days (dentro de los últimos 7 días)
    else if (
      messageDate >=
      new Date(sortedData.today.date)
        .setDate(new Date(sortedData.today.date).getDate() - 7)
        .toString()
        .split("T")[0]
    ) {
      if (!sortedData.last7Days.messages) {
        sortedData.last7Days.messages = [];
      }
      if (!messageExists(sortedData.last7Days.messages, msg._id)) {
        sortedData.last7Days.messages.push(msg);
      }
    }
    // Para mensajes más antiguos
    else {
      if (!sortedData.older) {
        sortedData.older = { messages: [] };
      }
      if (!messageExists(sortedData.older.messages, msg._id)) {
        sortedData.older.messages.push(msg);
      }
    }
  });

  return sortedData;
};

export default organizeMessagesByDate;
