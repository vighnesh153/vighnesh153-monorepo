#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { IdentityInfraStack } from "../lib/identity-infra-stack";
import { Stage } from "../lib/stage";

const app = new cdk.App();

const stage: Stage = (() => {
  if (["prod", "dev"].includes(process.env.STAGE ?? "dev"))
    return process.env.STAGE as Stage;
  return "dev";
})();

new IdentityInfraStack(app, stage, {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    // region: "ap-south-2", // Hyderabad
    region: "ap-south-1", // Mumbai
  },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

// app.synth();
