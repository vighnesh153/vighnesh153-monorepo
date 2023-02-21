# @vighnesh153/localhost-cors-proxy

A simple proxy server for unlocking CORS disabled urls on localhost

<!-- TOC -->
* [@vighnesh153/localhost-cors-proxy](#vighnesh153localhost-cors-proxy)
  * [Usage](#usage)
  * [Options](#options)
<!-- TOC -->

## Usage

To proxy the `api.github.com` on localhost, you can run the following command. It will start the server
on `localhost:1234`

```shell
npx @vighnesh153/localhost-cors-proxy \
  --target-url https://api.github.com \
  --port 1234
```

Then, you can hit `localhost:1234/*` instead of `https://api.github.com/*` and you won't get CORS
blocked.

## Options

| Option               | Required | Description                                     |
|----------------------|----------|-------------------------------------------------|
| `-p`, `--port`       | true     | Specify the localhost port for the proxy server |
| `-t`, `--target-url` | true     | The url to be CORS enabled                      |

