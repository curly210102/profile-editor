import React from "react";
import Button from "../../../components/Button";
import styles from "./Footer.module.scss";

interface Props {
  toggleListMode: () => void;
  inSelectedListMode: boolean;
  count: number;
  onSubmit: () => void;
}
const BadgeFooter: React.FC<Props> = ({
  inSelectedListMode,
  toggleListMode,
  count,
  onSubmit,
}) => {
  return (
    <div className={styles.footer}>
      <div className={styles.select} onClick={toggleListMode}>
        {inSelectedListMode ? (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4"
                y="6"
                width="40"
                height="36"
                rx="3"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 14H44"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 24H36"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 32H36"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 24H14"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 32H14"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>All Badges</span>
          </>
        ) : (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" fill="none" fillOpacity="0.01" />
              <rect
                x="6"
                y="12"
                width="36"
                height="30"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M17.9498 24.0083L29.9498 24.0083"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 13L13 5H35L42 13"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Selected Badges</span>
            <span className={styles.count}>{count}</span>
          </>
        )}
      </div>
      <Button onClick={onSubmit}>Insert to Markdown</Button>
    </div>
  );
};

export default BadgeFooter;
