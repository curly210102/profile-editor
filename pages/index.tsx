import React, { useState } from "react";
import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import library from "../src/bytemd-plugins/library";

const plugins = [gfm(), gemoji(), highlight(), library()];

function App() {
  const [value, setValue] = useState<string>("");

  return (
    <Editor
      value={value}
      plugins={plugins}
      onChange={(v) => {
        setValue(v);
      }}
    />
  );
}

export default App;
