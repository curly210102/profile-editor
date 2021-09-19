import cx from "classnames";
import React, { useCallback, useState } from "react";
import type { IBadge, ISelected } from ".";
import styles from "./Main.module.scss";

interface Props {
  list: IBadge[];
  onSelect: (v: ISelected) => void;
  onUnselect: (v: string) => void;
  selectedIds: Set<string>;
}

export interface IConfiguration {
  theme: "default" | "label" | "logo";
  style: "plastic" | "flat" | "flat-square" | "for-the-badge" | "social";
  link?: string;
  logoColor?: string;
  logoWidth?: number;
  label?: string;
  message?: string;
  labelColor?: string;
  color?: string;
}

const BadgePanelMain: React.FC<Props> = ({
  list,
  selectedIds,
  onUnselect,
  onSelect,
}) => {
  const [configuration, setConfiguration] = useState<IConfiguration>({
    theme: "default",
    style: "for-the-badge",
  });
  const updateConfiguration = useCallback(
    (payload: Partial<IConfiguration>) => {
      setConfiguration((state) => ({
        ...state,
        ...payload,
      }));
    },
    []
  );
  return (
    <div className={styles.container}>
      <div className={styles.badgeList}>
        {list.map((item) => {
          const { title } = item;
          return (
            <div
              className={cx(styles.badgeBlock, {
                [styles.selected]: selectedIds.has(title),
              })}
              key={title}
              onClick={() => {
                if (selectedIds.has(title)) onUnselect(title);
                else
                  onSelect({
                    title,
                    url: generateUrl({
                      ...item,
                      ...configuration,
                    }),
                  });
              }}
            >
              {title}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={generateUrl({
                  ...item,
                  ...configuration,
                })}
                alt={title}
              />
            </div>
          );
        })}
      </div>
      {/* <BadgeConfiguration
        configuration={configuration}
        updateConfiguration={updateConfiguration}
      /> */}
    </div>
  );
};

export default BadgePanelMain;

function generateUrl({
  title,
  theme,
  hex,
  style,
}: {
  title: string;
  hex: string;
  theme: "default" | "label" | "logo";
  style: "plastic" | "flat" | "flat-square" | "for-the-badge" | "social";
  link?: string;
  logoColor?: string;
  logoWidth?: number;
  label?: string;
  message?: string;
  labelColor?: string;
  color?: string;
}) {
  const slug = titleToSlug(title);
  if (theme === "logo") {
    `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${slug}.svg`;
  }

  const isDefaultTheme = theme === "default";
  const isLight = isLightColor(hex);
  const colors = isDefaultTheme
    ? {
        color: hex,
        logoColor: isLight ? "000" : "fff",
      }
    : {
        color: isLight ? "000" : "fff",
        logoColor: isLight ? "000" : "fff",
        labelColor: hex,
      };

  return `https://img.shields.io/badge/${encodeURIComponent(
    title.replace(/\-/g, "--").replace(/\_/g, "__")
  )}-143?style=${style}&logo=${slug}&${Object.entries(colors)
    .map(([name, value]) => `${name}=${value}`)
    .join("&")}`;
}

const titleToSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/\./g, "dot")
    .replace(/&/g, "and")
    .replace(/đ/g, "d")
    .replace(/ħ/g, "h")
    .replace(/ı/g, "i")
    .replace(/ĸ/g, "k")
    .replace(/ŀ/g, "l")
    .replace(/ł/g, "l")
    .replace(/ß/g, "ss")
    .replace(/ŧ/g, "t")
    .normalize("NFD")
    .replace(/[^a-z0-9]/g, "");

const isLightColor = (color: string): boolean => {
  const rgb =
    color.length === 3
      ? color.match(/([a-z0-9]{1})/gi)?.map((a) => parseInt(a + a, 16))
      : color.match(/([a-z0-9]{2})/gi)?.map((a) => parseInt(a, 16));

  return !!rgb && 0.213 * rgb[0] + 0.715 * rgb[1] + 0.072 * rgb[2] > 255 / 2;
};
