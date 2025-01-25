### Pending projects/tasks

### Quick links

- Cloudflare workers:
  https://dash.cloudflare.com/6fe924c1bdad4bfa14e5f68916c32bb2/workers/overview

#### Tools

- `*` to webp: https://cloudconvert.com/
- Compress webp: https://products.aspose.app/imaging/image-resize/webp

#### Tasks

- Something wrong with React rendering on
  https://vighnesh153.dev/projects/tsx-playground
- Blog: Why i moved away from react and next js
- Users page
- User profile page
- Change username
  - Old username should exist for 7 days (add a expiresAt field of the username
    record)
  - Run a cron job daily (or weekly) that deletes the expired usernames
  - Old username would be available for reuse once it has been cleared from the
    db by the cron job
- Create Kotlin AST
- Kotlin Syntax highlighting
- Differ between 2 string content
- Diff viewer
- Add a list of Chrome and Vscode extensions to projects on vighnesh153.dev
- adb fetch continue watching row from device
- adb launch deeplink
- compose-query (similar to react-query by tanstack)
- migrate `tex.vighnesh153.com` to `vighnesh153.dev`
  - Build your own math jax equation parser using XML
- https://go.dev/wiki/SQLDrivers
- mp4 to mp3
- Check if trap focus mentioned in the below link could be useful for side bar
  on vighnesh153.dev: https://learn.svelte.dev/tutorial/actions
- privacy policy in the repo
- Tooltip
  - tippy: https://atomiks.github.io/tippyjs/
  - usage in svelte:
    https://learn.svelte.dev/tutorial/adding-parameters-to-actions
- Audio player: https://learn.svelte.dev/tutorial/media-elements
- https://youtube.com/shorts/GOSezO0CHss?si=-056zvtt3KRLp_CI
- terminal emulator
- Comways game of life
- rubiks cube
- mermaid js like clone but in code instead of a DSL
- visualize windmill problem: https://www.youtube.com/watch?v=M64HUIJFTZM
- Kotlin:
  - Asynchronous Programming With Kotlin Coroutines:
    https://kotlinlang.org/docs/coroutines-guide.html
  - Kotlin Web Development with Ktor: https://ktor.io/learn/
  - (Java baggage) Reactive Spring Boot With Coroutines and Virtual Threads
  - https://medium.com/androiddevelopers/cancellation-in-coroutines-aa6b90163629
- Image compression
- python interpreter for the web in kotlin
- Remix course by Maximilian swartzmillar
- https://roadmap.sh/guides
- 404 page
  - https://floatui.com/components/404-pages
  - https://tailwindui.com/components/marketing/feedback/404-pages
- FAQs page
  - https://floatui.com/components/faqs
  - https://tailwindui.com/components/marketing/sections/faq-sections
- Learn Golang
- Protobuf in golang and javascript
- RPC in golang and javascript
- Remotion: https://www.remotion.dev/
- Building Macro-Systems: https://interpreterbook.com/lost/
- https://park-ui.com/
- Add tooltip component along with placement (left, top, right, bottom)
- Add tooltip component to social links along with placement
- Add tooltip component to aside email address
- Prefetch
  - Add `rel="prefetch"` to any `<a />` links on the page
  - https://docs.astro.build/en/guides/integrations-guide/prefetch/
- add code pen link as featured projects
- https://github.com/astro-community/astro-compress
- Add IP address of the command executor in the adb remote logs
- Brainf\*ck interpreter
  - https://github.com/vighnesh153/brainf.ck-interpreter
- Groups/Permissions
  - When completely banning user, remember to remove their session from users to
    log them out
- Svelte Query: https://sveltequery.vercel.app/overview
- https://github.com/vighnesh153/my-favourite
- Interview stuff
  - Project: /Users/rvighnesh/practice/interview-hilbert-curve
- Cool js packages
  - https://unjs.io/packages
