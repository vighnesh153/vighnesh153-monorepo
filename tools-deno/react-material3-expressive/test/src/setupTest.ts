import { JSDOM } from "jsdom";

const jsdom = new JSDOM(
  ``,
  {
    // Although not required for most cases but would be required
    // when testing animations.
    // https://github.com/jsdom/jsdom#pretending-to-be-a-visual-browser
    pretendToBeVisual: true,
  },
);

globalThis.document = jsdom.window.document;
globalThis.window = jsdom.window;

// If something is logged in window.console,
// it would get forwarded to the terminal.
jsdom.window.console = globalThis.console;
