import cx, { Argument } from "classnames";
import React from "react";
import styles from "./Button.module.scss";

interface Props {
  onClick?: React.MouseEventHandler;
  className?: Argument;
}
const Button: React.FC<Props> = ({ onClick, className, children }) => {
  return (
    <button className={cx(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
