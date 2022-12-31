# @vighnesh153-turbo

Welcome to my mono-repo. This repository contains (will contain) source code of all the projects that I work on and
publish to the outside world.

### Something broken?

- Please [report an issue here](https://bit.ly/rv-mono-repo-report-issue).

### Commitlint

Common types according to commitlint-config-conventional (based on the Angular convention) can be:

- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

These can be modified by [your own configuration](https://github.com/conventional-changelog/commitlint#config).

### Check updates

```shell
cd apps/vighnesh153.com

ncu -u
```

Checkout [more options here](https://github.com/raineorshine/npm-check-updates#options)

### Pending projects

#### Role based access control on vighnesh153.com

Roles have limitations. There will always be a case where we wouldn't want to give 1 permission to a person, but we want
to give that permission to some other person. So, this leads to creating an extra role. And again in the future, this
issue will occur again which will lead to creation of `N` number of roles which is basically what `groups` are meant
for. So, instead of relying on roles, I will be creating `groups` and grant permissions to groups

- 3 major groups
  - Root (only me)
  - PeopleILike (includes people I love and want to give CRUD permissions to the majority of the projects)
  - Everyone (will mostly have read permissions for `almost` everything)
- Access: Access to a resource will be granted based on following criteria
  - To a group
  - To a specific email

#### Dating ❤️ Compatibility Test 🧪

Tired of breaking up 💔 with your partner over silly reasons 😮‍💨? Try out the dating compatibility test to see if you and
your partner 👫 are compatible, before emotionally investing into your relationship 💍.

#### URL shortener/links

Why? There are 1000s of url shorteners out there. Well, none of them are made by me 😌

### Todos

- Add social links for `xs` in homepage footer
- Google OAuth
- Integrate [Algolia's DocSearch](https://docsearch.algolia.com/)
  - NPM package: https://www.npmjs.com/package/@docsearch/react
- Checkout material's documentation website configurations for creating blog
  - Code: https://github.com/mui/material-ui/blob/master/docs/package.json
- Fix `import-sorting` in eslint

### Todos for a new project

- package.json config
  - Name
  - Author
  - license
  - version
  - scripts
  - files
  - private
  - main
  - types
- eslint configuration
  - .eslintrc.js
  - .eslintignore
- typescript
  - Add typescript dependency
  - tsconfig

### Todos for a new package

- extends: Todos for a new project

#### Todos for a new application

- extends: Todos for a new project
