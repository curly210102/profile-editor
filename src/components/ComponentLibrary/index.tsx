import React, { useCallback, useReducer, useState } from "react";
import styles from "./index.module.scss";
import LibraryMain from "./Main";
import GlobalContext from "./context/global";
import LibrarySidebar from "./Sidebar";

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

const ComponentLibrary: React.FC<{}> = () => {
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

export default ComponentLibrary;
