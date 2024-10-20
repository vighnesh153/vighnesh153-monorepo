// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

const oneYear = "31536000";
const oneDay = "86400";
const fiveMinutes = "300";

// Hosted zone: vighnesh153.dev
const hostedZoneId = "Z0751561MSQKJ4JAASC2";
const domainNames = {
  staging: "staging.vighnesh153.dev",
  production: "vighnesh153.dev",
};

export default $config({
  app(input) {
    const { stage } = input ?? {};
    if (!stage) {
      throw new Error(
        "Stage is not defined. Please provide stage while running the command",
      );
    }
    return {
      name: `${stage}-Vighnesh153Astro`,
      removal: stage === "prod" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const { stage } = $app;
    if (!stage) {
      throw new Error(
        "Stage is not defined. Please provide stage while running the command",
      );
    }

    const domainName = stage === "prod"
      ? domainNames.production
      : domainNames.staging;

    new sst.aws.Astro(`${stage}-Vighnesh153Astro`, {
      // path: '.',
      // buildCommand: 'npm run build',
      // buildOutput: 'dist',
      // errorPage: '404.html',
      domain: {
        name: domainName,
        dns: sst.aws.dns({
          zone: hostedZoneId,
        }),
        redirects: ["www." + domainName],
      },
      assets: {
        fileOptions: [
          // HTML files
          {
            files: "**/*.html",
            // cacheControl: 'max-age=0,no-cache,no-store,must-revalidate',
            cacheControl: [
              `max-age=${fiveMinutes}`,
              `s-max-age=${fiveMinutes}`,
              "public",
              "must-revalidate",
            ].join(","),
          },
          // ico
          ...["**/*.ico"].map((imageRegex) => ({
            files: imageRegex,
            cacheControl: [
              `max-age=${oneDay}`,
              `s-max-age=${oneDay}`,
              "public",
              "must-revalidate",
            ].join(","),
          })),
          // images
          ...["**/*.webp", "**/*.png", "**/*.jpeg", "**/*.jpg"].map((
            imageRegex,
          ) => ({
            files: imageRegex,
            cacheControl: [`max-age=${oneYear}`, "public", "immutable"].join(
              ",",
            ),
          })),
          // CSS and JS files
          ...["*.js", "*.css"].map((jsCssFilesRegex) => ({
            files: jsCssFilesRegex,
            cacheControl: [`max-age=${oneYear}`, "public", "immutable"].join(
              ",",
            ),
          })),
        ],
      },
      environment: {
        PUBLIC_VIGHNESH153_STAGE: stage,
      },
    });
  },
});
