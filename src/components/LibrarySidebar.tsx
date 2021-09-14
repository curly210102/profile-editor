import React, { useContext } from "react";
import styles from "./LibrarySidebar.module.scss";
import cx from "classnames";
import GlobalContext from "./GlobalContext";

const libraryData = [
  {
    category: "badge",
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
    category: "charts",
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
    category: "projects",
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
];

const SidebarItem: React.FC<{
  id: string;
  title: string;
}> = ({ id, title }) => {
  const { store, dispatch } = useContext(GlobalContext);
  return (
    <li
      onClick={() =>
        dispatch({
          type: "active",
          payload: id,
        })
      }
      className={cx({
        [styles.active]: store.activeId === id,
      })}
    >
      {title}
    </li>
  );
};

const LibrarySidebar: React.FC<{}> = () => {
  return (
    <aside>
      <section className={styles.searchBar}></section>
      <section className={styles.menuList}>
        {libraryData.map(({ category, items }) => {
          return (
            <details key={category}>
              <summary>{category[0].toUpperCase() + category.slice(1)}</summary>
              <ul>
                {items?.map(({ id, title }) => {
                  return (
                    <SidebarItem
                      id={`${category}/${id}`}
                      title={title}
                      key={id}
                    />
                  );
                })}
              </ul>
            </details>
          );
        })}
      </section>
    </aside>
  );
};

export default LibrarySidebar;
