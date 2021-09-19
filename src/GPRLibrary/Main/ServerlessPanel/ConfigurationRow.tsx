import cx from "classnames";
import React from "react";
import styles from "./ConfigurationRow.module.scss";

interface ConfigurationRowProps {
  required: boolean;
  name: string;
}
const ConfigurationRow: React.FC<ConfigurationRowProps> = ({
  required = false,
  name,
  children,
}) => {
  return (
    <div className={styles.row}>
      <label
        htmlFor={name}
        className={cx(styles.label, {
          [styles.required]: required,
        })}
      >
        {name}
      </label>
      {children}
    </div>
  );
};
export default ConfigurationRow;
