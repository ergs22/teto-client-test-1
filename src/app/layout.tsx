import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "@/context/ModalContext";
import { MessagesProvider } from "@/context/MessagesContext";
import ClientAOS from "./../components/ClientAOS"; // Importa el nuevo componente

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
        <ClientAOS /> {/* Llama al componente aquí */}
        <MessagesProvider >
          <ModalProvider>

            {children}
          </ModalProvider>

        </MessagesProvider >
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
