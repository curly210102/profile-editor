import type { Options } from "../LibrarySetting/ServerlessPanel";
import GithubStats from "./GithubStats";

const database: {
  [_: string]: {
    title: string;
  } & {
    type: "serverless";
    options: Options;
    requestUrl: string;
  };
} = {
  "github-stats": GithubStats,
};
export default database;
