import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "@/context/ModalContext";

export const metadata: Metadata = {
  title: "Tetobot",
  description: "Chatbot para el acompañamiento de personas con posibles Trastornos de Ansiedad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="relative">
        <ModalProvider>
          {children}
        </ModalProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
