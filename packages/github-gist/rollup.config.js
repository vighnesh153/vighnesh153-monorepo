const fs = require('fs');
const babel = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');
const pkg = require('./package.json');

const extensions = ['.ts', '.js'];

module.exports = {
  input: 'src/index.ts',
  plugins: [
    nodeResolve({
      extensions,
    }),
    babel({
      extensions,
      babelrc: true,
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    terser(),
    typescript(),
  ],
  output: [
    {
      file: pkg.main,
      format: 'es',
      sourcemap: false,
    },
  ],
};
