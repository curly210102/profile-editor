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
}

export interface ISelected {
  title: string;
  url: string;
}

interface Props {}
const BadgePanel: React.FC<Props> = () => {
  const [filteredList, setFilteredList] = useState<typeof icons>([]);
  const [selected, setSelected] = useState<ISelected[]>([]);
  const [isSelectedListMode, setSelectedListMode] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { onSubmit } = useContext(GlobalContext);

  const selectedIconIds = useMemo(() => {
    return new Set(selected.map((s) => s.title));
  }, [selected]);

  useEffect(() => {
    if (keyword) {
      const regexp = new RegExp(`^${keyword}`, "i");
      setFilteredList(
        icons.filter(({ title }) => {
          return (
            regexp.test(title) &&
            (!isSelectedListMode || selectedIconIds.has(title))
          );
        })
      );
    } else {
      setFilteredList([]);
    }
  }, [selectedIconIds, isSelectedListMode, keyword]);

  const handleSubmit = () => {
    onSubmit?.(selected);
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
            setSelected((state) => [...state, v]);
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