- Blog:
  - Create a blog page under `vighnesh153.com/blog`
  - Migrate all blogs from `blog.vighnesh153.com` to `vighnesh153/blog`
  - Javascript at scale
    - https://cube.dev/blog/how-to-build-tree-shakeable-javascript-libraries
- Codepen like page for my personal HTML projects on vighnesh153.dev (no api
  just local code files)
- Javascript Intl:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
- email template builder
  - Create welcome email template
- Awesome mouse move effect: http://alexandercoggin.com/
- Populate `cors-anywhere` and `dictionary-api` lambdas.
- CSS patterns: https://projects.verou.me/css3patterns/
- SECURITY.md
- Changesets: https://www.npmjs.com/package/@changesets/cli
- Dom Sanitizer:
  - dompurify: https://www.npmjs.com/package/dompurify
- Markdown editor with math support
  - Marked: https://www.npmjs.com/package/marked
  - Specs: https://spec.commonmark.org/
  - Remark: https://remark.js.org/
- Docker tools
  - Image compression
- Video editing tool
- Audio and video libraries
- SQS Queues
  - Pending events
    - USER_CREATED
      - Subscription 1: Send a welcome email
- Email service
- Embed GitHub commit snippet
- Profile page for all users
  - `/users` -> Show list of users (hide emails)
  - `/users/:userId/username`
  - `/users/:userId` redirect to `/users/:userId/username`
  - Allow editing username
