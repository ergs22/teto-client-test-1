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

export interface Message {
  sender: string;
  message: string;
  timestamp: string;
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
