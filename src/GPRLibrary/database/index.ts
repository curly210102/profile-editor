import type { Props as IActionPanelType } from "../Main/ActionPanel";
import type { ConfigurationType } from "../Main/ServerlessPanel";
import GithubActivityGraph from "./GithubActivityGraph";
import GithubMostUsedLanguages from "./GithubMostUsedLanguages";
import GithubPinRepo from "./GithubPinRepo";
import GithubRecentActivity from "./GithubRecentActivity";
import GithubStats from "./GithubStats";
import GithubStreak from "./GithubStreak";
import GithubTrophy from "./GithubTrophy";
import LatestBlogPost from "./LatestBlogPost";
import WakaTimeStats from "./WakatimeStats";

interface IData {
  title: string;
}

export interface IServerlessPanelData extends IData {
  type: "serverless";
  configuration: ConfigurationType;
  requestUrl: string;
}

export interface IActionPanelData extends IData, IActionPanelType {
  type: "action";
}

const database: {
  [_: string]: IServerlessPanelData | IActionPanelData;
} = {
  "github-stats": GithubStats,
  "github-streak": GithubStreak,
  "github-trophy": GithubTrophy,
  "github-activity-graph": GithubActivityGraph,
  "github-most-used-languages": GithubMostUsedLanguages,
  "wakatime-stats": WakaTimeStats,
  "leetcode-stats": GithubActivityGraph,
  "github-pin-repo": GithubPinRepo,
  "github-recent-activity": GithubRecentActivity,
  "latest-blog-posts": LatestBlogPost,
};
export default database;
