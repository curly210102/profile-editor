import type { ConfigurationType } from "../Main/ServerlessPanel";
import GithubActivityGraph from "./GithubActivityGraph";
import GithubMostUsedLanguages from "./GithubMostUsedLanguages";
import GithubPinRepo from "./GithubPinRepo";
import GithubStats from "./GithubStats";
import GithubStreak from "./GithubStreak";
import GithubTrophy from "./GithubTrophy";
import WakaTimeStats from "./WakatimeStats";

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
  "github-streak": GithubStreak,
  "github-trophy": GithubTrophy,
  "github-activity-graph": GithubActivityGraph,
  "github-most-used-languages": GithubMostUsedLanguages,
  "wakatime-stats": WakaTimeStats,
  "leetcode-stats": GithubActivityGraph,
  "github-pin-repo": GithubPinRepo,
};
export default database;
