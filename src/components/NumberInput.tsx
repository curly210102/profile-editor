import cx, { Argument } from "classnames";
import React from "react";
import styles from "./NumberInput.module.scss";
interface Props {
  defaultValue?: number;
  description?: string;
  onChange: (v: number | null) => void;
  min?: number;
  max?: number;
  className?: Argument;
}
const NumberInput: React.FC<Props> = ({
  defaultValue,
  min,
  max,
  description,
  onChange,
  className,
}) => {
  return (
    <input
      defaultValue={defaultValue}
      type="number"
      onBlur={(e) => {
        const { value } = e.target;
        onChange(value ? +value : null);
      }}
      title={description}
      min={min ?? 0}
      max={max}
      placeholder={description ?? (defaultValue ?? 0) + ""}
      className={cx(styles.input, className)}
    />
  );
};

export default NumberInput;
