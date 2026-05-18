"use client";

import { createPortal } from "react-dom";
// import NoteForm from "../NoteForm/NoteForm";
import css from "./Modal.module.css";
import { useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    addEventListener("keydown", close);
    document.body.style.overflow = "hidden";

    return () => {
      removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div>
      <div
        onClick={handleBackdropClick}
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
      >
        <div className={css.modal}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};
export default Modal;
