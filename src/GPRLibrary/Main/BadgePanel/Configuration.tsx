import React from "react";
import styles from "./Configuration.module.scss";
import { IConfiguration } from "./Main";

interface Props {
  configuration: IConfiguration;
  setConfiguration: (v: IConfiguration) => void;
}
const BadgeConfiguration: React.FC<Props> = () => {
  return <div className={styles.container}></div>;
};

export default BadgeConfiguration;
