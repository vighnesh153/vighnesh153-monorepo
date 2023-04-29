const child_process = require('child_process');

// single video
child_process.execSync(
  `youtube-dl -o './media/%(title)s.%(ext)s' --verbose "https://www.youtube.com/watch?v=siRtCe8ubUw"`
);

// playlist
child_process.execSync(
  `youtube-dl -o './media/%(title)s.%(ext)s' --verbose "https://www.youtube.com/playlist?list=PLWjnUvtRvqfJ_KSltq8VHxGofttyge1rL"`
);
