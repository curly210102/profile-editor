import React from "react";

export default React.createContext<{
  store: any;
  dispatch: any;
}>({
  store: null,
  dispatch: null,
});
