# Contributing to vighnesh153-turbo

I would love for you to contribute to `vighnesh153-turbo` and help make it even better than it is today! As a
contributor, here are the guidelines I would like you to follow:

- [Code of Conduct](#coc)
- [Question or Problem?](#question)
- [Issues and Bugs](#issue)
- [Feature Requests](#feature)
- [Submission Guidelines](#submit)
- [Coding Rules](#rules)
- [Commit Message Guidelines](#commit)

## <a name="coc"></a> Code of Conduct

Help me keep `vighnesh153-turbo` open and inclusive. Please read and follow my [Code of Conduct][coc].

## <a name="question"></a> Got a Question or Problem?

Stack Overflow is a much better place to ask questions since:

- there are thousands of people willing to help on Stack Overflow
- questions and answers stay available for public viewing so your question/answer might help someone else
- Stack Overflow's voting system assures that the best answers are prominently visible.

If you have any `@vighnesh153/*` library related question, see if you can get help in the [issues](issues) section from
the previously filed issues. If not, feel free to [create a github issue](submit-issue) if you are stuck.

## <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help me by [submitting an issue](#submit-issue) to my [GitHub
Repository][github]. Even better, you can [submit a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Missing a Feature?

You can _request_ a new feature by [submitting an issue](#submit-issue) to my GitHub Repository. If you would like to
_implement_ a new feature, please consider the size of the change in order to determine the right steps to proceed:

- For a **Major Feature**, first open an issue and outline your proposal so that it can be discussed. This process
  allows me to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it
  is successfully accepted into the project.

  **Note**: Adding a new topic to the documentation, or significantly re-writing a topic, counts as a major feature.

- **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).

## <a name="submit"></a> Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the [github issues](issues). An issue for your problem might already exist and
the discussion might inform you of workarounds readily available.

I want to fix all the issues as soon as possible, but before fixing a bug, I need to reproduce and confirm it. In order
to reproduce bugs, I require that you provide a [minimal reproduction](mre). Having a
[minimal reproducible example](mre) gives me a wealth of important information without going back and forth to you with
additional questions.

A [minimal reproduction](mre) allows me to quickly confirm a bug (or point out a coding problem) as well as confirm that
I am fixing the right problem.

I require a [minimal reproduction](mre) to save maintainers' time and ultimately be able to fix more bugs. Often,
developers find coding problems themselves while preparing a [minimal reproduction](mre). I understand that sometimes it
might be hard to extract essential bits of code from a larger codebase, but we really need to isolate the problem before
I can fix it.

Unfortunately, I am not able to investigate / fix bugs without a [minimal reproduction](mre), so if I don't hear back
from you, I am going to close an issue that doesn't have enough info to be reproduced.

### <a name="submit-pr"></a> Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub](https://github.com/vighnesh153/vighnesh153-turbo/pulls) for an open or closed PR that relates to your
   submission. You don't want to duplicate existing efforts.

2. Be sure that an issue describes the problem you're fixing, or documents the design for the feature you'd like to add.
   Discussing the design upfront helps to ensure that I am ready to accept your work.

3. [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) the vighnesh153/vighnesh153-turbo
   repo.

4. In your forked repository, make your changes in a new git branch:

   ```shell
   git checkout -b my-fix-branch main
   ```

5. Create your patch, **including appropriate test cases**.

6. Follow our [Coding Rules](#rules).

7. Commit your changes using a descriptive commit message that follows our [commit message conventions](#commit).
   Adherence to these conventions is necessary because release notes are automatically generated from these messages.

   ```shell
   git commit --all
   ```

   Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

8. Push your branch to GitHub:

   ```shell
   git push origin my-fix-branch
   ```

9. In GitHub, send a pull request to `vighnesh153-turbo:main`.

### Reviewing a Pull Request

I reserve the right not to accept pull requests from community members who haven't been good citizens of the community.
Such behavior includes not following the [code of conduct](coc).

#### Addressing review feedback

If I ask for changes via code reviews then:

1. Make the required updates to the code.

2. Create a fixup commit and push to your GitHub repository (this will update your Pull Request):

   ```shell
   git commit --all --fixup HEAD
   git push
   ```

   For more info on working with fixup commits see [here](docs/FIXUP_COMMITS.md).

That's it! Thank you for your contribution!

##### Updating the commit message

A reviewer might often suggest changes to a commit message (for example, to add more context for a change or adhere to
our [commit message guidelines](#commit)). In order to update the commit message of the last commit on your branch:

1. Check out your branch:

   ```shell
   git checkout my-fix-branch
   ```

2. Amend the last commit and modify the commit message:

   ```shell
   git commit --amend
   ```

3. Push to your GitHub repository:

   ```shell
   git push --force-with-lease
   ```

> NOTE:<br /> If you need to update the commit message of an earlier commit, you can use `git rebase` in interactive
> mode. See the [git docs](https://git-scm.com/docs/git-rebase#_interactive_mode) for more details.

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream)
repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```shell
  git push origin --delete my-fix-branch
  ```

- Check out the main branch:

  ```shell
  git checkout main -f
  ```

- Delete the local branch:

  ```shell
  git branch -D my-fix-branch
  ```

- Update your local `main` with the latest upstream version:

  ```shell
  git pull --ff upstream main
  ```

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs (unit-tests).
- All public API methods **must be documented**.

## <a name="commit"></a> Commit Message Format

_This specification is inspired by and supersedes the [AngularJS commit message format][commit-message-format]._

I have very precise rules over how our Git commit messages must be formatted. This format leads to **easier to read
commit history**.

Each commit message consists of a **header**, a **body**, and a **footer**.

```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The `header` is mandatory and must conform to the [Commit Message Header](#commit-header) format.

The `body` is mandatory for all commits except for those of type "docs". When the body is present it must be at least 20
characters long and must conform to the [Commit Message Body](#commit-body) format.

The `footer` is optional. The [Commit Message Footer](#commit-footer) format describes what the footer is used for and
the structure it must have.

#### <a name="commit-header"></a>Commit Message Header

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                          elements|forms|http|language-service|localize|platform-browser|
  │                          platform-browser-dynamic|platform-server|router|service-worker|
  │                          upgrade|zone.js|packaging|changelog|docs-infra|migrations|
  │                          devtools
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.

##### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests

##### Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated
from commit messages).

There are currently a few exceptions to the "use package name" rule:

- none/empty string: useful for `test` and `refactor` changes that are done across all packages ( e.g.
  `test: add missing unit tests`) and for docs changes that are not related to a specific package ( e.g.
  `docs: fix typo in tutorial`).

##### Summary

Use the summary field to provide a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

#### <a name="commit-body"></a>Commit Message Body

Just as in the summary, use the imperative, present tense: "fix" not "fixed" nor "fixes".

Explain the motivation for the change in the commit message body. This commit message should explain _why_ you are
making the change. You can include a comparison of the previous behavior with the new behavior in order to illustrate
the impact of the change.

#### <a name="commit-footer"></a>Commit Message Footer

The footer can contain information about breaking changes and deprecations and is also the place to reference GitHub
issues, and other PRs that this commit closes or is related to. For example:

```
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```

or

```
DEPRECATED: <what is deprecated>
<BLANK LINE>
<deprecation description + recommended update path>
<BLANK LINE>
<BLANK LINE>
Closes #<pr number>
```

Breaking Change section should start with the phrase "BREAKING CHANGE: " followed by a summary of the breaking change, a
blank line, and a detailed description of the breaking change that also includes migration instructions.

Similarly, a Deprecation section should start with "DEPRECATED: " followed by a short description of what is deprecated,
a blank line, and a detailed description of the deprecation that also mentions the recommended update path.

### Revert commits

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit.

The content of the commit message body should contain:

- information about the SHA of the commit being reverted in the following format: `This reverts commit <SHA>`,
- a clear description of the reason for reverting the commit message.

The following documents can help you sort out issues with GitHub accounts and multiple email addresses:

- https://help.github.com/articles/setting-your-commit-email-address-in-git/
- https://stackoverflow.com/questions/37245303/what-does-usera-committed-with-userb-13-days-ago-on-github-mean
- https://help.github.com/articles/about-commit-email-addresses/
- https://help.github.com/articles/blocking-command-line-pushes-that-expose-your-personal-email-address/

[coc]: https://github.com/vighnesh153/vighnesh153-turbo/blob/main/CODE_OF_CONDUCT.md
[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
[github]: https://github.com/vighnesh153/vighnesh153-turbo
[stackblitz]: https://stackblitz.com/
[jsfiddle]: https://jsfiddle.net/
[stackoverflow]: https://stackoverflow.com/
[mre]: https://stackoverflow.com/help/minimal-reproducible-example
[issues]: https://github.com/vighnesh153/vighnesh153-turbo/issues
[submit-issue]: https://github.com/vighnesh153/vighnesh153-turbo/issues
