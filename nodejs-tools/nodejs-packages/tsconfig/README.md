# @vighnesh153/tsconfig

[![](https://img.shields.io/npm/dt/@vighnesh153/tsconfig)](https://img.shields.io/npm/dt/@vighnesh153/tsconfig)
[![npm (scoped)](https://img.shields.io/npm/v/@vighnesh153/-version)](https://www.npmjs.com/package/@vighnesh153/-version)
[![GitHub](https://img.shields.io/github/license/vighnesh153/vighnesh153-monorepo)](https://github.com/vighnesh153/vighnesh153-monorepo/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/vighnesh153/vighnesh153-monorepo)](https://github.com/vighnesh153/vighnesh153-monorepo/issues)

My preferred `tsconfig` for different types of projects

## Installation

```shell
npm install -D @vighnesh153/tsconfig
```

## Usage

Add the following to your `tsconfig.json` file

```json
{
  "extends": "@vighnesh153/tsconfig/base.json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```

## Variants

You can use different variants of the configurations in different types of projects

- Pure typescript project

```json
{
  "extends": "@vighnesh153/tsconfig/base.json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```

- Pure Typescript library

```json
{
  "extends": "@vighnesh153/tsconfig/typescript-library.json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```

- ReactJS typescript library

```json
{
  "extends": "@vighnesh153/tsconfig/react-library.json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```

- NextJS typescript app

```json
{
  "extends": "@vighnesh153/tsconfig/nextjs.json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```
