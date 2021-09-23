import React from "react";
import ColorPicker from "../../../components/ColorPicker";
import NumberInput from "../../../components/NumberInput";
import Select from "../../../components/Select";
import TextInput from "../../../components/TextInput";
import styles from "./Configuration.module.scss";
import { IConfiguration } from "./Main";

interface Props {
  configuration: IConfiguration;
  updateConfiguration: (v: Partial<IConfiguration>) => void;
}

const items = [
  {
    name: "theme",
    type: "select" as const,
    options: ["default", "label", "logo"],
    default: "default",
    title: "Theme",
  },
  {
    name: "style",
    type: "select" as const,
    options: ["plastic", "flat", "flat-square", "for-the-badge", "social"],
    default: "for-the-badge",
  },
  {
    name: "link",
    type: "string" as const,
    default: "",
    description: "click badge link to",
  },
  {
    name: "logoColor",
    type: "color" as const,
  },
  {
    name: "logoWidth",
    type: "number" as const,
    default: 40,
  },
  {
    name: "label",
    type: "string" as const,
    description: "Specific label text",
  },
  {
    name: "message",
    type: "string" as const,
    description: "Specific message",
  },
  {
    name: "labelColor",
    type: "color" as const,
  },
  {
    name: "color",
    type: "color" as const,
  },
];

const BadgeConfiguration: React.FC<Props> = ({ updateConfiguration }) => {
  return (
    <div className={styles.container}>
      {items.map((item) => {
        const { type } = item;
        let ConfigElement: React.ReactElement | null = null;
        if (type === "color") {
          ConfigElement = (
            <ColorPicker
              onBlur={(v) =>
                updateConfiguration({
                  [item.name]: v[0].slice(1),
                })
              }
            />
          );
        } else if (type === "select") {
          ConfigElement = (
            <Select
              options={item.options ?? []}
              className={styles.select}
              defaultValue={item.default}
              onChange={(v) =>
                updateConfiguration({
                  [item.name]: v,
                })
              }
            />
          );
        } else if (type === "number") {
          ConfigElement = (
            <NumberInput
              className={styles.numberInput}
              defaultValue={item.default}
              onChange={(v) =>
                updateConfiguration({
                  [item.name]: v,
                })
              }
            />
          );
        } else {
          ConfigElement = (
            <TextInput
              onChange={(v) =>
                updateConfiguration({
                  [item.name]: v,
                })
              }
              className={styles.textInput}
              description={item.description}
            />
          );
        }

        return (
          <div className={styles.item} key={item.name}>
            <p>{item.name}</p>
            {ConfigElement}
          </div>
        );
      })}
    </div>
  );
};

export default BadgeConfiguration;
