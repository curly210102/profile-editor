import React, { useContext, useEffect, useMemo, useState } from "react";
import iconSource from "../../../resources/simple-icons.json";
import GlobalContext from "../../context/global";
import BadgeFooter from "./Footer";
import styles from "./index.module.scss";
import BadgePanelMain from "./Main";
import SearchBar from "./SearchBar";

const { icons } = iconSource;

export interface IBadge {
  title: string;
  hex: string;
  url?: string;
}

export interface ISelected {
  title: string;
  url: string;
}

interface Props {}
const BadgePanel: React.FC<Props> = () => {
  const [filteredList, setFilteredList] = useState<IBadge[]>([]);
  const [selected, setSelected] = useState<ISelected[]>([]);
  const [isSelectedListMode, setSelectedListMode] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { onSubmit } = useContext(GlobalContext);

  const selectedIconIds = useMemo(() => {
    return new Set(selected.map((s) => s.title));
  }, [selected]);
  const selectedIcons = useMemo(() => {
    return new Map(selected.map((s) => [s.title, s.url]));
  }, [selected]);

  useEffect(() => {
    const filteredList: IBadge[] = [];
    const regexp = keyword ? new RegExp(`^${keyword}`, "i") : null;

    icons.forEach((icon) => {
      const { title } = icon;
      if (
        (!regexp || regexp.test(title)) &&
        (!isSelectedListMode || selectedIcons.has(title))
      ) {
        filteredList.push({
          ...icon,
          url: selectedIcons.get(title) ?? "",
        });
      }
    });

    setFilteredList(filteredList);
  }, [isSelectedListMode, keyword, selectedIcons]);

  const handleSubmit = () => {
    onSubmit?.(
      selected.map(({ title, url }) => ({ type: "image", title, url }))
    );
  };

  return (
    <article className={styles.panel}>
      <header>
        <SearchBar onKeywordChange={setKeyword} />
      </header>
      <main>
        <BadgePanelMain
          list={filteredList}
          onSelect={(v) => {
            setSelected((state) =>
              state.filter(({ title }) => title !== v.title).concat([v])
            );
          }}
          onUnselect={(v) => {
            setSelected((state) => state.filter(({ title }) => title !== v));
          }}
          selectedIds={selectedIconIds}
        />
      </main>
      <footer>
        <BadgeFooter
          toggleListMode={() => setSelectedListMode((state) => !state)}
          inSelectedListMode={isSelectedListMode}
          count={selectedIconIds.size}
          onSubmit={handleSubmit}
        />
      </footer>
    </article>
  );
};

export default BadgePanel;
