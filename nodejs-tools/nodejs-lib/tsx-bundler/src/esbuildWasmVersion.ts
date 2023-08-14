import packageJson from '../package.json';

const rawVersion = packageJson.dependencies['esbuild-wasm'];

// parses out "1.2.3" from "^1.2.3"
export const esbuildWasmVersion = /[0-9]+\.[0-9]+\.[0-9]+/.exec(rawVersion);
