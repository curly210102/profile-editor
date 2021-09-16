import React, { useContext } from "react";
import GlobalContext from "../context/global";
import database from "../database";
import ActionPanel from "./ActionPanel";
import ServerlessPanel from "./ServerlessPanel";

const LibraryMain: React.FC<{}> = () => {
  const { store } = useContext(GlobalContext);
  const panelData = database[store.activeId];
  const panelType = panelData?.["type"];
  let Panel = null;

  if (panelType === "serverless") {
    Panel = (
      <ServerlessPanel
        title={panelData["title"]}
        configuration={panelData["configuration"]}
        requestUrl={panelData["requestUrl"]}
      />
    );
  } else if (panelType === "action") {
    Panel = (
      <ActionPanel
        title={panelData["title"]}
        description={panelData["description"]}
        previewImgUrl={panelData["previewImgUrl"]}
        requestUrl={panelData["requestUrl"]}
      />
    );
  }

  return <main>{Panel}</main>;
};

export default LibraryMain;
