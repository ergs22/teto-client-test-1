"use client";
import Image from "next/image";
import { ModalContext } from "@/context/ModalContext";
import { useContext, useState } from "react";

const ModalShare = () => {
  const { activeModal, closeModal } = useContext(ModalContext);
  const [buttonText, setButtonText] = useState("Copiar enlace");
  const url = process.env.NEXT_PUBLIC_WEB_HOME_URL || "teto-client-test-1-production.up.railway.app";

  const showModal = {
    display: activeModal === "share" ? "flex" : "none", // Mostrar solo si el modal activo es "share"
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setButtonText("Copiado");
      setTimeout(() => setButtonText("Copiar enlace"), 2000); // Cambiar a "Copiar enlace" después de 2 segundos
    });
  };

  return (
    <section
      className="w-[100vw] h-dvh bg-black justify-center items-center bg-opacity-30 flex flex-col fixed z-50"
      style={showModal}
    >
      <div className="max-w-[90vw] sm:max-w-[80vw] md:max-w-[22rem] lg:max-w-[32vw] xl:max-w-[28vw] bg-white rounded-xl px-4 py-5">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm">Enlace público del sitio web</p>
          <div onClick={closeModal}>
            <Image
              className="cursor-pointer"
              width={20}
              height={20}
              src="/icons/close.png"
              alt="close"
            />
          </div>
        </div>
        <div className="flex justify-between items-center border-gray-7 border rounded-full py-1 pl-3 pr-2">
          <p className="overflow-hidden text-gray-6 whitespace-nowrap text-ellipsis w-[60%] text-sm">
            {url}
          </p>
          <button
            onClick={copyToClipboard}
            className="bg-green-b rounded-full py-2 px-3 text-green-3 text-sm"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ModalShare;