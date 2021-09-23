import cx, { Argument } from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useVirtual } from "react-virtual";
import type { IBadge, ISelected } from ".";
import Button from "../../../components/Button";
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
  const [activeBadgeName, setActiveBadgeName] = useState<string>("");
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
  const activeBadgeInfo = useRef({
    title: "",
    url: "",
    isChanged: false,
  });
  useEffect(() => {
    setConfiguration((prevState) => ({
      theme: prevState.theme,
      style: prevState.style,
    }));
  }, [activeBadgeName]);
  useEffect(() => {
    setActiveBadgeName("");
  }, [list]);
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
            const { title, url: selectedUrl } = item;
            const isActive = activeBadgeName === title;
            const currentUrl = generateUrl({
              ...item,
              ...(isActive
                ? configuration
                : {
                    theme: configuration.theme,
                    style: configuration.style,
                  }),
            });
            const url = selectedUrl || currentUrl;

            if (isActive) {
              activeBadgeInfo.current = {
                title,
                url: currentUrl,
                isChanged: currentUrl !== url,
              };
            }
            return (
              <div
                className={cx(styles.badgeBlock, {
                  [styles.selected]: isActive,
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
                  setActiveBadgeName(title);
                }}
              >
                {title}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.badgePreview} src={url} alt={title} />
                {selectedIds.has(title) ? (
                  <CheckIcon className={styles.checkIcon} />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.configurationContainer}>
        <BadgeConfiguration
          activeBadge={activeBadgeName}
          configuration={configuration}
          updateConfiguration={updateConfiguration}
          instanceSectionHeader={
            <>
              {!selectedIds.has(activeBadgeName) ||
              activeBadgeInfo.current.isChanged ? (
                <Button
                  className={styles.sectionHeaderButton}
                  onClick={() => {
                    onSelect({
                      title: activeBadgeInfo.current.title,
                      url: activeBadgeInfo.current.url,
                    });
                  }}
                >
                  {selectedIds.has(activeBadgeName) ? "Update" : "Add"}{" "}
                  {activeBadgeName}
                </Button>
              ) : null}
              {selectedIds.has(activeBadgeName) ? (
                <Button
                  className={styles.sectionHeaderButton}
                  onClick={() => {
                    onUnselect(activeBadgeInfo.current.title);
                  }}
                >
                  Remove {activeBadgeName}
                </Button>
              ) : null}
            </>
          }
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

function CheckIcon({ className }: { className: Argument }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(className)}
    >
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#090"
        stroke="#090"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
