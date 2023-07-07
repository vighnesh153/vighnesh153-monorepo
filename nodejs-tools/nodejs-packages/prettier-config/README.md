# @vighnesh153/prettier-config

[![](https://img.shields.io/npm/dt/@vighnesh153/prettier-config)](https://img.shields.io/npm/dt/@vighnesh153/prettier-config)
[![npm (scoped)](https://img.shields.io/npm/v/@vighnesh153/-version)](https://www.npmjs.com/package/@vighnesh153/-version)
[![GitHub](https://img.shields.io/github/license/vighnesh153/vighnesh153-monorepo)](https://github.com/vighnesh153/vighnesh153-monorepo/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/vighnesh153/vighnesh153-monorepo)](https://github.com/vighnesh153/vighnesh153-monorepo/issues)

My preferred prettier configuration

## Installation

```shell
npm install -D prettier @vighnesh153/prettier-config
```

## Usage

Add the following to your `package.json`

```json5
{
  // ...
  prettier: '@vighnesh153/prettier-config',
  // ...
}
```

## Ignore path

```json5
{
  // ...
  scripts: {
    // ...
    'lint:prettier': 'prettier --write --ignore-path ./node_modules/@vighnesh153/prettier-config/.prettierignore',
    // ...
  },
  // ...
}
```