- AWS sandbox
- CRON expression builder
- Response cache for a url, headers, etc (lambda)
  - Useful for accessing GitHub APIs that have rate limits without API key
    (https://api.github.com/repos/vighnesh153/vighnesh153-monorepo)
- Open-dictionary
  - List of english words: https://github.com/dwyl/english-words
  - Urban dictionary api samples
    - https://api.urbandictionary.com/v0/define?term=people
    - https://api.urbandictionary.com/v0/random
  - Fetching a meaning of a word

```js
fetch(
  "https://corsanywhere.herokuapp.com/https://en.wiktionary.org/w/index.php?title=overflow&action=raw",
)
  .then((res) => res.text())
  .then(console.log);
```

- send email sqs worker
- Trigger a user account created message in SNS
- Imgur upload library
- Miscellaneous: Holds links to all my projects
- Blogs
  - Checkout material's documentation website configurations for creating blog
    - Code: https://github.com/mui/material-ui/blob/master/docs/package.json
  - Redirect `/blogs/*` to `/blog/*`
  - Reactions (Likes & other emoji reactions, Comments)
- Integrate [Algolia's DocSearch](https://docsearch.algolia.com/)
  - NPM package: https://www.npmjs.com/package/@docsearch/react
- Free subtitles srt editor
- Checkout libraries
  - Zustand
  - https://www.npmjs.com/package/magic-regexp
- Learn image processing
- Image processing libraries
  - Jimp
  - Sharp
  - [gm](https://www.npmjs.com/package/gm)
  - [@squoosh/lib](https://www.npmjs.com/package/@squoosh/lib)
  - [@squoosh/cli](https://www.npmjs.com/package/@squoosh/cli)
- Javascript hacks and creative coding: https://aem1k.com/
- Kevin Powell : Animating Glowing Border :
  https://www.youtube.com/watch?v=fcnDBP3k3BE
- Kevin Powell : 3D Tilting Card effect with mouse tracking:
  https://www.youtube.com/watch?v=Z-3tPXf9a7M
- The super tiny compiler:
  https://github.com/jamiebuilds/the-super-tiny-compiler
- Jack Herrington: Vite and Module Federation Makes Micro frontends easy:
  https://www.youtube.com/watch?v=t-nchkL9yIg
- Frontend masters algorithms: https://frontendmasters.com/courses/algorithms/
- Kevin Powell : How to create a responsive HTML table:
  https://www.youtube.com/watch?v=czZ1PvNW5hk
- Kevin Powell : Creating a CSS only directionally aware button:
  https://www.youtube.com/watch?v=e3w9liPXSi4
- Kevin Powell : You probably want position sticky instead of fixed:
  https://www.youtube.com/watch?v=8MaCTDkoVd8
- Kevin Powell : Create accessible tabs:
  https://www.youtube.com/watch?v=fI9VM5zzpu8
- Kevin Powell : The unknown fundamentals of CSS: Offset parents and Stacking
  Context explained: https://www.youtube.com/watch?v=GS6b9p6edfk
- Kevin Powell : CSS only particle animations:
  https://www.youtube.com/watch?v=9dEIg2xOphE
- https://http.cat/404
- Lighthouse: https://developer.chrome.com/docs/lighthouse/overview/
- Unlighthouse: scans every page in website:
  https://unlighthouse.dev/guide/getting-started/how-it-works
- Dr. Trefor Bazett: The fastest multiplication algorithm:
  https://www.youtube.com/watch?v=frT1UPiJUO0
- Introducing WebGPU: Unlocking modern GPU access for Javascript:
  https://www.youtube.com/watch?v=m6T-Mq1BPXg
- https://compilerbook.com/
- Rant about frontend frameworks: https://hackmd.io/@roguegpu/r1RKQMdt3
- Inside look at modern web browser:
  https://developer.chrome.com/blog/inside-browser-part1/
- Khan academy math: https://www.khanacademy.org/math

* Brilliant premium: https://brilliant.org/subscribe/

- Interesting blogs: https://irian.to/blogs/
- Stephen Grider: Microservices with Node JS and React:
  https://www.udemy.com/course/microservices-with-node-js-and-react/?couponCode=LEADERSALE24A
- Stephen Grider: NestJS: The Complete Developer's Guide:
  https://www.udemy.com/course/nestjs-the-complete-developers-guide/?couponCode=LEADERSALE24A
- Stephen Grider: The complete React Native + Hooks course:
  https://www.udemy.com/course/the-complete-react-native-and-redux-course/
- Stephen Grider: React Native : Advanced Concepts:
  https://www.udemy.com/course/react-native-advanced/
- Stephen Grider: Electron for Desktop Apps: The Complete Developer's Guide:
  https://www.udemy.com/course/electron-react-tutorial/?couponCode=LEADERSALE24A
- Data Oriented design Resources:
  https://github.com/dbartolini/data-oriented-design
- Entity Component System: An introductory Guide:
  https://www.simplilearn.com/entity-component-system-introductory-guide-article
- Kevin Powell: Create an infinite horizontal scroll animation:
  https://www.youtube.com/watch?v=iLmBy-HKIAw
- Kevin Powell: Using CSS custom properties like this is a waste:
  https://www.youtube.com/watch?v=_2LwjfYc1x8
- Kevin Powell: CSS Position deepdive:
  https://www.youtube.com/watch?v=fF_NVrd1s14
- Philipp Lackner: How to build an animated splash screen on Android:
  https://www.youtube.com/watch?v=eFZmMSm1G1c
- 3Blue1Brown: But what are hamming codes? The origin of error correction:
  https://www.youtube.com/watch?v=X8jsijhllIA
- Philipp Lackner: Performance Optimization with @Stable and @Immutable in
  Jetpack Compose: https://www.youtube.com/watch?v=_FtKhWvHiTg
- 3Blue1Brown: Why do prime numbers make these spirals? | Dirichlet’s theorem
  and pi approximations: https://www.youtube.com/watch?v=EK32jo7i5LQ
- Java concurrency and multi threading:
  https://www.youtube.com/playlist?list=PLL8woMHwr36EDxjUoCzboZjedsnhLP1j4
- https://www.procosplay.com/
- Challenging projects every programmer should try:
  https://austinhenley.com/blog/challengingprojects.html
  - Text editor
  - 2D game - Space Invaders
  - Compiler - Tiny BASIC
  - Mini operating system
  - Spreadsheet (hard!)
  - Video game console emulator (hard!)
- Philipp Lackner : Is it okay to use runBlocking?:
  https://www.youtube.com/watch?v=PXnVry_emns
- Philipp Lackner: The Ultimate guide to kotlin flows:
  https://www.youtube.com/playlist?list=PLQkwcJG4YTCQHCppNAQmLsj_jW38rU9sC
- Amazing UX designs: https://www.behance.net/jarredfourie/projects
- Cute fox cute vectors: https://www.freepik.com/vectors/cute-fox%27%3ECute
- Android clean architecture
- Philipp Lackner: This is how you create custom shapes in jetpack compose:
  https://www.youtube.com/watch?v=LEuxvDVA9pA
- Deep dive in to Jetpack Compose Layouts:
  https://www.youtube.com/watch?v=zMKMwh9gZuI
- Kevin powell: Create a cool bubble zoom effect with CSS:
  https://www.youtube.com/watch?v=2f4JAsTFRLA
- Jetpack compose tutorials:
  https://github.com/SmartToolFactory/Jetpack-Compose-Tutorials
- Canva: We put half a million files in one git repository, here's what we
  learnt:
  https://www.canva.dev/blog/engineering/we-put-half-a-million-files-in-one-git-repository-heres-what-we-learned/
- Game programming patterns: https://gameprogrammingpatterns.com/contents.html
- Thorsten ball: writing a compiler in Golang
- Intuit Mailchimp: https://mailchimp.com/
- automata theory
- Theory of Computation A.pdf:
  https://drive.google.com/file/d/1MVx9ytN5EvPx6r2Shhh8M3mRbJ2Fiv2x/view?usp=sharing
- BNF grammar for EcmaScript: https://tomcopeland.blogs.com/EcmaScript.html
- Dreams of code: I have been using Redis wrong this whole time:
  https://www.youtube.com/watch?v=WQ61RL1GpEE
- Android app architecture: https://developer.android.com/topic/architecture
  - Samples: https://github.com/android/architecture-samples
- Implementing a language server, how hard can it be:
  https://medium.com/ballerina-techblog/implementing-a-language-server-how-hard-can-it-be-part-1-introduction-c915d2437076
- https://nix.dev/
- https://cpu.land/
- Kevin Powell: Make position absolute work with you, not against you:
  https://www.youtube.com/watch?v=ZrZ-ZzacGXs
- Mark rober engineering: https://studio.com/mark-rober-engineering/login
- Android Interface Definition Language (AIDL):
  https://developer.android.com/develop/background-work/services/aidl
- Structure and interpretation of computer programs:
  https://drive.google.com/file/d/1tBu3gMhWEsptTAdLbWN-wmQDgAsw5Jzs/view?usp=drive_link

#### Embed GitHub files/commits/gists into html

- API:
  https://api.github.com/repos/yusanshi/emgithub/commits/7879e517c6b1d6f7b539a7770aba9feb46ff4672
- Fetch commit information and store in Dynammo db
- API rate limiting for storing commit information
  - https://docs.github.com/en/developers/apps/building-github-apps/rate-limits-for-github-apps
- Getting commit info:
  https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#get-a-commit
- Prism diff highlighter: https://prismjs.com/plugins/diff-highlight/
- Diff 2 html CLI: https://github.com/rtfpessoa/diff2html-cli

#### Email service (Priority: P0)

This service/lambda will allow me to send email to any users

##### Features

- Should include a SQS queue where I will push new messages.
  - Message will include `to`, `from`, `subject`, `cc`, `bcc`, `message` fields.
  - Probably store the above fields in a NoSQL DB table and only add the
    `messageId` to the above message?
- An internal API endpoint to add messages to the email queue
- A lambda will be connected to the SQS which will send an email based on the
  message from the queue
  - Perform validation to check if the `from` field matches my domain
    `.*@vighnesh153\.com`. Most of the time, the `from` field will be
    `no-reply@vighnesh153.com`

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
  - Message will include `icon`, `messageTitle`, `messageBody`, `platforms`,
    etc. fields
    - Platforms include Mobile Push notification, Desktop push notification,
      etc.
  - Probably store the above fields in a NoSQL DB table and only add the
    `messageId` to the above message?
- An internal API endpoint to add messages to the email queue
- A lambda will be connected to the above SQS which will send the notification

#### Email bans (Priority: P0)

- Ban spammers for `X` number of days (the next ban will be twice the previous
  one)
- 5 bans will lead to permanent ban (will need to reach out to me with proper
  explanation for getting un-banned)

#### Role based access control on vighnesh153.com (Priority: P0)

Roles have limitations. There will always be a case where we wouldn't want to
give 1 permission to a person, but we want to give that permission to some other
person. So, this leads to creating an extra role. And again in the future, this
issue will occur again which will lead to creation of `N` number of roles which
is basically what `groups` are meant for. So, instead of relying on roles, I
will be creating `groups` and grant permissions to groups

- 3 major groups
  - Root (only me)
  - PeopleILike (includes people I love and want to give CRUD permissions to the
    majority of the projects)
  - Everyone (will mostly have read permissions for `almost` everything)
- Access: Access to a resource will be granted based on following criteria
  - To a group
  - To a specific email

#### Dating ❤️ Compatibility Test 🧪 (Priority: P1)

Tired of breaking up 💔 with your partner over silly reasons 😮‍💨? Try out the
dating compatibility test to see if you and your partner 👫 are compatible,
before emotionally investing into your relationship 💍.

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

Why? There are 1000s of url shorteners out there. Well, none of them are made by
me 😌

### Todos for a new project

- package.json config

```json
{
  "name": "",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "publishConfig": {
    "access": "public"
  },
  "type": "module",
  "exports": {
    "types": "./dist/main.d.ts",
    "import": "./dist/main.js"
  },
  "types": "./dist/main.d.ts",
  "author": {
    "name": "Vighnesh Raut",
    "email": "me@vighnesh153.dev",
    "url": "https://vighnesh153.dev"
  },
  "license": "MIT",
  "scripts": {
    "build": "rm -rf dist && tsup",
    "dev": "tsup --watch",
    "test:watch": "vitest",
    "test": "vitest run --passWithNoTests"
  },
  "files": ["dist"],
  "dependencies": {
    "@vighnesh153/tools": "npm:@jsr/vighnesh153__tools@^0.1.0"
  },
  "devDependencies": {
    "@types/node": "*",
    "@vighnesh153/tsconfig": "*",
    "@vitest/coverage-v8": "^2.0.5",
    "eslint-config-vighnesh153": "*",
    "tsup": "^8.2.4",
    "typescript": "^5.5.4",
    "vitest": "^2.0.5"
  },
  "keywords": [],
  "repository": {
    "type": "git",
    "url": "git@github.com:vighnesh153/vighnesh153-monorepo.git"
  }
}
```

- tsconfig.json

```json
{
  "extends": "@vighnesh153/tsconfig/typescript-library.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["vite/client"]
  },
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```

- .eslintrc.cjs

```js
module.exports = {
  extends: ["vighnesh153/ts-base.eslintrc.cjs"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
```

- .eslintignore

```ignore
*.js
*.cjs
*.d.ts
dist
sst.config.ts
```

- vitest.config.ts

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      thresholds: {
        "100": true,
      },
      include: ["src/**"],
      exclude: ["src/index.ts", "src/**/*.test.ts"],
      reportOnFailure: true,
    },
  },
});
```

- README.md

### Todos for a new package

- extends: Todos for a new project
- tsup.config.ts

```ts
import { defineConfig } from "tsup";

export default defineConfig(() => ({
  entry: {
    main: "./src/index.ts",
  },
  splitting: false,
  clean: true,
  minify: true,
  dts: true,
  treeshake: true,
  format: ["esm"],
  outExtension: () => ({ js: `.js` }),
}));
```

#### Todos for a new application

- extends: Todos for a new project
