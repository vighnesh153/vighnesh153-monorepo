- Components
  - typography
  - button
  - link
    - attribute: data-astro-prefetch for prefetching
    - link styles
    ```css
    a {
      display: inline-block;
      position: relative;

      text-decoration-line: none;
      cursor: pointer;

      &:not(.no-base-style) {
        color: $color-accent;

        &::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;

          left: 0;
          bottom: -2px;

          background-color: currentColor;

          transition-property: width;
          transition-duration: 150ms;
          transition-timing-function: $ease-in;
        }

        &:is(:hover, :focus-visible)::after {
          width: 100%;
        }
      }
    }
    ```
