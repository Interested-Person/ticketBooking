import React from "react";
import { useModal } from "../../hooks/useModal";

type ModalProps = {

};

const Modal: React.FC<ModalProps> = ({ }) => {
    const { message, isOpen, close } = useModal()
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-sky-900/60 bg-opacity-30 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center relative">
                {close && (
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                        onClick={close}
                    >
                        ✕
                    </button>
                )}
                <span className="text-white mb-4">
                    {message}
                </span>
                <button className="bg-sky-700 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded" onClick={close}>OK</button>
            </div>
        </div>
    );
};

export default Modal;