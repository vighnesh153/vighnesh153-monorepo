// Just for Dev:Watch command.
import "./index.ts";

const result = await Deno.bundle({
  entrypoints: ["./src/firebase/functions/index.ts"],
  outputDir: "dist/functions/dist",
  // Splitting currently only works with the "esm" format
  // codeSplitting: true,
  minify: false,
  external: [
    "firebase-admin",
    "firebase-functions",
  ],
  format: "cjs",
});

console.log(result);
