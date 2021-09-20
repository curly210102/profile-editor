import React from "react";
import type { Props as IActionPanelType } from "../Main/ActionPanel";
import type { ConfigurationType } from "../Main/ServerlessPanel";
import Badge from "./Badge";
import BadgeStatistics from "./BadgeStatistics";
import GithubActivityGraph from "./GithubActivityGraph";
import GithubMostUsedLanguages from "./GithubMostUsedLanguages";
import GithubPinRepo from "./GithubPinRepo";
import GithubRecentActivity from "./GithubRecentActivity";
import GithubStats from "./GithubStats";
import GithubStreak from "./GithubStreak";
import GithubTrophy from "./GithubTrophy";
import LatestBlogPost from "./LatestBlogPost";
import { TemplateA, TemplateB, TemplateC } from "./Templates";
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

export interface IBadgePanelData extends IData {
  type: "badge";
}

export interface IDetailPanelData extends IData {
  type: "detail";
  markdownText: string;
  footer?: React.ReactElement;
}

type IDataType =
  | IServerlessPanelData
  | IActionPanelData
  | IBadgePanelData
  | IDetailPanelData;

export function isServerless(data: IDataType): data is IServerlessPanelData {
  return data?.["type"] === "serverless";
}

export function isAction(data: IDataType): data is IActionPanelData {
  return data?.["type"] === "action";
}

export function isBadge(data: IDataType): data is IBadgePanelData {
  return data?.["type"] === "badge";
}

export function isDetail(data: IDataType): data is IDetailPanelData {
  return data?.["type"] === "detail";
}

const database: {
  [_: string]: IDataType;
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
  badge: Badge,
  "badge-statistics": BadgeStatistics,
  "template-a": TemplateA,
  "template-b": TemplateB,
  "template-c": TemplateC,
};
export default database;
