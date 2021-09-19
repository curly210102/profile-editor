import cx, { Argument } from "classnames";
import React from "react";
import styles from "./TextInput.module.scss";

interface Props {
  value?: string;
  description?: string;
  onChange: (v: string) => void;
  className?: Argument;
}

const TextInput: React.FC<Props> = ({
  value,
  description,
  onChange,
  className,
}) => {
  return (
    <input
      className={cx(styles.input, className)}
      type="text"
      defaultValue={value}
      onBlur={(e) => {
        onChange(e.target.value);
      }}
      placeholder={description}
      title={description}
    />
  );
};

export default TextInput;
