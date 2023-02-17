# eslint-config-vighnesh

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

- ReactJS typescript library

```js
module.exports = {
  extends: ['vighnesh153/react-ts-library.eslintrc'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
```

- NextJS typescript app

```js
module.exports = {
  extends: ['vighnesh153/next-ts.eslintrc'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
```
