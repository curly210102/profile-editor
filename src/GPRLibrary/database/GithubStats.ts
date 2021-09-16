import type { IServerlessPanelData } from ".";
import GRPCommonConfiguration from "./GithubReadmeProfileCommonConfig";

const GithubStats: IServerlessPanelData = {
  title: "Github Stats",
  type: "serverless",
  requestUrl: "https://github-readme-stats.vercel.app/api",
  configuration: {
    ...GRPCommonConfiguration,
    custom_title: {
      type: "string",
      section: "appearance",
      description: "Sets a custom title for the card",
    },
    hide_title: {
      type: "boolean",
      section: "appearance",
      description: "Whether Hide the title of the card",
    },
    hide_rank: {
      type: "boolean",
      section: "appearance",
      description: "Whether Hides the rank",
    },
    show_icons: {
      type: "boolean",
      section: "appearance",
      description: "Whether Show the icons",
    },
    line_height: {
      type: "number",
      section: "appearance",
      description: "Sets the line-height between text",
    },
    disable_animations: {
      type: "boolean",
      section: "appearance",
      description: "Whether disables all animations in the card",
    },
    hide: {
      type: "select",
      options: ["stars", "commits", "prs", "issues", "contribs"],
      multiple: true,
      section: "data",
      description: "Hides the specified items from stats",
    },
    include_all_commits: {
      type: "boolean",
      section: "data",
      description:
        "Count total commits instead of just the current year commits",
    },
    count_private: {
      type: "boolean",
      section: "data",
      description: "Count private commits",
    },
  },
};

export default GithubStats;
