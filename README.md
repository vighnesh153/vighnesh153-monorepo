# @vighnesh153-turbo

Welcome to my mono-repo. This repository contains (will contain) source code of all the projects that I work on and
publish to the outside world.

### Something broken?

- Please [report an issue here](https://bit.ly/rv-mono-repo-report-issue).

### Commitlint

Common types according to commitlint-config-conventional (based on the Angular convention) can be:

- [Understand what it is](https://www.conventionalcommits.org/en/v1.0.0/)
- [Local setup](https://commitlint.js.org/#/guides-local-setup)
- [API Reference](https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/index.js)
- [Commit rules](https://commitlint.js.org/#/reference-rules)
- [Configurations](https://github.com/conventional-changelog/commitlint#config)

### Check updates

```shell
cd apps/vighnesh153.com

ncu -u
```

Checkout [more options here](https://github.com/raineorshine/npm-check-updates#options)

### Pending projects/tasks

#### Embed GitHub files/commits/gists into html

- API: https://api.github.com/repos/yusanshi/emgithub/commits/7879e517c6b1d6f7b539a7770aba9feb46ff4672
- Fetch commit information and store in Dynammo db
- API rate limiting for storing commit information

#### Tasks

- Add footer
- Update navbar
  - dropdown for homepage links
  - add blog
  - make configurable
- Authentication
- Projects
- Groups/Permissions
- Blogs
  - Reactions (Likes & other emoji reactions, Comments)
- Logger
- Notification system and processing
  - Retry mechanism
  - Email me with a retry link to retry the task and send debugging details

#### Email service (Priority: P0)

This service/lambda will allow me to send email to any users

##### Features

- Should include a SQS queue where I will push new messages.
  - Message will include `to`, `from`, `subject`, `cc`, `bcc`, `message` fields.
  - Probably store the above fields in a NoSQL DB table and only add the `messageId` to the above message?
- An internal API endpoint to add messages to the email queue
- A lambda will be connected to the SQS which will send an email based on the message from the queue
  - Perform validation to check if the `from` field matches my domain `.*@vighnesh153\.com`. Most of the time, the
    `from` field will be `no-reply@vighnesh153.com`

#### Push notifications (Priority: P2)

This will allow me to send push notifications to users

##### Features

- Should include a SQS queue where I will push new messages
  - Message will include `icon`, `messageTitle`, `messageBody`, `platforms`, etc. fields
    - Platforms include Mobile Push notification, Desktop push notification, etc.
  - Probably store the above fields in a NoSQL DB table and only add the `messageId` to the above message?
- An internal API endpoint to add messages to the email queue
- A lambda will be connected to the above SQS which will send the notification

#### Email bans (Priority: P0)

- Ban spammers for `X` number of days (the next ban will be twice the previous one)
- 5 bans will lead to permanent ban (will need to reach out to me with proper explanation for getting un-banned)

#### Role based access control on vighnesh153.com (Priority: P0)

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

#### Dating ❤️ Compatibility Test 🧪 (Priority: P1)

Tired of breaking up 💔 with your partner over silly reasons 😮‍💨? Try out the dating compatibility test to see if you and
your partner 👫 are compatible, before emotionally investing into your relationship 💍.

##### Features

###### Admin

TODO

###### Users

- Ability to fill out the questionnaire
- Auto-save the answers
- Ability to check compatibility with other users
  - Ability to select users from dropdown
- Ability to invite people to the app (if they haven't signed up)
- Ability to request permission to view answers of other people
- Ability to share the app on Whatsapp, Instagram, Facebook, etc

#### URL shortener/links (Priority: P1)

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
