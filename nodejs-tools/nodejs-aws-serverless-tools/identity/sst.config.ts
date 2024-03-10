import { type SSTConfig } from 'sst';
import { type StackContext, Api } from 'sst/constructs';

const stackName = 'Vighnesh153IdentityStack';

function validateStage(stage?: string) {
  if (!['dev', 'prod'].includes(`${stage}`)) {
    throw new Error(`Stage should either be "dev" or "prod", found "${stage}"`);
  }
}

export function IdentityStack({ stack }: StackContext) {
  const { stage } = stack;
  validateStage(stage);

  const initiateGoogleLogin = 'initiateGoogleLogin';
  const googleAuthCallback = 'googleAuthCallback';

  // http api
  const api = new Api(stack, 'HttpApi', {
    customDomain: {
      domainName: `${stage}.identity.vighnesh153.dev`,
      hostedZone: 'vighnesh153.dev',
    },
    routes: {
      [`GET /${initiateGoogleLogin}`]: {
        function: {
          functionName: `HttpApiGet-${initiateGoogleLogin}-${stage}`,
          handler: `dist/${initiateGoogleLogin}.handler`,
        },
      },
      [`GET /${googleAuthCallback}`]: {
        function: {
          functionName: `HttpApiGet-${googleAuthCallback}-${stage}`,
          handler: `dist/${googleAuthCallback}.handler`,
        },
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    CustomDomain: api.customDomainUrl,
    Routes: api.routes.join(', '),
  });
}

const sstConfig: SSTConfig = {
  config(input) {
    const { stage } = input;
    validateStage(stage);
    return {
      name: `Vighnesh153-Identity-${stage}`,
      region: 'ap-south-1', // Mumbai
    };
  },
  stacks(app) {
    const { stage } = app;
    validateStage(stage);
    app.stack(IdentityStack, {
      stackName: `${stackName}-${stage}`,
    });
  },
};

export default sstConfig;
