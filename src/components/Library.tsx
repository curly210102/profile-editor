import React, { useCallback, useState } from "react";
import styles from "./Library.module.scss";
import cx from "classnames";
import Chart from "./Chart";

const libraryData = [
  {
    category: "Badge",
    items: [
      {
        id: "languages",
        title: "Languages",
      },
      {
        id: "tools",
        title: "Tools",
      },
      {
        id: "stats",
        title: "Statistics",
      },
    ],
  },
  {
    category: "Charts",
    items: [
      {
        id: "github-stats",
        title: "Github Stats",
      },
      {
        id: "github-streak",
        title: "Github Streak",
      },
      {
        id: "github-trophy",
        title: "Github Trophy",
      },
      {
        id: "github-activity-graph",
        title: "Github Activity Graph",
      },
      {
        id: "github-most-used-languages",
        title: "Github Most Used Languages",
      },
      {
        id: "wakatime-stats",
        title: "Wakatime Stats",
      },
      {
        id: "leetcode-stats",
        title: "LeetCode Stats",
      },
    ],
  },
  {
    category: "Projects",
    items: [
      {
        id: "github-pin-repos",
        title: "Github Pin Repos",
      },
    ],
  },
  {
    category: "Activity",
    items: [
      {
        id: "github-recent-activity",
        title: "Github Recent Activity",
      },
      {
        id: "latest-blog-posts",
        title: "Latest Blog Posts",
      },
    ],
  },
  {
    category: "Examples",
  },
];

interface Props {}
const Library: React.FC<Props> = ({}: Props) => {
  const [activeId, setActiveId] = useState<String>("");
  return (
    <div className={styles.container}>
      <aside>
        <section className={styles.searchBar}></section>
        <section className={styles.menuList}>
          {libraryData.map(({ category, items }) => {
            return (
              <details key={category}>
                <summary>{category}</summary>
                <ul>
                  {items?.map(({ id, title }) => {
                    const itemActiveId = `${category}/${id}`;
                    return (
                      <li
                        key={id}
                        onClick={() => setActiveId(itemActiveId)}
                        className={cx({
                          [styles.active]: activeId === itemActiveId,
                        })}
                      >
                        {title}
                      </li>
                    );
                  })}
                </ul>
              </details>
            );
          })}
        </section>
      </aside>
      <main>
        <Chart />
      </main>
    </div>
  );
};

export default Library;
