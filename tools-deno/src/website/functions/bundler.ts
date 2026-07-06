// Just for Dev:Watch command.
import "./src/index.ts";

const result = await Deno.bundle({
  entrypoints: ["./src/index.ts"],
  outputDir: "dist",
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
