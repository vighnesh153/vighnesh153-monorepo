# @vighnesh153/tsconfig

Shared `tsconfig` files for different types of projects.

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
