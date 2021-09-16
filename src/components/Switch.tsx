import React from "react";
import styles from "./Switch.module.scss";

interface Props {
  onChange: (v: boolean) => void;
  defaultValue: boolean;
}
const Switch: React.FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <label className={styles.switch}>
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
