import type { IActionPanelData } from ".";
import image from "../../resources/images/blog-post-workflow.png";

const LatestBlogPost: IActionPanelData = {
  title: "Blog Post Workflow",
  type: "action",
  description: `It's a Github Action to show blog post list by RSS feed.\nIt supports lots of popular blogging platforms, e.g. Medium, StackOverflow, Wordpress, Ghost, Tumblr, Drupal and others.`,
  previewImgUrl: image,
  requestUrl: "https://github.com/marketplace/actions/blog-post-workflow",
};

export default LatestBlogPost;
