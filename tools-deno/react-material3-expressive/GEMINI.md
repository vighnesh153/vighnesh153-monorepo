# 

You are an expert frontend engineer who knows everything there is to know about
building websites. You know all the quirks about Javascript and how to build
websites using React.js and Tailwind CSS. You know how to keep the components
testable.

## Introductions

- **Styling:** Use inline styles for all styling. No
- **Testing:** All new components must include a Vitest unit test.
- **Tone:** Be concise. Don't explain basic Javascript/Typescript/React.js
  concepts.

## Preferences

- I prefer to start by development server using `npm start` or `deno run start`
  (mostly `deno` is preferred).

# Project Instructions

Hello Gemini! If you are reading this file, you are assisting with the
development of a React.js component library and its accompanying test
environment. Please use the following context to guide your code generation and
architectural recommendations.

## Project Overview

This project is a modern UI component library built with **React.js** and
**TypeScript**, running on the **Deno** runtime with the **Vite** build tool.

The repository is structured into two main sibling directories to separate the
library source code from its testing/development environment.

### Directory Structure

- **/lib**
  - **Purpose:** Contains the core source code for the React component library.
  - **Rules:**
    - Code here must be highly reusable, modular, and strongly typed.
    - It should not contain any app-specific business logic.
    - All public components, hooks, and types should be properly exported.
    - All styles should inlined in React.js. You should not create or refer to
      any CSS file.
    - Do not use jsx syntax for creating any React Component in lib. Use the
      `React.createComponent` builder to construct it.
    - The folder structure should be as follows.
      - For each component, create a directory under `src`. For ex: button
        should lie in `src/button`.
      - Each component directory should contain a `mod.ts` file which will
        expose the only things that should be used as API for the respective
        component. For ex: a `mod.ts` file button component directory would
        mostly export only `ButtonProps` interface and `Button` component
        function. Other functions or utilities should not be exported.
- **/test**
  - **Purpose:** A test directory that will unit test all components defined in
    the lib directory.
  - **Stack:**
    - **Vitest** as the test library
    - **Typescript:** as the primary language
  - **Rules:**
    - Test all ui styles using screenshot tests
    - Test all computational logic using standard assertions
- **/playground**
  - **Purpose:** A sandbox application used exclusively for testing and
    demonstrating the components built in the `/lib` directory. This package
    will contain a playground page that will be used to validate how a component
    looks or works.
  - **Stack:** Built using **Vite** (React + TypeScript template).
  - **Rules:** This app imports components directly from the local `/lib`
    directory to test them in a real browser environment with Hot Module
    Replacement (HMR).

## Technology Stack & Development Guidelines

When generating code or offering solutions, please adhere to the best practices
of the following technologies:

### 1. Deno

- **Context:** We are using Deno instead of Node.js.
- **Guidelines:** Assume Deno's native TypeScript support. Use standard Deno
  tooling (`deno task`, `deno test`, `deno lint`) where applicable. Be mindful
  of Deno's module resolution (e.g., `deno.json` workspaces or import maps) when
  linking `/lib` to `/playground`.

### 2. React.js

- **Context:** A declarative, component-based JavaScript library for building
  user interfaces.
- **Guidelines:** * Write functional components exclusively. Do not use class
  components.
  - Utilize React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`,
    etc.) for state and lifecycle management.
  - Ensure components are pure, predictable, and optimized for rendering
    performance.
  - Follow accessible design principles (ARIA attributes, semantic HTML) for all
    UI components in `/lib`.

### 3. TypeScript

- **Context:** A strongly typed programming language that builds on JavaScript,
  giving you better tooling at any scale.
- **Guidelines:**
  - Maintain strict type safety across the project.
  - Always define explicit `interface` or `type` aliases for component `props`.
  - Export reusable types from `/lib` so consumers of the library can use them.
  - Avoid using `any`. Use `unknown` or generics if dynamic typing is absolutely
    necessary.

### 4. Vite (in `/playground`)

- **Context:** A frontend build tool that significantly improves the frontend
  development experience.
- **Guidelines:** When editing the playground, optimize for Vite's fast HMR.
  Ensure the Vite config is properly mapped to resolve the local `/lib`
  directory so changes in the library reflect instantly in the playground app.

---

**Note to Gemini:** Whenever I ask you to create a new component, please provide
the component code for `/lib`, its corresponding TypeScript interface, and a
sample usage file to be placed in `/playground` to test it.
