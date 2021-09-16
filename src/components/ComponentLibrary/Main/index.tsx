import React, { useContext } from "react";
import GlobalContext from "../context/global";
import database from "../database";
import ServerlessPanel from "./ServerlessPanel";

const LibraryMain: React.FC<{}> = () => {
  const { store } = useContext(GlobalContext);
  const activePanelData = database[store.activeId];
  const panelType = activePanelData?.["type"];
  let Panel = null;

  if (panelType === "serverless") {
    Panel = (
      <ServerlessPanel
        title={activePanelData["title"]}
        configuration={activePanelData["configuration"]}
        requestUrl={activePanelData["requestUrl"]}
      />
    );
  }

  return <main>{Panel}</main>;
};

export default LibraryMain;
