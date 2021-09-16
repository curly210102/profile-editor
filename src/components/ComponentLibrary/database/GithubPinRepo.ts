import type { IServerlessPanelData } from ".";
import GRPCommonConfiguration from "./GithubReadmeProfileCommonConfig";

const GithubPinRepo: IServerlessPanelData = {
  title: "Github Pin Repo",
  type: "serverless",
  configuration: {
    ...GRPCommonConfiguration,
    repo: {
      required: true,
      type: "string",
      section: "general",
      description: "Repository's name",
    },
    show_owner: {
      type: "boolean",
      section: "appearance",
      description: "Whether show the repo's owner name",
    },
  },
  requestUrl: "https://github-readme-stats.vercel.app/api/pin",
};

export default GithubPinRepo;
