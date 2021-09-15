import React from "react";
import styles from "./Button.module.scss";

interface Props {
  onClick?: React.MouseEventHandler;
}
const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
