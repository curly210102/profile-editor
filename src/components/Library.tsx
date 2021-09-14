import React, { useCallback, useReducer, useState } from "react";
import styles from "./Library.module.scss";
import LibraryMain from "./LibraryMain";
import GlobalContext from "./GlobalContext";
import LibrarySidebar from "./LibrarySidebar";

const reducer: React.Reducer<
  {
    activeId: string;
  },
  {
    type: "active";
    payload: string;
  }
> = (state, action) => {
  switch (action.type) {
    case "active":
      return { ...state, activeId: action.payload };
    default:
      throw new Error();
  }
};

const Library: React.FC<{}> = () => {
  const [store, dispatch] = useReducer(reducer, {
    activeId: "",
  });
  return (
    <GlobalContext.Provider
      value={{
        store,
        dispatch,
      }}
    >
      <div className={styles.container}>
        <LibrarySidebar />
        <LibraryMain />
      </div>
    </GlobalContext.Provider>
  );
};

export default Library;
