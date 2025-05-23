# GitHub Gist REST API Wrapper

[![npm](https://img.shields.io/npm/dt/@vighnesh153/github-gist)](https://img.shields.io/npm/dt/@vighnesh153/github-gist)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@vighnesh153/github-gist)](https://img.shields.io/bundlephobia/minzip/@vighnesh153/github-gist)
[![npm (scoped)](https://img.shields.io/npm/v/@vighnesh153/-version)](https://www.npmjs.com/package/@vighnesh153/-version)
[![GitHub](https://img.shields.io/github/license/vighnesh153/vighnesh153-monorepo)](https://github.com/vighnesh153/vighnesh153-monorepo/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/vighnesh153/vighnesh153-monorepo)](https://github.com/vighnesh153/vighnesh153-monorepo/issues)

A simple promise-based wrapper over the GitHub's REST API to play with GitHub
Gists.

## Installation

```shell
npm install @vighnesh153/github-gist

# Peer dependency
npm install axios
```

## Before you begin

To interact with the gist in your GitHub account, you need to create a Personal
Access Token with the **gist** scope.

- [Generate your token](https://github.com/settings/tokens/new?scopes=gist)
- Create a GitHub Gist by visiting [this link](https://gist.github.com/). You
  might have to create a dummy file because GitHub doesn't allow you to create
  empty gist. Once you have created the gist, note down the gist id (found in
  the url)
- CORS configuration (if you are using this on a browser): The `GET` API to
  fetch the content of a file in a gist, is CORS protected. If you are using
  this library on a browser, then you will get CORS blocked. To prevent that, I
  have added a default CORS proxy server configuration
  `https://corsanywhere.herokuapp.com/`. But, it is not a good idea to use this
  default in production because it probably isn't reliable. The owner might
  decide to shut it down anytime. So, I recommend you to build/host your own
  proxy or opt in for a more reliable one. Following are some helpful links (I
  found these options via a quick google search and these are just to get you
  started and not my recommendations):
  - A cheap paid service option: https://cors.sh/
  - Host one of the following proxy server code on your platform of choice
    - https://github.com/ccoenraets/cors-proxy/blob/master/server.js
  - Create your own CORS proxy from scratch
    - Way 1:
      https://dev.to/decker67/write-your-own-cors-proxy-with-nodejs-in-no-time-30f9
    - Way 2:
      https://medium.com/nodejsmadeeasy/a-simple-cors-proxy-for-javascript-applications-9b36a8d39c51

## Usage

### Importing

- Import/Export

```ts
import { GithubGist } from "@vighnesh153/github-gist";
```

- Require

```js
const { GithubGist } = require("@vighnesh153/github-gist");
```

- As a script tag (UMD modules)

```html
<!--More on JS Deliver: https://www.jsdelivr.com/-->
<script
  src="https://cdn.jsdelivr.net/npm/@vighnesh153/github-gist/dist/main.umd.js"
></script>

<script>
  const GithubGist = GithubGistUmd.GithubGist;

  // rest of the code below
</script>
```

### Instantiation

```ts
const gist = await GithubGist.initializeUsingGistId({
  // Required
  personalAccessToken: "<GITHUB_PERSONAL_ACCESS_TOKEN>",

  // Required
  gistId: "<YOUR-GIST-ID>",

  // --- OPTIONAL PARAMS BELOW ---

  // Since the gist is also commit based, we can cache the GET urls because git guarantees that
  // if the content changes, its SHA will also change which will lead to a new URL for latest content
  // If you have lot of gists and you think that caching all the files will be heavy, you can disable
  // caching by setting it to false
  enableRequestCaching: true,

  // Whether the Gist will be a public gist or a secret gist. Note that secret gists are still
  // accessible via URLs
  isPublic: false,

  // Content GET url is CORS protected and we cannot use it directly on the frontend. So, by default,
  // we add a Proxy configuration to bypass CORS protection
  //
  // If you are running this on a server/backend, you can set it to `{ type: 'none' }`
  //
  // If you want to configure CORS manually, you can use the third type:
  // `{ type: 'custom', customRequestConfig: (url) => AxiosRequestConfig }`
  //
  corsConfig: { type: "default" },
});
```

### Files in Gist

A gist can have multiple files. To create a file, do the following:

> You can only store `string` content in a file. So, if you are creating a JSON
> file, remember to stringify the content

```ts
const pikachuJson = gist.createNewFile("pikachu.json");

console.log(pikachuJson.content);
// ''

pikachuJson.content = JSON.stringify({ message: "Pikachu is the best" });

console.log(JSON.parse(pikachuJson.content));
// { message: "Pikachu is the best" }
```

### Save a file

Just creating the file won't save it on your GitHub Gist. To save, you will have
to invoke the `save()` method on it

```ts
// This will save the file on the Gist
await pikachuJson.save();
```

### Save multiple files at once

If you have multiple new files or modified files, you can invoke `save()` on the
gist itself to save all the files in a single HTTP request

```ts
const pikachuPython = gist.createNewFile("pikachu.py");
pikachuPython.content = `print("Pikachu is the best")`;

const pikachuJs = gist.createNewFile("pikachu.js");
pikachuJs.content = `console.log("Pikachu is the best")`;

// Saves all files in a single request
await gist.save();
```

### Get an existing file

You can access the previously created file by doing the following

```ts
const existingPikachuJson = gist.getFileByName("pikachu.json");
```

Alternatively, you can also use `createNewFile` which will return the existing
file, if it exists, else, create it and return it.

```ts
const existingPikachuJson = gist.createNewFile("pikachu.json");
```

### Fetch the latest content of a gist

If you suspect that your local gist instance is out of date with the actual
GitHub Gist, you can fetch the latest content

```ts
// Entire gist
await gist.fetchLatestContent();

// Specific file
await pikachuJson.fetchLatestContent();
```

### Get all the files

```ts
const files = gist.files;
```

### Get the owner of the gist

```ts
const ownerLogin = gist.owner;
```

## Things to be aware of

Gist is an awesome way to store small amount data without having to spin up a
database. But it does come with some caveats.

- You cannot use it in a multi-threaded application because all the `save`
  requests are `force` pushes, and you could overwrite other thread's changes
- Requests are not
  [atomic](https://en.wikipedia.org/wiki/Atomicity_(database_systems))
- Don't invoke `save` in parallel. Wait for the previous `Promise` to resolve
  completely before starting the next one.
