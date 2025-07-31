// ModalContext.tsx
import React, { createContext, useContext, useState } from "react";

type ModalContextType = {
  isOpen: boolean;
  message: string;
  open: (msg?: string) => void;
  close: () => void;
  setMessage: (msg: string) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string>("");

  const open = (msg = "") => {
    setMessage(msg);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setMessage("");
  };

  return (
    <ModalContext.Provider value={{ isOpen, message, open, close, setMessage }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
};