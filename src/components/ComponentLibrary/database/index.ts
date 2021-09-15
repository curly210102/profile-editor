import GithubStats from "./GithubStats";
import type { ConfigurationType } from "../Main/ServerlessPanel";

interface IData {
  title: string;
}

export interface IServerlessPanelData extends IData {
  type: "serverless";
  configuration: ConfigurationType;
  requestUrl: string;
}

const database: {
  [_: string]: IServerlessPanelData;
} = {
  "github-stats": GithubStats,
};
export default database;
