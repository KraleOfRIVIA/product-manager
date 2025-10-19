"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ModalProps } from "@/shared/types/ui";
import { X } from "lucide-react";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById("modal-root") || document.body);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
      className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn"
      onClick={(e) => e.stopPropagation()}
      >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
      >
        <X size={20} />
      </button>

      {title && (
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
        {title}
        </h2>
      )}

      <div>{children}</div>
      </div>
    </div>,
    modalRoot,
  );
};
