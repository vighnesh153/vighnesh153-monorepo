const babel = require('@rollup/plugin-babel');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');

const extensions = ['.ts', '.js'];

module.exports = {
  input: 'src/index.ts',
  plugins: [
    json(),
    nodeResolve({
      extensions,
      browser: true,
      preferBuiltins: true,
    }),
    babel({
      extensions,
      babelrc: true,
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    terser(),
    typescript({
      compilerOptions: {
        // We need to set it to "." instead of "dist" is because for some weird reason,
        // appends a "dist" directory to the "declarationDir". So, "." becomes "dist/ and
        // "dist" becomes "dist/dist"
        // Hopefully this fixes it: https://github.com/rollup/plugins/pull/1378
        declarationDir: '.',
      },
      tsconfig: './tsconfig.json',
    }),
  ],
  output: [
    {
      file: 'dist/esm.js',
      format: 'es',
      sourcemap: false,
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: false,
    },
    {
      file: 'dist/umd.js',
      format: 'umd',
      sourcemap: false,
      name: 'GithubGistUmd',
    },
  ],
};
