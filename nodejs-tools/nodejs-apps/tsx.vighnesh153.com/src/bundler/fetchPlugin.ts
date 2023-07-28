import esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'fileCache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup: (build: esbuild.PluginBuild) => {
      // Main entry file provided to "esbuild.build" command
      build.onLoad({ filter: /^index\.tsx$/ }, () => {
        return {
          loader: 'tsx',
          contents: inputCode,
        };
      });

      // For all files, if we have the cached response, return it
      build.onLoad({ filter: /.*/ }, async (args) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        if (cachedResult) {
          return cachedResult;
        }
      });

      /**
       * If reached here, it means that we have not cached the file
       */

      // CSS content loader. We will append the raw css as <style> tag in the
      // head of the html file
      build.onLoad({ filter: /\.css$/ }, async (args) => {
        const { data, request } = await axios.get(args.path);
        const escaped = (data as string).replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);

        return result;
      });

      // Other js/jsx files loader
      build.onLoad({ filter: /.*/ }, async (args) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
