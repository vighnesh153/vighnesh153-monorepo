import esbuild from "esbuild-wasm";

export const namespaces = {
  root: "vighnesh153.dev/projects/tsx-playground",
};
const unpkgRoot = "https://unpkg.com";

/**
 * This plugin will map the modules to unpkg instead of searching them in
 * node_modules.
 */
export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup: (build: esbuild.PluginBuild) => {
      // Main entry file provided to "esbuild.build" command
      build.onResolve({ filter: /^index\.tsx$/ }, () => {
        return {
          namespace: namespaces.root,
          path: "index.tsx",
        };
      });

      // Handle relative paths
      build.onResolve({ filter: /^.+\// }, (args: esbuild.OnResolveArgs) => {
        return {
          namespace: namespaces.root,
          path: new URL(args.path, unpkgRoot + args.resolveDir + "/").href,
        };
      });

      // Handle entry point of a module
      build.onResolve({ filter: /.*/ }, async (args) => {
        return {
          namespace: namespaces.root,
          path: `${unpkgRoot}/${args.path}`,
        };
      });
    },
  };
};
