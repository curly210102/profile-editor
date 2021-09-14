import React, { useState } from "react";
import ServerlessPanel from "./LibrarySetting/ServerlessPanel";
import database from "./LibraryDatabase";

const LibraryMain: React.FC<{
  activeId: string;
}> = ({ activeId }) => {
  const [username, setUsername] = useState("");
  const activeData = database[activeId];
  const activeType = activeData?.["type"];

  if (activeType === "serverless") {
    return (
      <ServerlessPanel
        options={activeData["options"]}
        defaultUserName={username}
        requestUrl={activeData["requestUrl"]}
      />
    );
  } else {
    return null;
  }
};

export default LibraryMain;
