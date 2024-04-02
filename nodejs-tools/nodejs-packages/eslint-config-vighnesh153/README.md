# eslint-config-vighnesh153

[![](https://img.shields.io/npm/dt/eslint-config-vighnesh153)](https://img.shields.io/npm/dt/eslint-config-vighnesh153)
[![npm (scoped)](https://img.shields.io/npm/v/@vighnesh153/-version)](https://www.npmjs.com/package/@vighnesh153/-version)
[![GitHub](https://img.shields.io/github/license/vighnesh153/vighnesh153-monorepo)](https://github.com/vighnesh153/vighnesh153-monorepo/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/vighnesh153/vighnesh153-monorepo)](https://github.com/vighnesh153/vighnesh153-monorepo/issues)

ESLint's configuration based on my preferences. No need to install any additional deps like `eslint` as this package
comes bundled with it.

> This only works within a Typescript project

## Prerequisites

- Install and configure typescript

```shell
npm install -D typescript
```

- Create `tsconfig.json` file

> You can also look at my [@vighnesh153/tsconfig](https://www.npmjs.com/package/@vighnesh153/tsconfig) package

## Installation

```shell
npm install -D eslint-config-vighnesh153
```

## Usage

- Add the following to your `.eslintrc.js` file

```js
module.exports = {
  extends: ['vighnesh153/ts-base.eslintrc'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
```

- Create a `.eslintignore` file and add the following to it

```ignore
*.js
```

## Variants

You can use different variants of the configurations in different types of projects

- Pure typescript project

```js
module.exports = {
  extends: ['vighnesh153/ts-base.eslintrc'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
```

- Astro JS project

```js
module.exports = {
  extends: ['vighnesh153/astro-ts.eslintrc'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
```
