import React from "react";
import styles from "./Modal.module.scss";

interface Props {
  isOpen: boolean;
  title: string;
  onClose: () => void
}
const Modal: React.FC<Props> = ({ isOpen, title, onClose, children }) => {
  if (isOpen) {
    return (
      <div className={styles.wrapper} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <header className={styles.header}>
            <h2>{title}</h2>
            <div onClick={onClose}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" fill="white" fillOpacity="0.01" />
                <path
                  d="M8 8L40 40"
                  stroke="#333"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 40L40 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </header>
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
