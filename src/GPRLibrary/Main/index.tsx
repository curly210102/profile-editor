import React, { useContext } from "react";
import GlobalContext from "../context/global";
import database, { isAction, isBadge, isServerless } from "../database";
import ActionPanel from "./ActionPanel";
import BadgePanel from "./BadgePanel";
import ServerlessPanel from "./ServerlessPanel";

const LibraryMain: React.FC<{}> = () => {
  const { store } = useContext(GlobalContext);
  const panelData = database[store.activeId];
  let Panel = null;

  if (isServerless(panelData)) {
    Panel = (
      <ServerlessPanel
        title={panelData["title"]}
        configuration={panelData["configuration"]}
        requestUrl={panelData["requestUrl"]}
      />
    );
  } else if (isAction(panelData)) {
    Panel = (
      <ActionPanel
        title={panelData["title"]}
        description={panelData["description"]}
        previewImgUrl={panelData["previewImgUrl"]}
        requestUrl={panelData["requestUrl"]}
      />
    );
  } else if (isBadge(panelData)) {
    Panel = <BadgePanel />;
  }

  return <main>{Panel}</main>;
};

export default LibraryMain;
