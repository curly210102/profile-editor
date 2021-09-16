import type { IServerlessPanelData } from ".";

const GithubActivityGraph: IServerlessPanelData = {
  title: "Github Activity Graph",
  type: "serverless",
  requestUrl: "https://activity-graph.herokuapp.com/graph",
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
      options: [],
      section: "general",
      description: "Select theme",
    },
    color: {
      type: "color",
      section: "appearance",
      description: "graph card's text color",
    },
    bg_color: {
      type: "color",
      section: "appearance",
      description: "card's background color",
    },
    line: {
      type: "color",
      section: "appearance",
      description: "graph's line color",
    },
    point: {
      type: "color",
      section: "appearance",
      description: "color of points on line graph",
    },
    area_color: {
      type: "color",
      section: "appearance",
      description: "color of the area under the graph",
    },
    area: {
      type: "boolean",
      section: "appearance",
      description: "Whether shows area under the graph",
    },
    custom_title: {
      type: "string",
      section: "appearance",
      description: "Set the title to any string",
    },
    hide_title: {
      type: "boolean",
      section: "appearance",
      description: "Sets the title to an empty string",
    },
    hide_border: {
      type: "boolean",
      section: "appearance",
      description: "Makes the border of the graph transparent",
    },
  },
};

export default GithubActivityGraph;
