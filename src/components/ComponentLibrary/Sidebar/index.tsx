import React, { useContext } from "react";
import styles from "./index.module.scss";
import cx from "classnames";
import GlobalContext from "../context/global";
import database from "../database";

const libraryData = [
  {
    category: "badge",
    items: ["languages", "tools", "stats"],
  },
  {
    category: "charts",
    items: [
      "github-stats",
      "github-streak",
      "github-trophy",
      "github-activity-graph",
      "github-most-used-languages",
      "wakatime-stats",
      "leetcode-stats",
    ],
  },
  {
    category: "projects",
    items: ["github-pin-repos"],
  },
  {
    category: "Activity",
    items: ["github-recent-activity", "latest-blog-posts"],
  },
].map(({ items, ...restProps }) => {
  return {
    ...restProps,
    items: items.reduce<
      Array<{
        id: string;
        title: string;
      }>
    >((items, id) => {
      const data = database[id];
      if (data && data.title) {
        items.push({
          id,
          title: data.title,
        });
      }
      return items;
    }, []),
  };
});

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
          if (!items.length) {
            return null;
          }
          return (
            <details key={category} open={true}>
              <summary>{category[0].toUpperCase() + category.slice(1)}</summary>
              <ul>
                {items?.map(({ id, title }) => {
                  return <SidebarItem id={id} title={title} key={id} />;
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
