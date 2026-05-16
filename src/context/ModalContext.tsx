"use client";

import React, { createContext, useState, useContext } from "react";

type ModalContextType = {
  activeModal: string | null; // Guarda el nombre del modal activo
  openModal: (modalName: string) => void;
  closeModal: () => void;
};

const initialModalContext: ModalContextType = {
  activeModal: null, // Inicialmente no hay modal activo
  openModal: () => { },
  closeModal: () => { },
};

export const ModalContext = createContext<ModalContextType>(initialModalContext);

type ModalProviderProps = {
  children: React.ReactNode;
};

export function ModalProvider({ children }: ModalProviderProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
