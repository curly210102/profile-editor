import cx from "classnames";
import React, { useContext } from "react";
import GlobalContext from "../context/global";
import database from "../database";
import styles from "./index.module.scss";

const libraryData = [
  {
    category: "template",
    items: ["template-a", "template-b", "template-c"],
  },
  {
    category: "badge",
    items: ["badge", "badge-statistics"],
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
      "github-pin-repo",
    ],
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
    <aside className={styles.sideBar}>
      {/* <section className={styles.searchBar}></section> */}
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
      <section className={styles.footer}>
        <a
          href="https://github.com/curly210102/readme-editor/issues"
          target="__blank"
        >
          Add more awesome component/template to library
        </a>
      </section>
    </aside>
  );
};

export default LibrarySidebar;
