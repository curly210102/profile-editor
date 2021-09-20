import { useContext } from "react";
import { IDetailPanelData } from ".";
import Button from "../../components/Button";
import markdownA from "../../resources/templates/a";
import markdownB from "../../resources/templates/b";
import markdownC from "../../resources/templates/c";
import GlobalContext from "../context/global";
import styles from "./Templates.module.scss";

const Footer: React.FC<{ text: string }> = function ({ text }) {
  const { onSubmit } = useContext(GlobalContext);
  return (
    <Button
      onClick={() => {
        onSubmit?.({
          type: "markdown",
          text,
          cover: true,
        });
      }}
      className={styles.button}
    >
      Use template
    </Button>
  );
};
export const TemplateA: IDetailPanelData = {
  type: "detail",
  ...markdownA,
  footer: <Footer text={markdownA.markdownText} />,
};

export const TemplateB: IDetailPanelData = {
  type: "detail",
  ...markdownB,
  footer: <Footer text={markdownB.markdownText} />,
};

export const TemplateC: IDetailPanelData = {
  type: "detail",
  ...markdownC,
  footer: <Footer text={markdownC.markdownText} />,
};
