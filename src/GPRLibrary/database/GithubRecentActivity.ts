import type { IActionPanelData } from ".";
import image from "../../resources/images/github-activity.png";

const GithubRecentActivity: IActionPanelData = {
  title: "Github Recent Activity",
  type: "action",
  description:
    "It's a Github Action to display the recent GitHub activity of a user.",
  previewImgUrl: image,
  requestUrl: "https://github.com/marketplace/actions/github-activity-readme",
};

export default GithubRecentActivity;
