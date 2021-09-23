import cx, { Argument } from "classnames";
import React from "react";
import styles from "./Select.module.scss";

interface Props {
  onChange: (v: string | string[]) => void;
  description?: string;
  options: string[];
  multiple?: boolean;
  className?: Argument;
  defaultValue?: string;
}
const Select: React.FC<Props> = ({
  options,
  description,
  multiple = false,
  onChange,
  className,
  defaultValue,
}) => {
  return (
    <select
      className={cx(styles.select, className)}
      onChange={(e) => {
        if (multiple) {
          const selected: string[] = [];
          Array.prototype.forEach.call(e.target.options, (option) => {
            option.selected && option.value && selected.push(option.value);
          });
          onChange(selected);
        } else {
          onChange(e.target.value);
        }
      }}
      multiple={multiple}
      defaultValue={defaultValue}
    >
      {description && <option value="">{description}</option>}
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
