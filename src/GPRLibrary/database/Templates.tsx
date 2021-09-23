import { useContext } from "react";
import Button from "../../components/Button";
import markdownA from "../../resources/templates/a";
import markdownB from "../../resources/templates/b";
import markdownC from "../../resources/templates/c";
import GlobalContext from "../context/global";
import styles from "./Templates.module.scss";

export const markdownList = [
  {
    title: "Abhishek Naidu",
    markdown: markdownA.markdownText,
    id: "naidu",
    source:
      "https://raw.githubusercontent.com/abhisheknaiidu/abhisheknaiidu/master/README.md",
  },
  {
    title: "Zhenye Na",
    markdown: markdownB.markdownText,
    id: "zhenye",
    source:
      "https://raw.githubusercontent.com/Zhenye-Na/zhenye-na/master/README.md",
  },
  {
    title: "iampavangandhi",
    markdown: markdownC.markdownText,
    id: "iampavangandhi",
    source:
      "https://raw.githubusercontent.com/iampavangandhi/iampavangandhi/master/README.md",
  },
];

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

export default Object.fromEntries(
  markdownList.map(({ title, id, markdown }) => {
    return [
      id,
      {
        type: "detail",
        title,
        markdownText: markdown,
        footer: <Footer text={markdown} />,
      },
    ];
  })
);
