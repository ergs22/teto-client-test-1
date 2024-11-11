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
      className="w-[100vw] h-screen bg-black justify-center items-center bg-opacity-30 flex flex-col fixed z-50"
      style={showModal}
    >
      <div className="w-[80vw] sm:w-[60vw] lg:w-[40vw] xl:w-[40vw] bg-white rounded-xl px-8 py-5">
        <div className="flex justify-between items-center mb-4">
          <p>Enlace público del sitio web</p>
          <div className="" onClick={closeModal}>
            <Image
              className="cursor-pointer"
              width={20}
              height={20}
              src="/icons/close.png"
              alt="close"
            />
          </div>
        </div>
        <div className="flex justify-between items-center border-gray-7 border rounded-full py-[0.35rem] pl-4 pr-[0.35rem]">
          <p className="overflow-hidden text-gray-6  whitespace-nowrap text-ellipsis w-[60%]"> {/* Cambios aquí */}
            {url}
          </p>          <button
            onClick={copyToClipboard}
            className="bg-green-b rounded-full py-[0.70rem] px-3 text-green-3"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ModalShare;