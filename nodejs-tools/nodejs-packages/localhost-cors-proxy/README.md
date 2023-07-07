# @vighnesh153/localhost-cors-proxy

[![](https://img.shields.io/npm/dt/@vighnesh153/localhost-cors-proxy)](https://img.shields.io/npm/dt/@vighnesh153/localhost-cors-proxy)
[![npm (scoped)](https://img.shields.io/npm/v/@vighnesh153/-version)](https://www.npmjs.com/package/@vighnesh153/-version)
[![GitHub](https://img.shields.io/github/license/vighnesh153/vighnesh153-monorepo)](https://github.com/vighnesh153/vighnesh153-monorepo/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/vighnesh153/vighnesh153-monorepo)](https://github.com/vighnesh153/vighnesh153-monorepo/issues)

A simple proxy server for unlocking CORS disabled urls on localhost

<!-- TOC -->

- [@vighnesh153/localhost-cors-proxy](#vighnesh153localhost-cors-proxy)
  - [Usage](#usage)
  - [Options](#options)
  <!-- TOC -->

## Usage

To proxy the `api.github.com` on localhost, you can run the following command. It will start the server on
`localhost:1234`

```shell
npx @vighnesh153/localhost-cors-proxy \
  --target-url https://api.github.com \
  --port 1234
```

Then, you can hit `localhost:1234/*` instead of `https://api.github.com/*` and you won't get CORS blocked.

## Options

| Option               | Required | Description                                     |
| -------------------- | -------- | ----------------------------------------------- |
| `-p`, `--port`       | true     | Specify the localhost port for the proxy server |
| `-t`, `--target-url` | true     | The url to be CORS enabled                      |
