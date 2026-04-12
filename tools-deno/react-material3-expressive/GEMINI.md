# React Material3 Expressive

This project is a modern Material 3 Expressive UI component library built for
**React.js** and **TypeScript**, built using the **Deno** runtime with the
**Vite** build tool.

## Material 3 Expressive

Material Design 3 (M3) is the latest version of Google's open-source design
system. It introduces a modernized, expressive, and personalizable visual
language known as `Material You`. This library strictly adheres to the M3
guidelines to provide a cohesive set of React components.

### Core M3 Foundations

- **[Color & Dynamic Color](https://m3.material.io/styles/color/overview):**
  Uses tonal palettes to generate a cohesive set of color roles. Key roles
  include `Primary`, `Secondary`, `Tertiary`, `Error`, `Background`, and
  `Surface`. The system supports dynamic color extraction from user wallpapers
  on supported devices.
- **[Typography](https://m3.material.io/styles/typography/overview):** A
  simplified, robust type scale consisting of five categories: `Display`,
  `Headline`, `Title`, `Label`, and `Body`. Each category has `Large`, `Medium`,
  and `Small` variations.
- **[Elevation](https://m3.material.io/styles/elevation/overview):** Deprecates
  relying purely on shadows. M3 introduces **tonal elevation** (adding a tint of
  the primary color to the surface) combined with **shadow elevation** to
  indicate depth and hierarchy (Levels 0 through 5).
- **[Shape](https://m3.material.io/styles/shape/overview):** A standardized
  shape scale focusing on rounded corners to direct attention and convey
  hierarchy: `Extra Small`, `Small`, `Medium`, `Large`, `Extra Large`, and
  `Full`.
- **[Motion](https://m3.material.io/styles/motion/overview):** Expressive
  transitions using predefined easing curves (Emphasized, Standard, Decelerated)
  and durations (`Short`, `Medium`, `Long`, `Extra Long`) to make the UI feel
  alive and responsive.
- **[State Layers](https://m3.material.io/foundations/interaction/states):**
  Visual indicators for interaction states (`Hover`, `Focus`, `Pressed`,
  `Dragged`). They are implemented as semi-transparent overlays on top of the
  base container color.
- **[Components](https://m3.material.io/components):** Modernized structures for
  `Buttons`, `Cards`, `Dialogs`, `Navigation`, and more, updated to consume M3
  design tokens (`color`, `typography`, `shape`, etc.).

### Implementation Strategy for this Project

- **Inline Styles Only:** All M3 tokens (`colors`, `typography sizing`,
  `elevation shadows/tints`) will be implemented as plain JavaScript objects and
  consumed via inline `style` props. No CSS files will be used in components.
- **Theme Object:** A centralized theme object will store all M3 tokens to
  ensure consistency and allow for potential dynamic theming.

## Project Overview

The repository is structured into three main sibling directories to separate the
library source code from its testing/development & playground environment.

### Directory Structure

- **/lib**
  - **Purpose:** Contains the core source code for the React Material3
    expressive component library.
  - **Rules:**
    - Code here must be highly reusable, modular, and strongly typed.
    - It should not contain any app-specific business logic.
    - All public components, hooks, and types should be properly exported.
    - All styles should inlined in React.js. You should not create or refer to
      any CSS file.
    - The folder structure should be as follows.
      - Everything related to colors resides in the `src/colors` directory.
      - Everything related to elevation resides in the `src/elevation`
        directory.
      - Everything related to icons resides in the `src/icons` directory.
      - Everything related to motions resides in the `src/motion` directory.
      - Everything related to shapes resides in the `src/shapes` directory.
      - Everything related to typography resides in the `src/typography`
        directory.
      - For each component, create a directory under `src/components`. For ex:
        button should lie in `src/components/button`.
      - The `src/components/mod.ts` file should just re-export the `mod.ts`
        files from sibling component directories.
      - Each component directory should contain a `mod.ts` file which will
        expose the only things that should be used as API for the respective
        component. For ex: a `mod.ts` file button component directory would
        mostly export only `ButtonProps` interface and `Button` component
        function. Other functions or utilities should not be exported.
- **/test**
  - **Purpose:** A test directory that will unit test all components and classes
    defined in the lib directory.
  - **Stack:**
    - **Deno** as the test runner.
    - **@std/expect** jsr library for assertions.
    - **@testing-library/react** npm library for React.js and HTML/CSS related
      assertions.
    - **Typescript:** as the primary language
  - **Rules:**
    - Always import `src/setupTest.ts` before importing
      `@testing-library/react`.
    - Always add `Deno.test.afterEach(cleanup);` before any test.
    - Test all ui styles the `@testing-library/react` utilities.
    - Test all computational logic using standard assertions.
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
  of Deno's module resolution (e.g., `deno.json` workspaces or import maps).

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
