import { CategorizedChats, Chat } from "@/types/types";
import {
  currentDate,
  yesterdayStr,
  sevenDaysAgoStr,
  thirtyDaysAgoStr,
  sevenDaysAgo,
  thirtyDaysAgo,
} from "./Dates";

export default function categorizeChats(chats: Chat[]): CategorizedChats {
  const categorizedChats: CategorizedChats = {
    today: { date: currentDate, messages: [], userId: "", _id: "" },
    yesterday: { date: yesterdayStr, messages: [], userId: "", _id: "" },
    last7Days: { date: sevenDaysAgoStr, messages: [], userId: "", _id: "" },
    last30Days: { date: thirtyDaysAgoStr, messages: [], userId: "", _id: "" },
    older: { date: "", messages: [], userId: "", _id: "" },
  };

  chats.forEach((chat, index) => {
    const chatDate = new Date(chat.date);
    const chatDateStr = chat.date.split("T")[0];

    if (chatDateStr === currentDate) {
      if (
        !categorizedChats.today.messages.some(
          (existingChat) => existingChat._id === chat._id
        )
      ) {
        categorizedChats.today = chat;
      }
    } else if (chatDateStr === yesterdayStr) {
      if (
        !categorizedChats.yesterday.messages.some(
          (existingChat) => existingChat._id === chat._id
        )
      ) {
        categorizedChats.yesterday = chat;
      }
    } else if (chatDate >= sevenDaysAgo && chatDate < new Date(yesterdayStr)) {
      if (
        !categorizedChats.last7Days.messages.some(
          (existingChat) => existingChat._id === chat._id
        )
      ) {
        categorizedChats.last7Days = chat;
      }
    } else if (chatDate >= thirtyDaysAgo && chatDate < sevenDaysAgo) {
      if (
        !categorizedChats.last30Days.messages.some(
          (existingChat) => existingChat._id === chat._id
        )
      ) {
        categorizedChats.last30Days = chat;
      }
    } else {
      if (
        !categorizedChats.older.messages.some(
          (existingChat) => existingChat._id === chat._id
        )
      ) {
        categorizedChats.older = chat;
      }
    }
  });

  return categorizedChats;
}
