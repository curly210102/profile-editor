import cx from "classnames";
import React, { useCallback, useRef, useState } from "react";
import { useVirtual } from "react-virtual";
import type { IBadge, ISelected } from ".";
import BadgeConfiguration from "./Configuration";
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
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtual({
    size: list.length,
    parentRef: listContainerRef,
    // @ts-ignore
    measureSize: (el) => {
      return (
        el["offsetHeight"] + parseInt(window.getComputedStyle(el).marginTop, 10)
      );
    },
  });
  return (
    <div className={styles.container}>
      <div className={styles.badgeList} ref={listContainerRef}>
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const item = list[virtualRow.index];
            const { title } = item;
            const url = generateUrl({
              ...item,
              ...configuration,
            });
            return (
              <div
                className={cx(styles.badgeBlock, {
                  [styles.selected]: selectedIds.has(title),
                })}
                ref={virtualRow.measureRef}
                key={title}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                onClick={() => {
                  if (selectedIds.has(title)) onUnselect(title);
                  else
                    onSelect({
                      title,
                      url,
                    });
                }}
              >
                {title}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.badgePreview} src={url} alt={title} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.configurationContainer}>
        <BadgeConfiguration
          configuration={configuration}
          updateConfiguration={updateConfiguration}
        />
      </div>
    </div>
  );
};

export default BadgePanelMain;

function generateUrl({
  title,
  theme,
  hex,
  style,
  logoColor,
  labelColor,
  color,
  link,
  label,
  message,
  logoWidth,
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
    return (
      `/api/icon?name=${slug}` + (logoColor ? `&logoColor=${logoColor}` : "")
    );
  }

  const isDefaultTheme = theme === "default";
  const isLight = isLightColor(hex);
  const colors = isDefaultTheme
    ? {
        color: hex,
        logoColor: isLight ? "000" : "fff",
      }
    : {
        color: hex === "000" ? "fff" : "000",
        logoColor: hex === "000" ? "000" : "fff",
        labelColor: hex,
      };

  if (logoColor) {
    colors.logoColor = logoColor;
  }
  if (labelColor) {
    colors.labelColor = labelColor;
  }
  if (color) {
    colors.color = color;
  }

  const extra = {
    link: link ? encodeURIComponent(link) : "",
    label,
    message,
    logoWidth,
  };

  return `https://img.shields.io/badge/${encodeURIComponent(
    title.replace(/\-/g, "--").replace(/\_/g, "__")
  )}-143?style=${style}&logo=${slug}&${Object.entries({ ...colors, ...extra })
    .filter(([_, value]) => !!value)
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
