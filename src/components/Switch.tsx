import React from "react";
import styles from "./Switch.module.scss";

interface Props {
  onChange: (v: boolean) => void;
}
const Switch: React.FC<Props> = ({ onChange }) => {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        style={{ display: "none" }}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className={styles.track}></div>
      <div className={styles.thumb}></div>
    </label>
  );
};

export default Switch;
