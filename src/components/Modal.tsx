import cx from "classnames";
import React, { useState } from "react";
import styles from "./Modal.module.scss";

interface Props {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}
const Modal: React.FC<Props> = ({ isOpen, title, onClose, children }) => {
  const [isFullScreen, setFullScreen] = useState(false);
  if (isOpen) {
    return (
      <div className={styles.wrapper} onClick={onClose}>
        <div
          className={cx(styles.modal, {
            [styles.fullscreen]: isFullScreen,
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <header className={styles.header}>
            <h2>{title}</h2>
            <div
              onClick={() => {
                setFullScreen((isFullScreen) => !isFullScreen);
              }}
              style={{ marginRight: "12px" }}
            >
              {isFullScreen ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33 6V15H42"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 6V15H6"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 42V33H6"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M33 42V33H41.8995"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33 6H42V15"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M42 33V42H33"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 42H6V33"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 15V6H15"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
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
                  stroke="currentColor"
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
