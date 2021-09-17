import type { IServerlessPanelData } from ".";

const GithubStreak: IServerlessPanelData = {
  title: "Github Streak",
  type: "serverless",
  requestUrl: "https://github-readme-streak-stats.herokuapp.com/",
  configuration: {
    user: {
      required: true,
      type: "string",
      section: "general",
      description: "Github Username",
      cacheId: "github_username",
    },
    theme: {
      type: "select",
      options: [
        "default",
        "dark",
        "highcontrast",
        "radical",
        "merko",
        "gruvbox",
        "gruvbox_duo",
        "tokyonight",
        "tokyonight_duo",
        "onedark",
        "onedark_duo",
        "cobalt",
        "synthwave",
        "dracula",
        "prussian",
        "monokai",
        "vue",
        "vue-dark",
        "shades-of-purple",
        "nightowl",
        "buefy",
        "buefy-dark",
        "blue-green",
        "algolia",
        "great-gatsby",
        "darcula",
        "bear",
        "solarized-dark",
        "solarized-light",
        "chartreuse-dark",
        "nord",
        "gotham",
        "material-palenight",
        "graywhite",
        "vision-friendly-dark",
        "ayu-mirage",
        "midnight-purple",
        "calm",
        "flag-india",
        "omni",
        "react",
        "jolly",
        "maroongold",
        "yeblu",
        "blueberry",
        "blueberry_duo",
        "slateorange",
        "kacho_ga",
        "ads-juicy-fresh",
        "black-ice",
        "soft-green",
        "blood",
        "blood-dark",
        "green_nur",
        "neon-dark",
        "neon-palenight",
        "dark-smoky",
        "monokai-metallian",
        "city-lights",
        "blux",
        "earth",
        "deepBlue",
        "holi-theme",
        "ayu-light",
      ],
      section: "general",
      description: "The theme to apply",
    },
    hide_border: {
      section: "general",
      type: "boolean",
      description: "Make the border transparent",
    },
    background: {
      section: "theme advanced configs",
      type: "color",
      description: "Background color",
    },
    border: {
      section: "theme advanced configs",
      type: "color",
      description: "Border color",
    },
    stroke: {
      section: "theme advanced configs",
      type: "color",
      description: "Color of Stroke lines between sections",
    },
    ring: {
      section: "theme advanced configs",
      type: "color",
      description: "Color of the ring around the current streak",
    },
    fire: {
      section: "theme advanced configs",
      type: "color",
      description: "Color of the fire in the ring",
    },
    currStreakNum: {
      section: "theme advanced configs",
      type: "color",
      description: "Color of current streak number",
    },
    sideNums: {
      section: "theme advanced configs",
      type: "color",
      description: "Color of total and longest streak numbers",
    },
    currStreakLabel: {
      section: "theme advanced configs",
      type: "color",
      description: "Color of current streak label",
    },
    sideLabels: {
      section: "theme advanced configs",
      type: "color",
      description: "Color of total and longest streak labels",
    },
    dates: {
      section: "theme advanced configs",
      type: "color",
      description: "Color of date range",
    },
  },
};

export default GithubStreak;