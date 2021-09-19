import cx, { Argument } from "classnames";
import React from "react";
import styles from "./Switch.module.scss";

interface Props {
  onChange: (v: boolean) => void;
  defaultValue: boolean;
  className?: Argument;
}
const Switch: React.FC<Props> = ({ onChange, defaultValue, className }) => {
  return (
    <label className={cx(styles.switch, className)}>
      <input
        type="checkbox"
        style={{ display: "none" }}
        onChange={(e) => onChange(e.target.checked)}
        defaultChecked={defaultValue}
      />
      <div className={styles.track}></div>
      <div className={styles.thumb}></div>
    </label>
  );
};

export default Switch;
