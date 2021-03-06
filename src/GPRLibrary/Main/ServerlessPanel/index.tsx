import Image from "next/image";
import React, { useCallback, useContext, useMemo, useState } from "react";
import Button from "../../../components/Button";
import GlobalContext from "../../context/global";
import type { ConfigurationType } from "./Configuration";
import Configuration from "./Configuration";
import styles from "./index.module.scss";
export type { ConfigurationType } from "./Configuration";

interface Props {
  configuration: ConfigurationType;
  requestUrl: string;
  title: string;
}

const ServerlessPanel: React.FC<Props> = ({
  title,
  configuration,
  requestUrl,
}) => {
  const { onSubmit, store } = useContext(GlobalContext);
  const [url, setUrl] = useState("");
  const requiredNames = useMemo(() => {
    return Object.keys(configuration).filter(
      (name) => !!configuration[name].required
    );
  }, [configuration]);
  const handleChange = useCallback(
    (v) => {
      if (requiredNames.every((name) => v.hasOwnProperty(name))) {
        setUrl(
          `${requestUrl}?${Object.entries(v)
            .map(([name, value]) => {
              return `${name}=${(Array.isArray(value) ? value : [value])
                .map((value) => `${encodeURIComponent(value)}`)
                .join(",")}`;
            })
            .join("&")}`
        );
      } else {
        setUrl("");
      }
    },
    [requestUrl, requiredNames]
  );
  return (
    <article className={styles.panel} key={store.activeId}>
      <section className={styles.configuration}>
        <Configuration data={configuration} onChange={handleChange} />
      </section>
      {url ? (
        <section className={styles.preview}>
          <div className={styles.imageContainer}>
            <Image
              key={url}
              src={url}
              alt="Preview"
              layout="fill"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
              unoptimized={true}
              loading="eager"
            />
          </div>
        </section>
      ) : null}
      {url ? (
        <section className={styles.footer}>
          <a href={url}>{url}</a>
          <Button
            onClick={() => {
              url &&
                onSubmit?.({
                  type: "image",
                  title,
                  url,
                });
            }}
          >
            Insert To Markdown
          </Button>
        </section>
      ) : null}
    </article>
  );
};

export default ServerlessPanel;
