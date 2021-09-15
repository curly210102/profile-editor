import React, { useContext, useState } from "react";
import ServerlessPanel from "./ServerlessPanel";
import database from "../database";
import GlobalContext from "../context/global";

const LibraryMain: React.FC<{}> = () => {
  const { store } = useContext(GlobalContext);
  const activePanelData = database[store.activeId];
  const panelType = activePanelData?.["type"];
  let Panel = null;

  if (panelType === "serverless") {
    Panel = (
      <ServerlessPanel
        configuration={activePanelData["configuration"]}
        requestUrl={activePanelData["requestUrl"]}
      />
    );
  }

  return <main>{Panel}</main>;
};

export default LibraryMain;
