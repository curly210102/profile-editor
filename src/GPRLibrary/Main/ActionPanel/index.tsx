import Image from "next/image";
import React, { useContext, useRef } from "react";
import Button from "../../../components/Button";
import GlobalContext from "../../context/global";
import styles from "./style.module.scss";

export interface Props {
  title: string;
  description: string;
  previewImgUrl: StaticImageData;
  requestUrl: string;
}

const ActionPanel: React.FC<Props> = ({
  title,
  description,
  previewImgUrl,
  requestUrl,
}) => {
  const { onSubmit } = useContext(GlobalContext);
  const linkRef = useRef<HTMLAnchorElement>(null);
  return (
    <article className={styles.panel}>
      <header>
        <h2>{title}</h2>
        <h5>Github Action</h5>
      </header>
      <main>
        <p>{description}</p>
        <div className={styles.preview}>
          <Image
            src={previewImgUrl}
            alt={`preview of ${title}`}
            layout="intrinsic"
          />
        </div>
      </main>
      <footer>
        <a href={requestUrl} ref={linkRef} target="_blank" rel="noreferrer"></a>
        <Button
          onClick={() => {
            linkRef.current?.click();
            onSubmit?.();
          }}
        >
          Go to Action Marketplace
        </Button>
      </footer>
    </article>
  );
};

export default ActionPanel;
