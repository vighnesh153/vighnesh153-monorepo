export type AnalyticsEventName =
  // visit events
  | "visit/homepage"
  | "visit/404"
  | "visit/blog_homepage"
  | "visit/blog"
  | "visit/projects_homepage"
  | "visit/project"
  | "visit/projects/games_homepage"
  | "visit/project/game"
  | "visit/projects/graphics_homepage"
  | "visit/project/graphics"
  | "visit/source_code"
  | "visit/resume"
  // auth events
  | "login/initiate"
  | "login/success"
  | "logout/initiate";
