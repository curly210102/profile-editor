import React, { useCallback, useMemo, useState } from "react";
import Configuration from "./Configuration";
import type { ConfigurationType } from "./Configuration";
export type { ConfigurationType } from "./Configuration";
import styles from "./index.module.scss";
import Button from "../../../Button";

interface Props {
  configuration: ConfigurationType;
  requestUrl: string;
}

const ServerlessPanel: React.FC<Props> = ({ configuration, requestUrl }) => {
  const [url, setUrl] = useState(requestUrl);
  const handleChange = useCallback(
    (v) => {
      setUrl(
        `${requestUrl}?${Object.entries(v).map(([name, value]) => {
          return `${name}=${Array.isArray(value) ? value.join(",") : value}`;
        })}`
      );
    },
    [requestUrl]
  );
  return (
    <div className={styles.panel}>
      <section className={styles.configuration}>
        <Configuration data={configuration} onChange={handleChange} />
      </section>
      <section>{url}</section>
      <section className={styles.footer}>
        <a href={url}>{url}</a>
        <Button onClick={() => {}}>Insert To Markdown</Button>
      </section>
    </div>
  );
};

export default ServerlessPanel;
