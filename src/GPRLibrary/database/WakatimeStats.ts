import type { IServerlessPanelData } from ".";
import GRPCommonConfiguration from "./GithubReadmeProfileCommonConfig";

const WakaTimeStats: IServerlessPanelData = {
  title: "WakaTime Stats",
  type: "serverless",
  requestUrl: "https://github-readme-stats.vercel.app/api/wakatime",
  configuration: {
    ...GRPCommonConfiguration,
    username: {
      required: true,
      type: "string",
      section: "general",
      description: "Wakatime Username",
    },
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
    hide: {
      type: "string",
      section: "data",
      description:
        "Hide the languages specified from the card (Comma-separated values)",
    },
    line_height: {
      type: "number",
      section: "appearance",
      description: "Sets the line-height between text",
    },
    layout: {
      type: "select",
      section: "appearance",
      options: ["default", "compact"],
      description: "Switch between two available layouts",
    },
    langs_count: {
      type: "number",
      section: "data",
      description:
        "Limit number of languages on the card, defaults to all reported languages",
    },
    hide_progress: {
      type: "boolean",
      section: "appearance",
      description: "Hides the progress bar and percentage",
    },
    api_domain: {
      type: "string",
      section: "data",
      description:
        "Set a custom API domain for the card, e.g. Hakatime or Wakapi",
    },
    range: {
      type: "string",
      section: "data",
      description: "Request a range different from your WakaTime default",
    },
  },
};

export default WakaTimeStats;
