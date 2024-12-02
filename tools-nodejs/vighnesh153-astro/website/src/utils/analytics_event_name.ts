export type AnalyticsEventName =
  // visit events
  | "visit_homepage"
  | "visit_404"
  | "visit_blogHomepage"
  | "visit_blog"
  | "visit_projectsHomepage"
  | "visit_project"
  | "visit_projects_gamesHomepage"
  | "visit_projects_graphicsHomepage"
  | "visit_project_canvas"
  | "visit_source_code"
  | "visit_resume"
  // auth events
  | "login_initiate"
  | "login_success"
  | "logout_initiate";
