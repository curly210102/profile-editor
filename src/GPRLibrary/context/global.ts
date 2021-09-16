import React from "react";
import type { IExportSubmit } from "..";

export default React.createContext<{
  store: any;
  dispatch: any;
  onSubmit?: IExportSubmit;
}>({
  store: "",
  dispatch: null,
});
