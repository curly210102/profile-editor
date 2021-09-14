const GithubStats = {
  title: "Github Stats",
  type: "serverless" as const,
  options: {
    username: {
      required: true,
      type: "string" as const,
      section: "general",
    },
    locale: {
      type: "select" as const,
      options: [],
      section: "general",
    },
    theme: {
      type: "select" as const,
      options: [],
      section: "theme",
    },
    title_color: {
      type: "color" as const,
      section: "theme",
    },
    text_color: {
      type: "color" as const,
      section: "theme",
    },
    icon_color: {
      type: "color" as const,
      section: "theme",
    },
    border_color: {
      type: "color" as const,
      section: "theme",
    },
    bg_color: {
      type: "color" as const,
      section: "theme",
    },
    hide_border: {
      type: "boolean" as const,
      section: "appearance",
    },
    border_radius: {
      type: "number" as const,
      section: "appearance",
    },
    custom_title: {
      type: "string" as const,
      section: "appearance",
    },
    hide_title: {
      type: "boolean" as const,
      section: "appearance",
    },
    hide_rank: {
      type: "boolean" as const,
      section: "appearance",
    },
    show_icons: {
      type: "boolean" as const,
      section: "appearance",
    },
    line_height: {
      type: "number" as const,
      section: "appearance",
    },
    disable_animations: {
      type: "boolean" as const,
      section: "appearance",
    },
    cache_seconds: {
      type: "number" as const,
      section: "data",
    },
    hide: {
      type: "string" as const,
      section: "data",
    },
    include_all_commits: {
      type: "boolean" as const,
      section: "data",
    },
    count_private: {
      type: "boolean" as const,
      section: "data",
    },
  },
  requestUrl: "https://github-readme-stats.vercel.app/api",
};

export default GithubStats;
