// Sourced from: https://cdn.jsdelivr.net/gh/jshttp/mime-db@master/db.json

export const ACCEPTABLE_MIME_TYPES = [
  // json
  "application/json",
  "application/json5",
  // pdf
  "application/pdf",
  // audio
  "audio/mp3",
  "audio/mp4",
  "audio/ogg",
  "audio/wav",
  "audio/wave",
  "audio/webm",
  "audio/x-wav",
  // fonts
  "font/ttf",
  "font/woff",
  "font/woff2",
  // images
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
  "image/x-icon",
  // text
  "text/css",
  "text/html",
  "text/javascript",
  "text/jsx",
  "text/less",
  "text/markdown",
  "text/mdx",
  "text/plain",
  "text/x-sass",
  "text/x-scss",
  "text/xml",
  "text/yaml",
  // videos
  "video/3gpp",
  "video/mp4",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-matroska",
] as const;

export const MIME_TYPES_METADATA: {
  [key in (typeof ACCEPTABLE_MIME_TYPES)[number]]: {
    mimeType: key;
    fileExtensions: string[];
  };
} = {
  // json
  "application/json": {
    mimeType: "application/json",
    fileExtensions: ["json", "map"],
  },
  "application/json5": {
    mimeType: "application/json5",
    fileExtensions: ["json5"],
  },
  // pdf
  "application/pdf": {
    mimeType: "application/pdf",
    fileExtensions: ["pdf"],
  },
  // audio
  "audio/mp3": {
    mimeType: "audio/mp3",
    fileExtensions: ["mp3"],
  },
  "audio/mp4": {
    mimeType: "audio/mp4",
    fileExtensions: ["m4a", "mp4a"],
  },
  "audio/ogg": {
    mimeType: "audio/ogg",
    fileExtensions: ["ogg", "oga", "spx", "opus"],
  },
  "audio/wav": {
    mimeType: "audio/wav",
    fileExtensions: ["wav"],
  },
  "audio/wave": {
    mimeType: "audio/wave",
    fileExtensions: ["wav"],
  },
  "audio/webm": {
    mimeType: "audio/webm",
    fileExtensions: ["weba"],
  },
  "audio/x-wav": {
    mimeType: "audio/x-wav",
    fileExtensions: ["wav"],
  },
  // fonts
  "font/ttf": {
    mimeType: "font/ttf",
    fileExtensions: ["ttf"],
  },
  "font/woff": {
    mimeType: "font/woff",
    fileExtensions: ["woff"],
  },
  "font/woff2": {
    mimeType: "font/woff2",
    fileExtensions: ["woff2"],
  },
  // images
  "image/gif": {
    mimeType: "image/gif",
    fileExtensions: ["gif"],
  },
  "image/jpeg": {
    mimeType: "image/jpeg",
    fileExtensions: ["jpeg", "jpg", "jpe"],
  },
  "image/png": {
    mimeType: "image/png",
    fileExtensions: ["png"],
  },
  "image/svg+xml": {
    mimeType: "image/svg+xml",
    fileExtensions: ["svg"],
  },
  "image/webp": {
    mimeType: "image/webp",
    fileExtensions: ["webp"],
  },
  "image/x-icon": {
    mimeType: "image/x-icon",
    fileExtensions: ["ico"],
  },
  // text
  "text/css": {
    mimeType: "text/css",
    fileExtensions: ["css"],
  },
  "text/html": {
    mimeType: "text/html",
    fileExtensions: ["html"],
  },
  "text/javascript": {
    mimeType: "text/javascript",
    fileExtensions: ["js", "mjs"],
  },
  "text/jsx": {
    mimeType: "text/jsx",
    fileExtensions: ["jsx"],
  },
  "text/less": {
    mimeType: "text/less",
    fileExtensions: ["less"],
  },
  "text/markdown": {
    mimeType: "text/markdown",
    fileExtensions: ["md", "markdown"],
  },
  "text/mdx": {
    mimeType: "text/mdx",
    fileExtensions: ["mdx"],
  },
  "text/plain": {
    mimeType: "text/plain",
    fileExtensions: ["txt", "text", "log"],
  },
  "text/x-sass": {
    mimeType: "text/x-sass",
    fileExtensions: ["sass"],
  },
  "text/x-scss": {
    mimeType: "text/x-scss",
    fileExtensions: ["scss"],
  },
  "text/xml": {
    mimeType: "text/xml",
    fileExtensions: ["xml"],
  },
  "text/yaml": {
    mimeType: "text/yaml",
    fileExtensions: ["yaml", "yml"],
  },
  // videos
  "video/3gpp": {
    mimeType: "video/3gpp",
    fileExtensions: ["3gp", "3gpp"],
  },
  "video/mp4": {
    mimeType: "video/mp4",
    fileExtensions: ["mp4", "mp4v", "mpg4"],
  },
  "video/ogg": {
    mimeType: "video/ogg",
    fileExtensions: ["ogv"],
  },
  "video/quicktime": {
    mimeType: "video/quicktime",
    fileExtensions: ["mov", "qt"],
  },
  "video/webm": {
    mimeType: "video/webm",
    fileExtensions: ["webm"],
  },
  "video/x-matroska": {
    mimeType: "video/x-matroska",
    fileExtensions: ["mkv", "mk3d", "mks"],
  },
};
