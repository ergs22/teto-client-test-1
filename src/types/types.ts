export interface ButtonProps {
  text: string;
  styl: string;
  url: string;
}

export interface ButtonShortProps {
  text: string;
  img: string;
  url: string;
}
export interface CardUseProps {
  title: string;
  parraf: string;
  img: string;
}

export interface CardExpProps {
  name: string;
  parraf: string;
  country: string;
  img: string;
}

export interface CardFAQProps {
  name: string;
  info: string;
}

export interface BotChatPros {
  respon: string;
}

export interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string; // ISO 8601 string
  _id?: string; // Change from string to ObjectId
}

export interface Chat {
  date: string; // ISO 8601 string (e.g., "2024-09-24")
  messages: ChatMessage[];
  userId: string;
  _id?: string;
}

export interface CategorizedChats {
  today: Chat;
  yesterday: Chat;
  last7Days: Chat;
  last30Days: Chat;
  older: Chat;
}

export interface Router {
  push: (path: string) => void;
  replace: (path: string) => void;
}

export interface UserData {
  _id: string;
  username: string;
  fullname: string;
  age: string; // Cambia a number si es necesario
  isVerified: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}
