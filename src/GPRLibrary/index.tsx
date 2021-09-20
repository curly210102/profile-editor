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

type IExportSubmitPayload =
  | {
      type: "image" | "link";
      title: string;
      url: string;
    }
  | {
      type: "markdown";
      text: string;
      cover?: boolean;
    };
export type IExportSubmit = (
  payload?: IExportSubmitPayload | IExportSubmitPayload[]
) => void;

const ComponentLibrary: React.FC<{
  onSubmit?: IExportSubmit;
}> = ({ onSubmit }) => {
  const [store, dispatch] = useReducer(reducer, {
    activeId: "template-a",
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
