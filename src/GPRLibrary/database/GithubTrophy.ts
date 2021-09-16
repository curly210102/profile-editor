import type { IServerlessPanelData } from ".";

const GithubTrophy: IServerlessPanelData = {
  title: "Github Trophy",
  type: "serverless",
  requestUrl: "https://github-profile-trophy.vercel.app/",
  configuration: {
    username: {
      required: true,
      type: "string",
      section: "general",
      description: "Github Username",
      cacheId: "github_username",
    },
    theme: {
      type: "select",
      section: "general",
      options: [
        "default",
        "dracula",
        "flat",
        "onedark",
        "gruvbox",
        "monokai",
        "nord",
        "discord",
        "chalk",
        "alduin",
        "darkhub",
        "juicyfresh",
        "oldie",
        "buddhism",
        "radical",
        "onestar",
        "algolia",
        "gitdimmed",
      ],
      description: "The theme to apply",
    },
    title: {
      section: "Filter",
      type: "select",
      options: [
        "Stars",
        "Commit",
        "PullRequest",
        "Followers",
        "Repositories",
        "Issues",
      ],
      multiple: true,
      description:
        "You can filter the display by specifying the titles of trophy.",
    },
    ranks: {
      section: "Filter",
      type: "select",
      options: ["SECRET", "SSS", "SS", "S", "AAA", "AA", "A", "B", "C"],
      multiple: true,
      description: "You can filter the display by specifying the ranks.",
    },
    row: {
      section: "appearance",
      type: "number",
      description: "You can specify the maximum row size",
    },
    column: {
      section: "appearance",
      type: "number",
      description: "You can specify the maximum column size.",
    },
    "margin-w": {
      section: "appearance",
      type: "number",
      description: "You can put a margin in the width between trophies.",
    },
    "margin-h": {
      section: "appearance",
      type: "number",
      description: "You can put a margin in the height between trophies.",
    },
    "no-bg": {
      section: "appearance",
      type: "boolean",
      description: "You can turn the background transparent.",
    },
    "no-frame": {
      section: "appearance",
      type: "boolean",
      description: "You can hide the frames around the trophies.",
    },
  },
};

export default GithubTrophy;
