import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/react";
import React from "react";
import styles from "./style.module.scss";

const plugins = [gfm(), gemoji(), highlight()];

const DetailPanel: React.FC<{
  markdownText: string;
  footer?: React.ReactElement;
}> = ({ markdownText, footer }) => {
  return (
    <article className={styles.panel}>
      <Viewer value={markdownText} plugins={plugins}></Viewer>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </article>
  );
};

export default DetailPanel;
