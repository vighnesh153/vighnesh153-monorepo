import esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./unpkgPathPlugin.ts";
import { fetchPlugin } from "./fetchPlugin.ts";
import { esbuildWasmVersion } from "./esbuildWasmVersion.ts";

// need to do it this way else Vite will replace process.env.NODE_ENV with values
const nodeEnv = [`process`, "env", ["NODE", "ENV"].join("_")].join(".");

const isTestEnv = process.env.NODE_ENV === "test";

const wasmInitializationOptions: esbuild.InitializeOptions = {
  wasmURL: `https://unpkg.com/esbuild-wasm@${esbuildWasmVersion}/esbuild.wasm`,
};

const esbuildOptions: esbuild.BuildOptions & { write: false } = {
  // Different entry points will lead to different output files.
  // build script only works on input files and not string inputs
  entryPoints: ["index.tsx"],

  // All the dependencies and their dependencies should be bundled in
  // a single file
  bundle: true,

  // Don't write to any file and keep the output in memory buffers
  write: false,

  // Replace global identifiers with constant expressions
  define: {
    [nodeEnv]: '"production"',
    global: "window",
  },
};

let initialized = false;

export type BundleResult =
  | {
    status: "success";
    outputCode: string;
  }
  | {
    status: "error";
    error: string;
  };

export const bundle = async (inputCode: string): Promise<BundleResult> => {
  if (!initialized) {
    if (isTestEnv) {
      await esbuild.initialize({});
    } else {
      await esbuild.initialize(wasmInitializationOptions);
    }
    initialized = true;
  }

  try {
    const buildResult = await esbuild.build({
      ...esbuildOptions,

      // To map the modules to be fetched from unpkg
      plugins: [
        // Maps the paths to unpkg
        unpkgPathPlugin(),

        // Fetches the module content from unpkg
        fetchPlugin(inputCode),
      ],
    });

    return {
      status: "success",
      outputCode: buildResult.outputFiles[0].text,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: "error",
      error: error?.message ?? "Something went wrong",
    };
  }
};
