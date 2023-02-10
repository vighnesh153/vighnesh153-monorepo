# GitHub Gist REST API Wrapper

[![npm (scoped)](https://img.shields.io/npm/v/@vighnesh153/github-gist)](https://www.npmjs.com/package/@vighnesh153/github-gist)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@vighnesh153/github-gist)](https://img.shields.io/bundlephobia/minzip/@vighnesh153/github-gist)
[![npm](https://img.shields.io/npm/dt/@vighnesh153/github-gist)](https://img.shields.io/npm/dt/@vighnesh153/github-gist)
[![GitHub](https://img.shields.io/github/license/vighnesh153/vighnesh153-turbo)](https://github.com/vighnesh153/vighnesh153-turbo/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/vighnesh153/vighnesh153-turbo)](https://github.com/vighnesh153/vighnesh153-turbo/issues)

A simple wrapper over the GitHub's REST API to play with GitHub Gists.

## Installation

```shell
npm install @vighnesh153/github-gist
```

## Before you begin

To interact with the gist in your GitHub account, you need to create a Personal Access Token with the **gist** scope.

[Generate your token](https://github.com/settings/tokens/new?scopes=gist)

## Usage

### Instantiation

```ts
import { GithubGist } from '@vighnesh153/github-gist';

const gist = new GithubGist({
  // Required
  personalAccessToken: '<GITHUB_PERSONAL_ACCESS_TOKEN>',

  // Required. This will be used to identify and connect to your gist among all your other gists.
  appIdentifier: 'my-first-gist',

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
  corsConfig: { type: 'default' },
});
```

### Initialize the gist

This will create the gist, if it doesn't exist. If the gist already exists, it will just fetch its metadata. This should
be the first thing you do and should only be invoked once.

```ts
await gist.initialize();
```

### Files in Gist

A gist can have multiple files. To create a file, do the following:

> You can only store string content in a file. So, if you are creating a JSON file, remember to stringify the content

```ts
const pikachuJson = gist.createNewFile('pikachu.json');

console.log(pikachuJson.content);
// ''

pikachuJson.content = JSON.stringify({ message: 'Pikachu is the best' });

console.log(JSON.parse(pikachuJson.content));
// { message: "Pikachu is the best" }
```

### Save a file

Just creating the file won't save it on your Gist. To save, you will have to invoke the `save()` method on it

```ts
// This will save the file on the Gist
await pikachuJson.save();
```

### Save multiple files at once

If you have multiple new files or modified files, you can invoke `save()` on the gist itself to save all the files in a
single HTTP request

```ts
const pikachuPython = gist.createNewFile('pikachu.py');
pikachuPython.content = `print("Pikachu is the best")`;

const pikachuJs = gist.createNewFile('pikachu.js');
pikachuJs.content = `console.log("Pikachu is the best")`;

// Saves all files in a single request
await gist.save();
```

### Get an existing file

You can access the previously created file by doing the following

```ts
const existingPikachuJson = gist.getFileByName('pikachu.json');
```

Alternatively, you can also use `createNewFile` which will return the existing file, if it exists, else, create it and
return it.

```ts
const existingPikachuJson = gist.createNewFile('pikachu.json');
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

Gist is an awesome way to store small amount data without having to spin up a database. But it does come with some
caveats.

- You cannot use it in a multi-threaded application because all the `save` requests are `force` pushes, and you could
  overwrite other thread's changes
- Requests are not [atomic](<https://en.wikipedia.org/wiki/Atomicity_(database_systems)>)
- Don't invoke `save` in parallel. Wait for the previous `Promise` to resolve completely before starting the next one.
