import { logEvent, setUserId } from "firebase/analytics";

import { getOrCreateAnalytics } from "./firebase_config";

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

export interface AnalyticsEventParams {
  title?: string;
  url?: string;
}

// Analytics event logger
export async function logAnalyticsEvent(
  eventName: AnalyticsEventName,
  extras: AnalyticsEventParams | null = null,
): Promise<void> {
  if (import.meta.env.DEV) {
    // no-op for local development
    return;
  }
  if (extras == null) {
    logEvent(await getOrCreateAnalytics(), eventName);
  } else {
    logEvent(await getOrCreateAnalytics(), eventName, extras);
  }
}

export async function associateUserWithAnalytics(userId: string | null) {
  await setUserId(await getOrCreateAnalytics(), userId, { global: true });
}
