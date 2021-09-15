import React from "react";

export default React.createContext<{
  store: any;
  dispatch: any;
}>({
  store: "",
  dispatch: null,
});
