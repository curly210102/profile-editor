import React, { useReducer } from "react";
import GlobalContext from "./context/global";
import styles from "./index.module.scss";
import LibraryMain from "./Main";
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

export type IExportSubmit = (payload?: { title: string; url: string }) => void;

const ComponentLibrary: React.FC<{
  onSubmit?: IExportSubmit;
}> = ({ onSubmit }) => {
  const [store, dispatch] = useReducer(reducer, {
    activeId: "",
  });
  return (
    <GlobalContext.Provider
      value={{
        store,
        dispatch,
        onSubmit,
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
