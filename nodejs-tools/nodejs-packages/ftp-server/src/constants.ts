import path from "path";

// NOTE: any changes to this should also be updated in "packageJson.scripts.copy" command
export const CLIENT_BASE_DIR = "__vighnesh153-ftp-client__";

export const DEFAULT_PORT = 7878;

export const DEFAULT_SERVE_DIRECTORY = ".";

export const ROOT_HTML_FILE_PATH = path.join(CLIENT_BASE_DIR, "index.html");
