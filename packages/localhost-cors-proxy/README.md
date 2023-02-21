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
npx @vighnesh153/localhost-cors-proxy --target-url https://github.com --port 1234
```

## Options

| Option               | Required | Description                                     |
|----------------------|----------|-------------------------------------------------|
| `-p`, `--port`       | true     | Specify the localhost port for the proxy server |
| `-t`, `--target-url` | true     | The url to be CORS enabled                      |

