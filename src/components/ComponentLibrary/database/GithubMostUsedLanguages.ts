import type { IServerlessPanelData } from ".";
import GRPCommonConfiguration from "./GithubReadmeProfileCommonConfig";

const GithubMostUsedLanguages: IServerlessPanelData = {
  title: "Github Most Used Languages",
  type: "serverless",
  requestUrl: "https://github-readme-stats.vercel.app/api/top-langs",
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
    hide: {
      type: "string",
      section: "data",
      description:
        "Hide the languages specified from the card (Comma-separated values)",
    },
    layout: {
      type: "select",
      section: "appearance",
      options: ["default", "compact"],
      description: "Switch between two available layouts",
    },
    card_width: {
      type: "number",
      section: "appearance",
      description: "Set the card's width manually",
    },
    langs_count: {
      type: "number",
      section: "data",
      min: 1,
      max: 10,
      description:
        "Show more languages on the card, between 1-10, defaults to 5",
    },
    exclude_repo: {
      type: "string",
      section: "data",
      description: "Exclude specified repositories (Comma-separated values)",
    },
  },
};

export default GithubMostUsedLanguages;
