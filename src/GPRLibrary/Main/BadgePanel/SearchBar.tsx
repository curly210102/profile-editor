import React from "react";
import styles from "./SearchBar.module.scss";

interface Props {
  onKeywordChange: (keyword: string) => void;
}
const SearchBar: React.FC<Props> = ({ onKeywordChange }) => {
  const handleKeyPress = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      const value = (evt.target as HTMLInputElement).value.trim();
      onKeywordChange(value);
    }
  };
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        onKeyPress={handleKeyPress}
        placeholder="Search by keyword"
      />
    </div>
  );
};

export default SearchBar;
