### Pending projects/tasks

### Quick links

- Vercel project: https://vercel.com/vighnesh153/vighnesh153-main
- Logging, Monitoring: https://cloud.axiom.co/vighnesh153-GNaU/datasets

### Integrations

- Database: Mongodb
  - Backend Testing: [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server)
- Logging
  - General Logs
    - Service: [Axiom](https://www.axiom.co/)
    - Email alerts
      - 4xx responses >= 5, in past 10 minutes
      - 5xx responses >= 5, in past 10 minutes
      - General errors >= 5, in past 10 minutes
  - Audit logs
    - Mongodb
- SNS notification
  - `user-created-notification`: Notification triggered when a user sign's up for the first time

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

#### Tasks

- Add readme for
  - eslint-config-vighnesh153
  - @vighnesh153/tsconfig
- Do the first publish
- Add CONTRIBUTING.md guide
  - Sample: https://github.com/motion-canvas/motion-canvas/blob/main/CONTRIBUTING.md
  - Reference: https://reactjs.org/docs/how-to-contribute.html
  - https://github.com/angular/angular/blob/main/CONTRIBUTING.md
- Move @vighnesh153/utils tests to a **tests** folder or create folders for all utils
- Cleanup
  - NPM tokens
  - Deprecate repos
  - Delete npm packages
- Add all code from old @vighnesh153/utils repo to this repo
  - Repo link: https://github.com/vighnesh153/js-utils
- Commit message lint verification workflow on pull request
- Move packages to this monorepo
  - react use global state
  - rv-serve-directory
  - @vighnesh153/cors-proxy
  - @vighnesh153/prettier-config
- DallE images to instagram with quotes
  - Open API: https://openai.com/api/pricing/
  - Instagram API: https://developers.facebook.com/docs/instagram/
  - Video: https://www.youtube.com/watch?v=RA0C_Hh9g8Q
- Imgur upload library
- email template builder
  - Create welcome email template
- send email sqs worker
- Trigger a user account created message in SNS
- SQS Queues
  - Pending events
    - USER_CREATED
      - Subscription 1: Send a welcome email
- Projects
- Groups/Permissions
- Notification system and processing
  - Retry mechanism
  - Email me with a retry link to retry the task and send debugging details
- Email service
- Embed GitHub commit snippet
- Media CDN
- Hide emails of users on client side
- Profile page for all users
  - `/users` -> Show list of users (hide emails)
  - `/users/:userId/username`
  - `/users/:userId` redirect to `/users/:userId/username`
  - Allow editing username
- vighnesh153.com/memes
  - vighnesh153.com/memes/12345 -> Should render the meme as meta-data when sharing url
  - Meme credit to
    - users
    - other portals
- Audit logs viewer
  - Filters based on
    - action
    - user
    - date
  - Search
  - Pagination
- Liked videos
  - Features
    - Tags
  - List
    - https://www.youtube.com/watch?v=JHregeIsjPQ
- Miscellaneous: Holds links to all my projects
- Blogs
  - Checkout material's documentation website configurations for creating blog
    - Code: https://github.com/mui/material-ui/blob/master/docs/package.json
  - Redirect `/blogs/*` to `/blog/*`
  - Reactions (Likes & other emoji reactions, Comments)
- Integrate [Algolia's DocSearch](https://docsearch.algolia.com/)
  - NPM package: https://www.npmjs.com/package/@docsearch/react
- Fix `import-sorting` in eslint
- Explore and integrate Cockroach DB (Serverless SQL): https://www.cockroachlabs.com/
- Checkout sentry for detailed error analysis
  - https://sentry.io/welcome/
  - https://github.com/getsentry/sentry-javascript
- docker mongo-nextjs image
- Free subtitles srt editor

#### Embed GitHub files/commits/gists into html

- API: https://api.github.com/repos/yusanshi/emgithub/commits/7879e517c6b1d6f7b539a7770aba9feb46ff4672
- Fetch commit information and store in Dynammo db
- API rate limiting for storing commit information
  - https://docs.github.com/en/developers/apps/building-github-apps/rate-limits-for-github-apps
- Getting commit info: https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#get-a-commit
- Prism diff highlighter: https://prismjs.com/plugins/diff-highlight/
- Diff 2 html CLI: https://github.com/rtfpessoa/diff2html-cli

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

#### ReactJS at scale

- Fundamentals
- Advanced concepts
  - Patterns
  - Rendering Paradigms
    - SPA
    - SSG
    - ISR
    - SSR
    - Combinations of above
  - Best practices
- Development Tools
  - Linting
    - Eslint
    - Prettier
  - Git hooks
    - Husky
- Testing
- Bootstrapping
  - Create-React-App
  - NextJS
  - Remix
- Monorepo
- Deployment
  - Github pages
  - S3 + Cloudfront
  - Vercel
- Creating a react-js library
- Micro-frontends with React

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
- typescript
  - `@types/node`: Add to devDeps
  - `@vighnesh153/tsconfig`: Add to devDeps
  - `typescript`: Add to devDeps
  - tsconfig
- eslint configuration
  - `eslint-config-vighnesh153`: Add to devDeps
  - .eslintrc.js
  - .eslintignore
- README.md

### Todos for a new package

- extends: Todos for a new project

#### Todos for a new application

- extends: Todos for a new project
